import React from "react";
import "../../style/LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      Loading...
      <div className="loading-spinner-sector loading-spinner-sector-red"></div>
      <div className="loading-spinner-sector loading-spinner-sector-blue"></div>
      <div className="loading-spinner-sector loading-spinner-sector-green"></div>
    </div>
  );
};

export default LoadingSpinner;
