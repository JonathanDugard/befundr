const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const plugin = require("tailwindcss/plugin");


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors:{
        // bg colors
        "main":"#FDFFFF",
        "second":"#F4F4F4",
        "accent":"#0A9396",
        "accent-hover":"#37B2AC",
        // text colors
        "textColor-main":"#000000",
        "textColor-second":"#666666",
        // custom color
        "custom-red":"#FF4A22",
        "custom-green":"#3DA35D"

      }
    },
  },
  plugins: [
    require('daisyui'),
    plugin(function ({
      addUtilities,
      theme,
    }) {
      const newUtilities = {
        ".textStyle-title": {
          color: theme("colors.textColor-main"),
          fontSize: theme("fontSize.4xl"),
          fontWeight: theme("fontWeight.extralight"),
        },
        ".textStyle-title2": {
          color: theme("colors.textColor-main"),
          fontSize: theme("fontSize.3xl"),
          fontWeight: theme("fontWeight.light"),
        },
        ".textStyle-headline": {
          color: theme("colors.textColor-second"),
          fontSize: theme("fontSize.base"),
          fontWeight: theme("fontWeight.light"),
        },
        ".textStyle-headline2": {
          color: theme("colors.textColor-main"),
          fontSize: theme("fontSize.lg"),
          fontWeight: theme("fontWeight.light"),
        },
        ".textStyle-body": {
          color: theme("colors.textColor-second"),
          fontSize: theme("fontSize.sm"),
          fontWeight: theme("fontWeight.light"),
        },
        ".textStyle-body-black": {
          color: theme("colors.textColor-main"),
          fontSize: theme("fontSize.sm"),
          fontWeight: theme("fontWeight.light"),
        },
        ".textStyle-body-white": {
          color: theme("colors.main"),
          fontSize: theme("fontSize.sm"),
          fontWeight: theme("fontWeight.light"),
        },
        ".textStyle-body-accent": {
          color: theme("colors.accent"),
          fontSize: theme("fontSize.sm"),
          fontWeight: theme("fontWeight.light"),
        },
        ".textStyle-footnote-black": {
          color: theme("colors.textColor-main"),
          fontSize: theme("fontSize.xs"),
          fontWeight: theme("fontWeight.normal"),
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
};
