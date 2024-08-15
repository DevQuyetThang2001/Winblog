import { collection, onSnapshot } from "firebase/firestore";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebase-config";
import Posts from "../components/Posts";
import Pagination from "../components/Pagination";
import ScrollToTop from "react-scroll-to-top";
const BlogPage = () => {
  const postRef = collection(db, "Posts");
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(6);

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    onSnapshot(postRef, (snapshot) => {
      let Posts = [];
      snapshot.docs.forEach((item) => {
        Posts.push({
          id: item.id,
          ...item.data(),
        });
      });

      setPosts(Posts);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log("Posts ~ ", posts);
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1 className="fs-4 text-center">All Blog</h1>
      <Posts posts={currentPost} loading={loading} />
      <div style={{ margin: "30px auto", width: "200px" }}>
        <Pagination
          postPerPage={postPerPage}
          totalPost={posts.length}
          paginate={paginate}
        />
      </div>
      <ScrollToTop smooth color="#fff" className="bg-success"/>
    </div>
  );
};

export default BlogPage;
