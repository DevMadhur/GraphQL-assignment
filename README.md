## Create React App Visualization

This assessment was bespoke handcrafted for user.

Read more about this assessment [here](https://react.eogresources.com)

### Challenges

One of the challenge I have faced is to convert the received data from the api to the required format to be fed into the graph components. I have spent the most time figuring it out and I have done it through a saga: `reduceData`. Finally I have combined the new data received with the existing state using `combineMetrics` saga.

### Hooks

I have made use of 3 custom hooks (`useLastKnownValue`, `useMetricsSelect`, `useMetricSubscription`) which I have created.

- **useLastKnownValue**: Uses the getLastKnownMeasurement api for a metric to get the last known value.
- **useMetricsSelect**: Handles the select component state and changes. It dispatches the required actions whenever user selects a metric from the dropdown and updates the redux state accordingly
- **useMetricSubscription**: Handles the subscription with the graphql API for fetching live values from the api for the selected metrics.

### Libraries Used

[recharts](https://github.com/recharts/recharts) - for Charts
[react-select](https://github.com/JedWatson/react-select) - for the Select component.