import React from 'react';

const UseGetData = (props) => {
    let widgetItemsList = [];

    const widgetItems = props.widgetData.items;
    const { widgetValue, widgetCategory, widgetFunction } = props;

    // Function to format date to dd/mm/yyyy
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Aggregate data based on the specified function
    widgetItems.forEach((item) => {
        const itemVal = parseFloat(widgetValue.get(item).value);
        const itemCatValue = widgetCategory.get(item).value;

        // Exclude items without a valid date
        if (!itemCatValue) {
            return;
        }

        const itemCat = formatDate(itemCatValue);
        const existingItem = widgetItemsList.find(t => t.itemCat === itemCat);

        if (widgetFunction === 'sum') {
            if (itemVal !== 0) {
                if (existingItem) {
                    existingItem.itemVal += itemVal;
                } else {
                    widgetItemsList.push({
                        itemVal,
                        itemCat
                    });
                }
            }
        } else if (widgetFunction === 'max') {
            if (existingItem) {
                existingItem.itemVal = Math.max(existingItem.itemVal, itemVal);
            } else {
                widgetItemsList.push({
                    itemVal,
                    itemCat
                });
            }
        } else if (widgetFunction === 'min') {
            if (existingItem) {
                existingItem.itemVal = Math.min(existingItem.itemVal, itemVal);
            } else {
                widgetItemsList.push({
                    itemVal,
                    itemCat
                });
            }
        }
    });

    return { 
        widgetItemsList
    };
};

export default UseGetData;
