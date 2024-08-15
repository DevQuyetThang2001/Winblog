// eslint-disable-next-line no-unused-vars
import React from "react";
import { Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PostSkeleton from "./PostSkeleton";

// eslint-disable-next-line react/prop-types
const Posts = ({ posts, loading }) => {
  const navigate = useNavigate();
  if (loading)
    return (
      <Row>
        <PostSkeleton />
      </Row>
    );
  return (
    <Row>
      {posts.map((post, index) => (
        <Col key={index} xs={12} lg={4} md={6} className="mt-2">
          <Card className="p-2 h-100" style={{ width: "100%" }}>
            <Card.Img
              style={{ width: "100%", height: "300px", objectFit: "cover" }}
              variant="top"
              src={post.image}
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title>{post.title}</Card.Title>
              <button
                onClick={() => navigate(`/${post.slug}`)}
                className="btn btn-primary p-2 d-block mt-auto"
              >
                Read More
              </button>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default Posts;
