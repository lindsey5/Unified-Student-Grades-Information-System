import { useState } from 'react';
import { User, Lock, UserCircle, Shield, GraduationCap } from 'lucide-react';
import { postData } from '../../utils/api';
import { errorAlert, successAlert } from '../../utils/swal';
import { useNavigate } from 'react-router-dom';
import useProtection from '../../hooks/useProtection';

const LoginPage = () => {
    const [userType, setUserType] = useState('student');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    useProtection();

    const userTypes = [
        { id: 'student', label: 'Student', icon: GraduationCap },
        { id: 'registrar', label: 'Registrar', icon: UserCircle },
        { id: 'admin', label: 'Admin', icon: Shield }
    ];

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await userLogin();
    }

    const userLogin = async () => {
        const user = userType === 'admin' ? 'admin' : userType === 'student' ? 'student' : 'registrar'
        const response = await postData(`/api/auth/${user}`, { email, password });

        if (!response?.success) {
            errorAlert(response?.message || 'Login failed', 'Please try again.');
            return;
        }

        await successAlert('Login Successful', `Welcome back, ${user}!`);
        navigate(`/${user}`)
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-100 to-white flex items-center justify-center p-4">
            <div className="w-full max-w-md">

                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-center flex flex-col items-center space-y-4">
                        <img src='/logo.png' className="w-20 h-20 text-red-600" />
                        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-red-100">Sign in to your account</p>
                    </div>

                    {/* User Type */}
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
                                                ? 'border-red-600 bg-red-50 shadow-md'
                                                : 'border-gray-200 bg-white hover:border-red-300 hover:bg-red-50'
                                        }`}
                                    >
                                        <Icon
                                            className={`w-8 h-8 mb-2 ${
                                                userType === id ? 'text-red-600' : 'text-gray-400'
                                            }`}
                                        />
                                        <span
                                            className={`text-xs font-medium ${
                                                userType === id ? 'text-red-700' : 'text-gray-600'
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
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
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
                                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                                        placeholder="Enter your password"
                                    />
                                </div>
                            </div>

                            {userType === 'student' && (
                                <div className="flex items-center justify-between text-sm">
                                    <a
                                        href="/forgot-password"
                                        className="text-red-600 hover:text-red-700 font-medium"
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-red-700 hover:to-red-800 transform hover:scale-[1.02] transition-all duration-200"
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
