## Getting Started

Install [NodeJS v12](https://nodejs.org/en/) or higher and
[yarn v1.17](https://yarnpkg.com/lang/en/).

Execute `yarn` in the root of this project to install the dependencies.

As soon as all dependencies are installed, execute `yarn start` to start the
project in development mode.

A dev server will start locally via `http://localhost:1234`. Please note that a
second task is spawned on `http://localhost:9459` as a proxy for the backend
api. In case the ports do not work in your environment, feel free to adjust them
in the `package.json`.

Tests can be executed via `yarn test`. `yarn fmt` will run the predefined
formatting rules on all files of the repository.

## Used Technologies

The project uses [Parcel](https://parceljs.org/) to bundle assets, which should
allow to use a wide variety of different asset types.

By default [TypeScript](https://www.typescriptlang.org/) in combination with
[React](https://reactjs.org/) and
[Styled Components](https://www.styled-components.com/) it used to bootstrap the
application.

Tests are executed using [Jest](https://jestjs.io/) and are written using
[React Testing Library](https://github.com/testing-library/react-testing-library)
and [yakbak (to record backend responses)](https://github.com/flickr/yakbak).

For code formatting [prettier](https://prettier.io/) as well as an
[editor config](https://editorconfig.org/) is in place.
