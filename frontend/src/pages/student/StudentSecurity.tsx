import React, { useState } from 'react';
import {
  Shield,
  Lock,
  User,
} from 'lucide-react';
import { EmeraldTextField, PasswordInput } from '../../components/Textfield';
import useFetch from '../../hooks/useFetch';
import { errorAlert, successAlert } from '../../utils/swal';
import { postData } from '../../utils/api';
import { CircularProgress } from '@mui/material';

interface ShowPasswords {
    current: boolean;
    new: boolean;
    confirm: boolean;
}

const StudentSecurity: React.FC = () => {
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPasswords, setShowPasswords] = useState<ShowPasswords>({
        current: false,
        new: false,
        confirm: false,
    });

    const { data : studentRes, loading : studentLoading } = useFetch(`/api/students/me`);

    const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            errorAlert('Password Mismatch', 'New password and confirm password do not match.');
            return;
        }

        if (newPassword.length < 8) {
            errorAlert('Weak Password', 'New password must be at least 8 characters long.');
            return;
        }

        const response = await postData('/api/students/password', { newPassword });
    
        if(!response?.success) {
            errorAlert(response?.message || 'Password Change Failed', 'Please try again.');
            return;
        }

        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');

        await successAlert('Password Changed', 'Your password has been updated successfully.');
    };

    const togglePasswordVisibility = (field: keyof ShowPasswords) => {
        setShowPasswords((prev) => ({
        ...prev,
        [field]: !prev[field],
        }));
    };

    if(studentLoading) {
        return (
        <div className="w-full flex justify-center items-center h-20">
            <CircularProgress sx={{ color: "#10b981" }} size={24} />
        </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 border-l-4 border-emerald-500">
            <div className="flex items-center gap-3">
                <Shield className="w-8 h-8 text-emerald-600" />
                <div>
                <h1 className="text-2xl font-bold text-gray-800">Security Settings</h1>
                <p className="text-gray-600">
                    Manage your account password
                </p>
                </div>
            </div>
            </div>

            {/* Student Information Section */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200">
                    <User className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-xl font-semibold text-gray-800">
                    Student Information
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <EmeraldTextField 
                        label="Student ID"
                        value={studentRes?.student.student_id}
                        disabled
                    />
                    <EmeraldTextField
                        label="Email"
                        value={studentRes?.student.email}
                        disabled
                        />
                        <EmeraldTextField
                            label="Full Name"
                            value={`${studentRes?.student.firstname} ${studentRes?.student.middlename} ${studentRes?.student.lastname}`}
                            disabled
                        />
                        <EmeraldTextField
                            label="Gender"
                            value={studentRes?.student.gender}
                            disabled
                        />

                        <EmeraldTextField
                            label="Course"
                            value={studentRes?.student.course.name}
                            disabled
                        />
                        <EmeraldTextField
                            label="Year Level"
                            value={studentRes?.student.year_level}
                            disabled
                        />
                        <EmeraldTextField
                            label="Status"
                            value={studentRes?.student.status}
                            disabled
                        />
                </div>
            </div>

            <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <p className="text-sm text-emerald-800">
                <strong>Note:</strong> To update your personal information, please
                contact the registrar's office.
                </p>
            </div>
            </div>

            {/* Change Password Section */}
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 my-6">
                <div className="flex items-center gap-2 mb-6 pb-3 border-b border-gray-200">
                    <Lock className="w-5 h-5 text-emerald-600" />
                    <h2 className="text-xl font-semibold text-gray-800">Change Password</h2>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-4">
                    <PasswordInput
                        label="Current Password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        visible={showPasswords.current}
                        onToggle={() => togglePasswordVisibility('current')}
                        placeholder="Enter current password"
                    />

                    <PasswordInput
                        label="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        visible={showPasswords.new}
                        onToggle={() => togglePasswordVisibility('new')}
                        placeholder="Enter new password"
                        helper="Must be at least 8 characters long"
                    />

                    <PasswordInput
                        label="Confirm New Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        visible={showPasswords.confirm}
                        onToggle={() => togglePasswordVisibility('confirm')}
                        placeholder="Confirm new password"
                    />

                    <div className="pt-4">
                    <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                        <Lock className="w-5 h-5" />
                        Change Password
                    </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default StudentSecurity;
