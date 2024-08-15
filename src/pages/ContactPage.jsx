// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import { toast } from "react-toastify";
const ContactPage = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="container" style={{ marginTop: "200px" }}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6 pb-5">
          <Formik
            initialValues={{
              fullName: "",
              email: "",
              comment: "",
            }}
            validationSchema={Yup.object({
              fullName: Yup.string().required("Please enter your fullname"),
              email: Yup.string().email().required("Please enter your email"),
              comment: Yup.string().required("Enter your comment"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              setTimeout(() => {
                setSubmitting(false);
                const contactRef = collection(db, "Contacts");
                addDoc(contactRef, {
                  fullName: values.fullName,
                  email: values.email,
                  comment: values.comment,
                });
                toast.success("Send information successfully");
              }, 1000);

              values.fullName = '';
              values.email = '';
              values.comment = '';
            }}
          >
            {({ isSubmitting }) => (
              <Form autoComplete="off">
                <div className="card rounded-3">
                  <div className="card-header p-0">
                    <div className="bg-success text-white text-center py-2">
                      <h3>
                        <i className="fa fa-envelope"></i> Contact For Me
                      </h3>
                    </div>
                  </div>
                  <div className="card-body p-3">
                    <div className="form-group">
                      <div className="input-group mb-2">
                        <Field
                          type="text"
                          className="form-control"
                          name="fullName"
                          placeholder="Enter your fullname"
                        />
                      </div>
                      <div className="text-danger">
                        <ErrorMessage name="fullName" />
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="input-group mb-2">
                        <Field
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="text-danger">
                        <ErrorMessage name="email" />
                      </div>
                    </div>

                    <div className="form-group">
                      <div className="input-group mb-2">
                        <Field
                          type="text"
                          className="form-control"
                          name="comment"
                          placeholder="Enter your comment"
                          required
                        ></Field>
                      </div>
                      <div className="text-danger">
                        <ErrorMessage name="comment" />
                      </div>
                    </div>

                    <button
                      className="btn btn-success px-3 fw-bold w-25 m-auto d-block"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {loading ? (
                        <div
                          className="spinner-border text-light"
                          role="status"
                        >
                          <span className="sr-only"></span>
                        </div>
                      ) : (
                        "Send"
                      )}
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
