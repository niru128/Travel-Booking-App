import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    experience : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Experience',
        required : true
    },
    user: {
        type : String,
        required : true
    },
    numberOfPeople : {
        type : Number,
        required : true
    },
    date : {
        type : String,
        required : true
    },
    totalPrice : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ['pending', 'confirmed', 'cancelled'],
        default : 'pending'
    }
},{ timestamps : true });

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;