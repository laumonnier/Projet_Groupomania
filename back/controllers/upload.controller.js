const UserModel = require('../models/user.model.js');
const fs = require('fs');
const { promisify } = require('util');// used to convert a method that returns responses using a callback function to return responses in a promise object
const { uploadErrors } = require('../utils/errors');
const pipeline = promisify(require('stream').pipeline);//The stream.pipeline() method is a module method that is used to the pipe by linking the streams passing on errors and accurately cleaning up and providing a callback function when the pipeline is done. 

// Download an image for the User
exports.uploadUserProfil = async (req, res, next) => { 
    // const MIME_TYPES = {
    //     'image/jpg': 'jpg',
    //     'image/jpeg': 'jpg',
    //     'image/png': 'png'
    // };

    // const storage= multer.diskStorage({
    //     destination:(req, file, callback) => {
    //         callback(null, 'images');
    //     },
    //     filename: ( req, file, callback) => {
    //         const name= file.originalname.split(' ').join('_');
    //         const extension = MIME_TYPES[file.mimetype];
    //         callback(null, name + Date.now() + '.' + extension);
    //     }
    // });
    try{    
    if(
        (req.file.detectedMimeType !== "image/jpg") &&
        (req.file.detectedMimeType !== "image/jpeg") &&
        (req.file.detectedMimeType !== "image/png") 
    ){
        return res.status(401)
        .json("Le fichier n'est pas au bon format"); 
    }else

    if(req.file.size > 400000){
        return res.status(404)
        .json("Le fichier est trop gros (taille maximale: 400ko)!");
    }}catch(err){
        const errors = uploadErrors(err);
        return res.status(400).json({errors});
    }
        const fileName = (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }

        await pipeline(
            req.file.stream,
            fs.createWriteStream(
                `${__dirname}/../groupomania/public/uploads/profil/${fileName}`
            )
        );
    }

    try {
         UserModel.findByIdAndUpdate(
            req.body.userId,
            {
                $set: {picture: "./uploads/profil/" + fileName}
            },
            { new: true, upsert: true, setDefaultsOnInsert: true }
            .then((data) => {
                res.status(201)
                .json(data)
            })
            .catch((err) => {
                res.status(500)
                .json({ error: err })
            })
         )
    }
    catch{(err) => {
        res.status(500).json({ error: err });
    }

    }
