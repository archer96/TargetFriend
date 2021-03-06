/**
 * Gruntfile for TargetFriend
 *
 * Usage on CL:
 *
 *  `grunt serve` for running the app on your desktop.
 *     Visit http://localhost:9000/ to see the app. Please use Chrome, since
 *     the app does not work with Firefox
 *
 *  `grunt build` or `grunt build:phonegap` for building the app, so you can
 *     upload it to PhoneGap Build
 *
 *  `grunt build:webapp` for building TargetFriend as a webapp. Then you can
 *     upload it to your server and visit it with your (mobile) browser.
 *
 */

'use strict';

module.exports = function (grunt) {

	// Load grunt tasks automatically
	require('load-grunt-tasks')(grunt);

	// Time how long tasks take. Can help when optimizing build times
	require('time-grunt')(grunt);

	// Define the configuration for all the tasks
	grunt.initConfig({

		// Project settings
		yeoman: {
			// configurable paths
			app: require('./bower.json').appPath || 'app',
			dist: 'dist'
		},

		// Watches files for changes and runs tasks based on the changed files
		watch: {
			js: {
				files: ['<%= yeoman.app %>/scripts/{,*/}*.js'],
				options: {
					livereload: true
				}
			},
			compass: {
				files: ['<%= yeoman.app %>/styles/{,*/}*.{scss,sass}'],
				tasks: ['compass:server']
			},
			gruntfile: {
				files: ['Gruntfile.js']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= yeoman.app %>/{,*/}*.html',
					'.tmp/styles/{,*/}*.css',
					'<%= yeoman.app %>/images/**/*.{png,jpg,jpeg,gif,webp,svg}'
				]
			}
		},

		// The actual grunt server settings
		connect: {

			options: {
				port: 9000,
				// Change this to '0.0.0.0' to access the server from outside.
				hostname: 'localhost',
				livereload: 35729
			},

			livereload: {
				options: {
					open: true,
					base: [
						'.tmp',
						'<%= yeoman.app %>'
					]
				}
			},

			test: {
				options: {
					port: 9001,
					base: [
						'.tmp',
						'test',
						'<%= yeoman.app %>'
					]
				}
			},

			dist: {
				options: {
					base: '<%= yeoman.dist %>'
				}
			}

		},

		jshint: {
			options: {
				jshintrc: '.jshintrc',
				reporter: require('jshint-stylish')
			},
			all: [
				'Gruntfile.js',
				'<%= yeoman.app %>/scripts/{,*/}*.js',
				'!<%= yeoman.app %>/scripts/services/data.js',
				'!<%= yeoman.app %>/scripts/directives/angular-scrolly.js'
			],
			test: {
				options: {
					jshintrc: 'test/.jshintrc'
				},
				src: ['test/spec/{,*/}*.js']
			}
		},

		clean: {
			dist: {
				files: [{
					dot: true,
					src: [
						'.tmp',
						'<%= yeoman.dist %>/*',
						'!<%= yeoman.dist %>/.git*'
					]
				}]
			},
			server: '.tmp'
		},

		compass: {

			options: {
				sassDir: '<%= yeoman.app %>/styles',
				cssDir: '.tmp/styles',
				generatedImagesDir: '.tmp/images/generated',
				imagesDir: '<%= yeoman.app %>/images',
				javascriptsDir: '<%= yeoman.app %>/scripts',
				fontsDir: '<%= yeoman.app %>/styles/fonts',
				importPath: '<%= yeoman.app %>/bower_components',
				httpImagesPath: '/images',
				httpGeneratedImagesPath: '/images/generated',
				httpFontsPath: '/styles/fonts',
				relativeAssets: false,
				assetCacheBuster: false,
				raw: 'Sass::Script::Number.precision = 10\n'
			},

			dist: {
				options: {
					generatedImagesDir: '<%= yeoman.dist %>/images/generated'
				}
			},

			server: {
				options: {
					debugInfo: true
				}
			}

		},

		// Renames files for browser caching purposes
		rev: {
			dist: {
				files: {
					src: [
						'<%= yeoman.dist %>/scripts/{,*/}*.js',
						'<%= yeoman.dist %>/styles/{,*/}*.css',
						'!<%= yeoman.dist %>/scripts/services/database.js'
					]
				}
			}
		},

		// Reads HTML for usemin blocks to enable smart builds that automatically
		// concat, minify and revision files. Creates configurations in memory so
		// additional tasks can operate on them
		useminPrepare: {
			html: '<%= yeoman.app %>/index_app.html',
			options: {
				dest: '<%= yeoman.dist %>'
			}
		},

		// Performs rewrites based on rev and the useminPrepare configuration
		usemin: {
			html: ['<%= yeoman.dist %>/{,*/}*.html'],
			css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
			options: {
				assetsDirs: ['<%= yeoman.dist %>']
			}
		},

		// The following *-min tasks produce minified files in the dist folder
		imagemin: {
			dist: {
				files: [{
					expand: true,
					cwd: '<%= yeoman.app %>/images',
					src: '**/*.{png,jpg,jpeg,gif}',
					dest: '<%= yeoman.dist %>/images'
				}]
			}
		},

		htmlmin: {
			dist: {
				options: {
					collapseWhitespace: true,
					collapseBooleanAttributes: true,
					removeCommentsFromCDATA: true,
					removeOptionalTags: true
				},
				files: [{
					expand: true,
					cwd: '<%= yeoman.dist %>',
					src: ['*.html'], // 'views/{,*/}*.html'
					dest: '<%= yeoman.dist %>'
				}]
			}
		},

		// Allow the use of non-minsafe AngularJS files. Automatically makes it
		// minsafe compatible so Uglify does not destroy the ng references
		ngmin: {
			dist: {
				files: [{
					expand: true,
					cwd: '.tmp/concat/scripts',
					src: '*.js',
					dest: '.tmp/concat/scripts'
				}]
			}
		},

		// Copies remaining files to places other tasks can use
		copy: {
			dist: {
				files: [{
					expand: true,
					dot: true,
					cwd: '<%= yeoman.app %>',
					dest: '<%= yeoman.dist %>',
					src: [
						'*.{ico,png,txt,xml,webapp}',
						'.htaccess',
						'*.html',
						'*.json',
						//'views/{,*/}*.html',

						'locales/**/*.json',
						'styles/fonts/*',

						'!<%= yeoman.app %>/index_app.html'
					]
				}, {
					expand: true,
					cwd: '.tmp/images',
					dest: '<%= yeoman.dist %>/images',
					src: ['generated/*']
				}]
			},
			styles: {
				expand: true,
				cwd: '<%= yeoman.app %>/styles',
				dest: '.tmp/styles/',
				src: '{,*/}*.css'
			}
		},

		// Run some tasks in parallel to speed up the build process
		concurrent: {
			server: [
				'compass:server'
			],
			test: [
				'compass'
			],
			dist: [
				'compass:dist',
				'imagemin'
			]
		},

		targethtml: {
			phonegap: {
				files: {'<%= yeoman.dist %>/index_app.html': '<%= yeoman.app %>/index_app.html'}
			},
			webapp: {
				files: {'<%= yeoman.dist %>/index_app.html': '<%= yeoman.app %>/index_app.html'}
			}
		},

		removelogging: {
			dist: {
				src: '<%= yeoman.dist %>/scripts/scripts.js',
				dest: '<%= yeoman.dist %>/scripts/scripts.js',
				options: {}
			}
		},

		html2js: {
			options: {
				base: '<%= yeoman.app %>',
				quoteChar: '\'',
				indentString: '	',
				useStrict: true,
				htmlmin: {
					collapseBooleanAttributes: true,
					collapseWhitespace: true,
					removeAttributeQuotes: false,
					removeComments: true,
					removeEmptyAttributes: false,
					removeRedundantAttributes: true
				}
			},
			main: {
				src: ['<%= yeoman.app %>/views/*.html'],
				dest: '<%= yeoman.dist %>/scripts/templates.js'
			}
		},

		karma: {
			unit: {
				configFile: 'karma.conf.js',
				singleRun: true
			}
		}

	});

	/*
	 * Usage:
	 *   grunt serve
	 *   grunt serve:dist
	 */
	grunt.registerTask('serve', function (target, plattform) {

		if (target === 'dist') {
			if (plattform === 'webapp') {
				return grunt.task.run(['build:webapp', 'connect:dist:keepalive']);
			} else {
				return grunt.task.run(['build', 'connect:dist:keepalive']);
			}
		}

		grunt.task.run([
			'clean:server',
			'concurrent:server',
			'connect:livereload',
			'watch'
		]);

	});

	grunt.registerTask('server', function () {
		grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
		grunt.task.run(['serve']);
	});

	/**
	 * Grunt task to change version in a few files.
	 * Run using: `grunt changeVersion:"yourversion"`
	 * @param {string} version New version
	 * @example
	 * `grunt changeVersion:"1.0.0"`
	 */
	grunt.registerTask('changeVersion', function (version) {

		if (!version) {
			grunt.fail.fatal('You haven\'t defined a version!');
			return false;
		}

		var vCode         = version.replace(/\./g, '') * 1,
			vJSONRegEx    = /(\"version\": )(.+)/g,
			vXMLRegEx     = /([^ ]*	version=)[^\n ]*/g,
			vCodeRegEx    = /(\"versionCode\": )(.+)/g,
			vCodeXMLRegEx = /(versionCode=)[^\n>]*/g,
			fileData;

		grunt.log.writeln('Change version in file `bower.json`');
		fileData = grunt.file.read('./bower.json');
		fileData = fileData.replace(vJSONRegEx, '$1' + '"' + version + '",');
		grunt.file.write('./bower.json', fileData);

		grunt.log.writeln('Change version in file `package.json`');
		fileData = grunt.file.read('./package.json');
		fileData = fileData.replace(vJSONRegEx, '$1' + '"' + version + '",');
		grunt.file.write('./package.json', fileData);

		grunt.log.writeln('Change version in file `app/config.json`');
		fileData = grunt.file.read('./app/config.json');
		fileData = fileData.replace(vJSONRegEx, '$1' + '"' + version + '",');
		fileData = fileData.replace(vCodeRegEx, '$1' + '"' + vCode + '",');
		grunt.file.write('./app/config.json', fileData);

		grunt.log.writeln('Change version in file `app/config.xml`');
		fileData = grunt.file.read('./app/config.xml');
		fileData = fileData.replace(vXMLRegEx, '$1' + '"' + version + '"');
		fileData = fileData.replace(vCodeXMLRegEx, '$1' + '"' + vCode + '"');
		grunt.file.write('./app/config.xml', fileData);

		grunt.log.write('\n');
		grunt.log.oklns('Successfully changed version to: ' + version + ' (code: ' + vCode + ')');
		grunt.log.write('\n');
		grunt.log.writeln(' --> Don\'t forget about CHANGELOG and translation files!');

	});

	grunt.registerTask('test', [
		'clean:server',
		'jshint',
		'concurrent:test',
		'connect:test',
		'karma'
	]);

	/*
	 * Build process
	 */
	grunt.registerTask('build', [
		'build:phonegap'
	]);
	grunt.registerTask('build:phonegap', [
		'clean:dist',      // Clean the build folder
		'jshint:all',
		'useminPrepare',   // prepare minification (look out for build comments in HTML)
		'concurrent:dist', // compass and minification
		'concat',          // use concat (it is specified by useminPrepare)
		'ngmin',           // prepare .js file for minification
		'copy:dist',       // copy important files
		'targethtml:phonegap',
		'removelogging',
		'cssmin',
		'uglify',          // make our .js files ugly...
		'rev',             // ...and give some strange filenames
		'usemin',
		'htmlmin',
		'html2js'
	]);
	grunt.registerTask('build:webapp', [
		'clean:dist',      // Clean the build folder
		'jshint:all',
		'useminPrepare',   // prepare minification (look out for build comments in HTML)
		'concurrent:dist', // compass and minification
		'concat',          // use concat (it is specified by useminPrepare)
		'copy:dist',       // copy important files
		'targethtml:webapp',
		'ngmin',           // prepare .js file for minification
		'removelogging',
		'cssmin',
		'uglify',          // make our .js files ugly...
		'rev',             // ...and give some strange filenames
		'usemin',
		'htmlmin',
		'html2js'
	]);

	grunt.registerTask('default', [
		'jshint',
		'test',
		'build'
	]);

};
