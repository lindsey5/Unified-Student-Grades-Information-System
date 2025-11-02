interface Department {
    _id?: string;
    name: string;
    image: Image;
    status?: 'active' | 'inactive';
    createdAt?: string;
}

interface Course {
    _id?: string;
    name: string;
    department: Department;
    status?: 'active' | 'inactive';
    createdAt?: string;
}

interface Student {
    _id?: string;
    student_id: string;
    email: string;
    firstname: string;
    middlename: string;
    lastname: string;
    gender: string;
    course: Course;
    year_level: 1 | 2 | 3 | 4;
    status: 'Active' | 'Inactive' | 'Graduated';
    createdAt?: Date;
}

interface Subject{
    _id?: string;
    name: string;
    code: string;
    createdAt?: Date;
}

interface Instructor {
    _id?: string;
    firstname: string;
    lastname: string;
    department: Department; 
    status: 'active' | 'inactive'
    createdAt: Date
}

interface Semester {
    _id?: string;
    student_id: string;
    term: "1st" | "2nd" | "Summer";
    schoolYear: string; // ex. "2025-2026"
    enrollmentStatus: 'Regular' | 'Irregular'
    status: "active" | "inactive";
    course: Course;
}

interface StudentSubject {
    _id?: string;
    student_id: string;
    subject: Subject;
    section: string;
    room: number;
    time: string;
    units: number;
    hours: number;
    instructor: Instructor;
    midtermGrade: number;
    finalGrade: number;
}

interface Admin {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    createdAt: string;
}

interface Image {
    imageUrl: string;
    imagePublicId: string;
}

interface Option {
  label: string;
  value: any;
}