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
    image?: Image;
    course: Course;
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

interface Image {
    imageUrl: string;
    imagePublicId: string;
}