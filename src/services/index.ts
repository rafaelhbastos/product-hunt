import { GraphQLClient } from "graphql-request";

const endpoint = import.meta.env.VITE_API_URL;
const accessToken = import.meta.env.VITE_API_ACCESS_TOKEN;

if (!endpoint || !accessToken) {
  throw new Error("VITE_API_URL and VITE_API_ACCESS_TOKEN must be set");
}

export const graphqlClient = new GraphQLClient(endpoint, {
  headers: {
    authorization: `Bearer ${accessToken}`,
  },
});
