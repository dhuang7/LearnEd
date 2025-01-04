'use client'

import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";


import dayjs from "dayjs";
import { DateCalendar } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import CalendarAccordian from "./calendarAccordian";



export default function SideMenuCalendar({calendar, rerender, handleRerender, user, sortedCalendarData, defaultOpen}) {
    const [date, setDate] = useState(dayjs());

    useEffect(() => {
        setDate(dayjs(calendar?.getDate()));
    }, [rerender]);

    // have date calendar change the main calendar date
    function handleDateChange(newValue) {
        setDate(newValue);
        handleRerender();
        calendar?.gotoDate(newValue.toDate());
    }

    return (
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'.5rem', py: '1rem', height:'100%', 
                display:'flex', flexDirection:'column', overflow:'hidden',
            }}
            >
            {/* small calendar */}
            <Box sx={{width:'100%'}}>
                <DateCalendar 
                    value={date}
                    onChange={handleDateChange}
                    showDaysOutsideCurrentMonth
                    reduceAnimations
                    fixedWeekNumber={6}
                    views={['day']}
                    slotProps={{
                        day: {
                            sx: {
                                width:'calc(100% / 7 - 4px)',
                                aspectRatio:1,
                                height:'auto',
                            }
                        },
                        leftArrowIcon: {fontSize: 'small'},
                        rightArrowIcon: {fontSize: 'small'},
                        nextIconButton: {size: 'small'},
                        previousIconButton: {size: 'small'},
                        calendarHeader: {
                            sx: theme => ({
                                '& .MuiPickersCalendarHeader-label': {
                                    fontSize: theme.typography.body1,
                                    fontWeight: 'bold',
                                },
                                minHeight:0,
                                p:0,
                                pl:'calc((100% / 7 - 4px)/2.5)',
                                mt:0,
                            }),
                        }
                    }}
                    sx={{
                        width:'100%',
                        '& .MuiDayCalendar-weekDayLabel': {
                            width:'calc(100% / 7 - 4px)',
                            aspectRatio:1,
                            height:'auto',
                        },
                        '& .MuiPickersSlideTransition-root	': {
                            minHeight:0,
                        },
                        height:'auto',
                    }}
                    />
            </Box>
            {/* list of calendar categories */}
            <Box sx={{width:'100%', mt:'.5rem', flexGrow: 1, overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', overflow:'scroll'}}>
                    {/* my calendars */}
                    {sortedCalendarData.user && <CalendarAccordian defaultOpen={defaultOpen} calendarData={sortedCalendarData.user} user={user} title='My Calendar' />}
                    {/* shared with me */}
                    {sortedCalendarData.sharedCalendar && <CalendarAccordian defaultOpen={defaultOpen} calendarData={sortedCalendarData.sharedCalendar} user={user} title='Shared with me' />}
                    {/* team calendars */}
                    {Object.keys(sortedCalendarData).map((v, i) => (
                        (v !== 'user' && v !== 'sharedCalendar') && 
                            <CalendarAccordian 
                                key={i}
                                calendarData={sortedCalendarData[v]} 
                                defaultOpen={defaultOpen}
                                user={user} 
                                teamId={v}
                                title={sortedCalendarData[v][0]?.calendars.teams.name} 
                                />
                    ))}
                </Box>
            </Box>
        </Paper>
    );
}