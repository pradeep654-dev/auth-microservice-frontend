const mongoose = require ('mongoose')
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name :{type:String,required:[true,"Name is required"]},
    email:{type :String,
        required:[true,"Email is reuired"],
        unique:true,
        trim:true,
        lowercase:true,
         match: [/^\S+@\S+\.\S+$/, "Invalid email format"]
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minLength:[6,"password must be at least 6 charechters"]

    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }


},{timestamps:true})

userSchema.pre("save",async function (next){
    // if(!this.markModified("password")){
    //     return next()  
    // } 
    const salt  = await bcrypt.genSaltSync(10)
    this.password = await bcrypt.hash(this.password,salt);
    next()

})

userSchema.methods.comparePassword =  async function (enterdPassword){
    console.log("🚀 ~ enterdPassword:", enterdPassword)
    if (!this.password) {
        throw new Error("Password is not set");
    }
    const hashedPassword = await bcrypt.hash(this.password, 10);
    console.log("🚀 ~ hashedPassword:", hashedPassword);
    return bcrypt.compare(enterdPassword,this.password)
}

userSchema.methods.generateToken =  function (){
    return jwt.sign(
        {id:this.id,email:this.email,role:this.role,username:this.name},process.env.JWT_SECRET,{expiresIn:'7d'});
}

module.exports = mongoose.model('groceryStoreUsers',userSchema)