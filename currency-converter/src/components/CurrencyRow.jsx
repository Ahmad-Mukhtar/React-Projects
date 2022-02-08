import React from "react";

export default function CurrencyRow({currencyOptions,SelectedCurrency,OnChangeCurrency,Onchangeamount,amount}) {
   
  return (
    <div>
      <input type="number" name="" id="" value={amount} className="input" onChange={Onchangeamount} />
      <select name="" value={SelectedCurrency} id="" onChange={OnChangeCurrency}>
        {currencyOptions.map((option) =>
            <option key={option} value={option}>{option}</option>
        )}
      </select>
    </div>
  );
}
