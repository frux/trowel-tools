# Trowel tools
> Helpers for Trowel

These helpers help you to make React application using:
* react-redux
* react-router-dom@4.0.0-beta.4
* react-hot-loader@3.0.0-beta.6

Here's an example of your App component:
```jsx
/*--- App.jsx ---*/
import {Component, PropTypes} from 'react';
import {createStore} from 'redux';
import getMyInitialState from '../redux/my-initial-state.js';
import myReducer from '../redux/my-reducer.js';

/*
	it is a very root application component
	NOT NEEDED to be wrapped in react-redux, react-router or react-hot-loader conatiners
*/
export default class App extends Component {
	render(props) {
		return (
			<div>{props.appData.greating}</div>
		);
	}
}

App.propTypes = {
	appData: PropTypes.shapeOf({
		greating: PropTypes.string
	})
};

// REQUIRED: static function creating redux store
App.configureStore = () => createStore(myReducer, getMyInitialState());
```

## trowelTools.bundle
```
(App: React.Component) => {
	initClient: (
		appState?: any = {},
		appData?: any = {},
		mountElementId?: string = 'mount'
	) => void
}	
```

Helps you to wrap your App component by:
* ``<Provider>`` from react-redux
* ``<BrowserRouter>`` from react-router-dom
* ``<AppContainer>`` from react-hot-loader

```js
/*--- index.js – entry file for webpack ---*/
import {bundle} from 'trowel-tools';
import getMyInitialState from '../redux/my-initial-state.js';

const appBundle = bundle(App);

// will be passed as appData prop
const appData = {
	greating: 'Hello World!'
};

appBundle.initClient(getMyInitialState(), appData, 'mount');

// if hot-module-replacement is enabled
if (module.hot) {
	module.hot.accept('./App.jsx', () => {
		const NextApp = require('./App.jsx').default;

		// .updateClient method will appear after you called .initClient
		appBundle.updateClient(NextApp);
	});
}
```

## trowelTools.initSSR
```
(
	App: React.Component,
	params: {
		location: string,
		routerContext: {},
		appState?: any,
		appData?: any
	}
) => React$Element
```

Helps you to wrap your App component by:
* ``<Provider>`` from react-redux
* ``<StaticRouter>`` from react-router-dom
* ``<AppContainer>`` from react-hot-loader

```js
/*--- ssr.js – Server-Side rendering ---*/
import {renderToString} from 'react-dom/server';
import {initSSR} from 'trowel-tools';
import App from './App.jsx';
import getMyInitialState from '../redux/my-initial-state.js';

export default function (location) {
	const routerContext = {};
	const appState = getMyInitialState();
	const appData = {
		greating: 'Hello World!'
	};

	const app = initSSR(App, {location, routerContext, appState, appData});

	return renderToString(app);
}
```