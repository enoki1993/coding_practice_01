module.exports = {
	plugins: [
		require("autoprefixer")({
			grid: true
		}),
		require("css-declaration-sorter")({
			order: 'smacss'
		})
	]
};
