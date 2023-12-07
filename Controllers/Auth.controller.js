import AuthModal from "../Modals/Auth.modal.js";
import bcrypt from 'bcrypt';
import Jwt from "jsonwebtoken";

export const register = async(req,res)=>{
    try {
        const{ firstname,lastname,country,DOB,email,password,confirmpassword,countrycode,phoneNo} = req.body.userData;

        console.log(req.body.userData);

        if(!firstname || !lastname || !country || !DOB || !email || !password || !confirmpassword || !countrycode || !phoneNo) return res.status(404).json({success:false,message:"All fields are mandatory"})

        const hashedpassword = await bcrypt.hash(password,10)

        const user = new AuthModal({
            firstname,lastname,country,DOB,email,
            password:hashedpassword,
            confirmpassword:hashedpassword,
            countrycode,phoneNo
        })

        await user.save();

        return res.status(200).json({success:true,message:"Data Added!!"})
    } catch (error) {
        return res.status(500).json({success:false,message:error})
    }
}

export const login = async(req,res) =>{
    try {
        const{email,password} = req.body.userData;
        console.log(req.body.userData)

        if (!email || !password ) return res.status(401).json({ success: false, message: "All fields are mandtory." })

        const user = await AuthModal.findOne({ email: email });

        if(!user)return res.status(401).json({success: false, message: "Email is wrong."})

        const isPasswordcorrect = await bcrypt.compare(password,user.password);
        //console.log(isPasswordcorrect,"check here")

        if(!isPasswordcorrect){
            return res.status(401).json({success:false,message:"Password is wrong"})
        }

        const token = await Jwt.sign({id : user._id},process.env.JWT_SECRET)

        return res.status(200).json({success: true,message:"Login Successfull",user : {name : user.firstname,id:user._id},token})
    } catch (error) {
        return res.status(500).json({success:false,message:error})
    }
}

export const getCurrentUser = async (req, res) => {
    try{
        const { token } = req.body;
        if(!token) return res.status(401).json({success:false,message:"Token is required."})

        const {id} = await Jwt.verify(token,process.env.JWT_SECRET)

        const user = await AuthModal.findById(id);

        if(!user) return res.status(401).json({success:false,message:"User not found."})

        return res.status(200).json({success:true , user:{name:user.firstname,id:user._id}})

    }catch(error){
        return res.status(500).json({success:false , message: error })
    }
}