import React from "react";
import { ReactNode } from "react";
import "./auth.scss";

interface authScreenInterface {
  title?: string;
  children: ReactNode;
  submit?: Function;
}

// INFO: THIS COMPONENT IS WRAPPER FOR LOGIN/SIGNUP COMPONENTS
function AuthScreenWrapper({
  title = "Enter Title",
  children,
  submit,
}: authScreenInterface) {
  return (
    <div className="authscreen">
      <div className="authscreen__background">
        <div className="authscreen__background__shape"></div>
        <div className="authscreen__background__shape"></div>
      </div>
      {/* @ts-ignore */}
      <form className="authscreen__form" onSubmit={submit}>
        <h3>{title}</h3>
        {children}
      </form>
    </div>
  );
}
export default AuthScreenWrapper;
