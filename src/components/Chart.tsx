import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { Grid, makeStyles } from '@material-ui/core';

const getAxisID = (metric: string) => {
    if (metric.toLowerCase().endsWith('pressure')) {
        return 1
    } else if (metric.toLowerCase().endsWith('temp')) {
        return 2
    }
    return 0
}

export const getTimeKey = (time: string) => {
    const hours = new Date(time).getHours() % 12 || 12;
    const minutes = new Date(time).getMinutes()
    return `${("0" + hours).slice(-2)}:${("0" + minutes).slice(-2)}`
}

const useStyles = makeStyles(theme => ({
    graphContainer: {
        width: '90vw',
        height: '90vh',
    },
}));

const COLORS = ['#003f5c', '#444e86', '#955196', '#dd5182', '#ff6e54', '#ffa600'];

type Unit = {
    enabled: boolean;
    value: string;
    dx: number,
    dy: number,
    angle: number,
    yAxisId: number,
    fontSize?: number,
    tickFormatter?: (value: number) => string;
}

type Key = "pressure" | "temperature" | "percentage";

type IUnits = {
    [key in Key]: Unit;
}

const Chart: React.FC = () => {
    const selectedItems = ["flareTemp", "casingPressure"];
    const classes = useStyles();
    const units: IUnits = {
        percentage: {
            dx: 10,
            dy: 10,
            enabled: selectedItems.some((m: string) => getAxisID(m) === 0),
            yAxisId: 0,
            angle: -90,
            value: '%'
        },
        pressure: {
            enabled: selectedItems.some((m: string) => getAxisID(m) === 1),
            value: 'PSI',
            dx: 10,
            dy: 10,
            angle: -90,
            fontSize: 12,
            yAxisId: 1,
        },
        temperature: {
            enabled: selectedItems.some((m: string) => getAxisID(m) === 2),
            value: 'F',
            dx: 10,
            dy: 15,
            angle: -90,
            fontSize: 12,
            yAxisId: 2
        }
    }

    return <Grid container className={classes.graphContainer}>
        <ResponsiveContainer>
            <LineChart
                width={600}
                height={600}
                data={[
                    {
                        at: "11:30",
                        oilTemp: 273.23
                    }]}
            >
                {
                    selectedItems.map((metric, index) => {
                        return <Line
                            key={metric}
                            yAxisId={getAxisID(metric)}
                            dataKey={metric}
                            stroke={COLORS[index]}
                            dot
                            activeDot
                        />
                    })
                }
                {
                    selectedItems.length > 0 &&
                    <XAxis dataKey="at" interval={150} />
                }
                {
                    Object.keys(units).map((key) => {
                        const {
                            enabled,
                            yAxisId,
                            tickFormatter,
                            ...rest
                        } = units[key as Key];
                        return enabled && <YAxis
                            key={key}
                            label={{ position: 'insideTopLeft', offset: 0, fill: '#908e8e', ...rest }}
                            yAxisId={yAxisId}
                            tickFormatter={tickFormatter}
                        />
                    })
                }
            </LineChart>
        </ResponsiveContainer>
    </Grid >
}

export default Chart;