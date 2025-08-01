import React from 'react';

const demoQuestions = [
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

const DemoQuestions = ({ onSelect }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ fontWeight: 700, color: '#90caf9', marginBottom: 8 }}>Demo Questions:</div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {demoQuestions.map((q, i) => (
        <button
          key={i}
          onClick={() => onSelect(q)}
          style={{
            background: '#23272b',
            color: '#ffe082',
            border: '1px solid #333',
            borderRadius: 6,
            padding: '8px 14px',
            cursor: 'pointer',
            fontWeight: 500,
            fontSize: 14,
            transition: 'background 0.2s',
          }}
        >
          {q}
        </button>
      ))}
    </div>
  </div>
);

export default DemoQuestions;
