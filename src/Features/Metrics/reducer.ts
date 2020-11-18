import { createSlice, PayloadAction } from 'redux-starter-kit';
import {
    Metric,
    MetricsDataPayload,
    MetricsState,
    MetricsWithCardsValue,
    SelectedMetricPayload
} from './types';

const initialState: MetricsState = {
    selected: [],
    metrics: {},
    cardsValue: {},
};

const slice = createSlice({
    initialState,
    name: 'metricsReducer',
    reducers: {
        multipleMetricsDataReceived: (state, action: PayloadAction<MetricsDataPayload>) => ({
            ...state,
            metrics: action.payload.metrics,
        }),
        metricsSelected: (state, action: PayloadAction<SelectedMetricPayload>) => ({
            ...state,
            selected: action.payload.selected
        }),
        newMetricValueFetched: (state, action: PayloadAction<Metric>) => state,
        singleMetricDataReceived: (state, action: PayloadAction<MetricsWithCardsValue>) => ({
            ...state,
            metrics: action.payload.metrics,
            cardsValue: action.payload.cardsValue
        }),
    }
})

export const { reducer, actions } = slice;