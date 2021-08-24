# `ical-tentative`

A way to make all events from a iCal subscription tentative in Outlook.

## ⚙ How To

The easiest way to use this service is by using the form found on the [website](https://tentative.schutter.xyz/). The generated link consists of the url: `https://tentative.schutter.xyz/ical/` followed by the original iCal url encoded as a uri. For example in JavaScript this can be done with the following snippet:

```javascript
const iCalUrl = encodeURIComponent('https://...')
const url = `https://tentative.schutter.xyz/ical/${iCalUrl}`
```

## 💻 Developing

[`src/index.ts`](./src/index.ts) calls the request handler in [`src/handler.ts`](./src/handler.ts), and will return the modified iCal.

## 👀 Previewing and Publishing

For information on how to preview and publish your worker, please see the [Wrangler docs](https://developers.cloudflare.com/workers/tooling/wrangler/commands/#publish).
