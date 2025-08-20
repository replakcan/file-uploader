const path = require('path')
const multer = require('multer')
const upload = multer({ dest: path.join(__dirname, '../public/data/uploads') })
exports.usersFileUploadGet = async (req, res) => {
  res.render('file-uploader')
}

exports.usersFileUploadPost = [
  upload.single('uploaded_file'),
  (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.')
    }

    res.render('file-uploader', { file: req.file })
  },
]
