import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Option } from '../types'
import { useQuery } from "urql";
import { actions } from '../reducer';

const useMetricsSelect = () => {
    const [result] = useQuery<{ getMetrics: Array<string> }>({
        query: `
            query {
                getMetrics
            }
        `
    })
    const { data, error } = result;
    const [options, setOptions] = useState([]);
    useEffect(() => {
        if (error || !data) return;
        const { getMetrics } = data;
        setOptions(getMetrics.map((option) => ({ label: option, value: option })))
    }, [data, error]);

    const dispatch = useDispatch();
    const onSelect = (selected: any, action: any) => dispatch(actions.metricsSelected({
        selected: selected?.map((item: Option) => item.value) || [],
        metricName: action.option?.value || ''
    }));

    return { options, onSelect }
}

export default useMetricsSelect;
