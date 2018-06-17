# PlayKit JS FLASH - [FLASH] Adapter for the [PlayKit JS Player]

[![Build Status](https://travis-ci.org/kaltura/playkit-js-flash.svg?branch=master)](https://travis-ci.org/kaltura/playkit-js-flash)

PlayKit JS Flash adapter integrates [FLASH.HLS] with the [PlayKit JS Player].

PlayKit JS Flash is written in [ECMAScript6], statically analysed using [Flow] and transpiled in ECMAScript5 using [Babel].

[FLASH.HLS]: https://github.com/mangui/flashls
[FLASH.HLS configuration]: https://github.com/mangui/flashls#configuration
[Flow]: https://flow.org/
[ECMAScript6]: https://github.com/ericdouglas/ES6-Learning#articles--tutorials
[Babel]: https://babeljs.io

## Getting Started

### Prerequisites
The adapter requires [PlayKit JS Player] to be loaded first.

The adapter uses the [FLASH.HLS] swf library.

[Playkit JS Player]: https://github.com/kaltura/playkit-js

### Installing

First, clone and run [yarn] to install dependencies:

[yarn]: https://yarnpkg.com/lang/en/

```
git clone https://github.com/kaltura/playkit-js-flash.git
cd playkit-js-flash
yarn install
```

### Building

Then, build the player

```javascript
yarn run build
```

### Embed the library in your test page

Finally, add the bundle as a script tag in your page, and initialize the player

```html
<script type="text/javascript" src="/PATH/TO/FILE/playkit.js"></script>
<script type="text/javascript" src="/PATH/TO/FILE/playkit-js-flash.js"></script>
<div id="player-placeholder"" style="height:360px; width:640px">
<script type="text/javascript">
var playerContainer = document.querySelector("#player-placeholder");
var config = {...};
var player = playkit.core.loadPlayer(config);
playerContainer.appendChild(player.getView());
player.play();
</script>
```

## Configuration

[FLASH.HLS] configuration options, documented @[FLASH.HLS API docs], can be passed via the [PlayKit JS Player] config.

The configuration is exposed via the playback section:

```javascript
{
  playback:{
    options: {
      flash: {
        swfUrl:// the swf url of flash.hls
        flashvars://Object of key value configuration of the flash hls.
        params://params for the object tag (e.g window mode)
        attributes:// attribute for the object tag
      }
    }
  }
}
```

## Running the tests

Tests can be run locally via [Karma], which will run on Chrome, Firefox and Safari

[Karma]: https://karma-runner.github.io/1.0/index.html
```
yarn run test
```

You can test individual browsers:
```
yarn run test:chrome
yarn run test:firefox
yarn run test:safari
```

### And coding style tests

We use ESLint [recommended set](http://eslint.org/docs/rules/) with some additions for enforcing [Flow] types and other rules.

See [ESLint config](.eslintrc.json) for full configuration.

We also use [.editorconfig](.editorconfig) to maintain consistent coding styles and settings, please make sure you comply with the styling.


## Compatibility

target for IE11 on windows 7&8 to allow HLS (Live & Vod)

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/kaltura/playkit-js-flash/tags).

## License

This project is licensed under the AGPL-3.0 License - see the [LICENSE.md](LICENSE.md) file for details
