import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ChangeIdeaList from "./changeIdeaList";




export default function Cycles() {

    

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            {/* title */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', justifyContent:'left', alignItems:'center'}}>
                    <Typography variant='h4'>Change Ideas</Typography>
                    <Typography color='textSecondary' sx={{ml:'1rem'}}>(Work in Progress)</Typography>
                </Box>
            </Box>

            {/* change list */}
            <Box sx={{flexGrow:1, overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', boxSizing:'border-box', p:'1rem', pt:'.5rem'}}>
                    <ChangeIdeaList cycles={[]} />
                </Box>
            </Box>
        </Box>
    )
}
