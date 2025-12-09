import { User } from "lucide-react"
import { useState } from "react"
import { postData } from "../../utils/api";
import { errorAlert, successAlert } from "../../utils/swal";
import { CircularProgress } from "@mui/material";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true)
        const response = await postData('/api/auth/forgot-password', { email });
        setLoading(false)
        if(!response.success){
            errorAlert('Failed', response.message || 'Something went wrong.');
            return;
        }

        successAlert('Success', response.message);
        setEmail('');
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-white">
            <form onSubmit={handleSubmit} className="md:max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-center flex flex-col items-center space-y-4">
                    <img src='/logo.png' className="w-20 h-20 text-red-600" />
                    <h1 className="text-3xl font-bold text-white mb-2">Forgot Password</h1>
                    <p className="text-red-100">Enter your email to reset your password.</p>
                </div>
                <div>
                <div className="p-8 space-y-6">
                    <div className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                    </div>
                    <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border-2 outline-none border-gray-200 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
                            placeholder="Enter your email"
                            required
                        />
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

export default ForgotPassword