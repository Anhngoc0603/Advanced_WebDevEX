export interface CourseRegistration {
  name: string;
  email: string;
  phone: string;
  course: string;
  time: 'sang' | 'toi';
  agree: boolean;
}