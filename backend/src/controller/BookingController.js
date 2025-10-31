import Booking from "../model/BookingModel.js";
import Experience from "../model/ExperienceModel.js";


//create a booking
export const createBooking  = async (req, res)=>{
    try{
        const { experienceId, user, numberOfPeople, date} = req.body;

        const experience = await Experience.findById(experienceId);
        if(!experience){
            return  res.status(404).json({message : 'Experience not found'});
        }

        const totalPrice = experience.pricePerPerson * numberOfPeople;

        const booking = new Booking({
            experience : experienceId,
            user,
            numberOfPeople,
            date,
            totalPrice
        });

        booking.save();

        res.status(201).json({msg : 'Booking created successfully', booking  });
    }catch(error){
        res.status(500).json({message : 'Server Error'});
    }
}

//get all bookings

export const getAllBookings = async (req,res)=>{
    try{
        const bookings = await Booking.find().populate('experience');
        res.status(200).json(bookings);
    }catch(error){
        res.status(500).json({message : 'Server Error'});
    }
}

//update booking status
export const updateBookingStatus = async (req,res)=>{
    try{

        const {id} = req.params;
        const { status } = req.body;

        const booking = await Booking.findByIdAndUpdate(id, {status} , {new : true});
        if(!booking){
            return res.status(404).json({message : 'Booking not found'});
        }

        res.status(200).json({msg : 'Booking status updated successfully', booking});

    }catch(error){
        res.status(500).json({message : 'Server Error'});
    }
}