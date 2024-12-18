import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import AimColumn from "./aimColumn";



export default async function Drivers({params}) {
    const teamId = (await params).teamId;

    function ColumnCustomComponent({children, title}) {

        return (
            <Box sx={{width:'25%', height:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Typography variant="h6" color='textSecondary'>
                    {title}
                </Typography>
                <Box sx={{flexGrow:1, overflow:'hidden', width:'100%'}}>
                    <Box sx={{height:'100%', width:'100%', display:'flex', flexDirection:'column', justifyContent:'center'}}>
                        {children}
                    </Box>
                </Box>
            </Box>
        )
    }

    return (
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'1rem', height:'100%',
                display:'flex', flexDirection:'column'
            }}
            >
                <Box sx={{display:'flex', height:'100%'}}>
                    <ColumnCustomComponent title='Aim'>
                        <AimColumn teamId={teamId} />
                    </ColumnCustomComponent>
                    <ColumnCustomComponent title='Primary Drivers'>
                        2
                    </ColumnCustomComponent>
                    <ColumnCustomComponent title='Secondary Drivers'>
                        3
                    </ColumnCustomComponent>
                    <ColumnCustomComponent title='Change Ideas'>
                        4
                    </ColumnCustomComponent>
                </Box>
        </Paper>
    )
}
