const UserModel = require('../models/user.model.js');
const { uploadErrors } = require('../utils/errors');


// Download an image for the User
exports.uploadUserProfile = async (req, res, next) => { 
    console.log(req.file.filename)
    
    try{

        if (req.file.size > 600000) throw Error("max size");    
        
        if(
            req.file.mimetype !== "image/jpeg" && 
            req.file.mimetype !== "image/jpg" && 
            req.file.mimetype !== "image/png"
        ){
            throw Error("invalid file");
        }
        console.log("Salut");
    console.log(req.body.name);

        // await pipeline(
        //     req.file.stream,
        //     fs.createWriteStream(
        //         `${__dirname}/../../groupomania/public/uploads/profile/${fileName}`
        //     ),
        //     console.log(req.body.userId)
            
        // );
        // res.send("Fichier téléchargé :" + fileName);
        // const MIME_TYPES = {
        //     'image/jpg': 'jpg',
        //     'image/jpeg': 'jpg',
        //     'image/png': 'png'
        // }; 
        
        // const storage = multer.diskStorage({
        //     destination: (req, file, callback) => {
        //         callback(null, "../groupomania/public/uploads/profile");
        //     },
        //     filename: (req, file, callback) => {
        //         // console.log(file);
        //         // const name = file.originalname.split(' ').join('_');
        //         // const extension = MIME_TYPES[file.mimetype];
        //         // callback(null, name + Date.now() + '.' + extension);
        //         const name = req.body.name + ".jpg";
        //         callback(null, name )
        //     }
        // });
        
        // multer({ storage: storage })

        try{
            await UserModel.findByIdAndUpdate(
                req.body.userId,
                {
                    // $set:{picture:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`}
                    $set:{picture:`uploads/profile/${req.file.filename}`}
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
