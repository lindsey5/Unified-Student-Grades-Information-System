import { postData } from "./api"
import { errorAlert, successAlert } from "./swal";

export const logout = async () => {
    const response = await postData('/api/auth/logout', {});
    if(!response.success) {
        await errorAlert('Failed to logout', 'Please try again.');
        return;
    }
    
    await successAlert('Successfully Log Out!', '');
    window.location.href = '/';
}