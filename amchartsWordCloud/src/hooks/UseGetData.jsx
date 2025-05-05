import React from 'react';
import { createElement } from "react";

const UseGetData = (props) => {
    let widgetItemsList = [];

    const widgetItems = props.widgetData.items;
    const { widgetString, widgetWeight, onClickCloud, widgetColor, widgetWidth, widgetHeight } = props;

    const marketCaps = widgetItems.map(item => parseFloat(widgetWeight.get(item).value));
    const logMarketCaps = marketCaps.map(cap => Math.log(cap));

    const minLogCap = Math.min(...logMarketCaps);
    const maxLogCap = Math.max(...logMarketCaps);

    const scaleLogMarketCap = (logCap) => {
        return 20 + ((logCap - minLogCap) / (maxLogCap - minLogCap)) * (100 - 20);
    };

    widgetItems.forEach((item, index) => {
        const itemVal = scaleLogMarketCap(logMarketCaps[index]);
        const itemCat = widgetString.get(item).value.toUpperCase();
        
        widgetItemsList.push({
            itemVal,
            itemCat
        });
    });

    const callOnClickCloud = () => {
        if (onClickCloud && onClickCloud.canExecute) {
            onClickCloud.execute();
        }
    };

    return { 
        widgetItemsList,
        widgetColor,
        widgetWidth,
        widgetHeight,
        callOnClickCloud 
    };
};

export default UseGetData;
