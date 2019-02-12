import React from 'react';
import HItem from './HItem';
import CustomScrollbars from 'util/CustomScrollbars';

const HamburgerSwitcher = ({ handleRequestClose, authUser }) => {
  let authData = [
    {
      name: 'Account',
      icon: 'zmdi-account',
      link: '/account',
    },
    {
      name: 'Inbox',
      icon: 'zmdi-inbox',
      link: '/inbox',
    },
    {
      name: 'Settings',
      icon: 'zmdi-settings',
      link: '/settings',
    },
    {
      name: 'Logout',
      icon: 'zmdi-power',
      link: '/',
    },
  ];
  let nonAuthData = [
    {
      name: 'Contact',
      icon: 'zmdi-email',
      link: '/contact',
    },
    {
      name: 'Login',
      icon: 'zmdi-account',
      link: '/login',
    },
    {
      name: 'Register',
      icon: 'zmdi-account-add',
      link: '/register',
    },
  ];
  let hData = [];
  if (authUser) {
    hData = authData;
  } else {
    hData = nonAuthData;
  }
  return (
    <CustomScrollbars
      className="messages-list language-list scrollbar bg-white"
      style={{ height: authUser ? 170 : 130 }}
    >
      <ul className="list-unstyled">
        {hData.map((data, index) => (
          <HItem
            key={index}
            data={data}
            handleRequestClose={() => handleRequestClose(data)}
          />
        ))}
      </ul>
    </CustomScrollbars>
  );
};

export default HamburgerSwitcher;
