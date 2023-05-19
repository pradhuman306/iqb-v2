import React from "react";
import HeaderContainer from "../Header/HeaderContainer";

function Customer(props) {
  const locale = props.locale;
  return (
    <>
      {/* <HeaderContainer {...props} title={locale.Home} /> */}
      <div className="body-content">
      <div className="body-content-wrap">
      <h1 className="mt-0 mb-1">
          {locale.Hello} 👋{" "}
          {props.auth.userdata.firstname + " " + props.auth.userdata.lastname},
        </h1>
        <h4 className="sub-heading mb-3">{locale.Welcome_note}</h4>
        <p>{locale.Customer_welcome_content}</p>
        <div className="alert alert-warning">{locale.Note}</div>
      </div>
      </div>
    </>
  );
}

export default Customer;
