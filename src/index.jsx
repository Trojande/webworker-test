import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import {
    createStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import middleware from './middleware';
import reducers from './reducers';
import App from './app.jsx';
const rootReducer = combineReducers(reducers);
const store = createStore(rootReducer,
    applyMiddleware(
        thunk,
        middleware.ajaxMiddleware,
				middleware.loggerMiddleware,
    ));
render(
	<AppContainer>
		<Provider store={store}>
			<App/>
		</Provider>
	</AppContainer>,
	document.querySelector("#app")
);

if (module && module.hot) {
    module.hot.accept('./app.jsx', () => {
        const App = require('./app.jsx').default;
        render(
			<AppContainer>
				<Provider store={store}>
					<App/>
				</Provider>
			</AppContainer>,
            document.querySelector("#app")
        );
    });
}
