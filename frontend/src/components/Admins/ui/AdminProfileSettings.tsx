import { useEffect, useState } from "react";
import { User, Mail } from "lucide-react";
import { EmeraldTextField } from "../../Textfield";
import { InputAdornment } from "@mui/material";
import { confirmDialog, successAlert, errorAlert } from "../../../utils/swal";
import { updateData } from "../../../utils/api";
import LoadingScreen from "../../LoadingScreen";

const AdminProfileSettings = ({ admin }: { admin: Admin | null }) => {
    const [updating, setUpdating] = useState(false);
    const [user, setUser] = useState<Admin>();

    useEffect(() => {
        if (admin) setUser(admin);
    }, [admin]);

    const handleChange = (field: string, value: string) => {
        setUser((prev) => ({ ...prev!, [field]: value }));
    };

    const handleSave = async () => {
        if (await confirmDialog("Save changes?", "This will update your profile information.")) {
            setUpdating(true);
            const response = await updateData("/api/admins", user);
            setUpdating(false);

            if (!response.success) {
                errorAlert("Error", response.message || "Something went wrong.");
                return;
            }

            await successAlert("Success", response.message);
            window.location.reload();
        }
    };

    return (
        <>
            <LoadingScreen loading={updating} />

            <EmeraldTextField
                label="First Name"
                value={user?.firstname}
                onChange={(e) => handleChange("firstname", e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <User size={18} />
                        </InputAdornment>
                    ),
                }}
            />

            <EmeraldTextField
                label="Last Name"
                value={user?.lastname}
                onChange={(e) => handleChange("lastname", e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <User size={18} />
                        </InputAdornment>
                    ),
                }}
            />

            <EmeraldTextField
                label="Email"
                value={user?.email}
                onChange={(e) => handleChange("email", e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Mail size={18} />
                        </InputAdornment>
                    ),
                }}
            />

            <p className="text-sm text-emerald-500 font-medium">ID: {user?._id}</p>

            <button
                onClick={handleSave}
                className="mt-6 self-start px-6 py-2 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 shadow transition-all duration-200"
            >
                Save Changes
            </button>
        </>
    );
};

export default AdminProfileSettings;
