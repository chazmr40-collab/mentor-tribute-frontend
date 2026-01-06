import React, { useState, useEffect } from 'react';
import TributeForm from './TributeForm';
import TributeCard from './components/TributeCard';

function App() {
  const [tributes, setTributes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tributes')
      .then(res => res.json())
      .then(data => setTributes(data));
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this tribute?');
    if (!confirmed) return;

    try {
      const res = await fetch(`http://localhost:5000/api/tributes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'admin-secret-token',
        },
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Tribute deleted');
        setTributes(prev => prev.filter(t => t._id !== id));
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert('❌ Failed to delete tribute.');
    }
  };

  return (
    <div className="App">
      <h1>Mentor Tribute Platform</h1>
      <TributeForm />
      <p>Total tributes: {tributes.length}</p>

      {tributes.map(t => (
        <TributeCard key={t._id} tribute={t} onDelete={handleDelete} />
      ))}
    </div>
  );
}

export default App;
