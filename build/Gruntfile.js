module.exports = function( grunt )
{
var root = '../';
var dest = '../release/<%= pkg.name %> <%= pkg.version %>/';

grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),

            // javascript linter
        eslint: {
            options: {
                configFile: root + '.eslintrc.json'
            },
            target: [ root + 'js/**' ]
        },

            // remove the destination folder first
        clean: {
            options: {
                force: true
            },

            release: [
                dest
            ]
        },

            // copy the necessary files
        copy: {
            release: {
                expand: true,
                cwd: root,
                src: [
                    'images/icon16.png',
                    'images/icon128.png',
                    'libraries/**',
                    'background.js',
                    'manifest.json',
                    'options.html'
                ],
                dest: dest
            }
        },

            // minimize the javascript
        uglify: {
            release: {
                files: [{
                    src: [
                        root + 'js/*.js'
                    ],
                    dest: dest + 'min.js'
                }]
            }
        },

            // minimize the css
        cssmin: {
            release: {
                files: [{
                    expand: true,
                    cwd: root + 'css/',
                    src: '*.css',
                    dest: dest + 'css/'
                }]
            },
            options: {
                advanced: false
            }
        },

            // update the html file to load the min.js file
        processhtml: {
            release: {
                expand: true,
                cwd: root,
                src: 'index.html',
                dest: dest
            }
        }
    });

    // load the plugins
grunt.loadNpmTasks( 'grunt-eslint' );
grunt.loadNpmTasks( 'grunt-contrib-clean' );
grunt.loadNpmTasks( 'grunt-contrib-copy' );
grunt.loadNpmTasks( 'grunt-contrib-uglify' );
grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
grunt.loadNpmTasks( 'grunt-processhtml' );

    // tasks
grunt.registerTask( 'default', [ 'eslint', 'clean', 'copy', 'uglify', 'cssmin', 'processhtml' ] );
};
