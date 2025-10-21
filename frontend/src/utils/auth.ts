import { postData } from "./api"
import { errorAlert, successAlert } from "./swal";

export const logout = async () => {
    const response = await postData('/auth/logout', {});
    if(!response.success) errorAlert('Failed to logout', 'Please try again.');
    
    await successAlert('Successfully Log Out!', '');
    window.location.href = '/';
}