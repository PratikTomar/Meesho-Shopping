import React from "react";

const SlideEditContainer = ({ children, show }) => {
  return (
    <>
      {show && (
        <div className="slideEditContainer">
          <div className="slideEdit">{children}</div>
        </div>
      )}
    </>
  );
};

export default SlideEditContainer;

