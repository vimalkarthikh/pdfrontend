import React from 'react'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  email: Yup.string().required("ⓘ Email is required"),
  password: Yup.string().required("ⓘ Password is required"),
});


function Login() {
    const navigate = useNavigate();
  const initialvalues = {
    email: "",
    password: "",
  };

  return (
    <div className="container">
        <div className="row">
           <div className="col">
           <h1 className='text-center app-heading m-2'>Diary Days</h1>
           </div>
        </div>
        
        <div>
            <div className="row ">
            <div className="col card home-card shadow-lg p-3 mb-5 bg-body-tertiary rounded-2 w-25"><br />
                <h1 className='text-center text-black home-abt'>Login</h1>
                <Formik
            initialValues={initialvalues}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              try {
                let data = await axios.post('https://dairymanage.onrender.com/login',values);
                console.log(data);
                let token = data.data.token;
                console.log(token);
                if (token) {
                  console.log(token);
                  localStorage.setItem("token", token);
                  navigate("/view");
                }
                toast.success("Login Successful");
                actions.resetForm();
                navigate("/view");
                actions.setSubmitting(false);
              } catch (error) {
                if (
                  error.response &&
                  error.response.status >= 400 &&
                  error.response.status <= 500
                ) {
                  toast.error("Incorrect User Login");
                  actions.setSubmitting(false);
                }
              }
            }}
          >
            {(formikProps) => (
              <Form className="form">
                <br></br>{" "}
                <div>
                  <Field
                    type="email"
                    className="reg-input form-control"
                    id="email"
                    name="email"
                    placeholder="Email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="errormessage"
                  />
                </div>
                <p> </p>
                <div>
                  <Field
                    type="password"
                    id="password"
                    className="reg-input form-control"
                    name="password"
                    placeholder="Password   "
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="errormessage"
                  />
                </div>
                <p> </p>
                <h6>
                  <Link to="/forgotpassword" className="fp-btn ">
                    Forgotpassword ?
                  </Link>&ensp;&ensp;&ensp;
                  <Link to="/register" className="fp-btn text-black">
                    New here Getstarted
                  </Link>
                </h6>
                <br />
                <div className="row">
                  <br />
                  <button
                    className="btn btn-success col log-btn"
                    type="submit"
                    disabled={formikProps.isSubmitting}
                  >
                    Login
                  </button>

                  <Link className="btn btn-danger col log-btn" to="/">
                    Back
                  </Link>
                </div>
                <button
                  type="button"
                  className="btn btn-info text-center"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  Demo Credentials
                </button>
                <div
                  class="modal fade"
                  id="exampleModal"
                  tabindex="-1"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">
                        <h2> Demo Login Data</h2>
                        </h1>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body"><h6>Email: vimalkarthik315@gmail.com</h6><br/>
                      <h6>Password: 123456</h6>
                      </div>
                      
                      
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
            </div>
            
            </div>
        </div>
    </div>
  )
}

export default Login