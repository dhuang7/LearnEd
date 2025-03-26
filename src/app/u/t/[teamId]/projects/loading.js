import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";


export default async function LoadingPage() {

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column'}}>
            {/* header */}
            <Box sx={{width:'100%', p:'1rem', pb:0, boxSizing:'border-box'}}>
                <Box sx={{width:'100%', display:'flex', alignItems:'center', boxSizing:'border-box', pr:'1rem'}}>
                    {/* title */}
                    <Typography variant='h4'>Projects</Typography>
                    {/* tabs and select */}
                    <Box sx={{ml:'auto', display:'flex', alignItems:'center'}}>
                        {/* select project */}
                        <Box sx={{width:'10rem', boxSizing:'border-box', pr:'.5rem'}}>
                            <TextField
                                select
                                value={''}
                                label='Projects'
                                disabled
                                // onChange={handleSelectProject}
                                fullWidth
                                slotProps={{
                                    // select: {
                                    //     renderValue:(v) => v.name,
                                    // },
                                    htmlInput: {
                                        sx: {
                                            py:'.5rem'
                                        }
                                    },
                                    inputLabel: {
                                        shrink: true,
                                    }
                                }}
                                
                                >
                                <MenuItem value=''></MenuItem>
                            </TextField>
                        </Box>
                        {/* nav tabs */}
                        <Box sx={{width:'30rem'}}>
                            <Tab 
                                label='Aim' 
                                icon={<ExpandMoreRoundedIcon fontSize="small" />} iconPosition="end" 
                                sx={{
                                    '&.MuiButtonBase-root': {
                                        minHeight:0,
                                    }
                                }}
                                />
                            <Tab 
                                label='Measure' 
                                icon={<ExpandMoreRoundedIcon fontSize="small" />} iconPosition="end" 
                                sx={{
                                    '&.MuiButtonBase-root': {
                                        minHeight:0,
                                    }
                                }}
                                />
                            <Tab label="Changes"  />
                            <Tab label="Cycles"  />
                        </Box>
                    </Box>
                </Box>
            </Box>
            {/* Content */}
            <Box sx={{width:'100%',  flexGrow:1, overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', boxSizing:'border-box', p:'1rem', pt:0}}>
                    <Paper 
                        elevation={0} 
                        sx={{
                            borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                            p:'1rem', height:'100%',
                            // display:'flex', flexDirection:'column'
                        }}
                        >
                            {Array(5).fill(0).map((v, i) => <Skeleton key={i} height='20%' />)}
                    </Paper>
                </Box>
            </Box>
        </Box>
    )
}
