import express from 'express';
import cors from 'cors';
import chatRouter from './src/chatRouter.js';

const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from the chat app backend! Jason');
});
app.use('/api', chatRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
//curl -i -X POST http://localhost:3000/api/chat -H "Content-Type: application/json" -d '{"message":"Hello, how are you? I am Jason"}'