import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
  form: form, //form:n staten muodostaa redux-form reducer
  auth: authReducer
});

export default rootReducer;
