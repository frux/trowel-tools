module.exports = function (App) {
	if (!App.configureStore) {
		throw new Error('App must have .configureStore(initialState) method');
	}

	var appBundle = {
		initClient: function (appState, appData, mountElementId) {
			if (appState === undefined) {
				appState = {};
			}
			if (appData === undefined) {
				appData = {};
			}
			if (mountElementId === undefined) {
				mountElementId = 'mount';
			}
			var createElement = require('react').createElement;
			var render = require('react-dom').render;
			var AppContainer = require('react-hot-loader').AppContainer;
			var BrowserRouter = require('react-router-dom').BrowserRouter;
			var Provider = require('react-redux').Provider;

			var store = App.configureStore(appState);

			appBundle.updateClient = function (NextApp) {
				var mount = document.getElementById(mountElementId);

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
