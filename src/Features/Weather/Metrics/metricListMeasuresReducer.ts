import { createSlice, PayloadAction } from 'redux-starter-kit';

export type MetricListMeasurement = [{
  metric: string;
  measurements: [{metric: string, at: number, value: number, unit: string}];
}];

export type MetricListApiErrorAction = {
  error: string;
};

const initialState = {
   metric:'',
   measurements: [{metric: '', at: 0, value: 0, unit: ''}],
  };

const slice = createSlice({
  name: 'metricListOfMeasurements',
  initialState,
  reducers: {
    metricListMeasurementRecevied: (state, action: PayloadAction<MetricListMeasurement>) => {
      let m = action.payload;
     let n = Array.from(m);
      n.forEach((i) => {
        const {metric, measurements} = i;
        state.metric=metric;
      state.measurements= measurements;
    });   
    },
    metricListMeasurementApiErrorReceived: (state, action: PayloadAction<MetricListApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
