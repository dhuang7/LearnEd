import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Kanban from "./kanban";
import { data } from "./fakedata";



export default function Tasks() {

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            {/* title */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <Typography variant='h4'>Tasks</Typography>
                </Box>
            </Box>
            {/* paper */}
            <Box sx={{width:'100%',  flexGrow:1, overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', pb:'1rem', pt:'.5rem', boxSizing: 'border-box'}}>
                    <Kanban tasks={data} />
                </Box>
            </Box>
        </Box>
    )
}
