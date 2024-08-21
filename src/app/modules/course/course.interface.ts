export type ICourseData = {
  title: string;
  code: string;
  credits: string;
  preRequisiteCourses: {
    courseId: string;
    isDeleted: boolean;
  }[];
};
export type IPrerequisiteCourseRequest = {
  courseId: string;
  isDeleted?: null | boolean;
};
export type ICourseFilterAblField = {
  searchTerm?: string;
};
