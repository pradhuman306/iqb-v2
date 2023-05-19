import React, { useContext, useState } from "react";
import SideNav from "../pages/SideNav";
import AuthContext from "../context/authContext";
import CustomLoader from "../pages/Customloader";
import HeaderContainer from "../pages/Header/HeaderContainer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
function LayoutContainer({ children, auth }) {
  const [pending, setPending] = useState(false);
  
  // const location = useLocation();
  // const [displayLocation, setDisplayLocation] = useState(location);
  // const [transitionStage, setTransistionStage] = useState("fadeInroute");

  // useEffect(() => {
  //   if (location !== displayLocation) setTransistionStage("fadeOutroute");
  // }, [location, displayLocation]);
  // const customerChange = (para) => {
  //   setPending(true);
  //   setTimeout(() => {
  //     setPending(false);
  //   }, 2000);
  // };

  // useEffect(() => {
  //   if (document.querySelectorAll(".btn").length > 0) {
  //     document.querySelectorAll(".btn").forEach((item) => {
  //       let attr = item.getAttribute("data-bs-toggle");
  //       if (attr === "modal") {
  //         if (document.querySelector(".fadeInroute") !== null) {
  //           document
  //             .querySelector(".fadeInroute")
  //             .classList.remove("fadeInroute");
  //           console.log(document.querySelector(".fadeInroute"));
  //         }
  //       }
  //     });
  //   }
  // }, [location.pathname]);

  return (
    <>
      <AuthContext.Provider value={{ ...auth }}>
      <HeaderContainer role={auth} />
        <main className="d-flex">
          {!pending ? (
            <>
              <SideNav
                role={auth}
                // parentCallback={(para) => {
                //   customerChange(para);
                // }}
              />
              
                <section className="body-main" >
                  {children}
                </section>{" "}
              
            </>
          ) : (
            <div className="full-body-loader">
              <CustomLoader />
            </div>
          )}
         
        </main>
      </AuthContext.Provider>
    </>
  );
}

export default LayoutContainer;
