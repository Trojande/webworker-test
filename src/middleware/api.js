import fetch from 'isomorphic-fetch';

const ajaxMiddleware = store => next => action => {

	if (!action.meta) return next(action);
	next({
		...action,
		status: 'SEND',
	});
	const {
		method,
		url,
		data
	} = action.meta;
	let requestParams = {
		headers: {
			Accept: 'application/json'
		},
		method,
	};
	if (data) {
		requestParams = {
			...requestParams,
			headers: {
				...requestParams.headers,
				'content-type': 'application/json',
			},
			body: JSON.stringify(data),
		}
	}
	fetch(url, requestParams)
		.then(response => response.json())
		.then((response) => {
		next({
			...action,
			status: 'SUCCESS',
			response
		})
	}).catch((error) => {
		next({
			...action,
			status: 'FAIL',
			error
		})
	})
};


export default ajaxMiddleware
