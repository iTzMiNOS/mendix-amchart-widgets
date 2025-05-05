import React from 'react';
import { createElement } from "react";


const UseGetData = (props) => {

    let widgetItemsList = [];

    const widgetItems = props.widgetData.items;
    const { widgetValue, widgetCategory, widgetFunction, onClickChart } = props;

    if(widgetFunction === 'sum'){
        widgetItems.forEach((item) => {
            const itemVal = parseFloat(widgetValue.get(item).value);
            const itemCat = widgetCategory.get(item).value;
    
            const existingItem = widgetItemsList.find(t => t.itemCat === itemCat);
            
            if(itemVal !== 0){
                if (existingItem) {
                    existingItem.itemVal += itemVal;
                } else {
                    widgetItemsList.push({
                        itemVal,
                        itemCat
                    });
                }
            }
        });
    }else if (widgetFunction === 'max') {
        widgetItems.forEach((item) => {
            const itemVal = parseFloat(widgetValue.get(item).value);
            const itemCat = widgetCategory.get(item).value;

            const existingItem = widgetItemsList.find(t => t.itemCat === itemCat);

            if (existingItem) {
                existingItem.itemVal = Math.max(existingItem.itemVal, itemVal);
            } else {
                widgetItemsList.push({
                    itemVal,
                    itemCat
                });
            }
        });
    }else if (widgetFunction === 'min') {
        widgetItems.forEach((item) => {
            const itemVal = parseFloat(widgetValue.get(item).value);
            const itemCat = widgetCategory.get(item).value;

            const existingItem = widgetItemsList.find(t => t.itemCat === itemCat);

            if (existingItem) {
                existingItem.itemVal = Math.min(existingItem.itemVal, itemVal);
            } else {
                widgetItemsList.push({
                    itemVal,
                    itemCat
                });
            }
        });
    };

    const callOnClickCharts = () => {
        if (onClickChart && onClickChart.canExecute) {
            onClickChart.execute();
        }
    };

    return { 
        widgetItemsList,
        callOnClickCharts 
    };
};

export default UseGetData;