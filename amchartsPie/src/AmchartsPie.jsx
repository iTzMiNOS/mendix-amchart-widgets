import React, { createElement } from "react";
import "./ui/AmchartsPie.css";
import Chart from "./components/Chart";
import UseGetData from "./hooks/UseGetData";

export function AmchartsPie(props) {
    if(props.widgetData.status === 'available'){
        const 
        {
            widgetItemsList,
            callOnClickCharts  
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
                    {props.onClickChart ? <button style={{ marginLeft: "3px"}} className="btn btn-primary" onClick={callOnClickCharts}>{props.actionName}</button> : <></>}
                </div>
                <Chart widgetItemsList={widgetItemsList}/>
                
            </div>
        );
    }
}