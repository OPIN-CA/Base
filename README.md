# base
Starterkit base Drupal 8 Theme.


## Global Prerequisites

You will need the following installed globally in the following order:

- [NodeJS](https://nodejs.org/en/)

Download installer for your system and follow installer's prompts.

- [gulp](https://gulpjs.com/)
```
$ npm install --global gulp-cli
```
- [Browsersync](https://browsersync.io/)
```
$ npm install -g browser-sync
```
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
Any `base.` breakpoints |   `your-theme-name.` breakpoints




## Configuration

## Sass/Gulp dependencies
- [Libsass](https://sass-lang.com/libsass) - CSS on steroids
- [Sass breakoint](http://breakpoint-sass.com/) - Simpler media queries.
- [Mappy Breakpoints](https://github.com/zellwk/mappy-breakpoints) - Media queries helper
- [Susy 2](http://susy.readthedocs.io/) - Grid system by Miriam Suzanne.
- [Sass MQ](https://github.com/sass-mq/sass-mq) - Alternative media queries helper
- [Typi](https://github.com/zellwk/typi) - Responsive typography
- [Modular Scale](https://github.com/modularscale/modularscale-sass) - Design harmony
