import React from "react";
import spinnerImg from "./spinner.gif";

let Spinner = () => {
  return (
    <React.Fragment>
      <div>
        <img src={spinnerImg} alt="" className="d-block m-auto" />
      </div>
    </React.Fragment>
  );
};
export default Spinner;
