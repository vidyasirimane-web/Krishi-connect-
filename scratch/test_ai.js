import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const key = process.env.GEMINI_API_KEY;
console.log('Using Key:', key);

const base64Data = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
const mimeType = 'image/png';

const payload = {
  contents: [{
    parts: [
      { text: "Identify the agricultural product in the uploaded image. Return a JSON object with exactly these fields: \"name\": string (product name), \"quality\": string (e.g., A+, A, B), \"health\": string (e.g., N/A, Good), \"suggested_price\": number (INR per kg). Return ONLY the JSON object, no extra text." },
      { inline_data: { mime_type: mimeType, data: base64Data } }
    ]
  }]
};

fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload)
})
.then(r => r.json())
.then(d => {
  if (d.error) {
    console.log('ERROR:', JSON.stringify(d.error, null, 2));
  } else {
    console.log('SUCCESS:', JSON.stringify(d, null, 2));
  }
})
.catch(e => console.log('FETCH ERROR:', e.message));
