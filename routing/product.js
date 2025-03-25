const fs = require('fs');
const { STATUS_CODE } = require('../constants/statusCode');

const productRouting = (req, res) => {
    if (req.url === '/product/add' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <html lang="en">
                <head><title>Shop - Add product</title></head>
                <body>
                    <h1>Add product</h1>
                    <form method="POST" action="/product/add">
                        <input type="text" name="name" placeholder="Product Name" required>
                        <input type="text" name="description" placeholder="Description" required>
                        <button type="submit">Add</button>
                    </form>
                    <nav>
                        <a href="/">Home</a>
                        <a href="/product/new">Newest product</a>
                        <a href="/logout">Logout</a>
                    </nav>
                </body>
            </html>
        `);
    } else if (req.url === '/product/add' && req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            const data = new URLSearchParams(body);
            const product = `Name: ${data.get('name')}, Description: ${data.get('description')}\n`;

            fs.writeFileSync('product.txt', product);
            res.writeHead(STATUS_CODE.FOUND, { Location: '/product/new' });
            res.end();
        });
    } else if (req.url === '/product/new' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        let productData;
        try {
            productData = fs.readFileSync('product.txt', 'utf8');
        } catch (err) {
            productData = 'No products avai/**/lable';
        }

        res.end(`
            <html lang="en">
                <head><title>Shop - Newest product</title></head>
                <body>
                    <h1>Newest product</h1>
                    <p>${productData}</p>
                    <nav>
                        <a href="/">Home</a>
                        <a href="/product/add">Add product</a>
                        <a href="/logout">Logout</a>
                    </nav>
                </body>
            </html>
        `);
    } else {
        console.log(`ERROR: requested url ${req.url} doesn’t exist`);
        res.writeHead(STATUS_CODE.NOT_FOUND, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Not Found</h1>');
    }
};

module.exports = productRouting;
