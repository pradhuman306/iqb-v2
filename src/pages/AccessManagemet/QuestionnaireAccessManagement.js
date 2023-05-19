import React, { useEffect, useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import HeaderContainer from "../Header/HeaderContainer";
import QuestionnairePermission from "./QuestionnairePermission";
import { useDispatch, useSelector } from "react-redux";
import { GetCustomerPermissionList } from "../../actions/questionnaireMgmtActions";
import { GetQuetionnaireTypes } from "../../actions/questioerAction";
import { GetUsersPermissionList } from "../../actions/questioerAction";
import DataTable from "react-data-table-component";
import CustomLoader from "../Customloader";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

function QuestionnaireAccessManagement(props) {
  const locale = props.locale;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // if (props && props.auth && props.auth.role != "super_admin") {
  //   navigate("/dashboard");
  // }
  const usersList = useSelector((state) => state.getuserlistReducer).usersList;
  const permissionTypes = useSelector(
    (state) => state.questionnaireReducer.questionnaireList
  );
  const Permissions = useSelector(
    (state) => state.customerPermissionsReducer.customerPermissionsList
  );
  const pending = useSelector(
    (state) => state.customerPermissionsReducer.pending
  );
  console.log(Permissions);

  const [isExpandable, setisExpandable] = useState(false);

  const handleSort = (column, sortDirection) =>
    console.log(column.selector, sortDirection);
  // data provides access to your row data

  const ExpandedComponent = ({ data }) => {
    // window.innerWidth <= 599 ? <></> : "";
    if (window.innerWidth <= 959) {
      return (
        <>
          <p>
            <b>{locale.Permissions}:</b>
            {data.permission && (
              <ul className="project-list">
                {data.permission.map((item) => (
                  <li key={item.id}>{item.value}</li>
                ))}
              </ul>
            )}
          </p>
          <p>
            <b>{locale.User}:</b>
            {data.users && (
              <ul className="access-user-list">
                {data.users.map((item) => (
                  <li key={item.user_id}>{item.firstname + item.lastname}</li>
                ))}
              </ul>
            )}
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
    dispatch(GetCustomerPermissionList());
    dispatch(GetQuetionnaireTypes());
    dispatch(GetUsersPermissionList());
    if (window.innerWidth <= 959) {
      setisExpandable(true);
    } else {
      setisExpandable(false);
    }
  }, []);
  const [current, setCurrent] = useState({});
  const [searchedList, setList] = useState([...Permissions]);
  const [filterText, setFilter] = useState("");
  // console.log(searchedList);
  useEffect(() => {
    if (filterText) {
      let tmp = Permissions.filter((item) => {
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
      setList([...Permissions]);
    }
  }, [filterText, Permissions]);

  const hanndleSearch = (value) => {
    setFilter(value);
  };
  const columns = [
    // {
    //   name: "#",
    //   cell: (row, index) => index + 1,
    //   width: "50px",
    //   hide: "sm",
    // },
    {
      name: locale.Name,
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
      hide: "md",
    },
    {
      name: locale.User,
      selector: (row) => {
        return (
          <ul className="access-user-list">
            {row.users &&
              row.users.map((value, i) => {
                return (
                  <li key={i}>{value.firstname + " " + value.lastname}</li>
                );
              })}
          </ul>
        );
      },
      hide: "md",
    },
    {
      name: locale.Actions,
      width: "120px",
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
                    setCurrent({ ...row });
                  }}
                    href=""
                    className="edit"
                    data-bs-toggle="modal"
                    data-bs-target="#questionnaire-permition"
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
      {/* <HeaderContainer
        {...props}
        title={locale.Questionnaire_Access_Management}
      /> */}
      <div className="body-content">
        <div className="usermanagement-main">
          <div className="datatable-filter-wrap">
            <div className="datatable-search">
              <input
                type="text"
                placeholder={locale.Search_customer_placeholder}
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

      {current && (
        <QuestionnairePermission
          data={current}
          permissionTypes={permissionTypes}
          userList={usersList}
          {...props}
        />
      )}
    </>
  );
}

export default QuestionnaireAccessManagement;
