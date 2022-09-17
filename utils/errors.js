exports.signUpErrors = (err) => {
   const errors = { pseudo: '', lastName: '', firstName: '', email: ''}

    if (err.message.includes('pseudo'))
        errors.pseudo = "Pseudo incorrect, minimum 3 caractères !";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
        errors.pseudo = "Ce pseudo a déjà été enregistré dans la base de données !";

    if (err.message.includes('lastName'))
        errors.lastName = "Nom de famille obligatoire !";

    if (err.message.includes('firstName'))
        errors.firstName = "Prénom obligatoire !";

    if (err.message.includes('email'))
        errors.email = "Email incorrect !";

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
        errors.email = "Cet email a déjà été enregistré dans la base de données !";
        

    return errors;
}