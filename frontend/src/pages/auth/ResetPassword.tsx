import { useNavigate, useParams } from "react-router-dom";
import { postData } from "../../utils/api";
import { errorAlert, successAlert } from "../../utils/swal";
import { useState } from "react";
import { Lock } from "lucide-react";
import { CircularProgress } from "@mui/material";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newPassword !== confirmNewPassword) {
            errorAlert('Failed', 'Your passwords do not match.');
            return; 
        }
        setLoading(true)
        const response = await postData(`/api/auth/reset-password/${token}`, { newPassword });
        setLoading(false)
        if(!response.success){
            errorAlert('Failed', response.message || 'Something went wrong.');
            return;
        }

        await successAlert('Success', response.message);
        navigate('/login')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-100 to-white flex items-center justify-center p-4">
            <form onSubmit={handleSubmit} className="md:max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-center flex flex-col items-center space-y-4">
                    <img src='/logo.png' className="w-20 h-20 text-red-600" />
                    <h1 className="text-3xl font-bold text-white mb-2">Reset Password</h1>
                    <p className="text-red-100">Please enter your new password.</p>
                </div>
                <div>
                <div className="p-8 space-y-6">
                    <div>
                        <div className="block text-sm font-medium text-gray-700 mb-2">
                            New Password
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="outline-none w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                                placeholder="Enter your new password"
                                required
                            />
                        </div>
                    </div>
                                        <div>
                        <div className="block text-sm font-medium text-gray-700 mb-2">
                            Confirm New Password
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                className="outline-none w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                                placeholder="Confirm your new password"
                                required
                            />
                        </div>
                    </div>
                    {loading ? <div className="w-full flex justify-center">
                        <CircularProgress sx={{ color: "#DC2626" }} />
                    </div> : 
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-lg font-semibold shadow-lg hover:from-red-700 hover:to-red-800 transform hover:scale-[1.02] transition-all duration-200"
                    >
                        Submit
                    </button>
                    }
                </div>
                </div>
            </form>
        </div>
    )
}

export default ResetPassword