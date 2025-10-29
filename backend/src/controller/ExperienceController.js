import Experience from "../model/ExperienceModel.js";

export const getAllExperiences =  async (req , res)=>{
    try{

        const response  = await Experience.find();
        res.status(200).json(response);
    }catch(error){
        res.status(500).json({message : "Server Error"});
    }
}

export const getExperiencById = async (req,res)=>{
    try{
        const response = await Experience.findById(req.params.id);
        if(!response){
            return res.status(404).json({message : "Experience Not Found"});
        }

        res.status(200).json(response);
    }catch(err){
        res.status(500).json({message : "Server Error"});
    }
}