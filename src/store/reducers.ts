import { reducer as metricReducer } from './../Features/Weather/Metrics/metricReducer';
import { reducer as weatherReducer } from '../Features/Weather/reducer';

export default {
  weather: weatherReducer,
  metric: metricReducer,
};
