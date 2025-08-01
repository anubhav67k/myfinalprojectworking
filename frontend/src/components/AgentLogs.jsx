import React from 'react';

const AgentLogs = ({ logs }) => (
  <div style={{ margin: '24px 0', background: '#1e2329', borderRadius: 8, padding: 16 }}>
    <h3 style={{ color: '#b6e41c', marginBottom: 12, textAlign: 'center', textShadow: '0 2px 8px #222' }}>Agent Suggestions</h3>
    {logs && logs.length > 0 ? (
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {logs.map((log, idx) => (
          <li key={idx} style={{ marginBottom: 16, padding: 8, borderBottom: '1px solid #222' }}>
            <div style={{ fontWeight: 700, color: '#ffe082', marginBottom: 4 }}>{log.agent}:</div>
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              <li><strong>Focus:</strong> {log.focus}</li>
              <li><strong>Needs:</strong> {log.needs}</li>
            </ul>
          </li>
        ))}
      </ul>
    ) : (
      <div style={{ color: '#aaa' }}>No agent actions yet. Submit a scenario!</div>
    )}
  </div>
);

export default AgentLogs;
