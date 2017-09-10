import { GET_FILE_LIST } from '../consts';
export function getFileList() {
	return (dispatch) => dispatch({
		meta: {
				url: 'http://localhost/files',
				method: 'GET',
		},
		type: GET_FILE_LIST

	});
}
