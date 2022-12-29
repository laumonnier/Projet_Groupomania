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
        )
            throw Error("invalid file")
        
        console.log("Salut");
    console.log(req.body.name);

        try{
            await UserModel.findByIdAndUpdate(
                req.body.userId,
                {
                    $set: { picture: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`}
                },
                
                { new: true, upsert: true, setDefaultsOnInsert: true },
            )
            .then((data) => res.send(data))
            .catch((err) => res.status(400).send({ message: err }));

        }catch(err){
            res.status(500).send({ message: err });
        }
        
        

    }catch(err){
            const errors = uploadErrors(err);
            return res.status(200).send({ errors });
    }
    
}

