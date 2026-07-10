module.exports = {
	globDirectory: 'dist',
	globPatterns: [
		'**/*.{html,js,css,json,png,jpg,jpeg,gif,webp,svg,ico,woff,woff2,ttf,otf}'
	],
	swDest: 'dist/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};