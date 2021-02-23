import { useState, useEffect } from 'react';
const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    password: '123456',
    password2: '123456',
    dob: '123456',
    type: 'student',
    alt: '',
    sex: 'M'
  });
 
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
   
  };

  const handleSubmit = e => {
    e.preventDefault();
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback(values);
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;
