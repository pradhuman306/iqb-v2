import React from "react";
import HeaderContainer from "../Header/HeaderContainer";

import "tippy.js/dist/tippy.css";

function Invoicing(props) {
  const locale = props.locale;
  return (
    <>
      {/* <HeaderContainer {...props} title={locale.Invoicing} /> */}
      <div className="body-content"></div>
    </>
  );
}

export default Invoicing;
