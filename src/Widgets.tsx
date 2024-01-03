import CurrencyExchangeWidget from "./CurrencyExchangeWidget";

const Widgets = () => {
  return (
    <div className="bg-stone-700 text-white pl-2 pt-1 ml-1 pr-3 mr-2 rounded-xl shadow-xl mb-2 md:mb-0 md:mr-2">
      <h3 className="text-xl mb-2">Handy Widgets</h3>
      <CurrencyExchangeWidget />
    </div>
  );
};

export default Widgets;
