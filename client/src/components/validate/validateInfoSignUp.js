export default function validateInfo(values) {
  let errors = {};

  if (!values.password) {
    errors.password = 'Password required';
  } else if (values.password.length < 6) {
    errors.password = 'Password needs to be 6 characters or more';
  }

  if (!values.password2) {
    errors.password2 = 'Password required';
  } else if (values.password2 !== values.password) {
    errors.password2 = 'Passwords do not match';
  }

  if (!values.alt_email) {
    errors.alt_email = 'Alternate email required';
  } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.alt_email)) {
    errors.alt_email = 'Alternate email is invalid';
  }

  if (!values.dob) {
    errors.dob = 'Date of birth required';
  } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.dob)) {
    errors.dob = `Use format 'YYYY-MM-DD'`;
  } else if (!(new Date(values.dob).getTime()) && (new Date(values.dob).getTime() !== 0)){
    errors.dob = 'Invalid date'
  }

  return errors;
}
