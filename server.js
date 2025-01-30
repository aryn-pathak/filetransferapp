const multer = require('multer')
const path = require('path')

// Configure where and how files will be stored
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb) {
        // Save file with original name
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })
const express = require('express')
const app = express()



app.use(express.static('public'))

// Handle file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({ message: 'File uploaded successfully' })
})

// Get list of files
app.get('/files', (req, res) => {
    const fs = require('fs')
    fs.readdir('./uploads', (err, files) => {
        if (err) {
            res.json([])
            return
        }
        res.json(files)
    })
})

// Handle downloads
app.get('/download/:filename', (req, res) => {
    const filePath = path.join(__dirname, 'uploads', req.params.filename)
    res.download(filePath)
})

app.listen(3000, () => {
    console.log('Server running on port 3000')
})