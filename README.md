# base
Starter kit base Drupal 8 Theme.

## Global Prerequisites

You will need the following installed globally (in the following order):

- [NodeJS](https://nodejs.org/en/)

Download installer for your system and follow installer's prompts.

- [gulp](https://gulpjs.com/)
```
npm install --global gulp-cli
```
- [Browsersync](https://browsersync.io/)
```
npm install -g browser-sync
```


## Sass/Gulp dependencies
- [Libsass](https://sass-lang.com/libsass) - CSS on steroids
- [Sass Breakpoint](http://breakpoint-sass.com/) - Simpler media queries
- [Mappy Breakpoints](https://github.com/zellwk/mappy-breakpoints) - Media queries helper
- [Susy 2](http://susy.readthedocs.io/) - Grid system by Miriam Suzanne
- [Sass MQ](https://github.com/sass-mq/sass-mq) - Alternative media queries helper
- [Typi](https://github.com/zellwk/typi) - Responsive typography
- [Modular Scale](https://github.com/modularscale/modularscale-sass) - Harmony in design


## Installation

Rename the following:

From | To
--- | ---
Theme root folder `base`| your-theme-name
base.info.yml | your-theme-name `.info.yml`
Update `name:` & `description:` inside `your-theme-name.info.yml`|
Update global library inside `your-theme-name.info.yml` | `- your-theme-name/global`
base.libraries.yml | your-theme-name `.libraries.yml`
base.theme | your-theme-name `.theme`
Any preprocess functions inside `includes` folder | all  `.inc`  files
base.breakpoints.yml | your-theme-name `.breakpoints.yml`
Any `base.` breakpoints inside `your-theme-name.breakpoints.yml`|   `your-theme-name.`

and run `npm install` to install all the dependencies.

## Workflow configuration

### Mappy Breakpoint

Use Mappy Breakpoint for simpler media queries. Nest media queries inside the declarations not the other way around. To use `mappy-bp` define your breakpoints inside `010-global/layout/_breakpoints.scss`.

```scss
.test {
    width: 100%;

    @include mappy-bp(med){
      width: 250px;
    }

    @include mappy-bp(desk){
      width: 150px;
    }
}
```

### Susy 2

For flexible grid system use Susy. Configure susy in `/010-global/layout/_config.scss` e.g.:

```scss
//Setting Susy map
$susy: (
  flow: ltr, // ltr | rtl
  output: float, // float | isolate
  math: fluid, // fluid | static (requires column-width)
  column-width: false, // false | value
  container: auto, // length or % | auto
  container-position: center, // left | center | right | <length> [*2] (grid padding)
  last-flow: to,
  columns: 12,
  gutters: 1/2,
  gutter-position: before, // before | after | split | inside | inside-static (requires column-width)
  global-box-sizing: border-box, // content-box | border-box (affects inside/inside-static)
  debug:
    (
      image: hide, //show | hide | show-columns | show-baseline
      color: rgba(blue, .2),
      output: background, // background | overlay
      toggle: bottom right, //	right | left and top | bottom
    ),
);


//Setting Box sizing for the site
@include border-box-sizing;

//Set Susy container
body {
  @include container(1200px);
}
```

### Modular Scale

Define modular scale map inside `010-global/type/_typi.scss`. [Modular scale ratios](https://github.com/modularscale/modularscale-sass)
```scss
$modularscale: (
  base: 16px,
  ratio: 1.067
);
```

### Typi

Responsive typography is defined inside `010-global/type/_typi.scss` as well. You can define behaviors for global and specific elements like headings e.g.:

```scss
$typi: (
  base: (
    null: (15px, 1.4),
    med: (16px),
    large: (17px)
  ),

  h1: (
    null:  (ms(7), 1.3),
    land:  (ms(8)),
    med:   (ms(9), 1.2),
    large: (ms(10)),
    wide:  (ms(11), 1.2)
  ),
);
```
use `vr()` units for styling:
```scss
.test{
    padding: vr(.5); // 1/2 of base = 8px
}
```

### Naming conventions

Follow BEM as much as possible e.g.:

#### Icons
```
icon__search.svg

icon__arrow-left--normal.svg
icon__arrow-left--active.svg
icon__arrow-left--hover.svg
```

#### Colours
```scss
$color__text--dark:              #111111;
$color__text--medium:            #424242;
$color__text--light:             #4D4D4D;
$color__text--white:             #FFFFFF;
$color__text--description:       #4D4D4D;
```

#### Scss
```scss
article--teaser.scss
article--full.scss
article--search-index.scss

search__header.scss
search__content.scss
search__filters.scss
search__pager.scss
```


#### Classes
```html
<div class="callout">
    <h2 class="callout__title"></h2>
    <div class="callout__content">
        <div class="callout__image"></div>
        <div class="callout__body"></div>
    </div>
</div>
```

### Gulp
After installation run `gulp` in root directory. Gulp will open `localhost:3000` in your default browser and parse Acquia Dev Desktop local site url. If it fails or you are not using Acquia Dev Desktop add the url in the gulp-custom-vars.js file. Optionally, the Drupal [Browsersync](https://www.drupal.org/project/browsersync) module can be installed which will enable automatic style refreshing on any local URL (not just http://localhost:3000). Enable the module then go to Appearance > Default theme > Settings and check `Enable Browsersync` inside Browsersync Settings at the bottom of the page. As gulp runs, it watches sass and injects changes into the browser as you work.

Gulp will watch for changes to Twig templates, automatically clear the cache and refresh the page using Browsersync. For this to work the command line environment needs to be set up correctly so Drush can be run. If you're using Acquia Dev Desktop you will need to set the PATH environment variable before running gulp. The export string can be copied from the terminal window that is opened by clicking the `Open Drush console` button in Dev Desktop. Paste it into the terminal that gulp will be run from. The string will look similar to this:

```export PHP_ID=php7_1; export PATH="/Applications/DevDesktop/$PHP_ID/bin:/Applications/DevDesktop/mysql/bin:/Applications/DevDesktop/tools:$PATH"```

### Common issues

1. Receiving an error during `clearDrupalCache`:
   ```[10:51:15] Starting 'clearDrupalCache'...
   [10:51:15] ERROR: Could not clear Drupal cache.```

   Set the environment variables as outlined in the Gulp section above.

## Maintainers
Base theme is maintained by [Adrian Rylski](https://www.drupal.org/u/liamtoo), Jesse Kahtava, and Tyler Klepsch.
