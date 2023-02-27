const express = require('express')
const { _exelRouter } = require('./router/exel')
const { _imageRouter } = require('./router/image')
const path = require('path');
// USE .ENV CONFIG
require('dotenv').config();
// ===============
const app = express()
app.use(express.static('public'));
app.use('/api' , _exelRouter )
app.use('/api' , _imageRouter )
// API VIEW IMAGE FOLDER UPLOAD
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads/images', express.static(path.join(__dirname, 'uploads', 'images')));
const port = process.env.PORT || 5000
console.log("process.env.PORT" , process.env.PORT);
app.listen(port , (errors) => {
    console.log(`connected to port ${port}`);
})