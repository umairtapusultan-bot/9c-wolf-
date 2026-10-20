const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Chat API
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: message }],
    });
    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    res.status(500).json({ error: 'Koi masla ho gaya hai.' });
  }
});

// Image API
app.post('/api/image', async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });
    res.json({ imageUrl: response.data[0].url });
  } catch (error) {
    res.status(500).json({ error: 'Tasweer nahi ban saki.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`9c-wolf server chal raha hai port ${PORT} par`));
