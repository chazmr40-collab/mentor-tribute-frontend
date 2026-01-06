// submit-tribute.js
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('tributeForm');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
      mentee: document.getElementById('mentee').value.trim(),
      mentor: document.getElementById('mentor').value.trim(),
      location: document.getElementById('location').value.trim(),
      message: document.getElementById('message').value.trim()
    };
    if(!payload.mentee || !payload.mentor || !payload.message){
      alert('Please complete mentee, mentor, and message.');
      return;
    }
    try {
      const res = await fetch('/api/tributes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const txt = await res.text();
        console.error('Server error', res.status, txt);
        alert('Server rejected submission.');
        return;
      }
      await res.json();
      form.reset();
      alert('Tribute submitted successfully.');
    } catch (err) {
      console.error('Network/CORS error', err);
      alert('Network error. Make sure the server is running and CORS is enabled.');
    }
  });
});
