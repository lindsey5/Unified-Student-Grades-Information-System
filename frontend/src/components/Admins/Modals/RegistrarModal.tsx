import { Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { EmeraldTextField } from "../../Textfield";
import { confirmDialog, errorAlert } from "../../../utils/swal";
import { postData, updateData } from "../../../utils/api";
import LoadingScreen from "../../LoadingScreen";

interface AdminModalProps {
    isOpen: boolean;
    onClose: () => void;
    registrar?: Registrar
}

const RegistrarModal = ({ isOpen, onClose, registrar }: AdminModalProps) => {
    const [firstname, setFirstname] = useState<string>("");
    const [lastname, setLastname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>(""); 
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setFirstname(registrar?.firstname || "");
        setLastname(registrar?.lastname || "");
        setEmail(registrar?.email || "");
        setPassword("");
    }, [registrar]);

    const handleSaveRegistrar = async () => {
        const action = registrar ? "update" : "add";

        if (
        await confirmDialog(
            "Confirm Action",
            `Do you want to ${action} this registrar?`
        )
        ) {
        if (!firstname || !lastname || !email) {
            return errorAlert("Missing Fields", "Please fill in all fields.");
        }

        // Password is required only on create
        if (!registrar && !password) {
            return errorAlert(
            "Password Missing",
            "Password is required for new registrar."
            );
        }

        setLoading(true);

        const payload: any = {
            firstname,
            lastname,
            email,
        };

        // Add password if creating new admin or editing and user provided a new one
        if (password) {
            payload.password = password;
        }

        const response = registrar
            ? await updateData(`/api/registrars/${registrar._id}`, payload)
            : await postData("/api/registrars", payload);

        if (!response.success) {
            errorAlert("Error", response.message || "Error saving registrar.");
            setLoading(false);
            return;
        }

        window.location.reload(); // Refresh after success
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose} sx={{ zIndex: 1 }}>
        <div className="absolute top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md p-5">
            <LoadingScreen loading={loading} />

            <h2 className="text-lg font-semibold text-emerald-700 mb-4">
            {registrar ? "Edit Registrar" : "Add Registrar"}
            </h2>

            <EmeraldTextField
            label="Firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            fullWidth
            margin="normal"
            />

            <EmeraldTextField
            label="Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            fullWidth
            margin="normal"
            />

            <EmeraldTextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            />

            <EmeraldTextField
            label={registrar ? "New Password (optional)" : "Password"}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            />

            <div className="flex justify-end gap-2 mt-4">
            <button
                onClick={onClose}
                className="px-4 py-2 border rounded-md text-gray-600 hover:bg-gray-100 transition cursor-pointer"
            >
                Cancel
            </button>
            <button
                onClick={handleSaveRegistrar}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-500 transition cursor-pointer"
            >
                <Check size={18} />
                Save
            </button>
            </div>
        </div>
        </Modal>
    );
};

export default RegistrarModal;
