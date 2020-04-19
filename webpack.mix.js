const mix = require('laravel-mix');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const pages = require('./pages');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

mix.sass('src/assets/sass/siqtheme.scss', 'assets/css/')
   .js('src/assets/scripts/siqtheme.js', 'assets/scripts/')
   .js('src/assets/scripts/pages/ui_card.js', 'assets/scripts/pages/ui_card.js')
   .js('src/assets/scripts/pages/tb_datatables.js', 'assets/scripts/pages/tb_datatables.js')
   .js('src/assets/scripts/pages/ui_modal.js', 'assets/scripts/pages/ui_modal.js')
   .js('src/assets/scripts/pages/ui_toastr.js', 'assets/scripts/pages/ui_toastr.js')
   .browserSync({
       proxy: 'siqtheme.test',
       files: ['public/**/*.html', 'public/assets/css/**/*.css', 'public/assets/scripts/**/*.js']
   })
   .copyDirectory('src/assets/img', 'public/assets/img')
   .copyDirectory('src/assets/fonts', 'public/assets/fonts')
   .webpackConfig({
       output: {
           path: path.resolve(__dirname, 'public')
       },
       module: {
           rules: [
               {
                   test: /\.ejs$/,
                   use: {
                       loader: 'ejs-compiled-loader'
                   }
               }
           ]
       },
       plugins: [
           ...pages.map(page => {
               return new HtmlWebpackPlugin({
                   title: page.title,
                   template: page.template,
                   filename: page.filename,
                   topmenu: page.topmenu,
                   submenu: page.submenu,
                   inject: false
               })
           })
       ]
   })
   .options({
       processCssUrls: false
   });

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.preact(src, output); <-- Identical to mix.js(), but registers Preact compilation.
// mix.coffee(src, output); <-- Identical to mix.js(), but registers CoffeeScript compilation.
// mix.ts(src, output); <-- TypeScript support. Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.test');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Mix's default.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.override(function (webpackConfig) {}) <-- Will be triggered once the webpack config object has been fully generated by Mix.
// mix.dump(); <-- Dump the generated webpack config object to the console.
// mix.extend(name, handler) <-- Extend Mix's API with your own components.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   terser: {}, // Terser-specific options. https://github.com/webpack-contrib/terser-webpack-plugin#options
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
