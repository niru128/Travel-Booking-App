import express from 'express';
import cors from 'cors';
import ExperiencRoutes from './routes/ExperienceRoutes.js';

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api/experiences', ExperiencRoutes);


app.get('/', (req,res)=>{
    res.send('BookIt API is running...');
})


export default app;