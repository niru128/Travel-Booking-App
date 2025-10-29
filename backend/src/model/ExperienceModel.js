import mongoose from 'mongoose';   

const experienceSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required: true
    },
    description : {
        type : String,
        required : true
    },
    pricePerPerson : {
        type : Number,
        required : true
    },
    availableSlots : [
        {
            date : String,
            times : [
                {
                    time : String,
                    isBooked : {
                        type : Boolean,
                        default : false,
                    }
                }
            ]
        }
    ]
})

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;