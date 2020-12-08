import { createSlice, PayloadAction } from 'redux-starter-kit';

export type MetricListMeasurement = {
  metric: string;
  measurements: [];
};

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
      const{ metric, measurements} = action.payload;
      console.log({ tertye: action.payload})
      state.metric= metric;
      state.measurements= measurements;
    },
    metricListMeasurementApiErrorReceived: (state, action: PayloadAction<MetricListApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
