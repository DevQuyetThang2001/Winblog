import { addDoc, collection } from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import slugify from "slugify";
import * as Yup from "yup";
import { db } from "../../firebase/firebase-config";
import { toast } from "react-toastify";
const AddBanner = () => {
  const bannerRef = collection(db, "Banner");
  const [banner, setBanner] = useState("");
  return (
    <div className="w-100">
      <div className="mask d-flex align-items-center h-100 gradient-custom">
        <div className="w-100">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <h3 className="mb-4 pb-2">Add Banner</h3>
                  <Formik
                    initialValues={{
                      describe: "",
                      bannerImage: "",
                      bannerImageName:''
                    }}
                    validationSchema={Yup.object({})}
                    onSubmit={(values, { setSubmitting }) => {
                      const storage = getStorage();
                      const storageRef = ref(
                        storage,
                        "images/" + values.bannerImage.name
                      );
                      const uploadTask = uploadBytesResumable(
                        storageRef,
                        values.bannerImage
                      );
                      setTimeout(() => {
                        setSubmitting(false);
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
                                setBanner(downloadURL);
                                addDoc(bannerRef, {
                                  bannerImage: downloadURL,
                                  bannerImageName: values.bannerImage.name,
                                  describe: values.describe,
                                })
                                  .then(() => {
                                    toast.success("Add Successfully");
                                    values.bannerImage = "";
                                    values.describe = "";
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
                                name="describe"
                                className="form-control"
                              />
                              <label className="form-label" htmlFor="title">
                                Describe
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-6 mb-4">
                          <h6 className="mb-2 pb-1">Banner Image</h6>
                          <input
                            type="file"
                            name="bannerImage"
                            onChange={(e) => {
                              if (e.target.files) {
                                setFieldValue("bannerImage", e.target.files[0]);
                                console.log(e.target.files[0]);
                              }
                            }}
                          />
                        </div>

                        <div className="col-md-12 mb-4">
                          <img
                            src={banner}
                            className="w-100"
                            style={{ objectFit: "cover" }}
                          />
                        </div>

                        <button
                          disabled={isSubmitting}
                          type="submit"
                          className="btn btn-success p-2"
                        >
                          Add Banner
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

export default AddBanner;
