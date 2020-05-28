import React from "react";
import _ from "lodash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ColumnVisibility = props => {
  const { columns,setColumnVisibility } = props;

  
  return (
    <div className="button-group float-right clearboth">
      <button
        type="button"
        className="btn btn-default btn-sm"
        data-toggle="dropdown"

      >
        <FontAwesomeIcon icon={"eye"} />
      </button>
      <ul className="dropdown-menu checkbox-menu allow-focus">
        {columns.map(({ name, visible },index) => {
          if (!_.isEmpty(name)) {
            return (
              <li>
                <label className="control control-checkbox">
                  {name}
                  <input type="checkbox" defaultChecked={visible} onChange={() => {setColumnVisibility(index)}}/>
                  <div className="control-indicator" />
                </label>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
};

export default ColumnVisibility;
