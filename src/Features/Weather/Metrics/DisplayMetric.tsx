import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as metricMeasureActions } from '../Metrics/metricDataReducer';
import { createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../../../store';
import { MetricsChart } from './MetricsChart';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const queryMeasure = `
query($metricName: String!) {
  getLastKnownMeasurement(metricName: $metricName) {
    metric
    at
    value
    unit
  }
}
`;

const getMetricMeasure = (state: IState) => {
  const { metric, at, value, unit } = state.metricMeasure;
  return {
    metric,
    at,
    value,
    unit,
  };
};

export interface displayProps {
  selectedValue?: string;
}

export const DisplayMetric = (props: displayProps) => {
  const metricName = props.selectedValue;
  const dispatch = useDispatch();
  const { metric, at, value, unit } = useSelector(getMetricMeasure);
  const [resultMeasure] = useQuery({
    query: queryMeasure,
    variables: {
      metricName,
    },
  });
  const { fetching, data, error } = resultMeasure;
  useEffect(() => {
    if (error) {
      dispatch(metricMeasureActions.metricMeasurementApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getLastKnownMeasurement } = data;
    dispatch(metricMeasureActions.metricMeasurementRecevied(getLastKnownMeasurement));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;
  return (
    <>
      <div className={'grid-row grid-gap-4'}>
        <strong>Metric : </strong> {metric}
      </div>
      <div className={'grid-row grid-gap-4'}>
        <strong>At : </strong> {at}
      </div>
      <div className={'grid-row grid-gap-4'}>
        <strong>Value : </strong> {value}
      </div>
      <div className={'grid-row grid-gap-4'}>
        <strong>Unit : </strong> {unit}
      </div>
      <MetricsChart selected={props.selectedValue} />
    </>
  );
};
