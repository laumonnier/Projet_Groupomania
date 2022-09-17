exports.signUpErrors = (err) => {
   const errors = { pseudo: '', lastName: '', firstName: '', email: ''}
    if (err.message.includes('pseudo')){
        errors.pseudo = "Pseudo incorrect ou pseudo à déjà été pris !";
    };

    if (err.message.includes('lastName')){
        errors.lastName = "Nom de famille obligatoire !";
    }

    if (err.message.includes('firstName')){
        errors.firstName = "Prénom obligatoire !";
    }

    if (err.message.includes('email')){
        errors.email = "Email incorrect ou cet email à déjà été pris !";
    }

    if (err.code === 11000)
        errors.email = "Cet email a déjà été enregistré !";

    return errors
}
