import express from 'express';
import bmiCalculator from './bmiCalculator';

const app = express();

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/bmi', (req, res) => {
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);
    if(!isNaN(height) && !isNaN(weight)) {
        const responseObject = {
            weight,
            height,
            bmi: bmiCalculator(height, weight)
        };
        res.send(responseObject);
    }
    res.status(400).send({error: 'Malformatted parameters'});
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
