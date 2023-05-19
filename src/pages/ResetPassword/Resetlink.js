import React, { useState, useCallback, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ResetEmailSend } from "../../actions/auth";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha,
  useGoogleReCaptcha,
} from "react-google-recaptcha-v3";
function Resetlink() {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isVerified, setVerified] = useState(false);
  const [error, setError] = useState({});
  const dispatch = useDispatch();

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
    if (!isVerified) {
      handleReCaptchaVerify();
    }
  }, [handleReCaptchaVerify]);

  return (
    <>
      <section className="login-main">
        <div className="column after-layer before-layer">
          <div className="login-head text-center mb-4">
            <a href="">
              <img src="/assets/images/logo.svg" className="image" />
            </a>
          </div>
          <div className="c-card">
            <div className="c-card-wrap">
              <div className="form-header text-center mb-4">
                <img src="/assets/images/right.png" className="right-image" />
                <h1>Reset link sent successfully!</h1>
              </div>
              <div className="login-form">
                <p className="text-center">
                  Password reset link sent succeessfully to your email address
                  please click on the link to reset password!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Resetlink;
