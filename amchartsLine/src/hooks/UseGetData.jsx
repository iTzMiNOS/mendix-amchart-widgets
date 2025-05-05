import React from 'react'

const UseGetData = (props) => {
    let widgetItemsList = [];

    const widgetItems = props.widgetData.items;
    const { widgetId, widgetPrice, widgetChange } = props;

    widgetItems.forEach((item, index) => {
        const coinId = widgetId.get(item).value;
        const price = parseFloat(widgetPrice.get(item).value);
        const change = parseFloat(widgetChange.get(item).value);
        
        widgetItemsList.push({
            coinId,
            price,
            change
        });
    });

    return { 
        widgetItemsList,
    };
};

export default UseGetData;
