// eslint-disable-next-line no-unused-vars
import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field,} from "formik";
import * as Yup from "yup";
import slugify from "slugify";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { toast } from "react-toastify";
const PostAddNew = () => {
  const [image,setImage] = useState('');
  const postRef = collection(db, "Posts");
  return (
    <div className="w-100">
      <div className="mask d-flex align-items-center h-100 gradient-custom">
        <div className="w-100">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h3 className="mb-4 pb-2">Add New Post</h3>
                  <Formik
                    initialValues={{
                      title: "",
                      author: "",
                      slug: "",
                      status: "",
                      image: "",
                      describe: ''
                    }}
                    validationSchema={Yup.object({})}
                    onSubmit={(values, { setSubmitting }) => {
                      const storage = getStorage();
                      const storageRef = ref(
                        storage,
                        "images/" + values.image.name
                      );
                      const uploadTask = uploadBytesResumable(
                        storageRef,
                        values.image
                      );
                      setTimeout(() => {
                        setSubmitting(false);
                        values.slug = slugify(values.slug || values.title);
                        // console.log("Values ~ ", values.image.name);
                        uploadTask.on(
                          "state_changed",
                          (snapshot) => {
                            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                            const progress =
                              (snapshot.bytesTransferred /
                                snapshot.totalBytes) *
                              100;
                            console.log("Upload is " + progress + "% done");
                            switch (snapshot.state) {
                              case "paused":
                                console.log("Upload is paused");
                                break;
                              case "running":
                                console.log("Upload is running");
                                break;
                            }
                          },
                          (error) => {
                            console.log(error);
                            switch (error.code) {
                              case "storage/unauthorized":
                                // User doesn't have permission to access the object
                                break;
                              case "storage/canceled":
                                // User canceled the upload
                                break;

                              // ...

                              case "storage/unknown":
                                // Unknown error occurred, inspect error.serverResponse
                                break;
                            }
                          },
                          () => {
                            // Upload completed successfully, now we can get the download URL
                            getDownloadURL(uploadTask.snapshot.ref).then(
                              (downloadURL) => {
                                console.log("File available at", downloadURL);
                                setImage(downloadURL)
                                addDoc(postRef, {
                                  title: values.title,
                                  author: values.author,
                                  slug: values.slug,
                                  status: values.status,
                                  image: downloadURL,
                                  image_name: values.image.name,
                                  describe: values.describe
                                })
                                  .then(() => {
                                    toast.success("Add Successfully");
                                    values.title = '';
                                    values.author = '';
                                    values.slug = '';
                                    values.status = '';
                                    values.image = '';
                                    values.describe = '';
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                  });
                              }
                            );
                          }
                        );
                      }, 1000);

                      // console.log("Image ~ ", values);
                    }}
                  >
                    {({ isSubmitting, setFieldValue }) => (
                      <Form autoComplete="off">
                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <Field
                                type="text"
                                name="title"
                                className="form-control"
                              />
                              <label className="form-label" htmlFor="title">
                                Title
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <div className="form-outline">
                              <Field
                                type="text"
                                name="author"
                                className="form-control"
                              />
                              <label className="form-label" htmlFor="author">
                                Author
                              </label>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-md-6 mb-4">
                            <div className="form-outline datepicker">
                              <Field
                                type="text"
                                className="form-control"
                                name="slug"
                              />
                              <label htmlFor="Slug" className="form-label">
                                Slug
                              </label>
                            </div>
                          </div>
                          <div className="col-md-6 mb-4">
                            <h6 className="mb-2 pb-1">Status</h6>
                            <div className="d-flex m-2">
                              <label>
                                <Field
                                  type="radio"
                                  name="status"
                                  value="Approved"
                                />
                                Approved
                              </label>
                              <label>
                                <Field
                                  type="radio"
                                  name="status"
                                  value="Pending"
                                />
                                Pending
                              </label>
                              <label>
                                <Field
                                  type="radio"
                                  name="status"
                                  value="Reject"
                                />
                                Reject
                              </label>
                            </div>
                          </div>
                        </div>
                        {/* <select className="form-select" aria-label="Category">
                        <option selected>Category</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select> */}
                      <div className="col-md-12 mb-4">
                      <h6 className="mb-2 pb-1">Describe</h6>
                        <textarea type='text' className='w-100 p-2' onChange={(e) => setFieldValue('describe',e.target.value)} name="describe"/>
                      </div>
                        <div className="col-md-6 mb-4">
                          <h6 className="mb-2 pb-1">Image</h6>
                          <input
                            type="file"
                            name="image"
                            onChange={(e) => {
                              if (e.target.files) {
                                setFieldValue("image", e.target.files[0]);
                                console.log(e.target.files[0]);
                              }
                            }}
                          />
                        </div>

                        <div className="col-md-12 mb-4">
                          <img src={image} className="w-100" style={{objectFit:'cover'}}/>
                        </div>

                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="btn btn-success p-2"
                        >
                          Add New Post
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostAddNew;
