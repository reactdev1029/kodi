import React from 'react';
import { Link } from 'react-router-dom';
import CustomScrollbars from 'util/CustomScrollbars';

const ToolsSwitcher = ({ handleRequestClose }) => {
  let browseData = [
    {
      name: 'Post Equipment',
      link: '/post-item',
    },
    {
      name: 'Request Quotes',
      link: '/request-quotation',
    },
    {
      name: 'Bid on Requests',
      link: '/bid-basket',
    },
    {
      name: 'Inbox',
      link: '/inbox',
    },
    {
      name: 'Contact Us',
      link: '/contact',
    },
  ];
  return (
    <CustomScrollbars
      className="messages-list language-list scrollbar"
      style={{ height: 195 }}
    >
      <ul className="list-unstyled">
        {browseData.map((language, index) => (
          <li
            key={index}
            className="pointer"
            onClick={() => handleRequestClose()}
          >
            <Link to={language.link} className="text-secondary">
              <span className="h3-font-size ml-3">{language.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </CustomScrollbars>
  );
};

export default ToolsSwitcher;
