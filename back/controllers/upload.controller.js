const UserModel = require('../models/user.model.js');
const fs = require('fs');
const { promisify } = require('util');// used to convert a method that returns responses using a callback function to return responses in a promise object
const { uploadErrors } = require('../utils/errors');
const pipeline = promisify(require('stream').pipeline);//The stream.pipeline() method is a module method that is used to the pipe by linking the streams passing on errors and accurately cleaning up and providing a callback function when the pipeline is done. 
const multer = require('multer');

// Download an image for the User
exports.uploadUserProfile = async (req, res, next) => { 
    console.log(req.file.mimetype)
    try{

        if (req.file.size > 300000) throw Error("max size");    
        
        if(
            req.file.mimetype !== "image/jpeg" && 
            req.file.mimetype !== "image/jpg" && 
            req.file.mimetype !== "image/png"
        ){
            throw Error("invalid file");
        }

        // await pipeline(
        //     // console.log(req.body.userId),
        //     req.file.stream,
        //     // console.log(req.body.use,rId)
        //     fs.createWriteStream(
        //         `${__dirname}/../../groupomania/public/uploads/profile/${fileName}`
        //     ),
        //     console.log(req.body.userId)
            
        // );
        // res.send("Fichier téléchargé :" + fileName);
        const MIME_TYPES = {
            'image/jpg': 'jpg',
            'image/jpeg': 'jpg',
            'image/png': 'png'
        }; 
        
        const storage = multer.diskStorage({
            destination: (req, file, callback) => {
                callback(null, "../groupomania/public/uploads/profile");
            },
            filename: (req, file, callback) => {
                console.log(file);
                const name = file.originalname.split(' ').join('_');
                const extension = MIME_TYPES[file.mimetype];
                callback(null, name + Date.now() + '.' + extension);
            }
        });
        
        // multer({ storage: storage }).single('file');

        try{
            await UserModel.findByIdAndUpdate(
                req.body.userId,
                {
                    // $set:{picture:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`}
                    $set:{picture:`./uploads/profil/${req.file.filename}`}
                },
                { new: true, upsert: true, setDefaultsOnInsert: true }
            )
            .then((data) => res.send(data))
            .catch((err) => res.status(400).send({ message: err }));

        }catch(err){
            res.status(500).send({ message: err });
        }

    }catch(err){
            const errors = uploadErrors(err);
            return res.status(201).json({ errors });
    }
}
    //     const fileName = (req, file, callback) => {
    //     const name = file.originalname.split(' ').join('_');
    //     const extension = MIME_TYPES[file.mimetype];
    //     callback(null, name + Date.now() + '.' + extension);
    // }

    
    // console.log(req.body.userId),
    // console.log(req.body.userId),
        
        
    // try {
    //      await UserModel.findByIdAndUpdate(
    //         req.body.userId,
    //         console.log(req.body.userId),
    //         {
    //             $set: {picture: "./uploads/profile/" + fileName}
    //         },
    //         { new: true, upsert: true, setDefaultsOnInsert: true },
    //         console.log(req.body.userId)  
    //     )
    //      .then((data) => {
    //         res.status(201).json(data)
    //      })
    //      .catch((err) => {
    //         res.status(400)
    //         .json({ error: err })
    //      });
    // }
    
// }
