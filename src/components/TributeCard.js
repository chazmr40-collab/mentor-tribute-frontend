import React from 'react';

export default function TributeCard({ tribute, onDelete }) {
  if (!tribute || typeof tribute !== 'object') return null;

  const safeDate = tribute.createdAt
    ? new Date(tribute.createdAt).toLocaleDateString()
    : 'Unknown date';

  return (
    <div className="tribute-card">
      <h3>{tribute.mentor || 'Unknown mentor'}</h3>
      <p><strong>From:</strong> {tribute.mentee || 'Anonymous'}</p>
      <p><strong>Location:</strong> {tribute.location || '—'}</p>
      <p>{tribute.message || ''}</p>
      <p><em>{safeDate}</em></p>
      <button onClick={() => onDelete(tribute._id)}>🗑️ Delete</button>
    </div>
  );
}
