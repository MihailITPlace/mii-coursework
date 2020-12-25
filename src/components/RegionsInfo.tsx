import React, {useEffect} from "react";
import {BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer} from 'recharts';
import {Regions} from "../service/Models";
import { useRechartToPng } from "recharts-to-png";


interface RegionsProps {
    regions: Regions,
    saveChart: (data: string) => void
}

const RegionsInfo = ({regions, saveChart}: RegionsProps) => {
    const [png, ref] = useRechartToPng();

    const handleDownload = React.useCallback(async () => {
        saveChart(png);
    }, [png]);

    // useEffect(() => { handleDownload() });

    const data = Object.keys(regions).map((k: string) => (
        {x: k, count: regions[k]}
    ));

    return (
        <div>
            <h1>Статистика по регионам</h1>
            {
                (Object.keys(regions).length > 0)
                ? <ResponsiveContainer width='100%' height={400}>
                        <BarChart ref={ref}  data={data}
                                  margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="x"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend />
                            <Bar dataKey="count" fill="#009c95" name='Количество' />
                        </BarChart>
                    </ResponsiveContainer>
                : <p>Геометок не найдено</p>
            }
        </div>
    );
}

export default RegionsInfo;
