import React from 'react';
import { Link } from 'react-router-dom';
import CustomScrollbars from 'util/CustomScrollbars';

const BrowseSwitcher = ({ browseData, handleRequestClose, handleChange }) => {
  return (
    <CustomScrollbars
      className="messages-list language-list scrollbar"
      style={{ height: 120 }}
    >
      <ul className="list-unstyled">
        {browseData.map((language, index) => (
          <li
            key={index}
            className="pointer"
            onClick={() => {
              handleRequestClose();
              handleChange(language.value);
            }}
          >
            <span
              className="h3-font-size"
              style={{
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {language.label}
            </span>
          </li>
        ))}
      </ul>
    </CustomScrollbars>
  );
};

export default BrowseSwitcher;
