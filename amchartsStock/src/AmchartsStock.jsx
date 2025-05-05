import React, { useState, useEffect, createElement } from 'react';
import "./ui/AmchartsStock.css";
import UseGetData from './hooks/UseGetData';
import StockChart from './components/StockChart';

function AmchartsStock(props) {
    const { widgetItemsList } = UseGetData(props);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (widgetItemsList && widgetItemsList.length > 0) {
            const coinId = widgetItemsList[0].coinId;
            const fetchData = async () => {
                try {
                    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?days=1&vs_currency=usd`, {
                        headers: {
                            'x-cg-api-key': 'CG-2umjz9pEqW5fEm3v3TJk6kmq',
                            'accept': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const result = await response.json();

                    // Map the API response to the expected format
                    const mappedPrices = result.map(([timestamp, openPrice, highPrice, lowPrice, closePrice]) => ({
                        date: timestamp,
                        openPrice,
                        highPrice,
                        lowPrice,
                        closePrice
                    }));

                    setData(mappedPrices);
                } catch (error) {
                    setError(error);
                }
            };

            fetchData();
        }
    }, [widgetItemsList.length > 0 ? widgetItemsList[0].coinId : null]);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Candlesticks Chart for {widgetItemsList[0]?.coinId}</h1>
            <StockChart mappedPrices={data} />
        </div>
    );
}

export default AmchartsStock;
