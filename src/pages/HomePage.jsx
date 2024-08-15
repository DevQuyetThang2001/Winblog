// eslint-disable-next-line no-unused-vars
import React, { useEffect } from "react";
import Banner from "../inc/Banner";
import PostCategory from "../components/PostCategory";
import { useAuth } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
import { memo } from 'react';
import Pricing from "../components/Pricing";
import ScrollToTop from "react-scroll-to-top";

const HomePage = () => {
  const {userInfo} = useAuth();
  const navigate = useNavigate();
  // console.log(userInfo);
  useEffect(() => {
    const timer = setTimeout(() => {
      if(!userInfo?.email){
        navigate("sign-in")
      }
    },3000)

    return () => {
      clearTimeout(timer)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <>
      <Banner />
      <PostCategory title="Blog"></PostCategory>
      <Pricing/>
      <ScrollToTop smooth color="#fff" className="bg-success"/>
    </>
  );
};

export default memo(HomePage);
