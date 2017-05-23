module.exports = function( grunt )
{
var root = './';
var dest = './release/<%= pkg.name %> <%= pkg.version %>/';
var temp = './temp/';


grunt.initConfig({
        pkg: grunt.file.readJSON( 'package.json' ),

        clean: {
                // delete the destination folder
            previousBuild: [
                dest,
            ],
                // remove temporary files
            afterBuild: [
                temp,
                '.tscache',
            ]
        },

            // compile to javascript
        ts: {
            release: {
                tsconfig: true,
                dest: temp + 'code.js'
            }
        },

            // copy the necessary files
        copy: {
            release: {
                expand: true,
                cwd: root,
                src: [
                    'libraries/**',
                    'package.json',
                    'images/icon16.png'
                ],
                dest: dest
            }
        },

            // minimize the javascript
        uglify: {
            release: {
                files: [{
                    src: temp + 'code.js',
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
grunt.loadNpmTasks( 'grunt-contrib-clean' );
grunt.loadNpmTasks( 'grunt-contrib-copy' );
grunt.loadNpmTasks( 'grunt-contrib-uglify' );
grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
grunt.loadNpmTasks( 'grunt-processhtml' );
grunt.loadNpmTasks( 'grunt-ts' );

    // tasks
grunt.registerTask( 'default', [ 'clean:previousBuild', 'ts', 'copy', 'uglify', 'cssmin', 'processhtml', 'clean:afterBuild' ] );
};
