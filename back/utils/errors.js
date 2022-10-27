exports.signUpErrors = (err) => {
    
   let errors = { pseudo: '', email: '', password: ''}

    if (err.message.includes('pseudo'))
        errors.pseudo = "Pseudo incorrect, minimum 3 caractères !";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
        errors.pseudo = "Ce pseudo a déjà été enregistré dans la base de données !";

    if (err.message.includes('email'))
        errors.email = "Email incorrect !";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
        errors.email = "Cet email a déjà été enregistré dans la base de données !";
    
    if (err.message.includes('password'))
        errors.password = "Ce mot de passe ne correspond pas ('min 8 car. , max 35 car.') !"
        

    return errors;
}

exports.signInErrors = (err) => {
    let errors = { email: '', password: ''}

    if (err.message.includes('email'))
        errors.email = "L'email est incorrect !";
    
    if (err.message.includes('password'))
        errors.password = "Le mot de passe est incorrect !"
    
    return errors
    
}

exports.uploadErrors = (err) => {
    let errors = { format: '', maxSize: ''};

    if(err.message.includes('invalid file'))
        errors.format = "Le format n'est pas compatible !";

    if(err.message.includes('max size'))
        errors.maxSize = "Le fichier est trop grand (taille maximale: 400ko)!";

    return errors;
}