import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SubdirectoryArrowRightRoundedIcon from '@mui/icons-material/SubdirectoryArrowRightRounded';





export default function NormsList() {

    const testList = [1,2,3,4,5,6,7,8,9,10,11,12];

    return (
        <Paper 
            elevation={0} 
            sx={{
                borderRadius:3, boxSizing:'border-box', border:'1px solid', borderColor: 'grey.300',
                p:'1rem', height:'100%', 
                display:'flex', flexDirection:'column'
            }}
            >
            <Typography variant="h6">Norms:</Typography>
            <Box sx={{flexGrow:1, overflow:'hidden', pt:'.5rem', boxSizing:'border-box'}}>
                <List disablePadding sx={{height:'100%', overflowY:'scroll'}}>
                    {testList.map((v, i) => (
                        <ListItem key={i}>
                            <SubdirectoryArrowRightRoundedIcon sx={{position:'relative', top:-3.5}} />
                            <Button sx={{width:'100%', textTransform:'none', whiteSpace:'pre-wrap',}}>
                                <Box sx={{width:'100%', overflow:'hidden'}}>
                                    <Typography align='left' color='inherit' sx={{wordWrap: 'break-word'}}>
                                        {v}
                                    </Typography>
                                </Box>
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Paper>
    )
}
