import { useEffect, useState } from 'react';
import { useQuery } from 'urql';

const useLastKnownValue = (metricName: string, currentValue: number) => {
    const [value, setValue] = useState(currentValue);
    const [result] = useQuery({
        query: `query ($metricName: String!) {
            getLastKnownMeasurement(metricName:$metricName){
              metric
              value
              at
              unit
            }
          }`,
        variables: {
            metricName
        }
    });
    const { data } = result;
    useEffect(() => {
        setValue(data ? data.getLastKnownMeasurement.value : 0)
    }, [data])
    return value;
}


export default useLastKnownValue;