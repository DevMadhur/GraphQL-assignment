import React from 'react';
import { Grid, CardContent, Typography, Card, CardHeader } from '@material-ui/core';
import useMetricSubscription from '../Features/Metrics/hooks/useMetricSubscription';
import useLastKnownValue from '../Features/Metrics/hooks/useLastKnownValue';

interface CardProps {
    metricName: string;
    currentValue: number;
}

const MetricCard: React.FC<CardProps> = ({ metricName, currentValue }) => {
    const value = useLastKnownValue(metricName, currentValue);
    return <Grid item md={5} xs={6}>
        <Card elevation={2}>
            <CardHeader title={metricName} />
            <CardContent>
                <Typography variant="h3">
                    {currentValue ? currentValue : value}
                </Typography>
            </CardContent>
        </Card>
    </Grid>
}

const MetricCardsSection: React.FC = () => {
    const { selectedItems, cardsValue } = useMetricSubscription();
    return <>
        {
            selectedItems.map((metric) => (
                <MetricCard key={metric}
                    metricName={metric}
                    currentValue={cardsValue[metric]}
                />
            ))
        }
    </>
}

export default MetricCardsSection