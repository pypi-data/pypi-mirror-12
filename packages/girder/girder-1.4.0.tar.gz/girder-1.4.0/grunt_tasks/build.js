/**
 * Copyright 2015 Kitware Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Define tasks that bundle and compile files for deployment.
 */
module.exports = function (grunt) {
    var path = require('path');
    var environment = grunt.option('env') || 'dev';
    var debugJs = grunt.option('debug-js') || false;
    var uglifyOptions = {
        sourceMap: environment === 'dev',
        sourceMapIncludeSources: true,
        report: 'min'
    };

    if (['dev', 'prod'].indexOf(environment) === -1) {
        grunt.fatal('The "env" argument must be either "dev" or "prod".');
    }

    if (debugJs) {
        console.log('Building JS in debug mode'.yellow);
        uglifyOptions.beautify = {
            beautify: true,
            ascii_only: true
        };
        uglifyOptions.mangle = false;
        uglifyOptions.compress = false;
    } else {
        uglifyOptions.beautify = {
            ascii_only: true
        };
    }

    grunt.config.merge({
        jade: {
            options: {
                client: true,
                compileDebug: false,
                namespace: 'girder.templates',
                processName: function (filename) {
                    return path.basename(filename, '.jade');
                }
            },
            core: {
                files: {
                    'clients/web/static/built/templates.js': [
                        'clients/web/src/templates/**/*.jade'
                    ]
                }
            }
        },

        copy: {
            swagger: {
                files: [{
                    expand: true,
                    cwd: 'node_modules/swagger-ui/dist',
                    src: ['lib/**', 'css/**', 'images/**', 'swagger-ui.min.js'],
                    dest: 'clients/web/static/built/swagger'
                }]
            },
            jsoneditor: {
                files: [{
                    expand: true,
                    cwd: 'node_modules/jsoneditor/dist',
                    src: ['img/**', 'jsoneditor.min.css'],
                    dest: 'clients/web/static/built/jsoneditor'
                }]
            }
        },

        stylus: {
            core: {
                files: {
                    'clients/web/static/built/app.min.css': [
                        'clients/web/src/stylesheets/**/*.styl',
                        '!clients/web/src/stylesheets/apidocs/*.styl'
                    ],
                    'clients/web/static/built/swagger/docs.css': [
                        'clients/web/src/stylesheets/apidocs/*.styl'
                    ]
                }
            }
        },

        uglify: {
            options: uglifyOptions,
            app: {
                files: {
                    'clients/web/static/built/app.min.js': [
                        'clients/web/static/built/templates.js',
                        'clients/web/src/init.js',
                        'clients/web/src/girder-version.js',
                        'clients/web/src/view.js',
                        'clients/web/src/app.js',
                        'clients/web/src/router.js',
                        'clients/web/src/utilities/**/*.js',
                        'clients/web/src/plugin_utils.js',
                        'clients/web/src/collection.js',
                        'clients/web/src/model.js',
                        'clients/web/src/models/**/*.js',
                        'clients/web/src/collections/**/*.js',
                        'clients/web/src/views/**/*.js'
                    ],
                    'clients/web/static/built/main.min.js': [
                        'clients/web/src/main.js'
                    ]
                }
            },
            libs: {
                files: {
                    'clients/web/static/built/libs.min.js': [
                        'node_modules/jquery/dist/jquery.js',
                        'node_modules/jade/runtime.js',
                        'node_modules/underscore/underscore.js',
                        'node_modules/backbone/backbone.js',
                        'node_modules/marked/lib/marked.js',
                        'node_modules/jsoneditor/dist/jsoneditor.js',
                        'clients/web/lib/js/d3.js',
                        'clients/web/lib/js/bootstrap.js',
                        'clients/web/lib/js/bootstrap-switch.js',
                        'clients/web/lib/js/jquery.jqplot.js',
                        'clients/web/lib/js/jqplot.pieRenderer.js',
                        'clients/web/lib/js/sprintf.js'
                    ]
                }
            }
        },

        watch: {
            stylus_core: {
                files: ['clients/web/src/stylesheets/**/*.styl'],
                tasks: ['stylus:core']
            },
            js_core: {
                files: ['clients/web/src/**/*.js'],
                tasks: ['uglify:app']
            },
            jade_core: {
                files: ['clients/web/src/templates/**/*.jade'],
                tasks: ['jade:core']
            }
        },

        init: {
            'uglify:libs': {},
            'copy:swagger': {},
            'copy:jsoneditor': {}
        },

        default: {
            'stylus:core': {},
            'jade:core': {
                dependencies: ['version-info']
            },
            'uglify:app': {
                dependencies: ['jade:core']
            }
        }
    });
};
