import {
	createReducer,
	checkRequestStatus
} from '../helpers/redux-helpers';
import { GET_FILE_LIST } from '../consts';

const initialState = {
	fileList: [],
};
export default createReducer(initialState, {
  [GET_FILE_LIST]: (state, action) =>
		checkRequestStatus(state, action, {
			SEND: (state, action) => {
				return {
					...state,
					fileList: {
            isFetching: true,
					},
				}
			},
			SUCCESS: (state, action) => {
				return {
					...state,
					fileList: {
            isFetching: false,
            items: action.response,
					}
				};
			},
			FAIL: (state, action) => {
				return {
					...state,
					fileList: {
            isFetching: false,
          },
					error: action.error,
				}
			}
	})
})
