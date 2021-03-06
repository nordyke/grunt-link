"use strict";

/*
 * grunt-link
 * http://doug-martin.github.com/grunt-link
 *
 * Copyright (c) 2012 Doug Martin
 * Licensed under the MIT license.
 */

module.exports = function (grunt) {
    var linker = require("./lib/linker.js"),
        path = require("path"),
        npm = require("npm");

    // Please see the grunt documentation for more information regarding task and
    // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

    // ==========================================================================
    // TASKS
    // ==========================================================================

    grunt.registerTask('link', 'Symlink local node_module dependencies.', function () {
        var options = grunt.util._.extend({ignoreCyclic: false, dir: process.cwd(), install: true, clean: true, useNpmCache: true}, grunt.config("link")),
            done,
            cwd;
        if (options.dir) {
            options.dir = path.resolve(process.cwd(), options.dir);
        }
        done = this.async();
        cwd = process.cwd();
        npm.load(function () {
            linker(grunt, npm, options).classic(function (err) {
                process.chdir(cwd);
                if (err) {
                    grunt.log.error("Error linking packages");
                    grunt.log.error(err.stack);
                    done(false);
                } else {
                    done();
                }
            });
        });
    });
};
