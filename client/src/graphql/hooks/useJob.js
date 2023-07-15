import { JOB_QUERY } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

export function useJob(id) {
  const { data, loading, error } = useQuery(JOB_QUERY, {
    variables: { id },
    fetchPolicy: "cache-first",
  });
  return {
    job: data?.job,
    loading,
    error,
  };
}
