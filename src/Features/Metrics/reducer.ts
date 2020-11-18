import { createSlice, PayloadAction } from 'redux-starter-kit';
import {
    MetricsState,
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
        multipleMetricsDataReceived: (state, action: PayloadAction) => ({
            ...state,
        }),
        metricsSelected: (state, action: PayloadAction) => ({
            ...state,
        }),
        newMetricValueFetched: (state, action: PayloadAction) => state,
        singleMetricDataReceived: (state, action: PayloadAction) => ({
            ...state,
        }),
    }
})

export const { reducer, actions } = slice;