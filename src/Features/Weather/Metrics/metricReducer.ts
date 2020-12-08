import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Metrics = {
  metricList: [];
};

export type ApiErrorAction = {
  error: string;
};

const slice = createSlice({
  name: 'metric',
  initialState: {metricList: {}},
  reducers: {
    metricDataRecevied: (state, action: PayloadAction<Metrics>) => {
      let m = action.payload;
      state.metricList= m;
    },
    metricApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => state,
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
