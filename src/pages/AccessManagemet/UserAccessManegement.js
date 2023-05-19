import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import UserPermission from "./UserPermission";
import { useDispatch, useSelector } from "react-redux";
import {
  GetQuetionnaireTypes,
  GetUsersPermissionList,
} from "../../actions/questioerAction";
import HeaderContainer from "../Header/HeaderContainer";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import DataTable from "react-data-table-component";
import CustomLoader from "../Customloader";
import { GetCustomerUsers } from "../../actions/userAction";
import { getSingleCustomerPermission } from "../../actions/customerAction";
function UserAccessManagement(props) {
  const dispatch = useDispatch();
  const locale = props.locale;
  let usersList = useSelector((state) => state.userReducer).userList;
  let allusersList = useSelector((state) => state.getuserlistReducer).usersList;
  let pending = useSelector((state) => state.userReducer.pending);
  let allUserpending = useSelector((state) => state.getuserlistReducer.pending);
  let allquestionnaireList = useSelector(
    (state) => state.questionnaireReducer
  ).questionnaireList;

  let questionnaireList = useSelector(
    (state) => state.customerPermissionsReducer
  ).customerPermissionsList;
  if (props.auth && props.auth.role === "super_admin") {
    usersList = allusersList;
    pending = allUserpending;
    questionnaireList = allquestionnaireList;
  }

  const [current, setCurrent] = useState({});
  // useEffect(() => {
  //   // dispatch(GetQuetionnaireTypes());

  // }, []);

  const [isExpandable, setisExpandable] = useState(false);

  const handleSort = (column, sortDirection) =>
    console.log(column.selector, sortDirection);
  // data provides access to your row data

  const ExpandedComponent = ({ data }) => {
    // window.innerWidth <= 599 ? <></> : "";
    if (window.innerWidth <= 599) {
      return (
        <>
          <p>
            <b>{locale.permission}:</b>
            {/* {data.permission && ( */}
            <ul className="project-list">
              {data.permission.map((item) => (
                <li key={item.id}>{item.value}</li>
              ))}
            </ul>
            {/* )} */}
          </p>
        </>
      );
    }
  };

  var onresize = function () {
    //your code here
    //this is just an example
    if (window.innerWidth <= 599) {
      setisExpandable(true);
    } else {
      setisExpandable(false);
    }
  };
  window.addEventListener("resize", onresize);

  const navigate = useNavigate();
  if (props && props.auth && props.auth.role == "user") {
    navigate("/dashboard");
  }

  const [searchedList, setList] = useState([...usersList]);
  const [filterText, setFilter] = useState("");

  useEffect(() => {
    if (filterText) {
      let tmp = usersList.filter((item) => {
        if (
          item.firstname.toLowerCase().includes(filterText.toLowerCase()) ||
          item.lastname.toLowerCase().includes(filterText.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
      setList([...tmp]);
    } else {
      setList([...usersList]);
    }
  }, [filterText, usersList]);

  useEffect(() => {
    if (props.auth && props.auth.role == "customer" && props.auth.userdata) {
      dispatch(GetCustomerUsers(props.auth.userdata.id));
      dispatch(getSingleCustomerPermission(props.auth.userdata.id));
    }
    if (props.auth && props.auth.role == "super_admin") {
      dispatch(GetUsersPermissionList());
      dispatch(GetQuetionnaireTypes());
    }
    if (window.innerWidth <= 599) {
      setisExpandable(true);
    }
  }, [props.auth]);

  const hanndleSearch = (value) => {
    setFilter(value);
  };

  const columns = [
    // {
    //   name: "#",
    //   cell: (row, index) => index + 1,
    //   width: "25px",
    //   hide: "sm",
    // },
    {
      name: locale.User + " " + locale.Name,
      selector: (row) => {
        return (
          <div className="user-wrap">
            <h5 className="user-icon">
              {row.firstname[0].toUpperCase()}
              {row.lastname[0].toUpperCase()}
            </h5>
            <div className="user-detail">
              {row.firstname + " " + row.lastname}
            </div>
          </div>
        );
      },
      sortable: true,
    },
    {
      name: locale.Permissions,
      selector: (row) => {
        return (
          <ul className="project-list">
            {row.permission &&
              row.permission.map((value, i) => {
                return <li key={i}>{value.value}</li>;
              })}
          </ul>
        );
      },
      hide: "sm",
    },

    {
      name: locale.Actions,
      // width: "166px",
      selector: (row) => {
        return (
           <ul className="table-drop-down">
            <li>

              <a
                href=""
                role="button"
                id="tableMenu"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className="action-btn"
              >


                <svg width="24px" height="24px" viewBox="0 0 24 24" id="_24x24_On_Light_Dots" data-name="24x24/On Light/Dots" xmlns="http://www.w3.org/2000/svg">
                  <rect id="view-box" width="24" height="24" fill="#141124" opacity="0" />
                  <path id="Shape" d="M12,1.5A1.5,1.5,0,1,1,13.5,3,1.5,1.5,0,0,1,12,1.5Zm-6,0A1.5,1.5,0,1,1,7.5,3,1.5,1.5,0,0,1,6,1.5Zm-6,0A1.5,1.5,0,1,1,1.5,3,1.5,1.5,0,0,1,0,1.5Z" transform="translate(4.5 11)" fill="#141124" />
                </svg>


              </a>
              <ul className="dropdown-menu" aria-labelledby="tableMenu">

                <li>
                  <a onClick={(e) => {
                    e.preventDefault();
                    setCurrent(row);
                    console.log(row);
                  }}
                  className="edit"
                  data-bs-toggle="modal"
                  data-bs-target="#user-permition"
                >

                    {locale.Edit}
                  </a>
                </li>
              </ul>
            </li>
          </ul>

        );
      },
    },
  ];

  return (
    <>
      {/* <HeaderContainer {...props} title={locale.User_access_management} /> */}
      <div className="body-content">
        <div className="usermanagement-main">
          <div className="datatable-filter-wrap">
            <div className="datatable-search">
              <input
                type="text"
                placeholder={locale.Search_customer}
                className="form-control"
                onChange={(e) => hanndleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        <DataTable
          columns={columns}
          data={searchedList}
          progressPending={pending}
          progressComponent={<CustomLoader />}
          paginationRowsPerPageOptions={[8, 25, 50, 100]}
          pagination
          paginationPerPage={8}
          expandableRows={isExpandable}
          expandableRowsComponent={ExpandedComponent}
          onSort={handleSort}
        />
      </div>

      <UserPermission
        user={current}
        permissionTypes={questionnaireList}
        role={props.auth.role}
        id={props.auth.userdata.id}
        locale={locale}
      />
    </>
  );
}

export default UserAccessManagement;
