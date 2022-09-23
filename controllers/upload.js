const User = require('../models/user');
const fs = require('fs');
const { promisify } = require('util');// used to convert a method that returns responses using a callback function to return responses in a promise object
const pipeline = promisify(require('stream').pipeline);//The stream.pipeline() method is a module method that is used to the pipe by linking the streams passing on errors and accurately cleaning up and providing a callback function when the pipeline is done. 

// Download an image for the User
exports.uploadUserProfil = (req, res, next) => { 
    const MIME_TYPES = {
        'image/jpg': 'jpg',
        'image/jpeg': 'jpg',
        'image/png': 'png'
    };

    const fileFilter = (req, file, callback) => {
        if(
            (file.mimetype).includes('jpeg') ||
            (file.mimetype).includes('jpg') ||
            (file.mimetype).includes('png') 
        ){
            callback(null, true);
        } else{
            callback(null, false);
        }
    };

    

    if(req.file.size > 400000){
        return res.status(404)
        .json("Le fichier est trop gros (taille maximale: 400ko)!");
    }else{
        fileName = (req, file, callback) => {
            const name = file.originalname.split(' ').join('_');
            const extension = MIME_TYPES[file.mimetype];
            callback(null, name + Date.now() + '.' + extension);
        }

        pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../client/public/uploads/profil/${fileName}`
            )
        );
    }

    try {
        User.findByIdAndUpdate(
            req.body.userId,
            {
                $set: {picture: "./uploads/profil/" + fileName}
            },
            { new: true, upsert: true, setDefaultsOnInsert: false }
        )
            .then((data) => {
                res.status(201)
                .json(data)
            })
            .catch((err) => {
                res.status(500)
                .json({ error: err })
            })
    }
    catch(err){
        res.status(500).json({ error: err })
    }
}
// let upload = multer({ storage: storage, fileFilter: fileFilter});

// exports = upload.single('picture')