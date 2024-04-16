const mongoose=require("mongoose");

const Schema=mongoose.Schema;

const workoutSchema=new Schema({

    name:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    }
})

const Workout=mongoose.model("Workout",workoutSchema);

module.exports=Workout;

