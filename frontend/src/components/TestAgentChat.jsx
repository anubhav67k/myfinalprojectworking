import React, { useState } from 'react';
import axios from 'axios';

export default function TestAgentChat() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');
    try {
      const res = await axios.post('/chat', { question: input });
      setResponse(res.data.text || JSON.stringify(res.data));
    } catch (err) {
      setResponse('Error: ' + (err.response?.data?.error || err.message));
    }
    setLoading(false);
  };

  return (
    <div style={{ margin: 40, maxWidth: 600 }}>
      <h2>Test Agent (Direct AI Foundry Revert)</h2>
      <form onSubmit={handleSend} style={{ display: 'flex', gap: 8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type your message to the agent..."
          style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '8px 20px' }}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
      {response && (
        <div style={{ marginTop: 20, padding: 16, background: '#f7f7f7', borderRadius: 6 }}>
          <strong>Agent Response:</strong>
          <div>{response}</div>
        </div>
      )}
    </div>
  );
}
