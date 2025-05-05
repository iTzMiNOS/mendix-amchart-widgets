import React, {createElement} from 'react';
import UseGetData from './hooks/UseGetData';
import LineChart from './components/LineChart';

const CommissionsChart = (props) => {
    console.log("props1",props);
    if(props.widgetData.status === 'available'){
        console.log("props",props);
    const { widgetItemsList } = UseGetData(props);

        return (
            <div>
                {props.title ? <h2>{props.title}</h2> : null}
                <LineChart data={widgetItemsList} />
            </div>
        );
    }
}

export default CommissionsChart;
