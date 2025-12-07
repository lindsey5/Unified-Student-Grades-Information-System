import { useContext } from "react";
import { AdminContext } from "../contexts/AdminContext";
import ProfileSettings from "../components/ui/ProfileSettings";

const AdminProfile = () => {
    const { admin } = useContext(AdminContext);

    return (
        <div className="w-full min-h-screen p-6 bg-red-50 flex flex-col items-center gap-6">
            <div className="w-full">
            </div>

            <div className="w-full md:max-w-3xl space-y-8">
                <h1 className="text-3xl font-bold text-red-700">Profile Settings</h1>

                {/* User Info */}
                <div className="flex-1 flex flex-col gap-4 bg-white border border-red-200 rounded-xl shadow-md p-6">
                    <div className="flex gap-3 mb-5 items-center">
                        <div className="w-18 h-18 flex items-center justify-center bg-red-700 text-white rounded-full text-4xl font-semibold shadow">
                            {`${admin?.firstname.charAt(0)}${admin?.lastname.charAt(0)}`}
                        </div>
                        <div>
                            <p className="text-gray-900 font-medium">{`${admin?.firstname} ${admin?.lastname}`}</p>
                            <p className="text-gray-500">{admin?.email}</p>
                        </div>
                    </div>

                    <ProfileSettings<Admin> user={admin as Admin} apiUrl="/api/admins"/>
                </div>
            </div>
        </div>
    );
};

export default AdminProfile;
