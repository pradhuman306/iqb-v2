import React, { useState, useEffect, useMemo } from "react";
import HeaderContainer from "../Header/HeaderContainer";
import AddNewCustomer from "./AddNewCustomer";
import EditCustomers from "./EditCustomer";
import { useDispatch, useSelector } from "react-redux";
import { deleteCustomer, GetCustomers } from "../../actions/customerAction";
import ConfirmModal from "../../common/confirmModal";
import DataTable from "react-data-table-component";
import { setInactive } from "../../actions/customerAction";
import { useNavigate } from "react-router-dom";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import CustomLoader from "../Customloader";
import AddExistingCustomer from "./AddExistingCustomer";

function CustomerManagement(props) {
  const locale = props.locale;
  const nav = useNavigate();
  const dispatch = useDispatch();
  const customerList = useSelector(
    (state) => state.customerReducer
  ).customerList;
  const pending = useSelector((state) => state.customerReducer).pending;
  // const pending = true;
  const [filterText, setFilter] = useState("");
  const [searchedList, setList] = useState([...customerList]);
  const [customerdata, setCustomer] = useState({});
  const [id, setId] = useState("");
  const [hideColumns, setHideColumns] = useState({
    business_name: false,
    email: false,
    status: false,
    startDate: false,
    EndDate: false,
  });
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
            <b>{locale.Email}:</b> {data.email}
          </p>
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
            <b>{locale.No_of_user}:</b>
            <span className="badge">{data.users.length}</span>
          </p>
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
    dispatch(GetCustomers());
    if (window.innerWidth <= 599 || window.innerWidth <= 959) {
      setisExpandable(true);
    } else {
      setisExpandable(false);
    }
  }, []);

  useEffect(() => {
    if (filterText) {
      let tmp = customerList.filter((item) => {
        if (
          item.name.includes(filterText) ||
          item.firstname.includes(filterText) ||
          item.lastname.includes(filterText) ||
          item.email.includes(filterText)
        ) {
          return true;
        }
        return false;
      });
      setList([...tmp]);
    } else {
      setList([...customerList]);
    }
  }, [filterText, customerList]);

  const hanndleSearch = (value) => {
    setFilter(value);
  };

  // const hideColumns = () => {};

  const columns = useMemo(
    () => [
   
      {
        name: locale.Business_Name,
        selector: (row) => {
          let newName = row.name.split(" ");
          let firstC = newName[0][0];
          let lastC = "";
          if (newName[1]) {
            lastC = newName[1][0].toUpperCase();
          }
          return (
            <div className="user-wrap">
              <h5 className="user-icon">{firstC.toUpperCase() + lastC}</h5>
              <div className="user-detail">{row.name}</div>
            </div>
          );
        },
        sortable: true,
        // width: "250px",
      },
      {
        name: locale.Email,
        selector: (row) => row.email,
        sortable: true,
        // width: "200px",
        hide: "sm",
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
                  dispatch(setInactive(row.customer_id, locale));
                  // dispatch(GetCustomers());
                }}
              >
                {row.activate ? locale.Active : locale.Inactive}
              </a>
            </label>
          );
        },
        sortable: true,
        hide: "md",
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
        name: locale.User,
        selector: (row) => {
          return <span className="badge">{row.users.length}</span>;
        },
        sortable: true,
        hide: "md",
      },
      {
        name: locale.Actions,
        width: "166px",
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
                      setCustomer(row);
                      setId(row.customer_id);
                    }}
                    className="active-user"
                    data-bs-toggle="modal"
                    data-bs-target="#editcustomer"
                  >

                    {locale.Edit}
                  </a>
                </li>

                <li>
                  <a onClick={(e) => {
                      e.preventDefault();
                      nav("/customer/" + row.customer_id);
                    }}
                    className="active-user"
                  
                  >

                    {locale.View}
                  </a>
                </li>

                <li>
                  <a onClick={(e) => {
                      e.preventDefault();
                    }}
                    className="active-user delete-u"
                    data-bs-toggle="modal"
                    data-bs-target={`#confirm_${row.customer_id}`}
                  >

                    {locale.Delete}
                  </a>
                </li>
                
              </ul>
            </li>
            <ConfirmModal
                    id={row.customer_id}
                    name={row.name}
                    yes={(id) => {
                                           dispatch(deleteCustomer({ values: id }, locale));
                                         }}
                                         locale={locale}
                  />
            </ul>
          
           
          );
        },
      },
    ],
    [hideColumns, locale]
  );
  return (
    <>
      {/* <HeaderContainer
        {...props}
        title={locale.Customer + " " + locale.Management}
      /> */}
      <div className="body-content">
        <div className="usermanagement-main">
          <div className="datatable-filter-wrap">
            <div className="datatable-search">
              <input
                type="text"
                placeholder={locale.Search_customer_by_name_email}
                className="form-control"
                onChange={(e) => hanndleSearch(e.target.value)}
              />
            </div>
            <div className="datatable-filter-right">
              <ul className="btn-group">
                <li className="mx-3">
                  <button
                    className="btn btn-border"
                    data-bs-toggle="modal"
                    data-bs-target="#addExistingCustomer"
                  >
                    {locale.Add_Existing_Customer}
                  </button>
                </li>
                <li>
                  <button
                    className="btn btn-primary"
                    data-bs-toggle="modal"
                    data-bs-target="#addcustomer"
                  >
                    {locale.Add_new_customer}
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
          progressComponent={<CustomLoader />}
          paginationRowsPerPageOptions={[8, 25, 50, 100]}
          pagination
          paginationPerPage={8}
          expandableRows={isExpandable}
          expandableRowsComponent={ExpandedComponent}
          onSort={handleSort}
        />
      </div>

      <EditCustomers customer={customerdata} id={id} {...props} />
      <AddNewCustomer {...props} />
      <AddExistingCustomer {...props} customerList={customerList} />
    </>
  );
}

export default CustomerManagement;
