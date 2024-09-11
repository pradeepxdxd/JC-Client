import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Avatar, IconButton } from '@mui/material';
import ProfileForm from '../Forms/ProfileForm';
import AddPhotoIcon from '@mui/icons-material/AddAPhoto'; // You can replace this with any other icon or image.
import { convertImageToBase64 } from '../../utils/formatImage/base64';
import { isValidImage } from '../../validations/profile';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { PROFILE_IMAGE } from '../../constants/avatar';
import { compressImage } from '../../utils/formatImage/compressImage';

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90vw", // Use 90% of the viewport width
    maxWidth: "450px", // Set a maximum width for larger screens
    height: "80vh", // Use 80% of the viewport height
    maxHeight: "60vh", // Set a maximum height
    overflowY: "auto", // Enable vertical scroll
    bgcolor: "#111b22",
    borderRadius: "6px",
    boxShadow: "none",
    outline: "none",
    p: 4,
};

export default function BasicModal({ openProfile, setOpenProfile }) {
    const { user } = useSelector(state => state.user)
    const [edit, setEdit] = React.useState(true);
    const [hover, setHover] = React.useState(false);
    const [profileImage, setProfileImage] = React.useState(user?.profileImage)

    const handleClose = () => {
        setOpenProfile(false);
        setEdit(true);
        setProfileImage('')
    }

    const handleMouseEnter = () => {
        if (!edit) setHover(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const isValid = isValidImage(file.type)
        if (isValid) {
            // if (file.size > 90000) {
            //     const compressedImg = await compressImage(file, 0)
            //     let compSize = atob(compressedImg.split(",")[1]).length;
            //     console.log({compSize})
            //     setProfileImage(compressedImg)
            // }
            // else {
            const profileImageBase64 = await convertImageToBase64(file)
            setProfileImage(profileImageBase64)
            // }
        }
        else {
            toast.error('Only jpeg, png, jpg images are allowed.')
        }
    };

    return (
        <div>
            <Modal
                open={openProfile}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <div
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            style={{ position: 'relative' }}
                        >
                            {
                                !!profileImage ?
                                    <Avatar
                                        sx={{ width: '144px', height: '140px', cursor: !edit ? 'pointer' : 'default' }}
                                        src={profileImage}
                                        alt='Profile Picture'
                                    /> :
                                    <Avatar
                                        sx={{ width: '144px', height: '140px', cursor: !edit ? 'pointer' : 'default' }}
                                        src={user?.profileImage || PROFILE_IMAGE}
                                        alt='Profile Picture'
                                    />
                            }
                            {!edit && hover && (
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        bgcolor: 'rgba(0, 0, 0, 0.5)',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: '50%',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <input
                                        accept="image/*"
                                        type="file"
                                        onChange={handleImageUpload}
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            opacity: 0,
                                            cursor: 'pointer',
                                        }}
                                    />
                                    <AddPhotoIcon sx={{ color: '#fff', fontSize: 40 }} />
                                </Box>
                            )}
                        </div>
                    </Box>
                    <Box mt={5}>
                        <ProfileForm close={handleClose} edit={edit} setEdit={setEdit} data={user} profileImage={profileImage} />
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
