import { Job, Company } from "./db.js";

const resolvers = {
  Query: {
    jobs: async () => {
      return Job.findAll();
    },
    job: async (_root, args) => {
      return Job.findById(args.id);
    },
    company: async (_root, { id }) => {
      return Company.findById(id);
    },
  },
  Job: {
    company: async (job) => {
      return Company.findById(job.companyId);
    },
  },
  Company: {
    jobs: async (company) => {
      return Job.findAll((job) => company.id === job.companyId);
    },
  },
};

export default resolvers;
