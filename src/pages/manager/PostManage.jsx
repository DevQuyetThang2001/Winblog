import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { db } from "../../firebase/firebase-config";
import { toast } from "react-toastify";

const PostManage = () => {
  const [posts, setPosts] = useState([]);
  const postRef = collection(db, "Posts");

  useEffect(() => {
    onSnapshot(postRef, (snapshot) => {
      let Posts = [];
      snapshot.docs.forEach((item) => {
        Posts.push({
          id: item.id,
          ...item.data(),
        });
      });
      setPosts(Posts);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeletePost = async (id) => {
    try{
      await deleteDoc(doc(db, "Posts", id))
      setPosts(posts.filter(e => e.id != id))
      toast.error("Delete Successfully")
    }catch(err){
      console.log(err);
      
    }
  };

  return (
    <table className="table align-middle mb-0 bg-white">
      <thead className="bg-light">
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Author</th>
          <th>Slug</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {posts.length > 0 &&
          posts.map((item) => (
            <tr key={item.id}>
              <td>
                <div className="d-flex align-items-center">
                  <img
                    src={item.image}
                    alt=""
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                  />
                </div>
              </td>
              <td>
                <p className="fw-normal mb-1">{item.title}</p>
              </td>
              <td>
                <span className="fw-normal mb-1">{item.author}</span>
              </td>
              <td>{item.slug}</td>
              <td>
                <span className="fw-normal mb-1">{item.status}</span>
              </td>
              <td>
                <button
                  type="button"
                  className="btn btn-link btn-sm btn-rounded"
                  onClick={() => handleDeletePost(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
};

export default PostManage;
