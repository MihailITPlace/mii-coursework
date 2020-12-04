import React from "react";
// @ts-ignore
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts';


interface RegionsProps {
    regions: object
}

const RegionsInfo = ({regions}: RegionsProps) => {
    const data = Object.keys(regions).map(k => (
        // @ts-ignore
        {x: k, count: regions[k] as number}
    ))

    return (
        <div style={{marginTop: "1em"}}>
            <BarChart width={800} height={300} data={data}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="x"/>
                <YAxis/>
                <Tooltip/>
                <Legend />
                <Bar dataKey="count" fill="#009c95" />
            </BarChart>
        </div>
    );
}

export default RegionsInfo;
