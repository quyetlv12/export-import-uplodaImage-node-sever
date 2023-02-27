const express = require('express')
const multer = require('multer')

const { exportFileExel, importFileExel } = require('../controller/exel')

const _exelRouter = express.Router()
// STORAGE UPLOAD FILE
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/file/')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    }
  })
// Create the file upload middleware
const upload = multer({ storage: storage })
_exelRouter.get('/export-file' ,  exportFileExel)
_exelRouter.post('/import-file' , upload.single('file') , importFileExel)

module.exports = {_exelRouter}