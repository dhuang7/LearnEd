'use client'

import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import ListItem from "@mui/material/ListItem";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded';


export default function CalendarMemnberPermission({m, i, memberRoles, setMemberRoles, handleRemoveMember, teamMemberObj, memberIds, setErrorText, user}) {

    function handleMemberRoles({target}) {
        if (teamMemberObj.map(v=>v.id).includes(memberIds[i])) {
            setErrorText("You can't change a team members permissions.")
            return;
        } else if (memberIds[i] === user.id) {
            setErrorText("You can't change your own permissions.")
            return;
        }

        setMemberRoles(m => {
            m[i] = target.value;
            return [...m];
        });
    }


    return (
        <ListItem>
            <AccountCircleRoundedIcon fontSize='large' sx={{mr:'1rem'}} />
            <Typography>{m}</Typography>
            {/* user permissions */}
            <Box sx={{ml:'auto', width:'10rem'}}>
                <TextField
                    label='Permissions'
                    select
                    // required
                    fullWidth
                    value={memberRoles[i]}
                    disabled={memberRoles[i] === 'owner'}
                    onChange={handleMemberRoles}
                    slotProps={{
                        // select: {
                        //     renderValue:(v) => v.name,
                        // },
                        htmlInput: {
                            sx: {
                                py:'.5rem'
                            }
                        },
                        inputLabel: {
                            shrink: true,
                        }
                    }}
                    >
                    {['Owner', 'Editor', 'Commentor', 'Viewer'].map((v, index) => (
                        <MenuItem key={index} value={v.toLocaleLowerCase()} disabled={v === 'Owner'}>{v}</MenuItem>
                    ))}
                    
                </TextField>
            </Box>
            {/* remove user */}
            <IconButton data-value={i} sx={{ml:'.25rem'}} onClick={handleRemoveMember}>
                <PersonRemoveRoundedIcon fontSize="medium" />
            </IconButton>
        </ListItem>
    );
}