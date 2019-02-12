import React from "react";

const CurrencyItem = ({ currency, switchCurrency, handleRequestClose }) => {
  const { icon, name } = currency;
  return (
    <li
      className="pointer"
      onClick={() => {
        handleRequestClose();
        switchCurrency(currency);
      }}
    >
      <div className="d-flex align-items-center">
        <div className="">{icon}</div>
        <h4 className="mb-0 ml-2">{name}</h4>
      </div>
    </li>
  );
};

export default CurrencyItem;
