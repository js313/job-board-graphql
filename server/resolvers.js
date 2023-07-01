import { Job, Company } from "./db.js";

const resolvers = {
  Query: {
    jobs: async () => {
      return Job.findAll();
    },
    job: async (_root, args) => {
      return Job.findById(args.id);
    },
    companies: async () => {
      return Company.findAll();
    },
    company: async (_root, { id }) => {
      return Company.findById(id);
    },
  },
  Mutation: {
    createJob: (_root, { createJobInput }) => {
      return Job.create({
        title: createJobInput.title,
        description: createJobInput.description,
        companyId: createJobInput.companyId,
      });
    },
    deleteJob: (_root, { id }) => {
      Job.delete(id);
      return id;
    },
    updateJob: (_root, { updateJobInput }) => {
      return Job.update({
        id: updateJobInput.id,
        title: updateJobInput.title,
        description: updateJobInput.description,
        companyId: updateJobInput.companyId,
      });
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
