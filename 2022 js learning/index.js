import express from 'express';
const app = express();
const PORT = 3000;

app.use(express.static('pub'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/mai', (req, res) => {
    res.sendFile('./pub/mediaExpertDataFile.txt');
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));
