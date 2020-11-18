import { OptionTypeBase } from "react-select"

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

export type SelectedMetricPayload = {
    selected: string[];
    metricName: string;
}

export type MetricsWithCardsValue = {
    metrics: {
        [at: string]: Metric;
    };
    cardsValue: {
        [metric: string]: number
    }
}

export type MetricsDataPayload = {
    metrics: {
        [at: string]: Metric;
    };
}

export interface Option extends OptionTypeBase {
    label: string;
    value: string;
}