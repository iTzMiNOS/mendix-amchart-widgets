import React, { useState, useEffect, createElement } from 'react';

import "./ui/AmchartsLine.css";
import UseGetData from './hooks/UseGetData';
import LineChart from './components/LineChart';

function AmchartsLine(props) {
    if(props.widgetData.status === 'available'){
        const {
            widgetItemsList
        } = UseGetData(props);

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://api.coingecko.com/api/v3/coins/${widgetItemsList[0].coinId}/market_chart?vs_currency=usd&days=7`, {
            headers: {
              'x-cg-api-key': 'CG-2umjz9pEqW5fEm3v3TJk6kmq',
              'accept': 'application/json'
            }
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          
          const result = await response.json();
        
            // Extract and map the prices array
            const mappedPrices = result.prices.map(([timestamp, price]) => ({
            timestamp,
            price
            }));

            setData(mappedPrices);
        } catch (error) {
            setError(error);
        }
        };

        fetchData();
    }, [widgetItemsList[0].coinId]);
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    if (!data) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1>Line Chart for {widgetItemsList[0].coinId}</h1>
        <LineChart mappedPrices={data} />
      </div>
    );
  };
}
export default AmchartsLine;