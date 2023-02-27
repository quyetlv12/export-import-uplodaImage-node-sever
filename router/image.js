const expess = require('express')
const multer = require('multer');
const path = require('path');
const { imageUploadController } = require('../controller/image');

const _imageRouter = expess.Router()
// Define the storage configuration for multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/images');
    },
    filename: function (req, file, cb) {
      const fileName = file.originalname.replace(/\s/g, '');
      cb(null, Date.now() + '-' + fileName);
    },
  });
  
  // Define the upload middleware using multer
  const upload = multer({ storage: storage });
_imageRouter.post('/upload' , upload.single('image') ,imageUploadController )

module.exports = {_imageRouter}