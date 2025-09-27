import cors from 'cors';
import express from 'express'
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import departmentRoutes from './routes/departmentRoutes';
import courseRoutes from './routes/courseRoutes';
import studentRoutes from './routes/studentRoutes';
import subjectRoutes from './routes/subjectRoutes';

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
app.use(express.json());
app.use(express.urlencoded());

app.use('/api/departments', departmentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/subjects', subjectRoutes);

export default app