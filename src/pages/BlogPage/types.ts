export interface Student {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string;
  dateOfBirth: string;
  isGraduated: boolean;
}

export interface BlogItemProps {
  id: number;
  title: string;
  text: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  student: Student;
}
