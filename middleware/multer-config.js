// const multer = require ('multer');

// // Allows to pass files in queries, here it will be image files
//     const MIME_TYPES = {
//         'image/jpg': 'jpg',
//         'image/jpeg': 'jpg',
//         'image/png': 'png'
//     };

//     const storage = multer.diskStorage({
//         destination: (res, file, callback) => {
//             callback(null, './uploads');
//         },
//         filename: (req, file, callback) => {
//             const name = file.originalname.split(' ').join('_');
//             const extension = MIME_TYPES[file.mimetype];
//             callback(null, name + Date.now() + '.' + extension);
//         }
//     });

//     const fileFilter = (req, file, callback) => {
//         if ((file.mimetype).incudes('jpeg') || (file.mimetype).incudes('jpg') || (file.mimetype).incudes('png')){
//             callback(null, true);
//         } else{
//             callback(null, false);
//         }
//     };

// module.exports = multer({storage: storage, fileFilter: fileFilter}).single('UserPicture');