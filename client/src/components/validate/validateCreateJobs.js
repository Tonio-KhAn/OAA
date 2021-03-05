export default function validateCreateJob(values) {
    let errors = {};
    
    if (!values.title) {
        errors.title = 'Job title required';
    } else if (!/\S+@my.uwi.edu+/.test(values.uwi_email)) {
        errors.uwi_email = 'UWI email address is invalid';
    }
    if (!values.password) {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Password needs to be 6 characters or more';
    }
    
    return errors;
}