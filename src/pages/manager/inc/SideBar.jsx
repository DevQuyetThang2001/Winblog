import React from "react";
import { Link } from "react-router-dom";

const SideBar = () => {
  return (
    <div className="col-12 col-md-3 col-xl-5 px-sm-2 px-0 bg-dark">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white">
        <a
          href="/"
          className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-5 d-none d-sm-inline text-light">ADMIN</span>
        </a>
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li className="nav-item">
            <Link to={"/dashboard"} className="nav-link align-middle px-0">
              <i className="fs-4 bi-house"></i>
              <span className="ms-1 d-none d-sm-inline text-light">Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/manage/posts"} className="nav-link align-middle px-0">
              <i className="fs-4 bi-house"></i>
              <span className="ms-1 d-none d-sm-inline text-light">Posts</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/manage/add-post"} className="nav-link align-middle px-0">
              <i className="fs-4 bi-house"></i>
              <span className="ms-1 d-none d-sm-inline text-light">Add Posts</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/manage/add-banner"} className="nav-link align-middle px-0">
              <i className="fs-4 bi-house"></i>
              <span className="ms-1 d-none d-sm-inline text-light">Add Banner</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
