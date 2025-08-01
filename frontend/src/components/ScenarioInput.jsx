import React, { useState } from 'react';

const retailDemoQuestions = [
  "How should we handle returns efficiently to maintain customer satisfaction during a sales event?",
  "What can we do to optimize product placements and ensure popular items are well-stocked?",
  "How can we optimize stock levels and logistics for efficient delivery during high demand?",
  "What strategies can enhance customer experience and manage in-store promotions?",
  "How can we improve online and in-store digital experiences for an upcoming holiday?",
  "What information do you need to tailor recommendations for a 31% sales bump?",
  "How should we prepare staff schedules for President’s Day weekend?",
  "What are the expected return volumes and how should we adjust return policies?",
  "How can we use historical sales data to improve inventory management for special events?",
  "What promotions should be planned to maximize sales during peak periods?"
];

const insuranceDemoQuestions = [
  "How can we streamline the claims approval process for faster settlements?",
  "What steps can reduce fraud risk in insurance claims?",
  "How should we prioritize claim investigations after a major storm?",
  "What data is most important for accurate risk assessment in new policies?",
  "How can we improve customer communication during the claims lifecycle?",
  "What are the best practices for compliance with new insurance regulations?",
  "How do we optimize reinsurance strategies for catastrophic events?",
  "What digital tools can enhance the customer experience for policyholders?",
  "How can we automate routine policy administration tasks?",
  "What metrics should we track to improve loss ratios?"
];

const ScenarioInput = ({ onSubmit, domain }) => {
  const demoQuestions = domain === 'insurance' ? insuranceDemoQuestions : retailDemoQuestions;
  const [scenario, setScenario] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (scenario.trim()) {
      onSubmit(scenario);
      setScenario('');
    }
  };

  const handleSelect = (e) => {
    const value = e.target.value;
    if (value) {
      onSubmit(value);
      setScenario(''); // Clear input after demo question submit
      e.target.selectedIndex = 0; // Reset dropdown
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 14, marginBottom: 24, width: '100%' }}>
      <select
        onChange={handleSelect}
        style={{ padding: 12, borderRadius: 8, border: '1.5px solid #444', background: '#23272b', color: '#ffe082', minWidth: 340, fontSize: 15, boxShadow: '0 2px 8px #0002' }}
        defaultValue=""
      >
        <option value="" disabled>Select a demo scenario...</option>
        {demoQuestions.map((q, i) => (
          <option key={i} value={q}>{q}</option>
        ))}
      </select>
      <input
        type="text"
        value={scenario}
        onChange={e => setScenario(e.target.value)}
        placeholder="Or type your own scenario..."
        style={{ flex: 1, padding: 12, borderRadius: 8, border: '1.5px solid #444', background: '#23272b', color: '#fff', fontSize: 15, boxShadow: '0 2px 8px #0002' }}
      />
      <button type="submit" style={{ padding: '12px 24px', borderRadius: 8, background: 'linear-gradient(90deg, #1976d2, #b6e41c)', color: '#222', border: 'none', fontWeight: 700, fontSize: 15, boxShadow: '0 2px 8px #0002', transition: 'background 0.2s' }}>Send</button>
    </form>
  );
};

export default ScenarioInput;
