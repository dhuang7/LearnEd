import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";




export default function Cycles() {

    

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            {/* title */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h4'>Change Ideas</Typography>
                    {/* <AddAgendaModal teamId={teamId} /> */}
                </Box>
            </Box>
        </Box>
    )
}
