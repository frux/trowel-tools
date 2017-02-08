module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true,
		node: true
	},
	extends: [
		'xo'
	],
	parserOptions: {
		ecmaFeatures: {
			experimentalObjectRestSpread: true
		},
		ecmaVersion:'2017',
		sourceType: 'module'
	},
	plugins: [],
	ext: [
		'.js'
	],
	rules: {
		'quotes': ['error', 'single', {'avoidEscape': true}]
	}
}
