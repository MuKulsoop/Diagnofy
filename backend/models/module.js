import mongoose, { mongo } from "mongoose";


const moduleSchema = new mongoose.Schema({

    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

   name: {
         type: String,
        required: true
    },

  description: { type: String, required: true },               
          
  cases: { type: Number, default: 0 },             
  progress: { type: Number, default: 0, min: 0, max: 100 }, 
  difficulty: { 
    type: String, 
    enum: ["Beginner", "Intermediate", "Advanced"], 
    required: true 
  },
  rating: { type: Number, default: 0, min: 0, max: 5 },
       

},{timestamps: true})

export const Module = mongoose.model("Module", moduleSchema);
