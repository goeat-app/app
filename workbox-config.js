module.exports = {
	globDirectory: 'dist',
	globPatterns: [
		'**/*.{html,png,css}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};