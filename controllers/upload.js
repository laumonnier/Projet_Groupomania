const User = require('../models/user');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

exports.uploadUserProfil = (req, res, next) => { //Gestion de multer autrement concernant les images du personnel
    // A voir
    const MIME_TYPES = {
        'image/jpg': 'jpg',
        'image/jpeg': 'jpg',
        'image/png': 'png'
    };

    // const storage = multer.diskStorage({
    //     destination: (res, file, callback) => {
    //         callback(null, 'images');
    //     },
    //     filename: (req, file, callback) => {
    //         const name = file.originalname.split(' ').join('_');
    //         const extension = MIME_TYPES[file.mimetype];
    //         callback(null, name + Date.now() + '.' + extension);
    //     }
    // });

    // multer({storage: storage}).single('image');
        if(
           req.file.detectedMimeType !== "image/jpg" &&
           req.file.detectedMimeType !== "image/jpeg" &&
           req.file.detectedMimeType !== "image/png" 
        ){
        return res.status(404)
        .json("Le format n'est pas compatible !");
        }

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