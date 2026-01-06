import React, { useEffect, useState } from 'react';
import TributeCard from './TributeCard';

export default function TributeList() {
  const [tributes, setTributes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tributes')
      .then((res) => res.json())
      .then((data) => setTributes(data))
      .catch((err) => console.error('Failed to fetch tributes:', err));
  }, []);

  return (
    <div>
      <h2>Total tributes: {tributes.length}</h2>
      {tributes.map((tribute) => (
        <TributeCard key={tribute._id} tribute={tribute} />
      ))}
    </div>
  );
}
