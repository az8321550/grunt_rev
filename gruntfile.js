module.exports = function (grunt) {

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    var config = {
        src: 'src',
        dist: 'dist'
    };

    grunt.initConfig({
        config: config,
        rev: {
            dist: {
                files: {
                    src: ['<%= config.dist %>/**/*.{css,js,jpg,png,gif}']
                }
            }
        },
        uglify:{
            build:{
                expand:true,
                cwd:'<%= config.dist %>',
                src:'**/*.js',
                dest:'<%= config.dist %>'
            }
        },
        cssmin:{
            build:{
                expand:true,
                cwd:'<%= config.dist %>',
                src:'**/*.css',
                dest:'<%= config.dist %>'
            }
        },
        clean:{
            build:{
                src:'<%= config.dist %>'
            },
            sprite:['<%= config.dist %>/images/sprite']
        },
        copy:{
            build:{
                expand: true,
                cwd: '<%= config.src %>',
                src: '**',
                dest: '<%= config.dist %>'
            }
        },
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '<%= config.dist %>/**/*.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: [
                    '<%= config.dist %>'
                ]
            },
            html: ['<%= config.dist %>/**/*.html'],
            css: ['<%= config.dist %>/**/*.css']
        },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: true,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '**/*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },
        sprite: {
            options: {
                imagepath: '<%= config.dist %>/images/sprite',
                spritedest: '<%= config.dist %>/images',
                spritepath: null,
                padding: 2,
                algorithm: 'binary-tree',
                engine: 'pixelsmith'
            },
            autoSprite: {
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>/styles',
                    src: '*.css',
                    dest: '<%= config.dist %>/styles'
                }]
            }
        }
    });

    grunt.registerTask('build', [
        'clean:build',
        'copy',
        'sprite',
        'uglify',
        'cssmin',
        'useminPrepare',
        'rev',
        'usemin',
        'htmlmin',
        'clean:sprite',
    ]);
    grunt.registerTask('default',[
        'build'
    ]);


}