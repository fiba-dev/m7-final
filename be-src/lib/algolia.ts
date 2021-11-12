import algoliasearch from "algoliasearch";

import "dotenv/config";
const client = algoliasearch(
	process.env.ALGOLIA_APP_ID,
	process.env.ALGOLIA_API_KEY
);

const index = client.initIndex(process.env.ALGOLIA_INDEX_NAME);

export { index };
