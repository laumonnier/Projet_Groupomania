// Dependency used
const passwordValidator = require ('password-validator');

// Creating a Schema
const passwordSchema = new passwordValidator();

// Adding properties 
passwordSchema
.is().min(7)    // Minimum length 7
.is().max(20)   // Maximum length 20
.has().uppercase()      // Must have uppercase letter
.has().lowercase()      // Must have lowercase letter
.has().digits(2)        // Must have at least two digits
.has().not().spaces()   // Should not have space
.is().not().oneOf(['Azerty123', 'Azerty12', 'Azerty23', 'Azerty34', 'Azerty45', 'Azerty56', 'Azerty67', 'Azerty78', 'Azerty89', 'Password12', 'Password23', 'Password34', 'Password45', 'Password56', 'Password67', 'Password78', 'Password89', 'Passw0rd1'])   // Blacklist is not allowed


module.exports = (req, res, next) => {
    if(passwordSchema.validate(req.body.password)){
        next();
    }else{
        return res.status(400)
        .json({error: `The password is not developed enough or is not allowed : ${passwordSchema.validate('req.body.password', { list: true })}`});
    }
}