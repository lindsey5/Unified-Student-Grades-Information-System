import { useContext } from "react";
import { RegistrarContext } from "../contexts/RegistrarContext";
import ProfileSettings from "../components/ui/ProfileSettings";

const RegistrarProfile = () => {
    const { registrar } = useContext(RegistrarContext);

    return (
        <div className="w-full min-h-screen p-6 bg-emerald-50 flex flex-col items-center gap-6">
            <div className="w-full">
            </div>

        <div className="w-full md:max-w-3xl space-y-8">
            <h1 className="text-3xl font-bold text-emerald-700">Profile Settings</h1>
            {/* User Info */}
            <div className="flex-1 flex flex-col gap-4 bg-white border border-emerald-200 rounded-xl shadow-md p-6">
                <div className="flex gap-3 mb-5 items-center">
                    <div className="w-18 h-18 flex items-center justify-center bg-emerald-700 text-white rounded-full text-4xl font-semibold shadow">
                    {`${registrar?.firstname.charAt(0)}${registrar?.lastname.charAt(0)}`}
                    </div>
                    <div>
                        <p>{`${registrar?.firstname} ${registrar?.lastname}`}</p>
                        <p>{registrar?.email}</p>
                    </div>
                </div>
                <ProfileSettings<Registrar> user={registrar as Registrar} apiUrl="/api/registrars"/>
            </div>
        </div>
        </div>
    );
};

export default RegistrarProfile;
