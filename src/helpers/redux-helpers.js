export const createReducer = (initialState, actionTypesMap) => (state, action) => {
	if (!actionTypesMap[action.type]) return initialState;
	return actionTypesMap[action.type](state, action);
};
export const checkRequestStatus = (state, action, statusTypesMap) => {
	if (!statusTypesMap[action.status]) return state;
	return statusTypesMap[action.status](state, action);
};
