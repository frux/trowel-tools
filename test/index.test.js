import {createElement} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {createStore} from 'redux';
import test from 'ava';
import {bundle, initSSR} from '../';

function App() {
	return createElement('div', {}, 'Hello World!');
}

App.getInitialState = function () {
	return {
		test: true
	};
};

App.configureStore = function () {
	return createStore(state => state, {});
};

test('bundle', t => {
	const appBundle = bundle(App);
	t.is(typeof appBundle.initClient, 'function');
});

test('initSSR', t => {
	const app = initSSR(App, {
		location: '/',
		routerContext: {},
		appState: {},
		appData: {}
	});

	t.is(renderToStaticMarkup(app), '<div>Hello World!</div>');
});
