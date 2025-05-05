import React, { createElement } from "react";
import "./ui/AmchartsXY.css";
import Chart from "./components/Chart";
import UseGetData from "./hooks/UseGetData";

export function AmchartsXY(props) {
    if(props.widgetData.status === 'available'){
        const
        {
            widgetItemsList
        } = UseGetData(props);
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column"
            }}>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row"
                }}>
                    {props.title ? <h1 style={{fontWeight: "bolder", marginRight: "3px"}}>{props.title}</h1> : <></>}
                </div>
                <Chart widgetItemsList={widgetItemsList}/>
            </div>
        );
    }
}