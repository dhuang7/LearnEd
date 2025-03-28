import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


import MemberList from "./memberList";
import NormsList from "./normsList";

import createClient from "@/utils/supabase/server";
import CyclesTasks from "./cyclesTasks";
import CalendarList from "./calendarList";
import TaskClient from "./taskClient";




export default async function Dashboard({params}) {
    const teamId = (await params).teamId;
    const supabase = await createClient();
    const user = await getUser(supabase);


    const [normsList, cycles, calendarData, teamMembers, teams, taskData] = await Promise.all([
        getNorms(supabase, teamId),
        getCycles(supabase, teamId),
        getCalendar(supabase, user, teamId),
        getTeamMembers(supabase, teamId),
        getTeams(supabase),
        getTasks(supabase, teamId),
    ])

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            {/* title */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h4'>Dashboard</Typography>
                    {/* <AddAgendaModal teamId={teamId} /> */}
                </Box>
            </Box>
            {/* norms */}
            <Box sx={{width:'100%',  flexGrow:1, overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', overflow:'scroll', boxSizing:'border-box', pt:'.5rem'}}>
                    {/* top dash */}
                    <Box sx={{width:'100%', display:'flex', height:'20rem', boxSizing:'border-box', px:'.5rem'}}>
                        <Box sx={{width:'33.33%', boxSizing:'border-box', px:'.5rem'}}>
                            <CyclesTasks cycles={cycles} />
                        </Box>
                        <Box sx={{width:'33.33%', boxSizing:'border-box', px:'.5rem'}}>
                            <MemberList teamId={teamId} teamMembers={teamMembers} />
                        </Box>
                        <Box sx={{width:'33.33%', boxSizing:'border-box', px:'.5rem'}}>
                            <NormsList teamId={teamId} normsList={normsList} />
                        </Box>
                    </Box>
                    <Box sx={{width:'100%', height:'100%', display:'flex', boxSizing:'border-box', pl:'.5rem', py:'1rem'}}>
                        <Box sx={{width:'50%', boxSizing:'border-box', px:'.5rem'}}>
                            <CalendarList calendarData={calendarData} user={user} />
                        </Box>
                        <Box sx={{width:'50%', height:'100%', boxSizing:'border-box', overflowX:'scroll'}}>
                            <TaskClient tasks={taskData} teamMembers={teamMembers} user={user} teamId={teamId} teams={teams} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

async function getNorms(supabase, teamId) {
    let { data: normsList, error: normsError } = await supabase
        .from('norms')
        .select('*')
        .eq('team_id', teamId);

    return normsList;
}

async function getCycles(supabase, teamId) {
    const {data: cycles, error: cyclesError} = await supabase
        .from('pdsa_cycles')
        .select(`
            id.count(),
            stage,
            change_ideas(
                projects(
                    team_id
                )
            )
        `)
        .eq('change_ideas.projects.team_id', teamId)
        .not('change_ideas.projects', 'is', null)
        .not('change_ideas', 'is', null)
        .order('stage');

    return cycles;
}

async function getUser(supabase) {
    const { data: [user] } = await supabase
        .from('profiles')
        .select();

    return user;
}

async function getCalendar(supabase, user, teamId) {
    const {data: calendarData, error: calendarDataErrors} = await supabase
        .from('calendar_memberships')
        .select(`
            *,
            calendars(
                *,
                teams(name),
                events(
                    *,
                    event_topics(*)
                )
            )
        `)
        .eq('user_id', user.id)
        .eq('calendars.team_id', teamId)
        .not('calendars', 'is', null)
        .order('calendar_id');

    return calendarData;
}

async function getTeamMembers(supabase, teamId) {
    const {data: teamMembers, error: teamMembersError} = await supabase.rpc('get_team_members_emails', {tid: teamId});

    return teamMembers;
}

async function getTeams(supabase) {
    const {data: teams} = await supabase
        .from('teams')
        .select(`
            *,
            team_memberships(*)
        `);

    return teams;
}

async function getTasks(supabase, teamId) {
    const {data: taskData} = await supabase
        .from('tasks')
        .select()
        .order('status')
        .order('order_num')
        .eq('team_id', teamId);

    return taskData;
}

