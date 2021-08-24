# `ical-tentative`

A way to make all iCal events tentative in Outlook.

## ⚙ How To

To use this proxy for your calendar. Add it behind the url: `https://tentative.jelleschutter.workers.dev/` as a URI encoded string. For example in JavaScript this can be acomplished with the following snippet:
```javascript
const iCalUrl = encodeURIComponent('https://...')
const url = `https://tentative.schutter.xyz/ical/${iCalUrl}`
```

### 💻 Developing

[`src/index.ts`](./src/index.ts) calls the request handler in [`src/handler.ts`](./src/handler.ts), and will return the modified iCal.

### ✏️ Formatting

This template uses [`prettier`](https://prettier.io/) to format the project. To invoke, run `npm run format`.

### 👀 Previewing and Publishing

For information on how to preview and publish your worker, please see the [Wrangler docs](https://developers.cloudflare.com/workers/tooling/wrangler/commands/#publish).
