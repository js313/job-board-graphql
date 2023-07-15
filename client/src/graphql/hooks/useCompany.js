import { COMPANY_QUERY } from "../../graphql/queries";
import { useQuery } from "@apollo/client";

export function useCompany(id) {
  const { data, loading, error } = useQuery(COMPANY_QUERY, {
    variables: { id },
  });
  return {
    company: data?.company,
    loading,
    error,
  };
}
