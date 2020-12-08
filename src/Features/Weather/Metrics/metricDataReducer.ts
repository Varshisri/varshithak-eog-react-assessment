import { createSlice, PayloadAction } from 'redux-starter-kit';

export type MetricMeasurement = {
    metric: string;
at: string;
value: number;
unit: string;
}

export type MMApiErrorAction = {
  error: string;
};

const initialState = {
   metric:'',
   at:'',
   value: 0.0,
   unit: '',
  };

const slice = createSlice({
  name: 'metric',
  initialState,
  reducers: {
    metricMeasurementRecevied: (state, action: PayloadAction<MetricMeasurement>) => {
      const{ metric, at, value, unit} = action.payload;
      state.metric= metric;
      state.at= at;
      state.value= value;
      state.unit= unit;
    },
    metricMeasurementApiErrorReceived: (state, action: PayloadAction<MMApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
