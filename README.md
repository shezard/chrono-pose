# Chrono Pose : Timer for pose drawing

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Adding data from unsplash random API

### Get an access token from unsplash api

> Register here: https://unsplash.com/developers

### Get random data

Setup an .env file with

```bash
    ACCESS_KEY=<YOUR UNSPLASH ACCESS KEY>
```

Then run

```bash
    just get_data <theme>
```

### Uniquify data in src/lib/data.json

```bash
node unique.mjs > src/lib/data.json
```

TODO: path shouldn't be hard coded
