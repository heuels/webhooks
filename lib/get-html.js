module.exports = getHtml;

const { request } = require("@octokit/request");
const cache = require("./cache");

const WEBHOOKS_DOCS_URL =
  "https://docs.github.com/en/developers/webhooks-and-events/webhook-events-and-payloads";

async function getHtml(state) {
  const cacheFilePath = "webhook-events-and-payloads.html";

  if (state.cached && (await cache.exists(cacheFilePath))) {
    return cache.read(cacheFilePath);
  }

  console.log(`⌛  fetching ${WEBHOOKS_DOCS_URL}`);

  const { data: html } = await request(WEBHOOKS_DOCS_URL);
  await cache.writeHtml(cacheFilePath, html);
  return html;
}
