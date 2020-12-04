import React from "react";
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar} from 'recharts';


interface RegionsProps {
    regions: object
}

const RegionsInfo = ({regions}: RegionsProps) => {
    const data = Object.keys(regions).map(k => (
        // @ts-ignore
        {x: k, y: regions[k] as number}
    ))

    return (
        <div>
            <BarChart width={600} height={300} data={data}
                      margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3"/>
                <XAxis dataKey="x"/>
                <YAxis/>
                <Tooltip/>
                <Legend />
                <Bar dataKey="y" fill="#8884d8" />
            </BarChart>
        </div>
    );
}

export default RegionsInfo;
