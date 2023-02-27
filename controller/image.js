exports.imageUploadController = (req,res) => {
    console.log("req" , req);
    if (!req.file) {
        return res.status(400).send('No image file uploaded');
      }
    
      // Handle the uploaded file as needed, e.g. save it to a database or return its URL
    
      res.send('Image file uploaded successfully');
}