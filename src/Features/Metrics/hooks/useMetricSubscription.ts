import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSubscription } from 'urql';
import { actions } from '../reducer';
import { Metric } from '../types';
import { getSelectedItems, getCardsValues } from '../selectors';

interface SubscriptionData {
    newMeasurement: Metric
}

const useMetricSubscription = () => {
    const selectedItems = useSelector(getSelectedItems);
    const cardsValue = useSelector(getCardsValues);
    const dispatch = useDispatch();
    const [result] = useSubscription<SubscriptionData>({
        query: `
        subscription {
            newMeasurement {
                at
                metric
                value
                unit
            }
        }`,
        pause: !selectedItems.length
    })
    const { data } = result;

    useEffect(() => {
        data && dispatch(actions.newMetricValueFetched(data.newMeasurement))
    }, [data, dispatch])
    return { selectedItems, cardsValue };
}

export default useMetricSubscription;