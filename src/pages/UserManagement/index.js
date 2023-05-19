import React, { useState, useEffect } from "react";
import HeaderContainer from "../Header/HeaderContainer";
import AddExistingUser from "./AddExistingUser";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  GetCustomerUsers,
  GetUsers,
  setInactive,
} from "../../actions/userAction";
import ConfirmModal from "../../common/confirmModal";
import DataTable from "react-data-table-component";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import CustomLoader from "../Customloader";
import { useNavigate } from "react-router-dom";
import { langs } from "../../locale/localization";
function UserManagement(props) {
  const locale = langs(useSelector((state) => state.langReducer).locale);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const userList = useSelector((state) => state.userReducer).userList;
  const pending = useSelector((state) => state.userReducer).pending;
// if(userList.length === 1){
//   userList.push({start:"",end:"",customer:[]});
// }
  const [searchedList, setList] = useState([...userList]);
  const [filterText, setFilter] = useState("");
  const [userdata, setUser] = useState({});
  console.log(userList.length);
  useEffect(() => {
    if (props.auth && props.auth.role == "customer" && props.auth.userdata) {
      dispatch(GetCustomerUsers(props.auth.userdata.id));
    }
    if (props.auth && props.auth.role == "super_admin") {
      if (props.id) {
        dispatch(GetCustomerUsers(props.id));
      } else {
        dispatch(GetUsers());
      }
    }
    if (window.innerWidth <= 599 || window.innerWidth <= 959) {
      setisExpandable(true);
    } else {
      setisExpandable(false);
    }
  }, [props.auth]);

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
            <b>{locale.Status}:</b>
            <label
              className={`status-label ${
                data.activate ? "active-label" : "inactive-label"
              }`}
            >
              {data.activate ? locale.Active : locale.Inactive}
            </label>
          </p>
          <p>
            <b>{locale.Start_date}:</b> {data.start.split(" ")[0]}
          </p>
          <p>
            <b>{locale.End_date}:</b> {data.end.split(" ")[0]}
          </p>
        </>
      );
    } else if (window.innerWidth <= 959) {
      return (
        <>
          <p>
            <b>No. of customer</b>{" "}
            <span className="badge">{data.customer.length}</span>
          </p>
          <p>
            <b>{locale.Start_date}:</b> {data.start.split(" ")[0]}
          </p>
          <p>
            <b>{locale.End_date}:</b> {data.end.split(" ")[0]}
          </p>
        </>
      );
    }
  };

  var onresize = function () {
    //your code here
    //this is just an example
    if (window.innerWidth <= 599 || window.innerWidth <= 959) {
      setisExpandable(true);
    } else {
      setisExpandable(false);
    }
  };
  window.addEventListener("resize", onresize);

  useEffect(() => {
    if (filterText) {
      let tmp = userList.filter((item) => {
        if (
          item.firstname
            .toLocaleLowerCase()
            .includes(filterText.toLocaleLowerCase()) ||
          item.lastname
            .toLocaleLowerCase()
            .includes(filterText.toLocaleLowerCase()) ||
          item.email
            .toLocaleLowerCase()
            .includes(filterText.toLocaleLowerCase())
        ) {
          return true;
        }
        return false;
      });
      setList([...tmp]);
    } else {
      setList([...userList]);
    }
  }, [filterText, userList]);

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
      name: locale.Email,
      selector: (row) => row.email,
      sortable: true,
      // width: "190px",
    },
    {
      name: locale.Status,
      width: "120px",
      selector: (row) => {
        return (
          <label
            className={`status-label ${
              row.activate ? "active-label" : "inactive-label"
            }`}
          >
            <a
              onClick={(e) => {
                e.preventDefault();
                if (props.auth.role === "super_admin") {
                  if (props.id) {
                    dispatch(setInactive({ values: row.id, uid: props.id }, locale));
                  } else {
                    dispatch(setInactive({ values: row.id }, locale));
                  }
                } else {
                  dispatch(
                    setInactive({ values: row.id, uid: props.auth.userdata.id }, locale)
                  );
                }
              }}
            >
              {row.activate ? locale.Active : locale.Inactive}
            </a>
          </label>
        );
      },
      sortable: true,
      hide: "sm",
    },

    {
      name: locale.Start_date,
      selector: (row) => row.start.split(" ")[0],
      sortable: true,
      hide: "md",
    },
    {
      name: locale.End_date,
      selector: (row) => row.end.split(" ")[0],
      sortable: true,
      hide: "md",
    },
    {
      name: locale.Customer,
      selector: (row) => {
        return <span className="badge">{row.customer.length}</span>;
      },
      sortable: true,
      hide: "md",
    },
    {
      name: locale.Actions,
      width: "166px",
      selector: (row) => {
        return (
          <>
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
                  <a 
                  onClick={(e) => {
                    e.preventDefault();
                    setUser(row);
                  }}
                  className=" active-user"
                  data-bs-toggle="modal"
                  data-bs-target="#editUser"
                >

                    {locale.Edit}
                  </a>
                </li>
                <li>
                  <a 
                  onClick={(e) => {
                    e.preventDefault();
                    // dispatch(setInactive(row.id));
                    // dispatch(GetUsers())
                    nav("/user/" + row.id);
                  }}
                  className="active-user">

                    {locale.View}
                  </a>
                </li>
                <li>
                  <a 
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="active-user delete-u"
                  data-bs-toggle="modal"
                  data-bs-target={`#confirm_${row.id}`}
                >

                    {locale.Delete}
                  </a>
                </li>
              </ul>
              <ConfirmModal
                  id={row.id}
                  name={row.email}
                  yes={(id) => {
                    if (props.auth.role === "super_admin") {
                      if (props.id) {
                        dispatch(deleteUser({ values: id, uid: props.id }));
                      } else {
                        dispatch(deleteUser({ values: id }));
                      }
                    } else {
                      dispatch(
                        deleteUser({ values: id, uid: props.auth.userdata.id })
                      );
                    }
                  }}
                  locale={locale}
                />
            </li>
          </ul>
        
          </>
        );
      },
    },
  ];

  return (
    <>
      {/* {props.id ? (
        ""
      ) : (
        <HeaderContainer {...props} title={locale.User_Management} />
      )} */}

      <div className="body-content">
        <div className="usermanagement-main">
          <div className="datatable-filter-wrap">
            <div className="datatable-search">
              <input
                type="text"
                placeholder={locale.Search_user_placeholder}
                className="form-control"
                onChange={(e) => hanndleSearch(e.target.value)}
              />
            </div>
            <div className="datatable-filter-right">
              <ul className="btn-group">
                {props.id ? (
                  ""
                ) : (
                  <li className="mx-3">
                    <button
                      className="btn btn-border"
                      data-bs-toggle="modal"
                      data-bs-target="#addExistingUser"
                    >
                      {locale.Add_Existing_User}
                    </button>
                  </li>
                )}

                <li>
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#addUser"
                  >
                    {locale.Add_user}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <DataTable
          columns={columns}
          data={searchedList}
          progressPending={pending}
          progressComponent={<div className='table-loader'><CustomLoader /></div>}
          paginationRowsPerPageOptions={[8, 25, 50, 100]}
          expandableRows={isExpandable}
          expandableRowsComponent={ExpandedComponent}
          onSort={handleSort}
          pagination
          paginationPerPage={8}
        />
      </div>

      <EditUser
        user={userdata}
        id={userdata.id}
        cid={props.id ? props.id : false}
        customer_id={props.auth.userdata.id}
        role={props.auth.role}
        customer_name={`${props.auth.userdata.firstname} ${props.auth.userdata.lastname}`}
        auth={props.auth}
        {...props}
      />
      <AddUser {...props} />
      <AddExistingUser {...props} userList={userList} />
    </>
  );
}

export default UserManagement;
