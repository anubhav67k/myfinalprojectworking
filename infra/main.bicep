targetScope = 'resourceGroup'

@description('App Service Plan SKU')
param skuName string = 'B1'

resource backendPlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: 'backend-plan'
  location: resourceGroup().location
  sku: {
    name: skuName
    tier: 'Basic'
  }
}

resource backendApp 'Microsoft.Web/sites@2022-03-01' = {
  name: 'backend-app-${uniqueString(resourceGroup().id)}'
  location: resourceGroup().location
  tags: {
    'azd-service-name': 'backend'
  }
  properties: {
    serverFarmId: backendPlan.id
    siteConfig: {
      linuxFxVersion: 'PYTHON|3.11'
    }
    httpsOnly: true
  }
}

resource frontendPlan 'Microsoft.Web/serverfarms@2022-03-01' = {
  name: 'frontend-plan'
  location: resourceGroup().location
  sku: {
    name: skuName
    tier: 'Basic'
  }
}

resource frontendApp 'Microsoft.Web/sites@2022-03-01' = {
  name: 'frontend-app-${uniqueString(resourceGroup().id)}'
  location: resourceGroup().location
  tags: {
    'azd-service-name': 'frontend'
  }
  properties: {
    serverFarmId: frontendPlan.id
    siteConfig: {
      linuxFxVersion: 'NODE|18-lts'
    }
    httpsOnly: true
  }
}