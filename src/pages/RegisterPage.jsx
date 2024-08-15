// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, Field } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../firebase/firebase-config";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Register Page";
  }, []);
  return (
    <Container>
      <div className="d-flex justify-content-center align-items-center w-100 vh-100">
        <div className="w-100 w-lg-50">
          <h1 className="text-center">Register</h1>
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              password: "",
            }}
            validationSchema={Yup.object({
              fullName: Yup.string().required("Please enter your fullname"),
              email: Yup.string().email().required("Please enter your email"),
              password: Yup.string()
                .max(10, "Your Password must be 10 characters or least")
                .required("Please enter your password"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setLoading(true);
              setTimeout(() => {
                setSubmitting(false);
                setLoading(false);
                const user = createUserWithEmailAndPassword(
                  auth,
                  values.email,
                  values.password
                );
                const colRef = collection(db, "Users");
                addDoc(colRef, {
                  fullName: values.fullName,
                  email: values.email,
                  password: values.password,
                });
                updateProfile(auth.currentUser, {
                  displayName: values.fullName,
                });
                navigate("/")
                toast.success("Register successfully");
              }, 1000);
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label
                    htmlFor="fullName"
                    id="fullName"
                    className="form-label"
                  >
                    FullName
                  </label>
                  <Field type="text" className="form-control" name="fullName" />
                  <div className="text-danger">
                    <ErrorMessage name="fullName"></ErrorMessage>
                  </div>
                </div>
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
                    to={"/sign-in"}
                    className="text-primary pe-auto mx-1"
                  >
                    Log in
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
                    "Register"
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

export default RegisterPage;
