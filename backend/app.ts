import cors from 'cors';
import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import departmentRoutes from './routes/departmentRoutes';
import courseRoutes from './routes/courseRoutes';
import studentRoutes from './routes/studentRoutes';
import subjectRoutes from './routes/subjectRoutes';
import instructorRoutes from './routes/instructorRoutes';
import semesterRoutes from './routes/semesterRoutes';
import studentSubjectRoutes from './routes/studentSubjectRoutes';
import adminRoutes from './routes/adminRoutes';
import authRoutes from './routes/authRoutes';

const app = express();

const origins = process.env.NODE_ENV === 'production' ? [] : ['http://localhost:5173']

// middleware & static files
app.use(cors({
    origin: origins,
    credentials: true
}))
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.json({ limit: '200mb' }));
app.use(express.urlencoded({ limit: '200mb', extended: true }));

app.use('/api/departments', departmentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/semesters', semesterRoutes);
app.use('/api/student-subjects', studentSubjectRoutes);
app.use('/api/admins', adminRoutes);
app.use('/api/auth', authRoutes);

export default app