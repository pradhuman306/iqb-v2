import React, { useState } from "react";
import HeaderContainer from "../Header/HeaderContainer";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import CustomLoader from "../Customloader";
import ConfirmModal from "../../common/confirmModal";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteQuestionnaire,
  GetQuetionnaireTypes,
} from "../../actions/questioerAction";
import { useEffect } from "react";
import PreviewQuestionnaire from "../QuestionBuilder/PreviewQuestionnaire";

function QuestionnaireManagement(props) {
  const locale = props.locale;
  const dispatch = useDispatch();
  const nav = useNavigate();
  const questionaireTypes = useSelector(
    (state) => state.questionnaireReducer
  ).questionnaireList;
  const pending = useSelector((state) => state.questionnaireReducer).pending;
  useEffect(() => {
    dispatch(GetQuetionnaireTypes());
  }, []);
  console.log(questionaireTypes);

  const [searchedList, setList] = useState([...questionaireTypes]);
  const [filterText, setFilter] = useState("");
  const [id, setId] = useState("");

  const hanndleSearch = (value) => {
    setFilter(value);
  };
  useEffect(() => {
    if (filterText) {
      let tmp = questionaireTypes.filter((item) => {
        if (item.value.toLowerCase().includes(filterText.toLowerCase())) {
          return true;
        }
        return false;
      });
      setList([...tmp]);
    } else {
      setList([...questionaireTypes]);
    }
  }, [filterText, questionaireTypes]);

  const columns = [
    {
      name: locale.Questionnaire + " " + locale.Management,
      selector: (row) => <><span className="text-b">{row.value}</span></>,
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
                    nav("/questionnaire-edit/" + row.id);
                  }}
                    className="active-user">

                    {locale.Edit}
                  </a>
                </li>


                <li>
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setId(row.id);
                    }}
                    data-bs-toggle="modal"
                    data-bs-target="#viewquestionnaire"
                    className="active-user">

                    {locale.View}
                  </a>
                </li>


                <li>
                  <a onClick={(e) => {
                    e.preventDefault();
                  }}
                    className="active-user delete-u"
                    data-bs-toggle="modal"
                    data-bs-target={`#confirm_${row.id}`}>

                    {locale.Delete}
                  </a>
                </li>


              </ul>
            </li>
            <ConfirmModal
              id={row.id}
              name={row.value.replace(/(\r\n|\n|\r)/gm, "")}
              yes={(id) => {
                dispatch(deleteQuestionnaire(id, locale));
              }}
              locale={locale}
            />
          </ul>
        );
      },
    },
  ];

  // console.log(searchedList);

  return (
    <>
      {/* <HeaderContainer
        {...props}
        title={locale.Questionnaire + " " + locale.Management}
      /> */}
      <div className="body-content">
        <div className="usermanagement-main">
          <div className="datatable-filter-wrap">
            <div className="datatable-search">
              <input
                type="text"
                placeholder={locale.Search + " " + locale.Questionnaire + "..."}
                className="form-control"
                onChange={(e) => hanndleSearch(e.target.value)}
              />
            </div>
            <div className="datatable-filter-right">
              <ul className="btn-group">
                <li>
                  <Link to="/questionnaire-builder" className="btn btn-primary">
                    {locale.Add_new_questionnaire}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <PreviewQuestionnaire id={id} />
        <DataTable
          columns={columns}
          data={searchedList}
          progressPending={pending}
          progressComponent={<CustomLoader />}
          paginationRowsPerPageOptions={[8, 25, 50, 100]}
          pagination
          paginationPerPage={8}
        />
      </div>
    </>
  );
}

export default QuestionnaireManagement;
