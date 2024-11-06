import express from 'express'
const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/ping', (req, res) => {
    console.log('ping');
    res.send('pong');
})

app.listen(PORT, (  ) => {
    console.log(`Server is running at http://localhost:${PORT}`);
})