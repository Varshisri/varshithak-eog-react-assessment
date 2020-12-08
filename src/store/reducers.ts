import { reducer as metricReducer } from './../Features/Weather/Metrics/metricReducer';
import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as metricDataReducer} from '../Features/Weather/Metrics/metricDataReducer';

export default {
  weather: weatherReducer,
  metric: metricReducer,
  metricMeasure: metricDataReducer,
};
