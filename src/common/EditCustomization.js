import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function EditCustomizations(props) {
  const attributesData = props.attributesData;
  let attrData = {};
  if (attributesData !== null) {
    attributesData.forEach((item) => {
      console.log(item);
      if (item.value == "1") {
        attrData[item.key] = true;
      }
    });
  }

  const [formData, setFormData] = useState(attrData);
  const [checkBoxData, setcheckBoxData] = useState(attrData);
  console.log(checkBoxData);
  const handleChange = (e) => {
    checkBoxData[e.target.name] = !checkBoxData[e.target.name];
    setcheckBoxData({ ...checkBoxData });

    if (e.target.checked) {
      formData[e.target.name] = true;
    } else {
      delete formData[e.target.name];
    }

    setFormData(formData);
    console.log(formData);
  };

  useEffect(() => {
    console.log(checkBoxData);
  }, [checkBoxData]);
  return (
    <div
      className="modal fade"
      id={`editcustomizations`}
      tabIndex="-1"
      aria-labelledby="editcustomizations1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Customize the questionnaire</h4>
            <button
              type="button"
              className="close"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <img src="/assets/images/icon-close.svg" alt="" />
            </button>
          </div>
          <div className="modal-body justify-content-center">
            <div className="">
              <form>
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group mb-4">
                      <input
                        name="FML_SAVABLE"
                        type="checkbox"
                        className="form-control"
                        id="saveable"
                        checked={checkBoxData["FML_SAVABLE"]}
                        onChange={(e) => handleChange(e)}
                      />
                      <label htmlFor="saveable">
                      Is this questionnaire type FML?
                      </label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group mb-4">
                      <input
                        name="UNCAT_VISIBLE"
                        type="checkbox"
                        checked={checkBoxData["UNCAT_VISIBLE"]}
                        className="form-control"
                        id="uncategorized"
                        onChange={(e) => handleChange(e)}
                      />
                      <label htmlFor="uncategorized">
                        Do Uncategorized section visible on frontend?
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-footer justify-content-center">
            <button
              type="button"
              data-bs-dismiss="modal"
              className="btn btn-primary"
              onClick={() => props.yes(formData)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditCustomizations;
