import { IState } from "../../store";
import { Metric } from "./types";

interface Selector<T> {
    (state: IState): T
}

export const getSelectedItems: Selector<string[]> = ({ metrics }) => metrics.selected;
export const getMetrics: Selector<{ [at: string]: Metric }> = ({ metrics }) => metrics.metrics;
export const getCardsValues: Selector<{ [at: string]: number }> = ({ metrics }) => metrics.cardsValue;
