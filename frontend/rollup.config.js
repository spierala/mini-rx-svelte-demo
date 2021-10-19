import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';

import { config } from 'dotenv';
import replace from '@rollup/plugin-replace';

const production = !process.env.ROLLUP_WATCH;

function serve() {
    let server;

    function toExit() {
        if (server) server.kill(0);
    }

    return {
        writeBundle() {
            if (server) return;
            server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
                stdio: ['ignore', 'inherit', 'inherit'],
                shell: true,
            });

            process.on('SIGTERM', toExit);
            process.on('exit', toExit);
        },
    };
}

export default {
    input: 'src/main.ts',
    output: {
        sourcemap: true,
        format: 'es',
        name: 'app',
        dir: 'public/build',
    },
    // Fix for (!) this has been rewritten to undefined
    // https://medium.com/i18n-and-l10n-resources-for-developers/how-to-localize-a-svelte-app-with-svelte-i18n-9e86cc9eb727
    moduleContext: (id) => {
        // In order to match native module behaviour, Rollup sets `this`
        // as `undefined` at the top level of modules. Rollup also outputs
        // a warning if a module tries to access `this` at the top level.
        // The following modules use `this` at the top level and expect it
        // to be the global `window` object, so we tell Rollup to set
        // `this = window` for these modules.
        const thisAsWindowForModules = [
            'node_modules/ts-action/esm5/action.js',
            'node_modules/ts-action/esm5/guard.js',
            'node_modules/ts-action/esm5/reducer.js',
        ];

        if (thisAsWindowForModules.some((id_) => id.trimRight().endsWith(id_))) {
            return 'window';
        }
    },
    plugins: [
        replace({
            // stringify the object
            __myapp: JSON.stringify({
                env: {
                    isProd: production,
                    ...config().parsed, // attached the .env config
                },
            }),
        }),
        svelte({
            preprocess: sveltePreprocess({ sourceMap: !production }),
            compilerOptions: {
                // enable run-time checks when not in production
                dev: !production,
                immutable: true,
            },
        }),
        // we'll extract any component CSS out into
        // a separate file - better for performance
        css({ output: 'bundle.css' }),

        // If you have external dependencies installed from
        // npm, you'll most likely need these plugins. In
        // some cases you'll need additional configuration -
        // consult the documentation for details:
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        resolve({
            browser: true,
            dedupe: ['svelte'],
        }),
        commonjs(),
        typescript({
            sourceMap: !production,
            inlineSources: !production,
        }),

        // In dev mode, call `npm run start` once
        // the bundle has been generated
        !production && serve(),

        // Watch the `public` directory and refresh the
        // browser on changes when not in production
        !production && livereload('public'),

        // If we're building for production (npm run build
        // instead of npm run dev), minify
        production && terser(),
    ],
    watch: {
        clearScreen: false,
    },
};
