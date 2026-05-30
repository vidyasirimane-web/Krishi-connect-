import fetch from 'node-fetch';

const base64Data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

fetch('http://localhost:5000/api/detect-crop', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ image: base64Data })
})
.then(r => {
  console.log('Status:', r.status);
  return r.json();
})
.then(d => {
  console.log('Response:', JSON.stringify(d, null, 2));
})
.catch(e => console.error('Error:', e.message));
