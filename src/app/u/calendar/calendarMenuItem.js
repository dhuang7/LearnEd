'use client'

import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Checkbox from '@mui/material/Checkbox';
import CircularProgress from '@mui/material/CircularProgress';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import Typography from "@mui/material/Typography";


import { useEffect, useState, useTransition } from "react";
import createClient from "@/utils/supabase/client";
import EditCalendarModal from "./editCalendarModal";
import { useRouter } from "next/navigation";




export default function CalendarMenuItem({user, defaultChecked, calendarData, teamMembers}) {
    const supabase = createClient();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [checked, setChecked] = useState(defaultChecked||false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!isPending && loading) {
            setLoading(false);
        }
    }, [isPending]);

    // handle whether calendar is checked
    async function handleCheck() {
        setChecked(c => {
            handleCheckChange(!c);
            return !c;
        });
    }

    // edits calendar membership if the calendar should be showing
    async function handleCheckChange(showEvents) {
        setLoading(true);
        const {data, error} = await supabase
            .from('calendar_memberships')
            .update({
                show_events: showEvents,
            })
            .eq('calendar_id', calendarData.calendars.id)
            .eq('user_id', user.id)

        startTransition(() => {
            router.refresh();
        });
    }

    return (
        <MenuItem 
            disabled={loading}
            onClick={handleCheck}
            disableGutters
            sx={{
                borderRadius: 3,
                display:'flex',
                p:0,
            }}
            >
            {(loading)
                ? <CircularProgress size='20px' sx={{px:'.5rem'}} />
                : <Checkbox 
                    checked={checked} 
                    size='small' 
                    sx={{
                        p:0, px:'.5rem', 
                        color: calendarData.calendars.default_color,
                        '&.Mui-checked': {
                            color: calendarData.calendars.default_color,
                        },
                    }} 
                    />
            }
            <Typography color="textSecondary" noWrap>{calendarData.calendars.name}</Typography>
            <EditCalendarModal calendarData={calendarData} teamMembers={teamMembers} user={user} />
        </MenuItem>
    );
}