import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions as metricActions } from '../Metrics/metricReducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../../../store';
import { SelectComponent } from '../../../components/SelectComponent';
import { DisplayMetric } from './DisplayMetric';
import { Card, CardHeader, CardContent, makeStyles } from '@material-ui/core';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});
const useStyles = makeStyles({
  card: {
    margin: '5% 25%',
  },
});
const query = `query{
    getMetrics
}`;

const getMetric = (state: IState) => {
  const metricList = state.metric;
  return metricList;
};
export default () => {
  return (
    <Provider value={client}>
      <SelectMetrics />
    </Provider>
  );
};

const SelectMetrics = () => {
  const classes = useStyles();
  const [selected, setSelected] = useState('Select Metrics');
  const [display, setDisplay] = useState(false);
  const dispatch = useDispatch();
  const metricList = useSelector(getMetric);
  const [result] = useQuery({ query });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(metricActions.metricApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMetrics } = data;
    dispatch(metricActions.metricDataRecevied(getMetrics));
  }, [dispatch, data, error, selected]);

  if (fetching) return <LinearProgress />;
  const handleSelectChange = (event: any) => {
    setSelected(event.target.value);
    setDisplay(true);
  };

  return (
    <>
      <Card className={classes.card}>
        <CardHeader title="Metrics" />
        <CardContent>
          <div>
            <SelectComponent data={metricList.metricList} handleSelectChange={handleSelectChange} selected={selected} />
          </div>
          <div>{display ? <DisplayMetric selectedValue={selected} /> : <> </>}</div>
        </CardContent>
      </Card>
    </>
  );
};
