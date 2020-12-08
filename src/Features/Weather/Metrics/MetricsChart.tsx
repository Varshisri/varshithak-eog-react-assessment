import { LinearProgress } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { useQuery } from 'urql';
import { IState } from '../../../store';
import { actions } from './metricListMeasuresReducer';

const query = `
  query($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
     metric
     measurements
    }
  }
  `;
const getAllMeasurements = (state: IState) => {
  const { metric, measurements } = state.metricListMeasurement;
  return {
    metric,
    measurements,
  };
};

export interface displayProps {
  selected?: string;
}
export const MetricsChart = (props: displayProps) => {
  const input = {
    metricName: props.selected,
    after: 109873000,
    before: 5726476890,
  };
  const dispatch = useDispatch();
  const { metric, measurements } = useSelector(getAllMeasurements);
  const [result] = useQuery({
    query,
    variables: {
      input,
    },
  });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.metricListMeasurementApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getAllMeasurements } = data;
    console.log({ measurements });
    dispatch(actions.metricListMeasurementRecevied(getAllMeasurements));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;
  return (
    <LineChart width={600} height={300} data={measurements} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
      <Line type="monotone" dataKey="value" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="at" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};
