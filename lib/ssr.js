module.exports = function (App, {location, routerContext, appState = {}, appData = {}}) {
	const createElement = require('react').createElement;
	const AppContainer = require('react-hot-loader').AppContainer;
	const StaticRouter = require('react-router-dom').StaticRouter;
	const Provider = require('react-redux').Provider;

	if (!App.configureStore) {
		throw new Error('App must have .configureStore(initialState) method');
	}

	const store = App.configureStore(appState);

	return createElement(
		Provider,
		{store: store},
		createElement(
			StaticRouter,
			{
				location: location,
				context: routerContext,
				basename: appData.baseUrl
			},
			createElement(
				AppContainer,
				{},
				createElement(App, {appData: appData})
			)
		)
	);
};
