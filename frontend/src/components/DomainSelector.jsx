import React from "react";

const domains = [
  { key: "retail", label: "Retail" },
  { key: "insurance", label: "Insurance" },
  { key: "test", label: "Test" }
];

export function DomainSelector({ selectedDomain, onSelect }) {
  return (
    <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
      {domains.map(domain => (
        <button
          key={domain.key}
          onClick={() => onSelect(domain.key)}
          style={{
            padding: "8px 22px",
            fontWeight: 600,
            borderRadius: 8,
            border: selectedDomain === domain.key ? "2px solid #1976d2" : "1px solid #ccc",
            background: selectedDomain === domain.key ? "#e3f2fd" : "#fff",
            color: selectedDomain === domain.key ? "#1976d2" : "#222",
            cursor: "pointer"
          }}
        >
          {domain.label}
        </button>
      ))}
    </div>
  );
}
