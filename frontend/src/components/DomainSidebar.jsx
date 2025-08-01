import React, { useState } from 'react';

const domains = [
  { key: 'retail', label: 'Retail' },
  { key: 'insurance', label: 'Insurance' }
];

const DomainSidebar = ({ selectedDomain, onSelect }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        width: hovered ? 160 : 44,
        background: '#181c20',
        color: '#b6e41c',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: hovered ? 'flex-start' : 'center',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 20,
        cursor: 'pointer',
        borderRight: '2px solid #23272b',
        boxShadow: '2px 0 8px #0004',
        transition: 'width 0.22s cubic-bezier(.4,2,.6,1)',
        paddingTop: hovered ? 32 : 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title="Show domains"
    >
      {!hovered && (
        <span style={{ writingMode: 'vertical-rl', fontWeight: 700, fontSize: 18, letterSpacing: 2, userSelect: 'none', marginTop: 0 }}>
          Domains
        </span>
      )}
      {hovered && (
        <>
          <div style={{ width: '100%', textAlign: 'center', fontWeight: 800, fontSize: 20, color: '#b6e41c', letterSpacing: 1, marginBottom: 18, marginTop: 0, transition: 'all 0.2s' }}>
            Domains
          </div>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            {domains.map(domain => (
              <button
                key={domain.key}
                onClick={() => { onSelect(domain.key); setHovered(false); }}
                style={{
                  marginBottom: 6,
                  width: 110,
                  padding: '10px 0',
                  borderRadius: 6,
                  border: 'none',
                  background: selectedDomain === domain.key ? '#b6e41c' : '#23272b',
                  color: selectedDomain === domain.key ? '#222' : '#ffe082',
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: 'pointer',
                  boxShadow: selectedDomain === domain.key ? '0 2px 8px #b6e41c44' : undefined,
                  transition: 'background 0.2s, color 0.2s',
                }}
              >
                {domain.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DomainSidebar;
