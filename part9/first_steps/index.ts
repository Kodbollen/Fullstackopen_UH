import express from 'express';
import bmiCalculator from './bmiCalculator';
import exerciseCalculator from './exerciseCalculator';
const app = express();
app.use(express.json());

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

app.post('/exercises', (req, res) => {
    const exerciseHistory = req.body.daily_exercises;
    const target = req.body.target;
    if(!exerciseHistory || !target) {
        res.status(400).send({error: 'Parameters missing'});
    }
    if(typeof (exerciseHistory) !== "object"
        || typeof (target) !== "number"
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        || !exerciseHistory.every((x: any) => typeof (x) === "number")
    ) {
        res.status(400).send({error: 'Malformatted parameters'});
    }
    res.send(exerciseCalculator(exerciseHistory, target));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
