import React from 'react';
import { Link } from 'react-router-dom';

const HItem = ({ data, handleRequestClose }) => {
  const { icon, name, link } = data;
  return (
    <li className="pointer" onClick={() => handleRequestClose()}>
      {name === 'Logout' ? (
        <div className="d-flex align-items-center">
          <div className="hamburger-icon-width d-flex justify-content-center">
            <i className={`zmdi ${icon} zmdi-hc-2x`} />
          </div>
          <h3 className="mb-0 ml-3">{name}</h3>
        </div>
      ) : (
        <Link to={link} className="text-secondary">
          <div className="d-flex align-items-center">
            <div className="hamburger-icon-width d-flex justify-content-center">
              <i className={`zmdi ${icon} zmdi-hc-2x`} />
            </div>
            <h3 className="mb-0 ml-3">{name}</h3>
          </div>
        </Link>
      )}
    </li>
  );
};

export default HItem;
