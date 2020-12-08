import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { actions as MetricsActions, ApiErrorAction } from './metricReducer';
import {actions as MetricMeasurementActions, MMApiErrorAction} from './metricDataReducer';
import { PayloadAction } from 'redux-starter-kit';

function* apiErrorReceived(action: PayloadAction<ApiErrorAction>) {
  yield call(toast.error, `Error Received: ${action.payload.error}`);
}
function* mmApiErrorReceived(action: PayloadAction<MMApiErrorAction>) {
  yield call(toast.error, `Error Received: ${action.payload.error}`);
}
export default function* watchApiError() {
  yield takeEvery(MetricsActions.metricApiErrorReceived.type, apiErrorReceived);
  yield takeEvery(MetricMeasurementActions.metricMeasurementApiErrorReceived.type, mmApiErrorReceived);
}
