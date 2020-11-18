import React from 'react';
import { Provider } from 'urql';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import Chart from '../../components/Chart';
import MetricCardsSection from '../../components/MetricCardsSection';
import client from './api';
import useMetricsSelect from './hooks/useMetricsSelect';
import Select from 'react-select';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        padding: theme.spacing(4)
    }
}))

const Metrics: React.FC = () => {
    const classes = useStyles();
    const { options, onSelect } = useMetricsSelect();
    return <main className={classes.container}>
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Grid container spacing={2} direction='row-reverse'>
                    <Grid item xs={12} md={6} lg={5}>
                        <Select
                            name='metricSelect'
                            options={options}
                            isMulti
                            closeMenuOnSelect={false}
                            onChange={onSelect}
                        />
                    </Grid>
                </Grid>
                <Grid item lg={7} md={6} xs={12} spacing={2} container>
                    <MetricCardsSection />
                </Grid>
            </Grid>
            <Grid item container xs={12} justify='center' alignItems='center'>
                <Chart />
            </Grid>
        </Grid>
    </main>
}

const MetricsWithProvider = () => {
    return <Provider value={client}>
        <Metrics />
    </Provider>
}

export default MetricsWithProvider;