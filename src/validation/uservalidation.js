export const validationUserData = (user)=>{
    let errors ={};
    if (user.name.trim() == ""){
        errors.name="Name field is required";
    } 
    else if(user.name.trim().length <3) {
        errors.name='Username must be at least 3 characters';
    }

    if (user.email.trim() == ""){
        errors.email="email field is required";
    } 
    else if(user.email.trim().length <10) {
        errors.email='email must be at least 10 characters';
    }


    if (user.password.trim() == ""){
        errors.password="password field is required";
    } 
    else if(user.password.trim().length <3) {
        errors.password='Password must be at least 3 characters';
    }
    return errors;
}