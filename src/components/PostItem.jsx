
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Card,  Col,  } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



const PostItem = ({ item }) => {
  const navigate = useNavigate();
  return (
    <Col xs={12} lg={4} md={6} className="mt-2">
      <Card className="p-2 h-100" style={{ width: "100%" }}>
        <Card.Img style={{width:'100%', height:'300px',objectFit:'cover'}} variant="top" src={item.image} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{item.title}</Card.Title>
          <button onClick={() => navigate(`/${item.slug}`)} className="btn btn-primary p-2 d-block mt-auto">Read More</button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default PostItem;
