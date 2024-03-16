import React from "react";

const ResellingOption = ({ reselling, setReselling }) => {
  return (
    <div className="">
      <div className="reselling_order">
        <span>
          <h2>Reselling the Order?</h2>
        </span>
        <span className="clickon">
          <p>click on 'Yes' to add Final Price</p>
        </span>
      </div>
      <div>
        <span className="resellingbtn ">
          <button onClick={() => setReselling(false)}>No</button>
          <button onClick={() => setReselling(true)}>Yes</button>
        </span>
        <span></span>
      </div>
    </div>
  );
};

export default ResellingOption;
