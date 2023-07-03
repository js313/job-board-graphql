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
    createJob: (_root, { createJobInput }, user) => {
      if (!user) throw new Error("Unauthorized");
      return Job.create({
        title: createJobInput.title,
        description: createJobInput.description,
        companyId: user.companyId,
      });
    },
    deleteJob: async (_root, { id }, user) => {
      if (!user) throw new Error("Unauthorized");
      const job = await Job.findById(id);
      if (user.companyId !== job?.companyId) throw new Error("Unauthorized");
      Job.delete(id);
      return id;
    },
    updateJob: async (_root, { updateJobInput }, user) => {
      if (!user) throw new Error("Unauthorized");
      const job = await Job.findById(updateJobInput.id);
      if (user.companyId !== job?.companyId) throw new Error("Unauthorized");
      return Job.update({
        id: updateJobInput.id,
        title: updateJobInput.title,
        description: updateJobInput.description,
        companyId: user.companyId,
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
