/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../../store/auth/user.slice'
import useDebounce from '../../hooks/useDebounce';
import { getUserId } from '../../utils/auth';
import { userSelected } from '../../store/selectedUser/selectedUser.slice';
import { clearMessages } from '../../store/message/message.slice';
import { getUserInfo } from '../../store/friend/friend.slice';
import { resetProfile, setProfile } from '../../store/profile/profile.slice';

export default function AutocompleteWithCustomList() {
    const [textInput, setTextInput] = React.useState('')
    const debounce = useDebounce(textInput, 700);

    const { loading, users: options } = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (textInput === '')
            dispatch(searchUsers(''))
    }, [dispatch, textInput])

    useEffect(() => {
        if (debounce)
            dispatch(searchUsers(debounce))
    }, [debounce])

    const handleProfileClick = option => {
        dispatch(userSelected())
        dispatch(clearMessages())
        dispatch(getUserInfo({ userId: getUserId(), friendId: option?._id }))
        dispatch(resetProfile())
        dispatch(setProfile({ name: option?.firstname + ' ' + option?.lastname, image: option?.profileImage }))
    }

    return (
        <Autocomplete
            freeSolo
            options={options?.length > 0 ? options : []}
            // getOptionLabel={(option) => option?.label || ''}
            getOptionLabel={(option) => {
                // Handle both object options and free solo text input
                if (typeof option === 'string') {
                    return option; // Free solo text input
                }
                return option.username || `${option.firstname} ${option.lastname}` || ''; // Label or full name
            }}
            loading={loading} // Set loading state
            noOptionsText={loading ? "Searching..." : "User not found"}
            disableClearable
            renderOption={(props, option) => (
                <React.Fragment key={option._id}>
                    <ListItem {...props} alignItems="flex-start" onClick={() => handleProfileClick(option)}>
                        <ListItemAvatar>
                            <Avatar alt={option.username} src={option.profileImage} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={`${option.firstname} ${option.lastname}`}
                            secondary={
                                <React.Fragment>
                                    <Typography
                                        sx={{ display: 'inline' }}
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                    >
                                        {/* {option.name} */}
                                    </Typography>
                                    {" — " + option.username}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </React.Fragment>
            )}
            renderInput={(params) => (
                <TextField
                    {...params}
                    variant="outlined"
                    value={textInput}
                    onChange={(e, value, reason) => {
                        setTextInput(e.target.value)
                    }}
                    sx={{
                        width: '90%',
                        '& .MuiOutlinedInput-root': {
                            color: 'white', // Set text color to white
                            backgroundColor: '#2c343d',
                            borderRadius: '10px',
                            '& fieldset': {
                                borderColor: '#2c343d', // Set border color to match background
                            },
                            '&:hover fieldset': {
                                borderColor: '#2c343d', // Set border color on hover
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#2c343d', // Set border color when focused
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: 'white', // Set input text color to white
                        },
                        '& .MuiInputLabel-root': {
                            color: 'white', // Set label color to white
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: 'white', // Ensure label stays white when focused
                        },
                    }}
                />
            )}
        />
    );
}