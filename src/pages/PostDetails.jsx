// eslint-disable-next-line no-unused-vars
import { collection, onSnapshot, query, where } from "firebase/firestore";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "../firebase/firebase-config";

const PostDetails = () => {
  const { slug } = useParams();
  const [PostDetail, setPostDetail] = useState([]);

  // console.log("slug ~ ", slug);
  const postRef = collection(db, "Posts");
  useEffect(() => {
    const q = query(postRef, where("slug", "==", `${slug}`));
    let posts = [];
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      // console.log("posts ~ ", posts);
      setPostDetail(posts);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log("PostDetail ~ ", PostDetail);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-12">
          {PostDetail.length > 0 &&
            PostDetail.map((item, index) => (
              <article key={index}>
                <header className="mb-4">
                  <h1 className="fw-bolder mb-1">{item.title}</h1>
                  <span
                    className="badge bg-secondary text-decoration-none link-light"
                    href="#!"
                  >
                    Web Design
                  </span>

                  <Link className="p-2 text-decoration-none d-inline-block" to={'/'}>Home</Link>/ {slug}
                </header>

               

                <figure className="mb-4">
                  <img
                    className="img-fluid rounded w-100" style={{height:'400px', objectFit:'contain'}}
                    src={item.image}
                    alt="..."
                  />
                </figure>

                <section className="mb-5">
                  <p className="fs-5 mb-4">
                    {item.describe}
                  </p>

                  <h8 className="fw-bolder mb-4 mt-5">
                    Author : {item.author}
                  </h8>
                </section>
              </article>
            ))}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
