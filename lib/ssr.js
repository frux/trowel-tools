module.exports = function (App, context) {
	var createElement = require('react').createElement;
	var AppContainer = require('react-hot-loader').AppContainer;
	var StaticRouter = require('react-router-dom').StaticRouter;
	var Provider = require('react-redux').Provider;
	var location = context.location;
	var routerContext = context.routerContext;
	var appState = context.appState || {};
	var appData = context.appData || {};

	if (appState === undefined) {
		appState = undefined;
	}
	if (appData === undefined) {
		appData = undefined;
	}

	if (!App.configureStore) {
		throw new Error('App must have .configureStore(initialState) method');
	}

	var store = App.configureStore(appState);

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
