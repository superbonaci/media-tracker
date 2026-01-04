# media-tracker

Self-hosted open source media-tracker for tv shows and movies.

## Status :construction:

The project is work in progress, right now you can:

- Search tv shows and movies
- Explore trending tv shows and movies
- Explore seasons of a tv show
- Explore related *(similar, recommended)* media of a tv show or movie
- Track/untrack tv shows and movies
- Mark/unmark tv shows and movies as watched
- Mark/unmark individual seasons of tv shows as watched
- Mark/unmark individual episodes of tv shows as watched
- See all your tracked (to do) tv shows and movies on one page
- See all your watched (done) tv shows and movies on one page

It comes with convenient features like the automatic selection of the latest season watched. However, I don’t consider this version as feature complete. In the long run, it should also cover other media like books and maybe games.

Styling is currently based on [Semantic UI React](https://react.semantic-ui.com), so that it can be easily picked-up by the community. There’s no theme, or much design optimization done at the moment, because it wasn’t a priority.

As it’s work in progress, there are no tests and error handling yet. Use at your own risk.

## Demo

[Video demonstration](https://youtu.be/6DcEnZWRwLA) on YouTube.

### Screenshots

**Discover screen**

![Discover Screen](https://github.com/superbonaci/media-tracker/blob/master/docs/screenshots/discover.png?raw=true)

**Season screen**

![Season Screen](https://github.com/superbonaci/media-tracker/blob/master/docs/screenshots/season.png?raw=true)

[More screenshots](https://github.com/superbonaci/media-tracker/tree/master/docs/screenshots).

## Usage and development

The project is split into `client` and `server`. Latter is a simple [JSON Server](https://github.com/typicode/json-server) at the moment.

This project now uses Vite instead of Create React App / react-scripts. CRA is now deprecated for new apps, and react-scripts 5.0.1 hasn’t been updated in years.

Vite 7 requires Node 20.19+ / 22.12+.

Clone the repository and change into the `client` folder. Install dependencies:

```sh
npm install
```

Repeat for the `server` folder.

The project uses the TMDb API and requires an API key. After creating an account on [TMDb](https://www.themoviedb.org), you can request an API key under `Profile > Settings > API`. Please add your key in `./client/src/config.js`!

If deprecation warnings like `caniuse-lite is outdated` appear, periodically update the database in the client:

```sh
cd client
npx update-browserslist-db@latest
```

Afterwards open two separate terminal windows and run `npm start` in the `server` folder, then `npm run dev` in the `client` folder.

The `client` (frontend) will run at `http://localhost:5173` (opens automatically), and the `server` (backend) will run on port 3001.

### Missing cover images

Some titles (especially recently announced or pre-production works like [*Avatar: Seven Havens*](https://www.themoviedb.org/tv/284833-avatar-seven-havens)) don't have a cover as of January 2026.

This happens because the project relies on **The Movie Database (TMDb)** API. If a show hasn't released an official marketing poster yet, TMDb often has no image to serve.

Other websites like IMDb show a `frame grab` or screenshot from the movie, until the official artwork is released.

### Code guidelines

Used style guides *(enforced with ESLint)*:

- ~~JavaScript: [airbnb-base](https://github.com/airbnb/javascript/tree/master/react)~~

### Available scripts

```sh
npm start
npm test
npm run build
npm run eject # be careful :)
```

In addition I added:

```sh
npm run lint
```

## Docker

You can also run it with Docker:

1. Add your TMDb API key as described above. *(In the future you’ll be able to do this through the docker-compose.yml)*
2. In the root folder run: `docker-compose up -d`
3. It will be available on `http://localhost`

## Author

Michael Xander

- <https://michaelxander.com>
- <https://twitter.com/michaxndr>
