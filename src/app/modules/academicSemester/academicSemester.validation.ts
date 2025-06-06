import { z } from 'zod';

const create = z.object({
  body: z.object({
    year: z.number({
      required_error: 'Year is required',
    }),
    title: z.string({
      required_error: 'String is required',
    }),
    code: z.string({
      required_error: 'String is required',
    }),
    startMonth: z.string({
      required_error: 'StartMonth is required',
    }),
    endMonth: z.string({
      required_error: 'endMonth is required',
    }),
  }),
});

export const AcademicSemesterValidation = {
  create,
};
