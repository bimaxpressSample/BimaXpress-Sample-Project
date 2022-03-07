import React from "react";
import logo from "../../assets/images/logo.svg";

const LogoNav = () => {
  return (
    <div className="flex items-center justify-center bg-primary px-4 py-3  border-fontColor-darkGray">
      <img src={logo} alt="logo" />
    </div>
  );
};

export default LogoNav;
