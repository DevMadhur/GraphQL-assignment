import React from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import Select from 'react-select';
import Chart from '../../components/Chart';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        padding: theme.spacing(4)
    }
}))

const Metrics: React.FC = () => {
    const classes = useStyles();
    return <main className={classes.container}>
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Grid container spacing={2} direction='row-reverse'>
                    <Grid item xs={12} md={6} lg={5}>
                        <Select
                            name='metricSelect'
                            options={['a', 'b', 'c']}
                            isMulti
                            closeMenuOnSelect={false}
                            onChange={(e) => console.log('selected', e)}
                        />
                    </Grid>
                </Grid>
                <Grid item lg={7} md={6} xs={12} spacing={2} container>
                    <div> Cards goes here </div>
                </Grid>
            </Grid>
            <Grid item container xs={12} justify='center' alignItems='center'>
                <Chart />
            </Grid>
        </Grid>
    </main>
}

export default Metrics;