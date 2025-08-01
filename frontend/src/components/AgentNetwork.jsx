import React, { useState, useEffect } from 'react';
import ReactFlow, { Controls, Background } from 'reactflow';
import 'reactflow/dist/style.css';

const AgentNetwork = ({ domain }) => {
  // Retail domain nodes and edges
  const retailNodes = [
    { id: 'returns_manager', data: { label: 'Returns Manager' }, position: { x: 0, y: 0 } },
    { id: 'product_specialist', data: { label: 'Product Specialist' }, position: { x: 250, y: -100 } },
    { id: 'order_fulfillment_coordinator', data: { label: 'Order Fulfillment Coordinator' }, position: { x: 500, y: 0 } },
    { id: 'marketing_manager', data: { label: 'Marketing Manager' }, position: { x: 125, y: 200 } },
    { id: 'ecommerce_manager', data: { label: 'Ecommerce Manager' }, position: { x: 375, y: 200 } },
    { id: 'customer_service_rep', data: { label: 'Customer Service Rep' }, position: { x: 250, y: 100 } },
    { id: 'inventory_manager', data: { label: 'Inventory Manager' }, position: { x: 600, y: -100 } },
    { id: 'warehouse_manager', data: { label: 'Warehouse Manager' }, position: { x: 750, y: 0 } },
    { id: 'merchandising_manager', data: { label: 'Merchandising Manager' }, position: { x: 500, y: 100 } },
    { id: 'logistics_coordinator', data: { label: 'Logistics Coordinator' }, position: { x: 750, y: 200 } },
  ];
  const retailEdges = [
    { id: 'e1-2', source: 'returns_manager', target: 'product_specialist', animated: true },
    { id: 'e2-3', source: 'product_specialist', target: 'order_fulfillment_coordinator', animated: true },
    { id: 'e3-4', source: 'order_fulfillment_coordinator', target: 'marketing_manager', animated: true },
    { id: 'e4-5', source: 'marketing_manager', target: 'ecommerce_manager', animated: true },
    { id: 'e5-6', source: 'ecommerce_manager', target: 'customer_service_rep', animated: true },
    { id: 'e6-7', source: 'customer_service_rep', target: 'inventory_manager', animated: true },
    { id: 'e7-8', source: 'inventory_manager', target: 'warehouse_manager', animated: true },
    { id: 'e8-9', source: 'warehouse_manager', target: 'merchandising_manager', animated: true },
    { id: 'e9-10', source: 'merchandising_manager', target: 'logistics_coordinator', animated: true },
    { id: 'e10-1', source: 'logistics_coordinator', target: 'returns_manager', animated: true },
  ];

  // Insurance domain nodes and edges
  const insuranceNodes = [
    { id: 'legal_counsel', data: { label: 'Legal Counsel' }, position: { x: 120, y: 0 } },
    { id: 'claims_adjuster', data: { label: 'Claims Adjuster' }, position: { x: 260, y: 90 } },
    { id: 'claims_supervisor', data: { label: 'Claims Supervisor' }, position: { x: 220, y: 210 } },
    { id: 'senior_claims_manager', data: { label: 'Senior Claims Manager' }, position: { x: 340, y: 310 } },
    { id: 'risk_manager', data: { label: 'Risk Manager' }, position: { x: 470, y: 310 } },
    { id: 'underwriter', data: { label: 'Underwriter' }, position: { x: 470, y: 120 } },
    { id: 'actuarial_analyst', data: { label: 'Actuarial Analyst' }, position: { x: 620, y: 120 } },
    { id: 'customer_service_representative', data: { label: 'Customer Service Rep' }, position: { x: 340, y: 40 } },
    { id: 'policy_admin_coordinator', data: { label: 'Policy Admin Coordinator' }, position: { x: 470, y: 0 } },
    { id: 'compliance_officer', data: { label: 'Compliance Officer' }, position: { x: 620, y: 0 } },
  ];
  const insuranceEdges = [
    { id: 'e1', source: 'legal_counsel', target: 'claims_adjuster', animated: true },
    { id: 'e2', source: 'claims_adjuster', target: 'claims_supervisor', animated: true },
    { id: 'e3', source: 'claims_supervisor', target: 'senior_claims_manager', animated: true },
    { id: 'e4', source: 'senior_claims_manager', target: 'risk_manager', animated: true },
    { id: 'e5', source: 'customer_service_representative', target: 'claims_adjuster', animated: true },
    { id: 'e6', source: 'customer_service_representative', target: 'underwriter', animated: true },
    { id: 'e7', source: 'underwriter', target: 'actuarial_analyst', animated: true },
    { id: 'e8', source: 'policy_admin_coordinator', target: 'customer_service_representative', animated: true },
    { id: 'e9', source: 'policy_admin_coordinator', target: 'compliance_officer', animated: true },
  ];

  // Step-by-step movement logic
  const retailMovementSequence = [
    { label: 'Returns Manager reviews returns', focus: 'Handle returns', suggestion: 'Align return counters' },
    { label: 'Product Specialist checks inventory', focus: 'Check inventory', suggestion: 'Restock popular items' },
    { label: 'Order Fulfillment prepares orders', focus: 'Prepare orders', suggestion: 'Stagger shifts' },
    { label: 'Marketing launches promotion', focus: 'Promote event', suggestion: 'Targeted promos' },
    { label: 'Ecommerce Manager updates site', focus: 'Update site', suggestion: 'Highlight offers' },
    { label: 'Customer Service prepares', focus: 'Prepare support', suggestion: 'Canned responses' },
    { label: 'Inventory Manager plans stock', focus: 'Plan stock', suggestion: 'Pre-stock SKUs' },
    { label: 'Warehouse Manager coordinates', focus: 'Coordinate warehouse', suggestion: 'Schedule docks' },
    { label: 'Merchandising Manager sets displays', focus: 'Set displays', suggestion: 'Deploy pop-ups' },
    { label: 'Logistics Coordinator finalizes routes', focus: 'Finalize routes', suggestion: 'Last-mile delivery' },
  ];
  const insuranceMovementSequence = [
    { label: 'Legal Counsel reviews claim', focus: 'Ensure legal and regulatory compliance for the claim.', suggestion: 'Verify all legal documents and compliance requirements are met.' },
    { label: 'Claims Adjuster inspects', focus: 'Assess claim validity and investigate damages.', suggestion: 'Conduct site visit and collect photo evidence.' },
    { label: 'Claims Supervisor approves', focus: 'Review adjuster findings and approve valid claims.', suggestion: 'Cross-check adjuster report and approve for next step.' },
    { label: 'Senior Claims Manager oversees', focus: 'Manage escalated or high-value claims.', suggestion: 'Resolve escalations and allocate resources as needed.' },
    { label: 'Risk Manager evaluates', focus: 'Evaluate risk exposure and recommend mitigation.', suggestion: 'Analyze risk factors and suggest reinsurance if needed.' },
    { label: 'Underwriter calculates', focus: 'Reassess underwriting for policy impact.', suggestion: 'Adjust policy terms or premiums based on claim outcome.' },
    { label: 'Actuarial Analyst analyzes', focus: 'Analyze claim data for trends and reserves.', suggestion: 'Update loss models and reserve requirements.' },
    { label: 'Customer Service Rep assists', focus: 'Guide customer through claim process.', suggestion: 'Provide regular updates and answer customer questions.' },
    { label: 'Policy Admin Coordinator updates', focus: 'Update policy records post-claim.', suggestion: 'Ensure all policy changes are recorded accurately.' },
    { label: 'Compliance Officer audits', focus: 'Audit the entire claim process for compliance.', suggestion: 'Document the process and prepare for regulatory review.' },
  ];

  const nodes = domain === 'insurance' ? insuranceNodes : retailNodes;
  const allEdges = domain === 'insurance' ? insuranceEdges : retailEdges;
  const movementSequence = domain === 'insurance' ? insuranceMovementSequence : retailMovementSequence;
  const [step, setStep] = useState(0);
  useEffect(() => { setStep(0); }, [domain]);

  // Animated edge for current step
  const animatedEdge = (() => {
    if (step < allEdges.length) {
      const edge = { ...allEdges[step], animated: true, style: { stroke: '#ff9800', strokeWidth: 4 }, label: 'Movement', labelStyle: { fill: '#ff9800', fontWeight: 700 } };
      return edge;
    }
    return null;
  })();
  const fadedEdges = allEdges.map((edge, i) => {
    if (animatedEdge && edge.id === animatedEdge.id) return null;
    return { ...edge, animated: false, style: { stroke: '#aaa', strokeDasharray: '4 2', opacity: 0.2 } };
  }).filter(Boolean);
  const edges = animatedEdge ? [animatedEdge, ...fadedEdges] : fadedEdges;

  return (
    <>
      <div style={{ height: 480, width: '100%', background: '#181c20', borderRadius: 8, position: 'relative', paddingBottom: 60 }}>
        <ReactFlow nodes={nodes} edges={edges} fitView attributionPosition={null} proOptions={{ hideAttribution: true }}>
          <Controls />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
        <button
          onClick={() => setStep((prev) => (prev + 1 < movementSequence.length ? prev + 1 : 0))}
          style={{ position: 'absolute', right: 16, bottom: 16, padding: '10px 22px', borderRadius: 6, background: '#ff9800', color: '#222', border: 'none', fontWeight: 700, fontSize: 18, boxShadow: '0 2px 8px #0004', cursor: 'pointer' }}
        >
          {step + 1 < movementSequence.length ? 'Next' : 'Restart'}
        </button>
        <div style={{ position: 'absolute', left: 16, bottom: 16, color: '#fff', fontSize: 16 }}>
          Step {step + 1} of {movementSequence.length}
        </div>
      </div>
      <div style={{ marginTop: 24, padding: 16, background: '#23272b', borderRadius: 8, color: '#b6e41c', fontSize: 20, minHeight: 48, fontWeight: 700, textAlign: 'center' }}>
        Agent Suggestions
        {movementSequence[step] ? (
          <ul style={{ margin: '16px 0 0 0', padding: 0, listStyle: 'none', color: '#ffe082', fontSize: 18, fontWeight: 400 }}>
            <li><strong>Focus:</strong> {movementSequence[step].focus}</li>
            <li><strong>Suggestion:</strong> {movementSequence[step].suggestion}</li>
          </ul>
        ) : 'No more agent suggestions for this scenario.'}
      </div>
    </>
  );
};

export default AgentNetwork;
