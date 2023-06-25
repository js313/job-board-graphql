import JobList from "./JobList";
import { getJobs } from "../graphql/queries";
import { useEffect, useState } from "react";

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    getJobs()
      .then(setJobs)
      .catch((error) => setError(error.message));
  }, []);
  if (error) {
    return <div>Somethnig went wrong!</div>;
  }
  return (
    <div>
      <h1 className="title">Job Board</h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default JobBoard;
