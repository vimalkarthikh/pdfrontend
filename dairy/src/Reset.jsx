import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const validationSchema = Yup.object().shape({
    password: Yup.string().required('ⓘ Password is required')

 });

function Reset() {
    const navigate = useNavigate();
    const initialvalues ={
        password:''
    }
  return (
    <div className="container">
        <div className="row">
           <div className="col">
           <h1 className='text-center app-heading m-2'>Diary Days</h1>
           </div>
           
        </div>
        <div className="row">
       <div className="col-12 shadow-sm p-3 mb-5 bg-white rounded details-home">
        <Formik
        initialValues={initialvalues}
        validationSchema={validationSchema}
        onSubmit={(values, actions)=>{
            console.log(values);
            try {
              let data =  axios.post('', values);
              console.log(data);
              if (data) {
                console.log(data);
                toast.success("Password reset Successful");
                actions.resetForm();actions.setSubmitting(false);
                navigate('/login');
              }
            } catch (error) {
              if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                toast.error('Password Reset Failed Please Retry');
                actions.setSubmitting(false);
              }
            }

        }}>{(formikProps) => (
            <Form className='form'>
              <h1 className='home-abt text-black text-center'>Reset Password</h1><br></br>                 <div>
                                             
                <Field type="password" className='reg-input form-control' id="password" name="password" placeholder='password'/>
                <ErrorMessage name="password" component="div" className='errormessage'  />
              </div>
              <p> </p>
                          
                
              <div className='row'>
                <br/>
              <button className='btn btn-info col log-btn ' type="submit" disabled={formikProps.isSubmitting}>
               Submit Password
              </button></div>
      
            </Form>
          )}

        </Formik>
       </div>
    </div>


    </div>
  )
}

export default Reset