import ProductsModal from "../Modals/Products.modal.js";

export const Addproduct= async(req,res)=>{
    try {
        const {title,image,image2,price,bttn,info} =req.body;
        if( !title || !image || !image2 || !price || !bttn || !info) return res.status(404).json({success:false,message:"All fields are mandetory"})

        const products = new ProductsModal({
            title,image,image2,price,bttn,info
        })
        const response = await products.save()

        return res.status(201).json({success:true,message:"Product added successfully"})
    } catch (error) {
        return res.status(500).json({success:false,message:error})
    }
}

export const GetAllProducts =async(req,res)=>{
    try {
        const products = await ProductsModal.find()
        if(products.length){
            return res.status(200).json({success:true,message:"Product Found",products:products})
        }
        return res.status(404).json({success:false,message:"Product not found"})
    } catch (error) {
        return res.status(500).json({success:false,message:error})
    }
}

export const getSingleProduct = async(req, res) => {
    try {
        const {id : productId} =req.query;

        if(!productId) return res.status(404).json({success:false,message:"ProductId required"})

        const products = await ProductsModal.findById(productId)
        //-_id means minus ka matalab id nahi chahiye and 

        // const product = await ProductModal.findById(productId).select("name")
        // name likhs means name print hoga

        if(products){
            return res.status(200).json({success:true,message:"Product found",products:products})
        }
        return res.status(404).json({success:false,message:"Product not found"})

    } catch (error) {
        return res.status(500).json({success:false,message:error})
    }
}