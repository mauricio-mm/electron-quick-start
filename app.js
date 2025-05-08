const express = require('express');
const path = require('path');
const app = express();

// Serve arquivos da raiz do projeto, incluindo chart.min.js
app.use(express.static(path.join(__dirname))); 
app.use('/chart.js', express.static(__dirname + '/node_modules/chart.js/dist'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
});
