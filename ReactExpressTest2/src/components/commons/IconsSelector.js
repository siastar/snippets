import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const getStatusIcon = icon => {
    const statusIcons = {
      New: [
        <a>
          <FontAwesomeIcon icon={"plus-square"} className="text-primary" /> New
        </a>
      ],
      Open: [
        <a>
          <FontAwesomeIcon icon={"door-open"} className="text-success" /> Open
        </a>
      ],
      InProgress: [
        <a>
          <FontAwesomeIcon icon={"exchange-alt"} className="text-success" />{" "}
          InProgress
        </a>
      ],
      Closed: [
        <a>
          <FontAwesomeIcon icon={"times-circle"} className="text-danger" />{" "}
          Closed
        </a>
      ],
      Refused: [
        <a>
          <FontAwesomeIcon icon={"hand-paper"} className="text-danger" />{" "}
          Refused
        </a>
      ]
    };
    return statusIcons[icon];
  };
export default getStatusIcon;
