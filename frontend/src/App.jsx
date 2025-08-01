import './App.css';
import { useState } from 'react';
import AgentNetwork from './components/AgentNetwork';
import ScenarioInput from './components/ScenarioInput';
import AgentLogs from './components/AgentLogs';
import DomainSidebar from './components/DomainSidebar';
import axios from 'axios';

function App() {
  const [scenario, setScenario] = useState('');
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState('retail');

  // Step 2: Reset scenario and logs on domain change
  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain);
    setScenario('');
    setLogs([]);
    setLoading(false);
  };

  const handleScenarioSubmit = async (newScenario) => {
    setScenario(newScenario);
    setLoading(true);
    try {
      // Try to fetch logs from backend, but if focus/needs are missing, use demo defaults
      const res = await axios.post('http://localhost:8000/scenario', { scenario: newScenario });
      let logs = res.data.logs;
      // If logs are missing focus/needs, fill with demo data
      if (logs.length && (!logs[0].focus || !logs[0].needs)) {
        // Map scenario to unique agent focus/needs
        // Insurance demo scenarios: only insurance questions/answers
const insuranceDemoScenarios = {
          "How can we streamline the claims approval process for faster settlements?": [
            { agent: 'Legal Counsel', focus: 'Ensure legal compliance in expedited claims.', needs: 'Regulatory requirements and claim documentation.' },
            { agent: 'Claims Adjuster', focus: 'Quickly assess claim validity.', needs: 'Accurate claim data and photos.' },
            { agent: 'Claims Supervisor', focus: 'Oversee and approve fast-track claims.', needs: 'Supervisor approval workflow.' },
            { agent: 'Senior Claims Manager', focus: 'Manage escalations and exceptions.', needs: 'Escalation triggers and exception reports.' },
            { agent: 'Risk Manager', focus: 'Evaluate risk exposure in rapid settlements.', needs: 'Risk models and claim history.' },
            { agent: 'Underwriter', focus: 'Adjust policy terms if needed.', needs: 'Policy flexibility and risk guidelines.' },
            { agent: 'Actuarial Analyst', focus: 'Analyze impact on reserves.', needs: 'Settlement data and loss ratios.' },
            { agent: 'Customer Service Rep', focus: 'Keep customer informed throughout.', needs: 'Automated notifications and status updates.' },
            { agent: 'Policy Admin Coordinator', focus: 'Update policy records post-settlement.', needs: 'Settlement confirmation and policy system access.' },
            { agent: 'Compliance Officer', focus: 'Audit settlement process for compliance.', needs: 'Audit logs and compliance checklist.' }
          ],
          "What steps can reduce fraud risk in insurance claims?": [
            { agent: 'Legal Counsel', focus: 'Advise on anti-fraud regulations.', needs: 'Fraud laws and case studies.' },
            { agent: 'Claims Adjuster', focus: 'Detect suspicious claim patterns.', needs: 'Fraud detection tools and red flags.' },
            { agent: 'Claims Supervisor', focus: 'Review flagged claims.', needs: 'Flagged claim reports.' },
            { agent: 'Senior Claims Manager', focus: 'Oversee fraud investigations.', needs: 'Investigation resources and authority.' },
            { agent: 'Risk Manager', focus: 'Monitor fraud risk trends.', needs: 'Fraud analytics and risk dashboard.' },
            { agent: 'Underwriter', focus: 'Adjust premiums for high-risk segments.', needs: 'Fraud history and segment data.' },
            { agent: 'Actuarial Analyst', focus: 'Model fraud impact on reserves.', needs: 'Fraud loss data.' },
            { agent: 'Customer Service Rep', focus: 'Educate customers about fraud prevention.', needs: 'Fraud awareness materials.' },
            { agent: 'Policy Admin Coordinator', focus: 'Flag suspicious policies.', needs: 'Policy system integration.' },
            { agent: 'Compliance Officer', focus: 'Ensure anti-fraud compliance.', needs: 'Compliance reports and audit trails.' }
          ],
          "How should we prioritize claim investigations after a major storm?": [
            { agent: 'Legal Counsel', focus: 'Advise on regulatory priorities.', needs: 'Government directives.' },
            { agent: 'Claims Adjuster', focus: 'Triage and assign claims.', needs: 'Claim severity and location data.' },
            { agent: 'Claims Supervisor', focus: 'Monitor investigation progress.', needs: 'Investigation status dashboard.' },
            { agent: 'Senior Claims Manager', focus: 'Allocate resources to urgent claims.', needs: 'Resource availability.' },
            { agent: 'Risk Manager', focus: 'Assess aggregate risk.', needs: 'Storm impact models.' },
            { agent: 'Underwriter', focus: 'Adjust underwriting for storm risk.', needs: 'Storm data and risk maps.' },
            { agent: 'Actuarial Analyst', focus: 'Estimate storm-related losses.', needs: 'Loss estimates and historical data.' },
            { agent: 'Customer Service Rep', focus: 'Communicate investigation timelines.', needs: 'Customer contact tools.' },
            { agent: 'Policy Admin Coordinator', focus: 'Update claim records.', needs: 'Claim system access.' },
            { agent: 'Compliance Officer', focus: 'Document prioritization process.', needs: 'Process documentation.' }
          ],
          "What data is most important for accurate risk assessment in new policies?": [
            { agent: 'Legal Counsel', focus: 'Ensure data privacy compliance.', needs: 'Data privacy regulations.' },
            { agent: 'Claims Adjuster', focus: 'Provide claims history data.', needs: 'Historical claims database.' },
            { agent: 'Claims Supervisor', focus: 'Validate data accuracy.', needs: 'Data validation tools.' },
            { agent: 'Senior Claims Manager', focus: 'Review risk assessment process.', needs: 'Assessment guidelines.' },
            { agent: 'Risk Manager', focus: 'Identify key risk indicators.', needs: 'Risk factor reports.' },
            { agent: 'Underwriter', focus: 'Incorporate risk data into pricing.', needs: 'Pricing models.' },
            { agent: 'Actuarial Analyst', focus: 'Analyze risk data trends.', needs: 'Trend analysis tools.' },
            { agent: 'Customer Service Rep', focus: 'Collect missing data from applicants.', needs: 'Data collection forms.' },
            { agent: 'Policy Admin Coordinator', focus: 'Store risk data securely.', needs: 'Secure data systems.' },
            { agent: 'Compliance Officer', focus: 'Audit risk assessment data.', needs: 'Audit reports.' }
          ],
          "How can we improve customer communication during the claims lifecycle?": [
            { agent: 'Legal Counsel', focus: 'Review communication templates for compliance.', needs: 'Template library.' },
            { agent: 'Claims Adjuster', focus: 'Provide timely status updates.', needs: 'Automated status system.' },
            { agent: 'Claims Supervisor', focus: 'Monitor communication quality.', needs: 'Quality monitoring tools.' },
            { agent: 'Senior Claims Manager', focus: 'Resolve escalated communication issues.', needs: 'Escalation protocols.' },
            { agent: 'Risk Manager', focus: 'Identify communication breakdowns.', needs: 'Customer feedback data.' },
            { agent: 'Underwriter', focus: 'Clarify policy terms to customers.', needs: 'Policy FAQ.' },
            { agent: 'Actuarial Analyst', focus: 'Analyze communication impact on satisfaction.', needs: 'Satisfaction survey data.' },
            { agent: 'Customer Service Rep', focus: 'Answer customer questions.', needs: 'Knowledge base.' },
            { agent: 'Policy Admin Coordinator', focus: 'Send official notifications.', needs: 'Notification system.' },
            { agent: 'Compliance Officer', focus: 'Ensure all communications are logged.', needs: 'Communication logs.' }
          ],
        };
        // Retail demo scenarios: only retail questions/answers
const retailDemoScenarios = {
  // Insurance demo questions and answers
  "How can we streamline the claims approval process for faster settlements?": [
    { agent: 'Legal Counsel', focus: 'Ensure legal compliance in expedited claims.', needs: 'Regulatory requirements and claim documentation.' },
    { agent: 'Claims Adjuster', focus: 'Quickly assess claim validity.', needs: 'Accurate claim data and photos.' },
    { agent: 'Claims Supervisor', focus: 'Oversee and approve fast-track claims.', needs: 'Supervisor approval workflow.' },
    { agent: 'Senior Claims Manager', focus: 'Manage escalations and exceptions.', needs: 'Escalation triggers and exception reports.' },
    { agent: 'Risk Manager', focus: 'Evaluate risk exposure in rapid settlements.', needs: 'Risk models and claim history.' },
    { agent: 'Underwriter', focus: 'Adjust policy terms if needed.', needs: 'Policy flexibility and risk guidelines.' },
    { agent: 'Actuarial Analyst', focus: 'Analyze impact on reserves.', needs: 'Settlement data and loss ratios.' },
    { agent: 'Customer Service Rep', focus: 'Keep customer informed throughout.', needs: 'Automated notifications and status updates.' },
    { agent: 'Policy Admin Coordinator', focus: 'Update policy records post-settlement.', needs: 'Settlement confirmation and policy system access.' },
    { agent: 'Compliance Officer', focus: 'Audit settlement process for compliance.', needs: 'Audit logs and compliance checklist.' }
  ],
  "What steps can reduce fraud risk in insurance claims?": [
    { agent: 'Legal Counsel', focus: 'Advise on anti-fraud regulations.', needs: 'Fraud laws and case studies.' },
    { agent: 'Claims Adjuster', focus: 'Detect suspicious claim patterns.', needs: 'Fraud detection tools and red flags.' },
    { agent: 'Claims Supervisor', focus: 'Review flagged claims.', needs: 'Flagged claim reports.' },
    { agent: 'Senior Claims Manager', focus: 'Oversee fraud investigations.', needs: 'Investigation resources and authority.' },
    { agent: 'Risk Manager', focus: 'Monitor fraud risk trends.', needs: 'Fraud analytics and risk dashboard.' },
    { agent: 'Underwriter', focus: 'Adjust premiums for high-risk segments.', needs: 'Fraud history and segment data.' },
    { agent: 'Actuarial Analyst', focus: 'Model fraud impact on reserves.', needs: 'Fraud loss data.' },
    { agent: 'Customer Service Rep', focus: 'Educate customers about fraud prevention.', needs: 'Fraud awareness materials.' },
    { agent: 'Policy Admin Coordinator', focus: 'Flag suspicious policies.', needs: 'Policy system integration.' },
    { agent: 'Compliance Officer', focus: 'Ensure anti-fraud compliance.', needs: 'Compliance reports and audit trails.' }
  ],
  "How should we prioritize claim investigations after a major storm?": [
    { agent: 'Legal Counsel', focus: 'Advise on regulatory priorities.', needs: 'Government directives.' },
    { agent: 'Claims Adjuster', focus: 'Triage and assign claims.', needs: 'Claim severity and location data.' },
    { agent: 'Claims Supervisor', focus: 'Monitor investigation progress.', needs: 'Investigation status dashboard.' },
    { agent: 'Senior Claims Manager', focus: 'Allocate resources to urgent claims.', needs: 'Resource availability.' },
    { agent: 'Risk Manager', focus: 'Assess aggregate risk.', needs: 'Storm impact models.' },
    { agent: 'Underwriter', focus: 'Adjust underwriting for storm risk.', needs: 'Storm data and risk maps.' },
    { agent: 'Actuarial Analyst', focus: 'Estimate storm-related losses.', needs: 'Loss estimates and historical data.' },
    { agent: 'Customer Service Rep', focus: 'Communicate investigation timelines.', needs: 'Customer contact tools.' },
    { agent: 'Policy Admin Coordinator', focus: 'Update claim records.', needs: 'Claim system access.' },
    { agent: 'Compliance Officer', focus: 'Document prioritization process.', needs: 'Process documentation.' }
  ],
  "What data is most important for accurate risk assessment in new policies?": [
    { agent: 'Legal Counsel', focus: 'Ensure legal and regulatory compliance in risk assessment.', needs: 'Review all legal and compliance requirements for new policies.' },
    { agent: 'Claims Adjuster', focus: 'Provide claims history and loss data.', needs: 'Access to historical claims and loss records.' },
    { agent: 'Claims Supervisor', focus: 'Validate accuracy of claims data used in assessment.', needs: 'Verification tools and data validation processes.' },
    { agent: 'Senior Claims Manager', focus: 'Oversee data collection and review for risk assessment.', needs: 'Comprehensive data collection protocols.' },
    { agent: 'Risk Manager', focus: 'Identify and analyze key risk indicators.', needs: 'Risk factor reports and actuarial input.' },
    { agent: 'Underwriter', focus: 'Incorporate risk data into underwriting and pricing.', needs: 'Detailed risk models and pricing guidelines.' },
    { agent: 'Actuarial Analyst', focus: 'Analyze trends and forecast risk exposure.', needs: 'Access to current and historical trend data.' },
    { agent: 'Customer Service Rep', focus: 'Communicate data requirements to applicants.', needs: 'Clear forms and communication templates.' },
    { agent: 'Policy Admin Coordinator', focus: 'Ensure secure storage of sensitive risk data.', needs: 'Secure policy admin systems and access controls.' },
    { agent: 'Compliance Officer', focus: 'Audit all risk assessment data and processes.', needs: 'Audit trails and compliance checklists.' }
  ],
  "How can we improve customer communication during the claims lifecycle?": [
    { agent: 'Legal Counsel', focus: 'Review communication templates for compliance.', needs: 'Template library.' },
    { agent: 'Claims Adjuster', focus: 'Provide timely status updates.', needs: 'Automated status system.' },
    { agent: 'Claims Supervisor', focus: 'Monitor communication quality.', needs: 'Quality monitoring tools.' },
    { agent: 'Senior Claims Manager', focus: 'Resolve escalated communication issues.', needs: 'Escalation protocols.' },
    { agent: 'Risk Manager', focus: 'Identify communication breakdowns.', needs: 'Customer feedback data.' },
    { agent: 'Underwriter', focus: 'Clarify policy terms to customers.', needs: 'Policy FAQ.' },
    { agent: 'Actuarial Analyst', focus: 'Analyze communication impact on satisfaction.', needs: 'Satisfaction survey data.' },
    { agent: 'Customer Service Rep', focus: 'Answer customer questions.', needs: 'Knowledge base.' },
    { agent: 'Policy Admin Coordinator', focus: 'Send official notifications.', needs: 'Notification system.' },
    { agent: 'Compliance Officer', focus: 'Ensure all communications are logged.', needs: 'Communication logs.' }
  ],
          "How should we handle returns efficiently to maintain customer satisfaction during a sales event?": [
            { agent: 'Returns Manager', focus: 'Provide guidance on handling returns efficiently to maintain customer satisfaction.', needs: 'Expected return volumes and current return policies.' },
            { agent: 'Product Specialist', focus: 'Ensure popular items are well-stocked for quick returns/exchanges.', needs: 'Inventory levels and return rates for key SKUs.' },
            { agent: 'Order Fulfillment Coordinator', focus: 'Optimize reverse logistics for returned items.', needs: 'Data on in-transit returns and warehouse capacity.' },
            { agent: 'Marketing Manager', focus: 'Communicate hassle-free returns to boost confidence.', needs: 'Details on return offers and customer sentiment.' },
            { agent: 'Ecommerce Manager', focus: 'Streamline online return requests.', needs: 'Integration with customer service and inventory systems.' },
            { agent: 'Customer Service Rep', focus: 'Assist customers with return process questions.', needs: 'Clear FAQs and real-time return status.' },
            { agent: 'Inventory Manager', focus: 'Adjust inventory based on expected returns.', needs: 'Forecasts of return rates by product.' },
            { agent: 'Warehouse Manager', focus: 'Prepare space for incoming returns.', needs: 'Schedule and volume estimates for returned goods.' },
            { agent: 'Merchandising Manager', focus: 'Plan for restocking returned items.', needs: 'Trends in returned product categories.' },
            { agent: 'Logistics Coordinator', focus: 'Coordinate return shipments efficiently.', needs: 'Carrier schedules and return shipment tracking.' }
          ],
          "What can we do to optimize product placements and ensure popular items are well-stocked?": [
            { agent: 'Returns Manager', focus: 'Track returns to identify poorly-placed products.', needs: 'Product placement data and return reasons.' },
            { agent: 'Product Specialist', focus: 'Advise on optimal shelf placement for high-demand items.', needs: 'Sales velocity and customer flow data.' },
            { agent: 'Order Fulfillment Coordinator', focus: 'Ensure fast restocking of popular products.', needs: 'Stock levels and restock lead times.' },
            { agent: 'Marketing Manager', focus: 'Promote featured items in prime locations.', needs: 'Promotional calendar and featured product list.' },
            { agent: 'Ecommerce Manager', focus: 'Highlight bestsellers on homepage.', needs: 'Online sales trends and inventory sync.' },
            { agent: 'Customer Service Rep', focus: 'Guide customers to popular products.', needs: 'Store maps and product availability info.' },
            { agent: 'Inventory Manager', focus: 'Monitor and replenish fast-moving SKUs.', needs: 'Real-time inventory and reorder points.' },
            { agent: 'Warehouse Manager', focus: 'Prioritize shipments for high-demand items.', needs: 'Demand forecasts and shipment schedules.' },
            { agent: 'Merchandising Manager', focus: 'Design appealing in-store displays.', needs: 'Display effectiveness and foot traffic data.' },
            { agent: 'Logistics Coordinator', focus: 'Optimize delivery routes for restocking.', needs: 'Store delivery windows and route efficiency.' }
          ],
          "How can we optimize stock levels and logistics for efficient delivery during high demand?": [
            { agent: 'Returns Manager', focus: 'Process returns quickly to free up stock.', needs: 'Return processing speed and restock workflow.' },
            { agent: 'Product Specialist', focus: 'Identify products needing urgent replenishment.', needs: 'Sales spikes and low-stock alerts.' },
            { agent: 'Order Fulfillment Coordinator', focus: 'Balance order flow for timely delivery.', needs: 'Order backlog and carrier capacity.' },
            { agent: 'Marketing Manager', focus: 'Coordinate promotions with inventory availability.', needs: 'Promotion timing and inventory status.' },
            { agent: 'Ecommerce Manager', focus: 'Sync online inventory with physical stores.', needs: 'Inventory integration and online order volume.' },
            { agent: 'Customer Service Rep', focus: 'Inform customers of delivery timelines.', needs: 'Updated delivery estimates and stockouts.' },
            { agent: 'Inventory Manager', focus: 'Set dynamic reorder points.', needs: 'Demand forecasts and supplier lead times.' },
            { agent: 'Warehouse Manager', focus: 'Streamline picking and packing.', needs: 'Order volume and warehouse staffing.' },
            { agent: 'Merchandising Manager', focus: 'Adjust displays based on stock levels.', needs: 'Inventory visibility and display flexibility.' },
            { agent: 'Logistics Coordinator', focus: 'Plan extra delivery runs for peak demand.', needs: 'Carrier schedules and demand hotspots.' }
          ],
          "What strategies can enhance customer experience and manage in-store promotions?": [
            { agent: 'Returns Manager', focus: 'Offer easy returns during promotions.', needs: 'Promotion rules and return exceptions.' },
            { agent: 'Product Specialist', focus: 'Feature trending items in promotions.', needs: 'Product popularity and promo eligibility.' },
            { agent: 'Order Fulfillment Coordinator', focus: 'Ensure promo items are in stock.', needs: 'Promo inventory allocation.' },
            { agent: 'Marketing Manager', focus: 'Design engaging in-store events.', needs: 'Event calendar and customer feedback.' },
            { agent: 'Ecommerce Manager', focus: 'Promote cross-channel offers.', needs: 'Unified promo codes and tracking.' },
            { agent: 'Customer Service Rep', focus: 'Educate customers on promo details.', needs: 'Promo FAQs and staff training.' },
            { agent: 'Inventory Manager', focus: 'Reserve stock for promotions.', needs: 'Promo forecasts and inventory locks.' },
            { agent: 'Warehouse Manager', focus: 'Coordinate promo item shipments.', needs: 'Promo order volume and deadlines.' },
            { agent: 'Merchandising Manager', focus: 'Create eye-catching promo displays.', needs: 'Display materials and promo themes.' },
            { agent: 'Logistics Coordinator', focus: 'Align deliveries with promo launch dates.', needs: 'Promo schedule and delivery lead times.' }
          ],
          // Add more scenarios here as needed
        };
        const demoScenarios = selectedDomain === 'insurance' ? insuranceDemoScenarios : retailDemoScenarios;
        let demoData;
        if (demoScenarios[scenario]) {
          demoData = demoScenarios[scenario];
        } else if (selectedDomain === 'insurance') {
          // Insurance fallback
          demoData = [
            { agent: 'Legal Counsel', focus: 'Ensure legal and regulatory compliance for claims.', needs: 'Review all legal documents and compliance requirements.' },
            { agent: 'Claims Adjuster', focus: 'Assess claim validity and investigate damages.', needs: 'Site visit reports and photo evidence.' },
            { agent: 'Claims Supervisor', focus: 'Approve valid claims and supervise process.', needs: 'Adjuster reports and approval workflow.' },
            { agent: 'Senior Claims Manager', focus: 'Oversee escalations and resource allocation.', needs: 'Escalation triggers and resource lists.' },
            { agent: 'Risk Manager', focus: 'Evaluate risk exposure and mitigation.', needs: 'Risk models and claim history.' },
            { agent: 'Underwriter', focus: 'Reassess policy terms after claims.', needs: 'Policy guidelines and risk data.' },
            { agent: 'Actuarial Analyst', focus: 'Analyze trends and reserves.', needs: 'Historical claim and reserve data.' },
            { agent: 'Customer Service Rep', focus: 'Guide customer through claim process.', needs: 'Process documentation and update templates.' },
            { agent: 'Policy Admin Coordinator', focus: 'Update policy records post-claim.', needs: 'Policy admin system access.' },
            { agent: 'Compliance Officer', focus: 'Audit process for compliance.', needs: 'Audit logs and compliance checklists.' }
          ];
        } else {
          // Retail fallback
          demoData = [
            { agent: 'Returns Manager', focus: 'Handling product returns and inventory adjustments.', needs: 'Information on store operations and staffing for alignment with returns processes.' },
            { agent: 'Product Specialist', focus: 'Ensuring adequate product availability and optimizing store layout for customer flow.', needs: 'Current inventory levels and planned promotions.' },
            { agent: 'Order Fulfillment Coordinator', focus: 'Optimizing stock levels and logistics for efficient delivery.', needs: 'Stock levels, sales forecasts, and delivery times.' },
            { agent: 'Marketing Manager', focus: 'Coordinating marketing campaigns and in-store promotions.', needs: 'Marketing calendar and promotional budget.' },
            { agent: 'Ecommerce Manager', focus: 'Improving online sales and digital experience.', needs: 'Ecommerce analytics and website feedback.' },
            { agent: 'Customer Service Rep', focus: 'Providing excellent customer support.', needs: 'Customer feedback and support ticket data.' },
            { agent: 'Inventory Manager', focus: 'Managing inventory for optimal stock levels.', needs: 'Inventory system access and reorder thresholds.' },
            { agent: 'Warehouse Manager', focus: 'Coordinating warehouse operations.', needs: 'Warehouse staffing and delivery schedules.' },
            { agent: 'Merchandising Manager', focus: 'Designing effective in-store displays.', needs: 'Display materials and sales trends.' },
            { agent: 'Logistics Coordinator', focus: 'Optimizing delivery routes and logistics.', needs: 'Carrier schedules and delivery analytics.' }
          ];
        }
        logs = logs.map((log, i) => ({ ...log, ...demoData[i] }));
      }
      setLogs(logs);
    } catch (err) {
      setLogs([]);
      alert('Error connecting to backend. Make sure FastAPI server is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #23272b 0%, #15191c 100%)',
      color: '#fff',
      padding: 0,
      margin: 0,
      display: 'flex',
      fontFamily: 'Poppins, Segoe UI, Roboto, Arial, sans-serif',
      boxSizing: 'border-box',
      position: 'relative',
    }}>
      <DomainSidebar selectedDomain={selectedDomain} onSelect={handleDomainSelect} />
      <div style={{ flex: 1, marginLeft: 160, padding: 0, minHeight: '100vh', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
        <div style={{ width: '100%', maxWidth: 1040, margin: '0 auto', paddingTop: 36 }}>
          {/* Animated Gradient Header */}
          <h1 style={{
            textAlign: 'center',
            marginBottom: '2.5rem',
            marginTop: 0,
            fontSize: 38,
            fontWeight: 900,
            letterSpacing: 1,
            background: 'linear-gradient(90deg, #b6e41c, #90caf9, #ff9800, #b6e41c)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 2px 24px #0008',
            animation: 'gradient-move 3s linear infinite',
          }}>
            Agentic AI {selectedDomain === 'retail' ? 'Retail' : 'Insurance'} Optimization
            <span style={{ color: '#fff', fontWeight: 400, fontSize: 20, textShadow: 'none', WebkitTextFillColor: '#fff' }}>
              &nbsp;&ndash; Multi-Agent Network
            </span>
          </h1>
          {/* Glassmorphic Card */}
          <div style={{
            background: 'rgba(35,39,43,0.85)',
            padding: 40,
            borderRadius: 22,
            boxShadow: '0 8px 40px #0007',
            border: '1.5px solid #23272b',
            position: 'relative',
            backdropFilter: 'blur(8px)',
            transition: 'box-shadow 0.3s',
          }}>
            <div style={{ background: 'rgba(24,28,32,0.97)', padding: 22, borderRadius: 14, marginBottom: 30, boxShadow: '0 2px 12px #0003', display: 'flex', alignItems: 'center', gap: 16 }}>
              <ScenarioInput onSubmit={handleScenarioSubmit} domain={selectedDomain} />
            </div>
            {scenario && (
              <div style={{ marginBottom: 26, background: 'rgba(33,38,43,0.98)', padding: 16, borderRadius: 10, color: '#90caf9', fontSize: 17, fontWeight: 500, letterSpacing: 0.2, boxShadow: '0 2px 8px #0002' }}>
                <strong style={{ color: '#b6e41c', fontWeight: 800, fontSize: 18 }}>Scenario:</strong> {scenario}
              </div>
            )}
            <div style={{ marginBottom: 28 }}>
              <AgentLogs logs={logs} />
            </div>
            {loading && <div style={{ color: '#90caf9', marginBottom: 18, fontSize: 18, textAlign: 'center', letterSpacing: 0.2, fontWeight: 600, animation: 'pulse 1.5s infinite' }}>Loading agent actions...</div>}
            <div style={{ marginTop: 18 }}>
              <AgentNetwork scenario={scenario} domain={selectedDomain} />
            </div>
          </div>
          {/* Footer */}
          <footer style={{ textAlign: 'center', marginTop: 48, color: '#ffe08299', fontSize: 15, letterSpacing: 0.3 }}>
            <span style={{ fontWeight: 600, color: '#b6e41c' }}>Agentic AI Dashboard</span> &nbsp;|&nbsp; Powered by Azure AI Foundry &nbsp;|&nbsp; <span style={{ color: '#90caf9' }}>2025</span>
          </footer>
        </div>
      </div>
      {/* Keyframes for gradient animation and loading pulse */}
      <style>{`
        @keyframes gradient-move {
          0% { background-position: 0% 50%; }
          100% { background-position: 100% 50%; }
        }
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.6; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default App;
