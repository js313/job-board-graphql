import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { getAccessToken } from "../auth";

const GRAPHQL_URL = "http://localhost:9000/graphql";

const client = new ApolloClient({
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

export async function getJobs() {
  const query = gql`
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
  const {
    data: { jobs },
  } = await client.query({ query });
  return jobs;
}

export async function getJob(id) {
  const query = gql`
    query JobQuery($id: ID!) {
      job(id: $id) {
        ...JobDetail
      }
    }
    ${JOB_FRAGMENT}
  `;
  const variables = { id };
  const {
    data: { job },
  } = await client.query({ query, variables, fetchPolicy: "cache-first" });
  return job;
}

export async function getCompany(id) {
  const query = gql`
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
  const variables = { id };
  const {
    data: { company },
  } = await client.query({ query, variables });
  return company;
}

export async function createJob(title, description) {
  const mutation = gql`
    mutation JobMutation($createJobInput: CreateJobInput!) {
      job: createJob(createJobInput: $createJobInput) {
        ...JobDetail
      }
    }
    ${JOB_FRAGMENT}
  `;
  const variables = {
    createJobInput: {
      title,
      description,
    },
  };
  const headers = {
    Authorization: `Bearer ${getAccessToken()}`,
  };
  const {
    data: { job },
  } = await client.mutate({
    mutation,
    variables,
    context: { headers },
    update: (cache, { data: { job } }) => {
      cache.writeQuery({
        query: gql`
          query JobQuery($id: ID!) {
            job(id: $id) {
              id
              title
              description
              company {
                id
                name
              }
            }
          }
        `,
        variables: { id: job.id },
        data: {
          job,
        },
      });
    },
  });
  return job;
}
