const http = require('http');
const fs = require('fs');
const path = require('path');

const FILE_PATH = '/root/.openclaw/workspace/memory/jacked-subscribers.json';

const server = http.createServer(async (req, res) => {
  if (req.method === 'POST' && req.url === '/api/subscribe') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { email } = JSON.parse(body);
        if (!email || !email.includes('@')) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Valid email required' }));
          return;
        }
        
        let subscribers = [];
        if (fs.existsSync(FILE_PATH)) {
          try { subscribers = JSON.parse(fs.readFileSync(FILE_PATH)); } 
          catch (e) { subscribers = []; }
        }
        
        if (subscribers.find(s => s.email === email)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Already subscribed!' }));
          return;
        }
        
        subscribers.push({ email, subscribedAt: new Date().toISOString() });
        fs.writeFileSync(FILE_PATH, JSON.stringify(subscribers, null, 2));
        
        console.log(`[JACKED] New subscriber: ${email}`);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Server error' }));
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
});

const PORT = 3456;
server.listen(PORT, () => console.log(`[JACKED] Subscriber server running on ${PORT}`));
