export type Metric = {
    metric: string;
    at: string;
    value: number;
    unit: string;
}

export type MetricsState = {
    metrics: {
        [at: string]: Metric;
    };
    cardsValue: {
        [metric: string]: number
    },
    selected: string[];
}