const User = require('../models/user');
const fs = require('fs');
const { promisify } = require('util');
const { uploadErrors } = require('../utils/errors');
const pipeline = promisify(require('stream').pipeline);

exports.uploadUserProfil = (req, res, next) => { //Gestion de multer autrement concernant les images du personnel
    // A voir
    const MIME_TYPES = {
        'image/jpg': 'jpg',
        'image/jpeg': 'jpg',
        'image/png': 'png'
    };

    const storage = multer.diskStorage({
        destination: (res, file, callback) => {
            callback(null, 'images');
        },
        filename: (req, file, callback) => {
            const name = file.originalname.split(' ').join('_');
            const extension = MIME_TYPES[file.mimetype];
            callback(null, name + Date.now() + '.' + extension);
        }
    });

    multer({storage: storage}).single('image');


    // try{
    //     if(
    //        req.file.detectedMimeType !== "image/jpg" &&
    //        req.file.detectedMimeType !== "image/jpeg" &&
    //        req.file.detectedMimeType !== "image/png" 
    //     )
    //     throw Error("invalid file");

    //     if(req.file.size > 500000)
    //     throw Error("max size");
    // }
    // catch (err){
    //     const errors = uploadErrors(err)
    //     res.status(401).json({ errors });
    // }

    const fileName = req.body.name + ".jpg";

    pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/profil/${fileName}`
        )
    );

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