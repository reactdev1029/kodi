import React from "react";

import CurrencyItem from "./CurrencyItem";
import currencyData from "./data";
import CustomScrollbars from "util/CustomScrollbars";

const CurrencySwitcher = ({ switchCurrency, handleRequestClose }) => {
  return (
    <CustomScrollbars
      className="messages-list language-list scrollbar"
      style={{ height: 190 }}
    >
      <ul className="list-unstyled">
        {currencyData.map((currency, index) => (
          <CurrencyItem
            key={index}
            currency={currency}
            handleRequestClose={handleRequestClose}
            switchCurrency={switchCurrency}
          />
        ))}
      </ul>
    </CustomScrollbars>
  );
};

export default CurrencySwitcher;
