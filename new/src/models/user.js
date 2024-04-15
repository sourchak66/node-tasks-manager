import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
{
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        unique : true,
        required : true,
        trim : true,
        lowercase : true,
        validate(value)
        {
            if (!validator.isEmail(value))
            {
                throw new Error("Email is invalid!!");
            }
        }
    },
    password : {
        type : String,
        required : true,
        minLength : 7,
        trim : true,
        validate(value)
        {
            if (value.toLowerCase().includes("password"))
            {
                throw new Error("Password cannot contain 'password'!!");
            }
        }
    },
    age : {
        type : Number,
        default : 1,
        validate(value)
        {
            if (value <= 0)
            {
                throw new Error("Age should be greater than 0!!");
            }
        }
    }
});

userSchema.statics.findByCredentials = async function (email, password)
{
    const user = await User.findOne({ email : email });
    
    if (!user)
    {
        throw new Error("Unable to login!!");
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch)
    {
        throw new Error("Unable to login!!");
    }
    
    return user;
}

// Hash the plain text password before saving
userSchema.pre("save", async function (next)
{
    const user = this;
    
    if (user.isModified("password"))
    {
        user.password = await bcrypt.hash(user.password, 8);
    }
    
    next();
});

const User = mongoose.model("User", userSchema);

export default
{
    User : User
}