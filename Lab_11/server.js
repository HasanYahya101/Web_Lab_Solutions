import { EventEmitter } from 'events';
import { fileURLToPath } from 'url';
import http from 'http';
import fs from 'fs';
import path from 'path';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const secretsPath = path.join(dirname, 'jerry_secrets.txt');

const events = new EventEmitter();

events.on('secretSaved', () => {
    console.log('Jerry has saved a new secret!');
});

events.on('secretsRead', () => {
    console.log('Jerry is reading his secrets!');
});

const server = http.createServer((req, res) => {
    const { url, method } = req;

    if (url === '/jerry' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
      <h1>Jerry's Secret Message</h1>
      <form method="POST" action="/save-message">
        <textarea name="msg" style="min-width='20vw';" placeholder="Write a secret about Tom..."></textarea><br>
        <button type="submit">Send Secret</button>
      </form>
    `);
    }
    else if (url === '/save-message' && method === 'POST') {
        let body = '';

        req.on('data', (chunk) => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const msg = new URLSearchParams(body).get('msg');
            const time = new Date().toISOString();
            const secret = `[${time}] ${msg}\n\n`;

            fs.access(secretsPath, fs.constants.F_OK, (err) => {
                if (err) {
                    fs.writeFile(secretsPath, secret, (err) => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/html' });
                            res.end('<h1>Error saving your secret!</h1>');
                            return;
                        }

                        events.emit('secretSaved');

                        res.writeHead(302, { 'Location': '/jerry' });
                        res.end();
                    });
                } else {
                    fs.appendFile(secretsPath, secret, (err) => {
                        if (err) {
                            res.writeHead(500, { 'Content-Type': 'text/html' });
                            res.end('<h1>Error saving your secret!</h1>');
                            return;
                        }

                        events.emit('secretSaved');

                        res.writeHead(302, { 'Location': '/jerry' });
                        res.end();
                    });
                }
            });
        });
    }
    else if (url === '/read-messages' && method === 'GET') {
        fs.access(secretsPath, fs.constants.F_OK, (err) => {
            if (err) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end('<h1>No secrets saved yet!</h1>');
                return;
            }

            events.emit('secretsRead');

            fs.readFile(secretsPath, (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/html' });
                    res.end('<h1>Error reading secrets!</h1>');
                    return;
                }

                const fileSize = Buffer.byteLength(data);
                const secretCount = data.toString().split('\n\n').filter(Boolean).length;

                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(`
          <h1>Jerry's Secrets</h1>
          <p>File size: ${fileSize} bytes</p>
          <p>Number of secrets: ${secretCount}</p>
          <h2>All Secrets:</h2>
          <pre>
        `);

                const stream = fs.createReadStream(secretsPath);

                stream.on('data', (chunk) => {
                    const chunkSize = Buffer.byteLength(chunk);
                    console.log(`Streaming chunk of size: ${chunkSize} bytes`);
                    res.write(chunk);
                });

                stream.on('end', () => {
                    res.write('</pre>');
                    res.end();
                });

                stream.on('error', (error) => {
                    res.write('</pre><p>Error reading stream!</p>');
                    res.end();
                });
            });
        });
    }
    else if (url === '/tom' && method === 'GET') {
        res.writeHead(403, { 'Content-Type': 'text/html' });
        res.end(`
      <h1>Access Denied!</h1>
      <p>Sorry Tom, you are not allowed to view Jerry's secret messages.</p>
    `);
    }
    else if (url === '/' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
      <h1>Jerry & Tom Server</h1>
      <ul>
        <li><a href="/jerry">Jerry's Secret Message Form</a></li>
        <li><a href="/read-messages">Read Jerry's Secrets</a></li>
        <li><a href="/tom">Tom's Page</a></li>
      </ul>
    `);
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1>');
    }
});

server.listen(3000, () => {
    console.log(`Server running at http://localhost:3000/`);
});

fs.writeFile(secretsPath, '[2023-05-05T09:07:20.000Z] Tom always sleeps with a teddy bear!\n\n', (err) => { // initial secret
    if (err) {
        console.error('Error creating test secret:', err);
    } else {
        console.log('Test secret created!');
    }
});

console.log('Server is ready! Visit http://localhost:3000/');
