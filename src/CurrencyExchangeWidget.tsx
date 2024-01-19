// query the Tarkov.dev API and return the in-game USDRUB exchange rate
// Input field to type in a ruble value and get USD, and vice versa
// update every 5 minutes

// const query = `{
//     items(name: "m855a1") {
//         id
//         name
//         shortName
//     }
// }`;
//
// const getExchangeRateFromAPI = async () => {
//   fetch("https://api.tarkov.dev/graphql", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Accept: "application/json",
//     },
//     body: JSON.stringify({
//       query: query,
//     }),
//   })
//     .then((r) => r.json())
//     .then((data) => console.log("data returned:", data));
// };
//
// const CurrencyExchangeWidget = () => {
//   return <div></div>;
// };

import React, { useState, useEffect } from "react";

const query = `{
    items(name: "dollars") {
      basePrice
    }
  }`;

const CurrencyExchangeWidget = () => {
  const [usdToRub, setUsdToRub] = useState<number | null>(null);
  const [rubToUsd, setRubToUsd] = useState<number | null>(null);
  const [usdInput, setUsdInput] = useState<string>("");
  const [rubInput, setRubInput] = useState<string>("");

  const getExchangeRateFromAPI = async () => {
    try {
      const response = await fetch("https://api.tarkov.dev/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          query: query,
        }),
      });
      const data = await response.json();
      const exchangeRate = data?.data?.items[0]?.basePrice; // Replace with the actual exchange rate field
      if (exchangeRate) {
        setUsdToRub(exchangeRate);
        setRubToUsd(1 / exchangeRate);
      }
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }

    console.log(
      "Fetched exchange rate from tarkov.dev. You should see this message in the console once, on page load."
    );
  };

  useEffect(() => {
    // Initial fetch of exchange rate
    getExchangeRateFromAPI();

    // Refresh exchange rate every 5 minutes
    // const intervalId = setInterval(getExchangeRateFromAPI, 5 * 60 * 1000);

    // return () => clearInterval(intervalId);
  }, []);

  const handleUsdInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const usdValue = event.target.value;
    setUsdInput(usdValue);
    if (usdToRub !== null) {
      const rubValue = parseFloat(usdValue) * usdToRub;
      setRubInput(isNaN(rubValue) ? "" : rubValue.toFixed(2));
    }
  };

  const handleRubInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rubValue = event.target.value;
    setRubInput(rubValue);
    if (rubToUsd !== null) {
      const usdValue = parseFloat(rubValue) * rubToUsd;
      setUsdInput(isNaN(usdValue) ? "" : usdValue.toFixed(2));
    }
  };

  return (
    <article className="p-2 bg-zinc-800 rounded-sm">
      <h2 className="font-medium pb-2">USD/RUB Calculator</h2>
      <div className="mb-4">
        <label
          htmlFor="US Dollars"
          className="block text-sm text-green-400 font-medium"
        >
          USD:
          <input
            className="border border-gray-300 bg-stone-400 rounded-md p-2 w-full text-slate-800 font-medium"
            type="text"
            value={usdInput}
            onChange={handleUsdInputChange}
          />
        </label>
      </div>
      <div className="mb-4">
        <label
          htmlFor="Rubles"
          className="block text-sm text-red-400 font-medium"
        >
          RUB:
          <input
            className="border border-gray-300 bg-stone-400 rounded-md p-2 w-full text-slate-800 font-medium"
            type="text"
            value={rubInput}
            onChange={handleRubInputChange}
          />
        </label>
      </div>
      <div className="text-sm italic">
        Live in-game USD/RUB exchange rate (refreshed on page load). Your exact
        USD cost from Peacekeeper will vary.
      </div>

      <div className="text-sm pt-1">
        Provided by{" "}
        <a className="text-white" href="https://tarkov.dev/api/">
          Tarkov.dev API
        </a>
      </div>
    </article>
  );
};

export default CurrencyExchangeWidget;
