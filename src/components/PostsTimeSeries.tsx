import React, {useEffect, useState} from 'react';
import {Post} from "../service/Models";
import _ from 'lodash';
import {BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {useRechartToPng} from "recharts-to-png";


interface PostsTimeSeriesProps {
    posts: Post[],
    saveChart: (data: string) => void
}

type AllMonth = {
    [key:string]: number
}

type DataRow = {
    name: string,
    count: number,
    ma?: number
}

const addMA = (data: DataRow[], windowSize: number): DataRow[] => {
    if (windowSize % 2 === 0) windowSize += 1;
    const halfWindowSize = Math.floor(windowSize / 2);
    const monthsMA: DataRow[] = [...data];
    for (let i = halfWindowSize + 1; i < (data.length - halfWindowSize); i++) {
        let windowSum = data[i].count;
        for (let j = 1; j <= halfWindowSize; j++) {
            windowSum += data[i-j].count;
            windowSum += data[i+j].count;
        }
        monthsMA[i].ma = Math.round(windowSum / windowSize);
    }

    return monthsMA;
};

const addEMA = (data: DataRow[], alpha: number): DataRow[] => {
    const monthsMA: DataRow[] = [...data];

    monthsMA[0].ma = monthsMA[0].count;

    for (let i = 1; i < monthsMA.length; i++) {
        monthsMA[i].ma = Math.round(alpha*monthsMA[i].count + (1-alpha)*(monthsMA[i-1].ma as number));
    }

    return monthsMA;
};


const PostsTimeSeries = ({posts, saveChart}: PostsTimeSeriesProps) => {
    const [data, setData] = useState<DataRow[]>([]);

    useEffect(() => {
        const allMonths: AllMonth = {};

        let i = new Date(posts[0].time_stamp).setDate(1);
        const max = posts[posts.length - 1].time_stamp;
        while (i < max) {
            allMonths[new Date(i).toLocaleDateString()] = 0;
            i = new Date(i).setMonth(new Date(i).getMonth() + 1);
        }

        posts.forEach(p => {
            const key = new Date(new Date(p.time_stamp).setDate(1)).toLocaleDateString();
            allMonths[key]++;
        });

        const months = Object.keys(allMonths).map((key) => {
            return {
                name: key,
                count: allMonths[key]
            }
        }).sort((a, b) => {
            if (Date.parse(a.name) > Date.parse(b.name)) return 1;
            if (Date.parse(a.name) < Date.parse(b.name)) return -1;
            return 0;
        }).map(m => {
            return { ...m, name: m.name.slice(3) }
        });

        // const dataMA = addMA(months, 2);
        const dataMA = addEMA(months, 0.5);
        setData(dataMA);
    }, []);

    const [png, ref] = useRechartToPng();

    const handleDownload = React.useCallback(async () => {
        saveChart(png);
    }, [png]);

    // useEffect(() => { handleDownload() });

    return (
        <div style={{ }}>
            <h1>Динамика постов</h1>
            <ResponsiveContainer width={'100%'} height={300}>
                <LineChart ref={ref} data={data}
                           margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" name='Количество публикаций' />
                    <Line type="monotone" dataKey="ma" stroke="#6ab0b9ce" name='Скользящая средняя' />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
};

export default PostsTimeSeries;