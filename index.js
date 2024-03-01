const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();

const openai = new OpenAI(process.env.api_key);

app.use(bodyParser.json());

app.post('/receiver', async (req, res) => {
    try {
        const userMessage = req.body.text;
        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: userMessage }],
            model: "gpt-3.5-turbo",
        });
        const gptAnswer = completion.data.choices[0].message.content;
        res.json({ answer: gptAnswer });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
