import { useMutation } from "@apollo/client";
import { JOB_MUTATION, JOB_QUERY } from "../queries";
import { getAccessToken } from "../../auth";

export function useCreateJob() {
  const [mutate, result] = useMutation(JOB_MUTATION);
  async function createJob(title, description) {
    const {
      data: { job },
    } = await mutate({
      variables: { createJobInput: { title, description } },
      context: {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      },
      update: (cache, { data: { job } }) => {
        cache.writeQuery({
          query: JOB_QUERY,
          variables: { id: job.id },
          data: {
            job,
          },
        });
      },
    });
    return job;
  }
  return [createJob, result];
}
