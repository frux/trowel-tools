module.exports = function (App) {
	if (!App.configureStore) {
		throw new Error('App must have .configureStore(initialState) method');
	}

	const appBundle = {
		initClient(appState = {}, appData = {}, mountElementId = 'mount') {
			const createElement = require('react').createElement;
			const render = require('react-dom').render;
			const AppContainer = require('react-hot-loader').AppContainer;
			const BrowserRouter = require('react-router-dom').BrowserRouter;
			const Provider = require('react-redux').Provider;

			const store = App.configureStore(appState);

			appBundle.updateClient = function (NextApp) {
				const mount = document.getElementById(mountElementId);

				render(
					createElement(
						Provider,
						{store: store},
						createElement(
							BrowserRouter,
							{basename: appData.baseUrl},
							createElement(
								AppContainer,
								{},
								createElement(NextApp, {appData: appData})
							)
						)
					),
					mount
				);
			};

			appBundle.updateClient(App, store, appData);
		}
	};

	return appBundle;
};
