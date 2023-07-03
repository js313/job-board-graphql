import { request, gql } from "graphql-request";
import { getAccessToken } from "../auth";

const GRAPHQL_URL = "http://localhost:9000/graphql";

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
  const data = await request(GRAPHQL_URL, query);
  return data.jobs;
}

export async function getJob(id) {
  const query = gql`
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
  `;
  const variables = { id };
  const { job } = await request(GRAPHQL_URL, query, variables);
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
  const { company } = await request(GRAPHQL_URL, query, variables);
  return company;
}

export async function createJob(title, description) {
  const mutation = gql`
    mutation JobMutation($createJobInput: CreateJobInput!) {
      job: createJob(createJobInput: $createJobInput) {
        id
      }
    }
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
  const { job } = await request(GRAPHQL_URL, mutation, variables, headers);
  return job;
}
