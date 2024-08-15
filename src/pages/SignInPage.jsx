import { signInWithEmailAndPassword } from "firebase/auth";
import { ErrorMessage, Field, Formik, Form } from "formik";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { auth } from "../firebase/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useAuth } from "../context/auth-context";
const SignInPage = () => {
  const [loading, setLoading] = useState(false);
  const { userInfo } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container style={{height:'100vh'}}>
       <div className="mask d-flex align-items-center h-100 w-100 m-auto">
        <div className="w-100">
          <h1 className="text-center">Log In</h1>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              email: Yup.string().email().required("Please enter your email"),
              password: Yup.string()
                .max(10, "Your Password must be 10 characters or least")
                .required("Please enter your password"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(false);
              setLoading(true);
              setTimeout(() => {
                signInWithEmailAndPassword(auth, values.email, values.password);
                navigate("/");
                toast.success("Login Successfully");
              }, 1000);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="email" id="email" className="form-label">
                    Email address
                  </label>
                  <Field type="email" className="form-control" name="email" />
                  <div className="text-danger">
                    <ErrorMessage name="email"></ErrorMessage>
                  </div>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="password"
                    id="password"
                    className="form-label"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    className="form-control"
                    name="password"
                  />
                  <div className="text-danger">
                    <ErrorMessage name="password"></ErrorMessage>
                  </div>
                </div>
                <div>
                  Do you have an account
                  <NavLink
                    to={"/register"}
                    className="text-primary pe-auto mx-1"
                  >
                    Register
                  </NavLink>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary d-block w-100 p-3"
                  disabled={isSubmitting}
                >
                  {loading ? (
                    <div className="spinner-border text-light" role="status">
                      <span className="sr-only"></span>
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Container>
  );
};

export default SignInPage;
