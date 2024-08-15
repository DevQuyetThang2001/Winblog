// eslint-disable-next-line no-unused-vars
import React from "react";

const BannerSkeleton = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center placeholder rounded-4"
      style={{ height: "600px", width: "100%" }}
    >
      <span className="d-block placeholder bg-secondary rounded-2 w-50 p-3"></span>
    </div>
  );
};

export default BannerSkeleton;
