import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Select from "react-select";
import { langs } from "../../locale/localization";

import { signout } from "../../actions/auth";
import {
  getSingleCustomerPermission,
  GetStyle,
} from "../../actions/customerAction";
import {
  GetQuetionnaireTypes,
  GetUsersPermissionList,
} from "../../actions/questioerAction";
import {
  SET_DOC_DATA,
  SET_PDF_DATA,
  SET_USER_SELECTED_CUSTOMER,
  SUCCESS_MESSAGE,
} from "../../constants/actionTypes";
import UserMenu from "../Header/UserMenu";

function SideNav(props) {
  const dispatch = useDispatch();

  const style = useSelector((state) => state.styleReducer).style || null;
  const locale = langs(useSelector((state) => state.langReducer).locale);
  const questionaireTypes = useSelector(
    (state) => state.questionnaireReducer
  ).questionnaireList;

  const userPermissionList = useSelector(
    (state) => state.getuserlistReducer
  ).usersList;
  const [permission, setPermission] = useState([]);
  useEffect(() => {
    userPermissionList.map((item) => {
      if (props.role.userdata.id === item.user_id) {
        setPermission(item.permission);
      }
    });
  }, [userPermissionList]);

  const customerdata = localStorage.getItem("customerdata")
    ? JSON.parse(localStorage.getItem("customerdata"))
    : null;
  const selCustomer = localStorage.getItem("selCustomer")
    ? JSON.parse(localStorage.getItem("selCustomer"))
    : customerdata
      ? customerdata[0]
      : null;

  let customerList = [];
  if (customerdata !== null && props.role.role === "user") {
    customerdata.forEach((element) => {
      customerList.push({
        label: element.companydata.name,
        value: element,
        isDisabled: element.permission.length < 1 ? true : false,
      });
    });
  }
  let index = 0;
  if (props.role.role === "user") {
    index = customerdata.findIndex((object) => {
      return object.data.id === selCustomer.data.id;
    });
  }
  const [selectValue, setSelectvalue] = useState({
    selectCustomer: index,
  });

  const selectCustomer = (e) => {
    dispatch(GetStyle({ customer_id: e.value.data.id }));
    dispatch({ type: SET_PDF_DATA, payload: [] });
    dispatch({ type: SET_DOC_DATA, payload: [] });
    setTimeout(() => {
      dispatch({
        type: SUCCESS_MESSAGE,
        payload: e.value.companydata.name + locale.Selected_successfully,
      });
    }, 2000);

    dispatch({
      type: SET_USER_SELECTED_CUSTOMER,
      payload: e.value,
    });
    index = customerdata.findIndex((object) => {
      return object.data.id === e.value.data.id;
    });
    setSelectvalue({ ...selectValue, selectCustomer: index });
    // localStorage.setItem("selCustomer", JSON.stringify(e.value));
    console.log(selectValue["selectCustomer"]);
    props.parentCallback(true);
  };

  const role = props.role.role;
  const path = useLocation().pathname;
  let name = "";

  let newData = localStorage.getItem("userdata")
    ? JSON.parse(localStorage.getItem("userdata"))
    : props.role.userdata;

  if (props.role.userdata || localStorage.getItem("userdata")) {
    name = newData.firstname + " " + newData.lastname;
  }

  const logout = (e) => {
    document.body.classList.remove("menu-open");
    dispatch(signout(locale));
  };

  const handleClick = () => {
    document.body.classList.toggle("menu-open");

    const navIcon = document.getElementById("nav-icon");

    navIcon.classList.toggle("open");
  };
  let customerPermissionList = useSelector(
    (state) => state.customerPermissionsReducer
  ).customerPermissionsList;
  let customerPermId = [];
  console.log(customerPermissionList);
  useEffect(() => {
    dispatch(GetQuetionnaireTypes());
    dispatch(GetUsersPermissionList());
    if (props.role.role === "user") {
      dispatch(
        getSingleCustomerPermission(
          customerdata[selectValue["selectCustomer"]].data.id
        )
      );
    }

    // if (props.role.role === "user") {
    //   console.log(selCustomer);
    //   dispatch(GetStyle({ customer_id: selCustomer.data.id }));
    // }
  }, []);

  useEffect(() => {
    if (props.role.role === "user") {
      dispatch(
        getSingleCustomerPermission(
          customerdata[selectValue["selectCustomer"]].data.id
        )
      );
    }
  }, [selectValue]);

  useEffect(() => {
    if (customerPermissionList !== null) {
      customerPermissionList.forEach((item) => {
        if (!customerPermId.includes(item.id)) {
          customerPermId.push(item.id);
        }
      });
    }
  }, [customerPermissionList]);

  return (
    <aside className="sidebar">
      <div className="sidebar-wrap">
        {/* <div className="sidebar-header">
          <figure>
            <img
              src={
                ["super_admin"].includes(role)
                  ? "/assets/images/logo.svg"
                  : style && style.iqbstyle
                  ? style.iqbstyle.logo
                  : "/assets/images/logo.svg"
              }
              alt=""
            />
          </figure>
          <label>
            <span>{name}</span>
            {role === "super_admin"
              ? locale.Admin
              : role === "customer"
              ? locale.Customer
              : role === "user"
              ? locale.User
              : ""}
          </label>
        </div> */}
        <div className="sidebar-body">
          {/* {   props.role !== "super_admin" &&
                        ( */}
          <div className="sidebar-nav-title">Navigations</div>
          <ul>
            <li
              onClick={(e) => {
                handleClick(e);
              }}
              className={path === "/dashboard" ? "active" : ""}
            >
              <Link to="/dashboard">

                <svg className="icon-dashboard" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="M10,13H4a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V14A1,1,0,0,0,10,13ZM9,19H5V15H9ZM20,3H14a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,20,3ZM19,9H15V5h4Zm1,7H18V14a1,1,0,0,0-2,0v2H14a1,1,0,0,0,0,2h2v2a1,1,0,0,0,2,0V18h2a1,1,0,0,0,0-2ZM10,3H4A1,1,0,0,0,3,4v6a1,1,0,0,0,1,1h6a1,1,0,0,0,1-1V4A1,1,0,0,0,10,3ZM9,9H5V5H9Z" /></svg>

                <span>{locale.Home}</span>
              </Link>
            </li>
            {role == "super_admin" && (
              <li className={path === "/invoicing" ? "active" : ""}>

                <Link to="/invoicing">

                  <svg className="icon-dashboard" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="M9.5,10.5H12a1,1,0,0,0,0-2H11V8A1,1,0,0,0,9,8v.55a2.5,2.5,0,0,0,.5,4.95h1a.5.5,0,0,1,0,1H8a1,1,0,0,0,0,2H9V17a1,1,0,0,0,2,0v-.55a2.5,2.5,0,0,0-.5-4.95h-1a.5.5,0,0,1,0-1ZM21,12H18V3a1,1,0,0,0-.5-.87,1,1,0,0,0-1,0l-3,1.72-3-1.72a1,1,0,0,0-1,0l-3,1.72-3-1.72a1,1,0,0,0-1,0A1,1,0,0,0,2,3V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V13A1,1,0,0,0,21,12ZM5,20a1,1,0,0,1-1-1V4.73L6,5.87a1.08,1.08,0,0,0,1,0l3-1.72,3,1.72a1.08,1.08,0,0,0,1,0l2-1.14V19a3,3,0,0,0,.18,1Zm15-1a1,1,0,0,1-2,0V14h2Z" /></svg>

                  <span>{locale.Invoicing}</span>
                </Link>


              </li>

            )}




            {["super_admin", "user"].includes(role) &&
              customerPermissionList !== null &&
              questionaireTypes.map((element, i) =>
                customerPermissionList.map((custPermission) =>
                  custPermission.id === element.id ? (
                    <li
                      key={i}
                      className={
                        path === "/questionnaire/" + element.id ? "active" : ""
                      }
                      onClick={(e) => {
                        handleClick(e);
                      }}
                    >
                      {permission.map(
                        (item) =>
                          item.id === element.id && (
                            <Link
                              to={"/questionnaire/" + element.id}
                              key={item.id}
                            >
                              

<svg  className="icon-fee"
                                width="24"
                                height="24" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
	 viewBox="0 0 488.9 488.9" >
<g>
	<g>
		<g>
			<path d="M438.9,126.9L332.8,7.3c-4.2-5.2-9.4-7.3-15.6-7.3H65.5C54.1,0,44.7,9.4,44.7,20.8v447.3c0,11.4,9.4,20.8,20.8,20.8
				h357.9c11.4,0,19.8-9.4,20.8-19.8V140.5C444.1,135.3,442.1,131.1,438.9,126.9z M337,73.6l40.7,46.1H337V73.6z M402.5,448.4
				l-316.2,0V40.6h210.1v98.8c0,11.4,9.4,20.8,20.8,20.8h85.3V448.4z"/>
			<path d="M136.2,235.1c0,11.4,9.4,20.8,20.8,20.8h174.8c11.4,0,20.8-9.4,20.8-20.8c0-11.4-9.4-20.8-20.8-20.8H157
				C145.6,214.3,136.2,223.7,136.2,235.1z"/>
			<path d="M331.8,343.3H157c-11.4,0-20.8,9.4-20.8,20.8c0,11.4,9.4,20.8,20.8,20.8h174.8c11.4,0,20.8-9.4,20.8-20.8
				C352.6,352.7,343.2,343.3,331.8,343.3z"/>
		</g>
	</g>
</g>
</svg>

                            
                              <span>{element.value}</span>
                            </Link>
                          )
                      )}
                    </li>
                  ) : (
                    ""
                  )
                )
              )}
          <li
              onClick={(e) => {
                handleClick(e);
              }}
              className={path === "/settings" ? "active" : ""}
            >
              <Link to="/settings">
              <svg className="icon-settings" width="24px" height="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 330 330">
<g id="XMLID_808_">
	<path id="XMLID_809_" d="M165,105c-33.084,0-60,26.916-60,60s26.916,60,60,60s60-26.916,60-60S198.084,105,165,105z M165,195
		c-16.542,0-30-13.458-30-30s13.458-30,30-30s30,13.458,30,30S181.542,195,165,195z"/>
	<path id="XMLID_812_" d="M319.806,202.752l-35.009-30.767c0.135-2.331,0.203-4.664,0.203-6.985c0-2.322-0.068-4.655-0.203-6.986
		l35.007-30.766c5.371-4.72,6.663-12.575,3.088-18.767l-30-51.962c-3.575-6.192-11.025-9.001-17.797-6.709l-44.142,14.934
		c-3.901-2.572-7.946-4.912-12.109-7.006l-9.136-45.68C208.307,5.047,202.15,0,195,0h-60c-7.15,0-13.307,5.047-14.709,12.058
		l-9.136,45.68c-4.163,2.094-8.207,4.435-12.108,7.006L54.902,49.81c-6.77-2.29-14.221,0.517-17.797,6.709l-30,51.962
		c-3.575,6.192-2.283,14.047,3.088,18.767l35.008,30.766C45.067,160.342,45,162.675,45,165s0.067,4.659,0.202,6.986l-35.008,30.766
		c-5.371,4.72-6.663,12.575-3.088,18.767l30,51.961c3.576,6.192,11.025,9,17.797,6.709l44.143-14.934
		c3.901,2.572,7.946,4.912,12.109,7.006l9.136,45.68C121.693,324.953,127.85,330,135,330h60c7.15,0,13.307-5.047,14.708-12.058
		l9.136-45.68c4.163-2.094,8.207-4.435,12.108-7.006l44.144,14.934c6.773,2.289,14.222-0.516,17.797-6.709l30-51.962
		C326.47,215.327,325.177,207.472,319.806,202.752z M273.063,247.831l-39.728-13.44c-4.721-1.596-9.925-0.745-13.89,2.271
		c-6.058,4.61-12.66,8.43-19.622,11.354c-4.589,1.928-7.924,6.006-8.9,10.888L182.703,300h-35.406l-8.219-41.096
		c-0.976-4.881-4.311-8.96-8.9-10.888c-6.966-2.926-13.567-6.745-19.621-11.353c-3.965-3.018-9.169-3.87-13.892-2.273l-39.728,13.44
		l-17.703-30.662l31.493-27.677c3.736-3.283,5.602-8.205,4.981-13.139C75.238,172.613,75,168.794,75,165
		c0-3.794,0.238-7.613,0.709-11.352c0.621-4.935-1.245-9.856-4.981-13.14l-31.494-27.677l17.703-30.663l39.729,13.44
		c4.721,1.596,9.924,0.745,13.89-2.271c6.057-4.609,12.659-8.429,19.622-11.354c4.589-1.928,7.924-6.006,8.9-10.888L147.297,30
		h35.406l8.219,41.096c0.976,4.881,4.311,8.96,8.9,10.888c6.963,2.925,13.565,6.745,19.621,11.354
		c3.965,3.017,9.17,3.869,13.891,2.272l39.726-13.439l17.703,30.662l-31.492,27.677c-3.734,3.282-5.6,8.2-4.981,13.132
		c0.471,3.758,0.71,7.58,0.71,11.359c0,3.779-0.239,7.601-0.71,11.359c-0.619,4.933,1.248,9.851,4.982,13.133l31.494,27.677
		L273.063,247.831z"/>
</g>

</svg>         


               
                <span>{locale.Setting}</span>
              </Link>
            </li>
          </ul>
          <div className="management-menu-m">
            <hr />
            <UserMenu locale={locale} />
          </div>
        </div>
        <div className="sidebar-footer">
          {/* <hr /> */}

          {props.role.role === "user" && (
            <div className="dropdown">
              {/* <a
                href="#"
                role="button"
                className="btn btn-primary w-100"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img src="/assets/images/icon-account-switch.svg" alt="" />
                Switch Customer
                <span className="arrow-icon">
                  <img src="/assets/images/icon-arrow-down-white.svg" alt="" />
                </span>
              </a> */}

              {/* <Select
                style={{ width: "100%" }}
                defaultValue={customerList[2]}
                value={selectValue["selectCustomer"]}
                onChange={(e) => selectCustomer(e)}
                options={customerList}
                menuPlacement="top"
                defaultMenuIsOpen
              /> */}
              <Select
                //   defaultMenuIsOpen
                classNamePrefix="select"
                // defaultValue={customerList[0]}
                options={customerList}
                placeholder="Switch customer"
                menuPlacement="top"
                value={customerList[selectValue["selectCustomer"]]}
                onChange={(e) => selectCustomer(e)}
              />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

export default SideNav;
