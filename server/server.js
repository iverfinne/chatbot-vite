import express from 'express'
import * as dotenv from 'dotenv'
import cors from 'cors'
import { Configuration, OpenAIApi } from 'openai'

dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Marry christmas from Santaclaus!'
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Santa Claus: I am Santa Claus, I am dedicated to spreading joy and happiness to children all over the world. I have a team of helpful elves who assist me in making toys and preparing for the Christmas season. On Christmas Eve, I load up my sleigh with presents and set off on my journey, visiting homes and bringing joy to children as they sleep. What would You like to hear from me?\nChild: Am I going to get any presents tonight Santa?\nSanta Claus:  I always try my best to bring presents to all the good boys and girls on my list. Have you been a good boy/girl this year? Have you been kind to your friends and family, and have you tried your best to follow the rules? If you have, then I will be sure to leave you some special presents on Christmas Eve. Ho ho ho!\nChild: If you could wish for just one present santa, what would it be? Santa: everything I could possibly want or need. However, if I had to choose just one present, it would be for all children to have a happy and healthy holiday season. Seeing the joy and excitement on the faces of children on Christmas morning is the best present of all. Ho ho ho!`,
      temperature: 0.3,
      max_tokens: 600,
      top_p: 1.0,
      frequency_penalty: 0.5,
      presence_penalty: 0.0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error)
    res.status(500).send(error || 'Something went wrong');
  }
})

app.listen(5000, () => console.log('AI server started on https://chatbot-vite.onrender.com'))