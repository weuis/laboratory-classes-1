const homeRouting = require('./home');
const productRouting = require('./product');
const logoutRouting = require('./logout');
const { STATUS_CODE } = require('../constants/statusCode');

const requestRouting = (req, res) => {
    const date = new Date().toISOString();
    console.log(`INFO [${date}]: ${req.method} - ${req.url}`);

    if (req.url === '/' && req.method === 'GET') {
        homeRouting(req.method, res);
    } else if (req.url.startsWith('/product')) {
        productRouting(req, res);
    } else if (req.url === '/logout' && req.method === 'GET') {
        logoutRouting(req.method, res);
    } else if (req.url === '/kill' && req.method === 'GET') {
        console.log(`PROCESS [${date}]: logout has been initiated and the application will be closed`);
        process.exit();
    } else {
        console.log(`ERROR [${date}]: requested url ${req.url} doesn’t exist`);
        res.writeHead(STATUS_CODE.NOT_FOUND, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Not Found</h1>');
    }
};

module.exports = requestRouting;
