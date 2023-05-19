import React, { useState, useCallback, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions/auth";
import { useNavigate, Link, useParams, useLocation } from "react-router-dom";
import * as Cokkie from "../../common/Cookies";

import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
import { GetStyleByCustomer } from "../../actions/customerAction";
import CustomLoader from "../Customloader";
import {
  REMOVE_STYLE_PENDING,
  SET_STYLE_PENDING,
} from "../../constants/actionTypes";
import ButtonLoader from "../Customloader/ButtonLoader";
const Signin = () => {
  const message = useSelector((state) => state.toasterReducer);
  let path = useLocation().pathname;
  let newPath = path.replaceAll("/", "");

  localStorage.setItem("logged_in_route", btoa(path));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const email = Cokkie.getCookie("email") ? Cokkie.getCookie("email") : "";
  const password = Cokkie.getCookie("password")
    ? Cokkie.getCookie("password")
    : "";
  const remember =
    Cokkie.getCookie("email") && Cokkie.getCookie("password") ? true : false;

  const { executeRecaptcha } = useGoogleReCaptcha();
  const auth = useSelector((state) => state.authReducer);
  let style = useSelector((state) => state.styleReducer).style || null;
  let pending = useSelector((state) => state.styleReducer).pending;
  const [pendingLogin, setPendingLogin] = useState(false);
  if (newPath === "signin") {
    style = null;
    pending = false;
    document.documentElement.style.removeProperty("--baseFont");
    document.documentElement.style.removeProperty("--baseFontsize");
    document.documentElement.style.removeProperty("--themeColor");
    document.documentElement.style.removeProperty("--acentColor");
    const link = document.createElement("link");
    link.href = "/assets/images/logo.svg";
    link.rel = "shortcut icon";
    document.getElementsByTagName("head")[0].appendChild(link);
  }
  const [isVerified, setVerified] = useState(false);
  const [error, setError] = useState({});
  const [signInPending, setsignInPending] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setsignInPending(false);
    }, 1000);
  }, []);

  // console.log(style);

  if (auth.isAuthenticated) {
    navigate("/dashboard");
  }

  const onChange = (value) => {
    if (value) {
      setVerified(true);
    }
  };

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }
    const token = await executeRecaptcha("yourAction");
  }, []);

  useEffect(() => {
    setPendingLogin(false);
  }, [message]);

  useEffect(() => {
    if (!isVerified) {
      handleReCaptchaVerify();
    }
  }, [handleReCaptchaVerify]);
  useEffect(() => {
    if (params && params.customer) {
      dispatch({ type: SET_STYLE_PENDING });
      dispatch(GetStyleByCustomer(params.customer));
    }
  }, []);
  const buttonStyle =
    style && style.iqbstyle
      ? {
          background: style.iqbstyle.secondary_color,
          color: style.iqbstyle.primary_color,
          borderColor: style.iqbstyle.secondary_color,
        }
      : {};
  const fontFamilylink = document.createElement("link");
  if (style && style.iqbstyle) {
    document.documentElement.style.setProperty(
      "--baseFont",
      style.iqbstyle.font_family
    );
    fontFamilylink.href =
      "http://fonts.googleapis.com/css2?family=" +
      style.iqbstyle.font_family.replaceAll(" ", "+") +
      ":wght@400;500;600;700&display=swap";
  } else {
    fontFamilylink.href =
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap";
  }
  fontFamilylink.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(fontFamilylink);

  return (
    <>
      <section className="login-main">
      <div className="login-main-wrapper">
        {!signInPending ? (
          <div className="column">
            <div className="login-head text-center mb-4">
              <a href="#">
                <img
                  src={
                    style && style.iqbstyle
                      ? style.iqbstyle.logo
                      : "/assets/images/logo.svg"
                  }
                  className="image"
                />
              </a>
            </div>
            <div className="c-card  after-layer before-layer">
              <div className="c-card-wrap">
                <div className="form-header text-center mb-4">
                  <h1>Login</h1>
                  <div>Use your email to continue with IQB</div>
                </div>
                <div className="login-form">
                  <Formik
                    initialValues={{
                      email: email,
                      password: password,
                      rememberme: remember,
                    }}
                    validate={(values) => {
                      const errors = {};

                      if (!values.email) {
                        errors.email = "Please enter email address";
                      } else if (
                        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                          values.email
                        )
                      ) {
                        errors.email = "Invalid email address";
                      }

                      if (!values.password) {
                        errors.password = "Please enter password";
                      }
                      setError({ ...errors });
                      return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                      setPendingLogin(true);
                      dispatch(login(values));
                      setSubmitting(false);
                    }}
                  >
                    {({ isSubmitting, dirty, handleReset, touched }) => (
                      <Form action="" id="loginForm">
                        <div className="form-group mb-3">
                          <label>Email Address</label>
                          <Field
                            type="text"
                            name="email"
                            className={`form-control icon icon-email ${
                              touched.email && error.email ? "input-error" : ""
                            }`}
                            placeholder="Enter your email"
                          />
                          <ErrorMessage
                            className="error"
                            name="email"
                            component="span"
                          />
                        </div>
                        <div className="form-group">
                          <label>Password</label>
                          <Field
                            type="password"
                            name="password"
                            className={`form-control icon icon-lock ${
                              touched.password && error.password
                                ? "input-error"
                                : ""
                            }`}
                            placeholder="Enter your password"
                          />
                          <ErrorMessage
                            className="error"
                            name="password"
                            component="span"
                          />
                        </div>
                        <div>
                        <GoogleReCaptchaProvider reCaptchaKey="6Lc3PA0gAAAAAFYHbs-xTdR2Kfd72HhE_IPgvVEw">
                          <GoogleReCaptcha onVerify={onChange} />
                        </GoogleReCaptchaProvider>
                      </div>
                        <div className="form-group d-flex align-items-center justify-content-between cus-pd">
                          <div className="form-check">
                            <Field
                              className="form-check-input"
                              type="checkbox"
                              name="rememberme"
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexCheckDefault"
                            >
                              Remember me
                            </label>
                          </div>
                          <Link to="/reset-password">Forgot Password</Link>
                        </div>
                        <div className="mb-3">
                        <GoogleReCaptchaProvider reCaptchaKey="6LcG418jAAAAADXWA49EzMg4nU8RQZ0kUJJTbQ2S">
                            <GoogleReCaptcha onVerify={onChange} />
                          </GoogleReCaptchaProvider>
                           </div>
                        <div className="form-group">
                          {/* <button type="submit" disabled={isSubmitting || !isVerified} style={buttonStyle}className="btn btn-primary w-100"> */}
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            style={buttonStyle}
                            className="btn btn-primary w-100"
                          >
                            {pendingLogin ? <ButtonLoader /> : "Login"}
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="main-loader">
            <CustomLoader />
          </div>
        )}
        <Footer />
        </div>
      </section>
      
    </>
  );
};

export default Signin;
