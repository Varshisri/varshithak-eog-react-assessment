import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../Metrics/metricReducer';
import { Provider, createClient, useQuery } from 'urql';
import LinearProgress from '@material-ui/core/LinearProgress';
import { IState } from '../../../store';
import Chip from '../../../components/Chip';
import { SelectComponent } from '../../../components/SelectComponent';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
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
  const dispatch = useDispatch();
  const metricList = useSelector(getMetric);
  const [result] = useQuery({ query });
  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.metricApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMetrics } = data;
    dispatch(actions.metricDataRecevied(getMetrics));
  }, [dispatch, data, error]);

  if (fetching) return <LinearProgress />;
  const handleSelectChange = (event: any) => {
    console.log(event.target.value);
  };

  return (
    <>
      <SelectComponent data={metricList.metricList} handleSelectChange={handleSelectChange} />
    </>
  );
};
