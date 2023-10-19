const cloudinary=require('cloudinary').v2

const { CloudinaryStorage }=require('multer-storage-cloudinary')


cloudinary.config({
    cloud_name: 'djccswr1e',
    api_key: '373631266558488',
    api_secret: 'fvvVyj1C7Q19xS6SxgW3x9IiZAQ',
    secure: true,
  });

const storage=new CloudinaryStorage({
    
    cloudinary:cloudinary,
    params:{
        folder:'E commerce',
        allowed_formats: ["jpeg", "jpg", "png"],
    },
})

module.exports={
    cloudinary,
    storage
}