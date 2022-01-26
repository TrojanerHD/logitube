# logitube extension
This is the extension part that gets installed as extension in Firefox

## Contribute

### Pre-requisites
+ Git
+ TypeScript

### Testing
+ Go into your extensions in Firefox (`Tools → Add-ons and Themes` or `Ctrl + Shift + A`) and click on the settings wheel below the search
+ Click `Debug Add-ons`
+ Click the button `Load Temporary Add-on…`
+ Select the `extension/manifest.json`

#### Note
Firefox may not be able to respond to the native messaging app (`app/`) when debugging. I did not do enough research on it to see whether it is actually possible. Thus, there is currently no way of testing the app without uploading it for yourself at [Firefox Addons](https://addons.mozilla.org/en-US/developers/), wait for it to be approved and testing it that way. Sorry :(

You can however test things with `console.log()`…

### Makefile
+ make all: Builds addon into file `logitech.zip`
+ make clean: Deletes build folder and `logitech.zip`

