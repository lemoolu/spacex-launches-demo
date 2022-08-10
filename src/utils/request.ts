/**
 * Single instance, encapsulates the general processing of requests, and decouples external modules from graphql-request
 */

import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient('https://api.spacex.land/graphql/', {
  headers: {},
});

export default function request(query: string, variables?: any) {
  return client.request(
    gql`
      ${query}
    `,
    variables,
  );
}
