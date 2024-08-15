// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import PostItem from "./PostItem";
import { collection, limit, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/firebase-config";
import PostSkeleton from "./PostSkeleton";

// eslint-disable-next-line react/prop-types
const PostCategory = ({ title }) => {
  const postRef = collection(db, "Posts");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const q = query(postRef,limit(6));
    let posts = [];
    onSnapshot(q, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        posts.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setPosts(posts);
      // console.log(posts);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="container mt-5">
      <h1 className="text-center">{title}</h1>
      <Row>
        {!loading && posts.length > 0 ? (
          posts.map((item, index) => <PostItem key={index} item={item} />)
        ) : (
          <PostSkeleton />
        )}
      </Row>
    </div>
  );
};

export default PostCategory;
