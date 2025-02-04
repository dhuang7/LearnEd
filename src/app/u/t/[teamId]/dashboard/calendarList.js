'use client'


import CalendarPage from "@/app/u/calendar/calendarPage";
import { useEffect, useRef, useState } from "react";
// import AddEventSideview from "./addEventSideview";




export default function CalendarList({calendarData, user}) {
    const calendarRef = useRef(); // get the main calendar api
    const [calendar, setCalendar] = useState(); // set calendar api
    const [rerender, setRerender] = useState(); // rerendering to work with non react calendar component

    useEffect(() => {
        setCalendar(calendarRef.current?.getApi());
    }, [calendarRef.current])

    function handleRerender() {
        setRerender(r=>!r);
    }

    return (
        <>
            <CalendarPage 
                ref={calendarRef} user={user} 
                calendar={calendar} calendarData={calendarData} handleRerender={handleRerender} 
                initialView={'listMonth'}
                />
        </>
    );
}