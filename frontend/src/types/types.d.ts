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
    lastname: string;
    gender: string;
    image?: Image;
    course: Course;
}

interface Image {
    imageUrl: string;
    imagePublicId: string;
}