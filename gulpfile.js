'use strict';

var gulp        = require('gulp');
var browserSync = require('browser-sync');

gulp.task('server', function() {
    browserSync({
        server: {
        	directory: true,
            baseDir: "./web"
        },
        startPath:'/',
        port:3000,
        open:true,
        files: ["web/**/*.css", "web/**/*.html", "web/**/*.js"]
    });
});