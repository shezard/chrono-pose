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

```bash
curl "https://api.unsplash.com/photos/random?count=30&orientation=portrait&query=portrait" --header "Authorization: Client-ID <Your unsplash access token>" > random.json
```

### Filter out relevant data

```bash
cat random.json | jq '[.[] | {alt: .alt_description, url: .urls.small, author: .user.username}]' > data.json
```
