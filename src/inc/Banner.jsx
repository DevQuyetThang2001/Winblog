// eslint-disable-next-line no-unused-vars
import { collection, onSnapshot } from "firebase/firestore";
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { db } from "../firebase/firebase-config";
import BannerSkeleton from "../components/BannerSkeleton";

const Banner = () => {
  const bannerRef = collection(db, "Banner");
  const [loading, setLoading] = useState(false);
  const [banners, setBanners] = useState([]);
  useEffect(() => {
    setLoading(true);
    onSnapshot(bannerRef, (snapshot) => {
      let Basners = [];
      snapshot.docs.forEach((item) => {
        Basners.push({
          id: item.id,
          ...item.data(),
        });
      });

      setBanners(Basners);
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log("Banner ~ ", banners);

  return (
    <>
      {loading && <BannerSkeleton />}
      <Carousel data-bs-theme="light" className="rounded-4 overflow-hidden">
        {banners.length > 0 &&
          banners.map((item, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={item.bannerImage}
                alt="First slide"
                style={{
                  width: "100%",
                  height: "600px",
                  objectFit: "cover",
                }}
              />
              <Carousel.Caption
                className="fs-4"
                style={{
                  margin: "240px 0",
                  fontSize: "70px",
                  fontWeight: "bold",
                  textShadow: "0 0 3px black, 0 0 5px black",
                }}
              >
                {item.describe}
              </Carousel.Caption>
            </Carousel.Item>
          ))}
      </Carousel>
    </>
  );
};

export default Banner;
