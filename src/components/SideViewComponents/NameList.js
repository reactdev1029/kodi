import React from 'react';

const NameList = ({ title, name, style }) => {
  return (
    <div className="d-flex flex-row">
      <span className={`font-weight-bold ${style}`}>{title}</span>
      <span className={style}>{name}</span>
    </div>
  );
};

export default NameList;
