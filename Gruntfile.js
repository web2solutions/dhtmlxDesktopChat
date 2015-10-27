'use strict';

var path = require('path');

module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		qunit: {
			all: ['test/**/*.html']
		},
		express: {
			options: {
				port: 4080,
				hostname: '*'
			},
			livereload: {
				options: {
					server: path.resolve('./app.js'),
					livereload: true,
					serverreload: true,
					bases: [path.resolve('./.tmp'), path.resolve(__dirname, 'public')]
				}
			},
			test: {
				options: {
					server: path.resolve('./app.js'),
					bases: [path.resolve('./.tmp'), path.resolve(__dirname, 'test')]
				}
			},
			dist: {
				options: {
					server: path.resolve('./app.js'),
					bases: path.resolve(__dirname, 'public')
				}
			}
		}


	});
	//grunt.loadNpmTasks('grunt-contrib-watch');
	//grunt.loadNpmTasks('grunt-contrib-jshint');
	//grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-contrib-qunit');
	grunt.loadNpmTasks('grunt-express');

	grunt.registerTask('server', [
		'express:livereload', 'express-keepalive'
	]);

	grunt.registerTask('test', [
		'express:test', 'qunittest'
	]);
	
	grunt.task.registerTask('qunittest', 'test suite', function(testname) {
		if (!!testname)
			grunt.config('qunit.all', ['test/' + testname + '.html']);
		grunt.task.run('qunit:all');
	});




	//grunt.registerTask('default', [ /*'readme'*/ ]);
};