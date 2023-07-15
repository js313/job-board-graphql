import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const GRAPHQL_URL = "http://localhost:9000/graphql";

export const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only",
    },
    mutate: {
      fetchPolicy: "network-only",
    },
    watchQuery: {
      fetchPolicy: "network-only",
    },
  },
});

const JOB_FRAGMENT = gql`
  fragment JobDetail on Job {
    id
    title
    description
    company {
      id
      name
    }
  }
`;

export const JOBS_QUERY = gql`
  query {
    jobs {
      id
      title
      description
      company {
        name
      }
    }
  }
`;

export const JOB_QUERY = gql`
  query JobQuery($id: ID!) {
    job(id: $id) {
      ...JobDetail
    }
  }
  ${JOB_FRAGMENT}
`;

export const COMPANY_QUERY = gql`
  query CompanyQuery($id: ID!) {
    company(id: $id) {
      id
      name
      description
      jobs {
        id
        title
        description
        company {
          name
        }
      }
    }
  }
`;

export const JOB_MUTATION = gql`
  mutation JobMutation($createJobInput: CreateJobInput!) {
    job: createJob(createJobInput: $createJobInput) {
      ...JobDetail
    }
  }
  ${JOB_FRAGMENT}
`;
