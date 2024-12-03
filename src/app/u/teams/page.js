import Box from "@mui/material/Box";
import createClient from "@/utils/supabase/server";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import NextLink from 'next/link';
import Modal from "./modal";



export default async function Teams() {
    const supabase = await createClient();
    let { data: teams, error } = await supabase
        .from('teams')
        .select('*');

    // custom team card
    const TeamCard = (team) => {
        return (
            <Paper elevation={3} sx={{m:'1rem', width:'20rem', p:'1rem', borderRadius:3, textDecoration:'none'}} component={NextLink} href='#'>
                <Box sx={{width:'100%', justifyContent:'center', display:'flex'}}>
                    <Box sx={{p:'1rem'}}>
                        <Image src={'/icon.svg'} alt={'icon'} width={100} height={100} />
                    </Box>
                </Box>
                <Box>
                    <Typography variant="h4" align="center">
                        {team.team.name}
                    </Typography>
                </Box>
            </Paper>
        )
    }
    
    return (
        <Box sx={{p:'1rem', height:'100%', boxSizing:'border-box'}}>
            {/* title */}
            <Box sx={{display:'flex', flexDirection:'column', height:'100%'}}>
                <Box sx={{width:'100%', display:'flex'}}>
                    {/* title */}
                    <Typography variant="h4">Select a team</Typography>
                    {/* dialog create team */}
                    <Modal />
                </Box>
                {/* teams list */}
                <Box sx={{flexGrow:1, overflow:'hidden'}}>
                    <Box sx={{height:'100%', overflow:'scroll'}}>
                        <Box sx={{display:'flex', justifyContent:'center', flexWrap:'wrap'}}>
                            {teams.map((team, i) => (
                                <TeamCard key={i} team={team} />
                            ))}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
