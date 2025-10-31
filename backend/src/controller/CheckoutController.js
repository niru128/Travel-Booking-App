import User from "../model/UserModel.js";
import Experience from "../model/ExperienceModel.js";
import Booking from "../model/BookingModel.js";

export const checkout = async (req, res) => {
    try {

        const { name, email, experienceId, date, promoCode, acceptTerms, people, totalAmount } = req.body;
        console.log("Check out request body Id:" ,experienceId);

        if (!acceptTerms) {
            return res.status(400).json({ message: 'Terms and conditions must be accepted' });
        }

        if (!name || !email) {
            return res.status(400).json({ message: 'Name and Email are required' });
        }

        const experience = await Experience.findById(experienceId);
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }
        
        const promos = {
            "SAVE10": { type: "percent", value: 10 },
            "FLAT100": { type: "flat", value: 100 }
        };
        
        const promo = promos[promoCode];
        let totalPrice = experience.pricePerPerson * people + 59; 

        if (promo) {
            const discount =
                promo.type === "percent"
                    ? (promo.value / 100) * totalPrice
                    : promo.value;
            totalPrice = Math.max(0, totalPrice - discount);
        }

        //creating user
        const user = await User.findOne({email});
        if(!user){
            user = await User.create({name, email});
        }

        //create booking
        const booking = await Booking.create({
            experience: experienceId,
            user: user._id,
            numberOfPeople: people,
            date,
            totalPrice,
            status: 'confirmed'
        })

        res.status(200).json({
            success: true,
            message : "Booking Confirmed",
            bookingId : booking._id,
            totalPrice
        })

    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}