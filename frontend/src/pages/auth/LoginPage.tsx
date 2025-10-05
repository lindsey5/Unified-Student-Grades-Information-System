import { useState } from 'react';
import { User, Lock, UserCircle, Shield, GraduationCap } from 'lucide-react';
import { postData } from '../../utils/api';
import { errorAlert, successAlert } from '../../utils/swal';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [userType, setUserType] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const userTypes = [
        { id: 'student', label: 'Student', icon: GraduationCap },
        { id: 'registrar', label: 'Registrar', icon: UserCircle },
        { id: 'admin', label: 'Admin', icon: Shield }
    ];

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(userType === 'admin') await adminLogin();
    }

    const adminLogin = async () => {
        const response = await postData('/api/auth/admin', { email, password });

        if (!response?.success) {
            errorAlert(response?.message || 'Login failed', 'Please try again.');
            return;
        }

        await successAlert('Login Successful', 'Welcome back, Admin!');
        navigate('/admin')
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-emerald-100 to-teal-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
            {/* Card */}
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-8 text-center">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Lock className="w-10 h-10 text-emerald-600" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                <p className="text-emerald-100">Sign in to your account</p>
            </div>

            {/* User Type Selection */}
            <div className="p-8">
                <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Select User Type
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {userTypes.map(({ id, label, icon: Icon }) => (
                    <button
                        key={id}
                        type="button"
                        onClick={() => setUserType(id)}
                        className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                        userType === id
                            ? 'border-emerald-600 bg-emerald-50 shadow-md'
                            : 'border-gray-200 bg-white hover:border-emerald-300 hover:bg-emerald-50'
                        }`}
                    >
                        <Icon
                        className={`w-8 h-8 mb-2 ${
                            userType === id ? 'text-emerald-600' : 'text-gray-400'
                        }`}
                        />
                        <span
                        className={`text-xs font-medium ${
                            userType === id ? 'text-emerald-700' : 'text-gray-600'
                        }`}
                        >
                        {label}
                        </span>
                    </button>
                    ))}
                </div>
                </div>

                {/* Login Form */}
                <form className="space-y-5" onSubmit={handleSubmit}>
                <div>
                    <div className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                    </div>
                    <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                        placeholder="Enter your email"
                    />
                    </div>
                </div>

                <div>
                    <div className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                    </div>
                    <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all"
                        placeholder="Enter your password"
                    />
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <button type='button' className="text-emerald-600 hover:text-emerald-700 font-medium bg-transparent border-none cursor-pointer">
                    Forgot password?
                    </button>
                </div>

                <button
                    type='submit'
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-emerald-700 hover:to-teal-700 transform hover:scale-[1.02] transition-all duration-200 cursor-pointer border-none"
                >
                    Sign In as {userTypes.find(u => u.id === userType)?.label}
                </button>
                </form>
            </div>
            </div>
        </div>
        </div>
    );
};

export default LoginPage;