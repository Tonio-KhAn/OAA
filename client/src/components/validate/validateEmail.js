export default function validateInfo(values) {
    let errors = {};
    if (!values.uwi_email) {
      errors.uwi_email = 'UWI email required';
    }
    else if (!/\S+@my.uwi.edu+/.test(values.uwi_email)) {
      errors.uwi_email = 'UWI email address is invalid';
    }

    return errors;
}
  
