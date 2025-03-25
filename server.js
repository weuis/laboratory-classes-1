// 📦 Musisz zaimportować tutaj moduł 'http'.
// 📦 Żeby użyć tutaj PORT, musisz zaimportować go z modułu konfiguracyjnego z pliku 'config.js'.
// 📦 Zaimportuj funkcję 'requestRouting' z modułu 'routing/routing.js'.

// 🏗 Tutaj, stwórz funkcję 'requestListener, która przekazuje 'request' i 'response' do 'requestRouting'.

// 🏗 Tutaj, stwóz serwer Node.js. Pamiętaj przypisać go do stałej i przekazać mu 'requestListener'.

// 🏗 Uruchom serwer na porcie PORT.
// Podpowiedź: server.listen(???);/*
const http = require('http');
const config = require('./config');
const requestRouting = require('./routing/routing');

const requestListener = (req, res) => {
    requestRouting(req, res);
};

const server = http.createServer(requestListener);

server.listen(config.PORT, () => {
    console.log(`Serwer działa na porcie ${config.PORT}`);
});

/**/