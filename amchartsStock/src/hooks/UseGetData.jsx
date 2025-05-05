import React, {createElement} from 'react';

const UseGetData = (props) => {
    let widgetItemsList = [];

    if (props.widgetData && props.widgetData.items) {
        const widgetItems = props.widgetData.items;
        const { widgetId, widgetPrice, widgetChange } = props;

        widgetItems.forEach((item) => {
            const coinId = widgetId.get(item).value;
            const price = parseFloat(widgetPrice.get(item).value);
            const change = parseFloat(widgetChange.get(item).value);

            widgetItemsList.push({
                coinId,
                price,
                change
            });
        });
    } else {
        console.warn("widgetData.items is undefined");
    }

    return { 
        widgetItemsList,
    };
};

export default UseGetData;
