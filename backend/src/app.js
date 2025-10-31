import express from 'express';
import cors from 'cors';
import ExperiencRoutes from './routes/ExperienceRoutes.js';
import BookingRoutes from './routes/BookingRoutes.js';
import PromoRoutes from './routes/PromoRoutes.js';
import CheckoutRoutes from './routes/CheckoutRoutes.js';

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api/experiences', ExperiencRoutes);
app.use('/api/bookings', BookingRoutes);
app.use('/api/promo', PromoRoutes);
app.use('/api/checkout', CheckoutRoutes);


app.get('/', (req,res)=>{
    res.send('BookIt API is running...');
})


export default app;