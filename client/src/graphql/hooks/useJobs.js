import { JOBS_QUERY } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

export function useJobs() {
  //Hooks are nothing but functions
  const { data, loading, error } = useQuery(JOBS_QUERY);
  return {
    jobs: data?.jobs,
    loading,
    error,
  };
}
