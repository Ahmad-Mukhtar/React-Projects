import "./Home.css";
import CurrencyRow from "./CurrencyRow";
import { useEffect, useState } from "react";

const Base_URL =
  "http://api.exchangeratesapi.io/v1/latest?access_key=0c43f969d051791044d7dac636bb6a24";

export default function Home() {
  const [CurrencyOptions, setCurrencyoptions] = useState([]);
  const [Fromcurrency, setFromCurrency] = useState();
  const [tocurrency, setTocurrecny] = useState();
  const [exchangerate, setexchangerate] = useState();
  const [amount, setamount] = useState(1);
  const [amountchangefromcurrency, setamountchangefromcurrency] =
    useState(true);

  let toamount, fromamount;

  if (amountchangefromcurrency) {
    fromamount = amount;
    toamount = amount * exchangerate;
  } else {
    fromamount = amount / exchangerate;
    toamount = amount;
  }

  useEffect(() => {
    fetch(Base_URL)
      .then((res) => res.json())
      .then((data) => {
        const firstcurrency = Object.keys(data.rates)[0];
        setCurrencyoptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setTocurrecny(firstcurrency);
        setexchangerate(data.rates[firstcurrency]);
      });
  }, []);

  useEffect(() => {
    if (Fromcurrency != null && tocurrency != null) {
      fetch(`${Base_URL}?base=${Fromcurrency}&symbols=${tocurrency}`)
        .then((res) => res.json())
        .then((data) => setexchangerate(data.rates[tocurrency]));
    }
  }, [Fromcurrency, tocurrency]);

  const handlefromampountchange = (e) => {
    setamount(e.target.value);
    setamountchangefromcurrency(true);
  };

  const handletoampountchange = (e) => {
    setamount(e.target.value);
    setamountchangefromcurrency(false);
  };

  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={CurrencyOptions}
        SelectedCurrency={Fromcurrency}
        OnChangeCurrency={(e) => setFromCurrency(e.target.value)}
        Onchangeamount={handlefromampountchange}
        amount={fromamount}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={CurrencyOptions}
        SelectedCurrency={tocurrency}
        OnChangeCurrency={(e) => setTocurrecny(e.target.value)}
        Onchangeamount={handletoampountchange}
        amount={toamount}
      />
    </>
  );
}
