import React, { useState } from 'react';
import axios from 'axios';

const RedactionLevel = ({ fileId }) => {
  const [level, setLevel] = useState('');

  const handleRedact = async () => {
    try {
      const res = await axios.post('/api/redact/redact', { fileId, level }, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
        },
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <input type="text" value={level} onChange={(e) => setLevel(e.target.value)} placeholder="Redaction Level" />
      <button onClick={handleRedact}>Redact</button>
    </div>
  );
};

export default RedactionLevel;
