const User = require('../models/user');
const fs = require('fs');
const { promisify } = require('util');
const { uploadErrors } = require('../utils/errors');
const pipeline = promisify(require('stream').pipeline);

exports.uploadUserProfil = (req, res, next) => {
    try{
        if(
           req.file.detectedMimeType !== "image/jpg" &&
           req.file.detectedMimeType !== "image/jpeg" &&
           req.file.detectedMimeType !== "image/png" 
        )
        throw Error("invalid file");

        if(req.file.size > 500000)
        throw Error("max size");
    }
    catch (err){
        const errors = uploadErrors(err)
        res.status(401).json({ errors });
    }

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