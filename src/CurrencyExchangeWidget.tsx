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
  };

  useEffect(() => {
    // Initial fetch of exchange rate
    getExchangeRateFromAPI();

    // Refresh exchange rate every 5 minutes
    const intervalId = setInterval(getExchangeRateFromAPI, 5 * 60 * 1000);

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
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
    <div className="bg-stone-700 ml-2 mt-2 pl-2 pr-2 pb-2 pt-1 md:mb-0 max-h-24 max-w-xs">
      <h2 className="text-xl text-white font-semibold mb-4">
        USD/RUB Calculator
      </h2>
      <div className="mb-4">
        <label className="block text-sm text-green-400 font-medium">USD:</label>
        <input
          className="border border-gray-300 bg-stone-400 rounded-md p-2 w-full"
          type="text"
          value={usdInput}
          onChange={handleUsdInputChange}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm text-red-400 font-medium">RUB:</label>
        <input
          className="border border-gray-300 bg-stone-400 rounded-md p-2 w-full"
          type="text"
          value={rubInput}
          onChange={handleRubInputChange}
        />
      </div>
      <div className="text-sm text-white italic mb-2">
        Live in-game USD/RUB exchange rate (refreshed every 5 minutes)
      </div>
      <div className="text-xs text-white">
        Provided by{" "}
        <a
          className="text-red-400 hover:underline"
          href="https://tarkov.dev/api/"
        >
          Tarkov.dev API
        </a>
      </div>
    </div>
  );
};

export default CurrencyExchangeWidget;
