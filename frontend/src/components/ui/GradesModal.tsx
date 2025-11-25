import { Modal } from "@mui/material";

interface GradesModalProps{
    onClose: () => void;
    isOpen: boolean;
}

const GradesModal = ({ isOpen, onClose } : GradesModalProps) => {
    return (
        <Modal open={isOpen} onClose={onClose} sx={{ zIndex: 1 }}>
            <div className="absolute top-1/2 left-1/2 w-96 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-md p-5">
            </div>
        </Modal>
    )
}

export default GradesModal