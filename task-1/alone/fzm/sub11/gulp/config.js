module.exports = function(src, dist) {
	return {
		image: {
			isUse: false,
			src: [src + 'img/**/*.{jpg,jpeg,png,gif,svg}', src + 'css/img/**/*.{jpg,jpeg,png,gif,svg}'],
			dist: [dist + 'img/', dist + 'css/img/'],
			option: {
				optimizationLevel: 5,
				progressive: true,
				interlaced: true
			}
		},
		sass: {
			isUse: true,
			isMap: true,
			src: [src + 'sass/**/*.{sass,scss}'],
			dist: [dist + 'css/']
		},
		script: {
			isUse: false,
			isMap: true,
			src: [src + 'js/**/*.js'],
			dist: [dist + 'js/']
		},
		copy: {
			isUse: false,
			src: [src + 'fonts/**/*', src + 'app/**/*.html'],
			dist: [dist + 'fonts/', dist + 'app/']
		},
		browsersync: {
			isUse: true,
			option: {
				server: {
					baseDir: [dist, src]
				},
				port: 9999,
				files: [
					dist + '**/*.html',
					dist + 'css/**/*.css',
					dist + 'js/**/*.js',
					dist + 'img/**/**',
					dist + 'fonts/**/**'
				]
			}
		},
		useref: {
			isUse: false,
			isMap: true,
			src: [src + 'app/**/*.html'],
			dist: [dist + 'app/']
		}
	}
};