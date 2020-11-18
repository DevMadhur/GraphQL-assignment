import { takeEvery, put, fork, select } from 'redux-saga/effects'
import { actions } from './reducer';
import { SelectedMetricPayload, Metric } from './types'
import { PayloadAction } from 'redux-starter-kit';
import client from './api';
import { OperationResult } from 'urql';
import { getMetrics, getCardsValues } from './selectors';
import { DURATION_IN_MINUTES, getTimeBefore, getTimeKey } from '../../utils';

type QueryResult = {
    getMeasurements: Metric[]
}

type QueryArgs = {
    metricName: string;
    after: number
}

type MetricsData = {
    [time: string]: Metric;
}

type PreviousValue = {
    [metric: string]: number
}

function* reduceData({ payload: { metric, at, value } }: PayloadAction<Metric>) {
    const data: MetricsData = yield select(getMetrics);
    const timeAt = getTimeKey(at);
    const metrics = {
        ...data,
        [at]: {
            ...data[at],
            [metric]: value,
            at: timeAt,
        },
    };
    const previousCardValue: PreviousValue = yield select(getCardsValues)
    const cardsValue = {
        ...previousCardValue,
        [metric]: value
    }
    yield put(actions.singleMetricDataReceived({ metrics, cardsValue }))
}

function* combineMetrics(list?: Array<Metric>) {
    let metrics: { [at: string]: Metric } = yield select(getMetrics);
    list?.map(item => {
        const { metric, at, value } = item;
        const hrs = new Date(at).getHours() % 12 || 12;
        const mins = new Date(at).getMinutes()
        const timeAt = `${("0" + hrs).slice(-2)}:${("0" + mins).slice(-2)}`
        metrics = {
            ...metrics,
            [at]: {
                ...metrics[at],
                [metric]: value,
                at: timeAt,
            },
        }
    })
    yield put(actions.multipleMetricsDataReceived({ metrics }))
}

function* fetchOldData({ payload }: PayloadAction<SelectedMetricPayload>) {
    const after = getTimeBefore(DURATION_IN_MINUTES)
    const { data }: OperationResult<QueryResult> = yield client.query<QueryResult, QueryArgs>(`
    query($metricName: String!, $after: Timestamp) {
        getMeasurements(input: { metricName: $metricName, after: $after }) {
            at
            metric
            value
            unit
        }
    }`, { metricName: payload.metricName, after }).toPromise();
    yield fork(combineMetrics, data?.getMeasurements)
}

export default function* watcher() {
    yield takeEvery(actions.newMetricValueFetched.type, reduceData);
    yield takeEvery(actions.metricsSelected.type, fetchOldData);
}