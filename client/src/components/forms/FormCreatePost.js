import React from 'react';
import validate from '../validate/validateLogin';
import useForm from '../useForm';
import '../css/Form.css';

const FormCreatePost = ({ submitForm } ) => {
  const { handleChange, handleSubmit, errors, values } = useForm(
    submitForm,
    validate
  );

  return (
    <div className="card input-filed"
       style={{
           margin:"100px auto",
           maxWidth:"500px",
           padding:"20px",
           textAlign:"center"
       }}
       >
           <input 
           type="text"
            placeholder="title"
            value={values.title}
            onChange={handleChange}
            />
           <input
            type="text"
             placeholder="body"
             value={values.body}
             onChange={handleChange}
             />
           <div className="file-field input-field">
            <div className="btn #64b5f6 blue darken-1">
                <span>Upload Image</span>
                <input type="file" onChange={handleChange}/>
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            <button >
                Submit post
            </button>

       </div>
  );
};

export default FormCreatePost;