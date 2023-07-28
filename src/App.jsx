import { useState, useEffect } from "react";
import "./App.css";

function formatCurrency(amount) {
  return parseFloat(amount).toLocaleString("en-US");
}

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("USD");
  const [toCur, setToCur] = useState("EUR");
  const [convertedData, setConvertedData] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
    day < 10 ? "0" : ""
  }${day}`;

  useEffect(() => {
    async function convertRate() {
      try {
        setLoading(true);
        setError(false);

        const requestOptions = {
          method: "GET",
          headers: { accept: "application/json" },
        };

        if (amount <= 0 || isNaN(amount)) {
          setAmount(0);
          throw new Error("Please enter a valid amount");
        }

        const url = `https://api.fastforex.io/convert?amount=${amount}&from=${fromCur}&to=${toCur}&api_key=700243c13e-a8aca05958-rycm9o`;
        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error("Something happened with fetching");
        }

        const data = await response.json();

        setConvertedData(parseFloat(data.result[toCur]));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    convertRate();
  }, [amount, fromCur, toCur]);

  /**
   * Handle the change event for the amount input field.
   * @param {Event} e - The event object.
   */
  function handleAmountChange(e) {
    // Remove any non-digit or non-decimal point characters from the input value
    const cleanedValue = e.target.value.replace(/[^\d.]/g, "");

    // Convert the cleaned value to a floating point number
    const amount = parseFloat(cleanedValue);

    // Set the amount state to the converted value
    setAmount(amount);
  }

  return (
    <div className="min-h-screen bg-slate-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg mx-10 shadow-lg w-full h-[400px] md:h-[270px] sm:w-1/3 md:w-1/3 lg:w-[550px]">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Currency Converter
        </h2>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <input
            type="text"
            value={formatCurrency(amount)}
            min={1}
            onChange={handleAmountChange}
            className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-40 focus:outline-none focus:border-blue-400"
          />
          <p>From</p>
          <select
            value={fromCur}
            onChange={(e) => setFromCur(String(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-auto focus:outline-none focus:border-blue-400"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="MMK">MMK</option>
            <option value="JPY">JPY</option>
          </select>
          <p>To</p>
          <select
            value={toCur}
            onChange={(e) => setToCur(String(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg w-full sm:w-auto focus:outline-none focus:border-blue-400"
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="MMK">MMK</option>
            <option value="JPY">JPY</option>
          </select>
        </div>
        <div>
          {loading ? (
            "Converting...."
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="flex flex-wrap items-center mb-5 justify-between">
              <p className="py-5">
                {formatCurrency(convertedData)} {toCur}
              </p>
              <p> {formattedDate}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
