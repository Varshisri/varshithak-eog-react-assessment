import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { createClient, useQuery } from 'urql';
import { SelectComponent } from '../../../components/SelectComponent';
import { IState } from '../../../store';
import { actions } from './metricListMeasuresReducer';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `
  query($input: [MeasurementQuery]) {
    getMultipleMeasurements(input: $input) {
     metric
     measurements{
       metric
       at
       value
       unit
     }
    }
  }
  `;
const getMeasurements = (state: IState) => {
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
  const [time, setTime] = useState('1');
  const input = {
    metricName: props.selected,
    after: new Date(Date.now() - parseInt(time) * 6000).getTime(),
  };
  const dispatch = useDispatch();
  const { metric, measurements } = useSelector(getMeasurements);
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
    const { getMultipleMeasurements } = Object.assign({}, data);
    console.log({ getMultipleMeasurements });
    dispatch(actions.metricListMeasurementRecevied(getMultipleMeasurements));
  }, [dispatch, data, error]);
  const timeRanges = ['1', '2', '5', '7'];
  const handleTimeChange = (event: any) => {
    setTime(event.target.value);
  };
  return (
    <>
      <SelectComponent
        title={'Time change (Ago in minutes)'}
        data={timeRanges}
        selected={time}
        handleSelectChange={handleTimeChange}
      />
      <LineChart width={800} height={500} data={measurements} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="at" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </>
  );
};
