import React, { useContext } from "react";
import AuthContext from "../../context/authContext";
import { useLocation, Link } from "react-router-dom";
function UserMenu(props) {
  const path = useLocation().pathname;
  const auth = useContext(AuthContext);
  const { role } = auth;
  const locale = props.locale;
  console.log(locale);
  return (
    <>
      {["customer", "super_admin"].includes(role) && (
        <ul className="management-menu">
          <li
            className={
              path === "/user-management" || path === "/user-access-mannagement"
                ? "active"
                : ""
            }
          >
            <a
              href=""
              role="button"
              id="questionnaireMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {/* <img src="/assets/images/icon-customer-setting.svg" alt="" /> */}

              {locale.User}
              {/* <span className="arrow-icon">
                <img src="/assets/images/icon-arrow-down.svg" alt="" />
              </span> */}
            </a>
            <ul className="dropdown-menu" aria-labelledby="questionnaireMenu">
              <li>
                <Link to="/user-management">
                  {/* <img
                          src="/assets/images/icon-customer-setting.svg"
                          alt=""
                        /> */}
                  {locale.Management}
                </Link>
              </li>

              {role === "customer" && (
                <li>
                  <Link to={"/user-access-mannagement"}>
                    {/* <img
                            src="/assets/images/icon-customer-setting.svg"
                            alt=""
                          /> */}
                    {locale.Permissions}
                  </Link>
                </li>
              )}
            </ul>
          </li>
        </ul>
      )}
      {["customer", "super_admin"].includes(role) && (
        <ul className="management-menu">
          <li
            className={
              path === "/customer-management" || path === "/customer-style"
                ? "active"
                : ""
            }
          >
            <a
              href=""
              role="button"
              id="customerMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {/* <img src={`/assets/images/icon-customer-setting.svg`} alt="" /> */}
              {/* {selected.name} */}
              {locale.Customer}

              {/* <span className="arrow-icon">
                <img src="/assets/images/icon-arrow-down.svg" alt="" />
              </span> */}
            </a>
            <ul className="dropdown-menu" aria-labelledby="customerMenu">
              {role == "super_admin" && (
                <li>
                  <Link to="/customer-management">
                    {/* <img
                            src="/assets/images/icon-customer-setting.svg"
                            alt=""
                          /> */}
                    {locale.Management}
                  </Link>
                </li>
              )}
              {role === "customer" && (
                <li>
                  <Link to="/customer-style">
                    {/* <img
                            src="/assets/images/icon-customer-style.svg"
                            alt=""
                          /> */}
                    {locale.Style}
                  </Link>
                </li>
              )}
            </ul>
          </li>
        </ul>
      )}
      {role === "super_admin" && (
        <ul className="management-menu">
          <li
            className={
              path === "/questionnaire-access-management" ||
              path === "/questionnaire-management"
                ? "active"
                : ""
            }
          >
            <a
              href=""
              role="button"
              id="questionnaireMenu"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {/* <img src="/assets/images/icon-management.svg" alt="" /> */}

              {locale.Questionnaire}
              {/* <span className="arrow-icon">
                <img src="/assets/images/icon-arrow-down.svg" alt="" />
              </span> */}
            </a>
            <ul className="dropdown-menu" aria-labelledby="questionnaireMenu">
              <li>
                <Link to="/questionnaire-management">
                  {/* <img src="/assets/images/icon-management.svg" alt="" /> */}

                  {locale.Management}
                </Link>
              </li>
              {["super_admin"].includes(role) && (
                <li>
                  <Link
                    to={
                      role == "super_admin"
                        ? "/questionnaire-access-management"
                        : "/user-access-mannagement"
                    }
                  >
                    {/* <img
                            src="/assets/images/icon-customer-setting.svg"
                            alt=""
                          /> */}

                    {locale.Permissions}
                  </Link>
                </li>
              )}
            </ul>
          </li>
          {role === "customer" && (
            <li>
              <Link to="/customer-style">
                {/* <img src="/assets/images/icon-customer-style.svg" alt="" /> */}

                {locale.Style}
              </Link>
            </li>
          )}
        </ul>
      )}

      
      
    </>
  );
}

export default UserMenu;
