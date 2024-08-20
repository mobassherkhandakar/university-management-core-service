export type ICourseData = {
  title: string;
  code: string;
  credits: string;
  preRequisiteCourses: {
    courseId: string;
  }[];
};
