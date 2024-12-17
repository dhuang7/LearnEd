import createClient from "@/utils/supabase/server";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import IconButton from "@mui/material/IconButton";



export default async function AimColumn({teamId}) {
    const supabase = await createClient();

    const {data: teams, error} = await supabase
        .from('teams')
        .select()
        .eq('id', teamId);

    const team = teams[0];


    return (
        <>
            <Box sx={{width:'100%', height:'150px', boxSizing:'border-box', px:'1rem', py:'.5rem'}}>
                <Paper 
                    elevation={0} 
                    sx={{
                        // borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                        p:'1rem', height:'100%', 
                        display:'flex', flexDirection:'column',
                        backgroundColor:'common.black',
                        color:'common.white'
                    }}
                    >
                        <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <Typography variant="h6">
                                {team.aim_name}
                            </Typography>
                            <IconButton color="inherit" >
                                <SaveRoundedIcon />
                            </IconButton>
                        </Box>
                        <Typography variant="body2">
                            {team.aim_description}
                        </Typography>
                </Paper>
            </Box>
        </>
    )
}
