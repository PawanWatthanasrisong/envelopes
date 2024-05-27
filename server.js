
const express = require('express');
const app = express();
const PORT = 3000;
const envelopeRouter = express.Router();
const envelopes = [
    { id: 1, budget: 1000, title: "Pawan" },
    { id: 2, budget: 200, title: "Wat" }
];

app.use(express.json());
app.use('/envelopes', envelopeRouter);

app.param('id', (req, res, next, id) => {
    const envelope = envelopes.find(envelop => envelop.id == parseInt(id));
    if (envelope) {
        req.envelope = envelope;
        req.index = envelopes.findIndex(envelop => envelop.id == parseInt(id));
        next();
    } else {
        res.status(404).send("Not found");
    }
});

// Define routes before starting the server
app.get('/', (req, res) => {
    console.log('Hello, World');
    res.send('<script>alert("Hello World");</script>hello world');
});

envelopeRouter.get('/', (req, res) => {
    res.json(envelopes);
});

const defineEnvelope = (req, res, next) => {
    req.envelopeId = req.body.id;
    req.envelopeBudget = req.body.budget;
    req.envelopeTitle = req.body.title;
    next();
};

envelopeRouter.post('/', defineEnvelope, (req, res) => {
    if (req.envelopeId && req.envelopeBudget && req.envelopeTitle) {
        const newEnvelope = {
            id: req.envelopeId,
            budget: req.envelopeBudget,
            title: req.envelopeTitle
        };
        envelopes.push(newEnvelope);
        res.status(201).json(newEnvelope);
    } else {
        res.status(400).json({ message: "Invalid input" });
    }
});

envelopeRouter.get('/:id', (req, res) => {
    res.json(req.envelope);
});

envelopeRouter.put('/:id', (req, res) => {
    const { budget, title } = req.body;
    if (budget !== undefined) req.envelope.budget = budget;
    if (title !== undefined) req.envelope.title = title;
    res.json(req.envelope);
});

envelopeRouter.delete('/:id', (req, res) => {
    envelopes.splice(req.index, 1);
    res.status(200).json({ message: "Envelope deleted", envelopes });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});