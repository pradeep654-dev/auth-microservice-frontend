const User = require ('./usersModel')
class userController {

    creatUser = async (req, res) => {

        try {
            const { name, email, password, role } = req.body
            const existUser = await User.findOne({ email })
            if (existUser) return res.status(400).json({ message: "User alredy exist" })
            const user = await User.create({ name, email, password, role });
            const token = user.generateToken()

            return res.status(201).json({ message: "User register succefully", token })

        } catch (error) {
            return res.status(500).json({ message: "server error ", error: error.message })
        }

    }

    getUser = async (req,res) =>{
        try {
            const {email,password} = req.body
            const user = await User.findOne({email})
            if(!user) return res.status(400).json({message:"Invalid creadential"})
            const isMatch = await user.comparePassword(password);
            if(!isMatch) return res.status(400).json({message:"Invalid creadential"})
            
                const token = user.generateToken();
            res.status(200).json({message:"Login Successfully",token});
            
        } catch (error) {
            res.status(400).json({message:"sever error",error: error.message})
        }
        
    }

}

module.exports = new userController();
