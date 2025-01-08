import Box from "@mui/material/Box";
import TopNav from "./topNav";




export default function Layout({children}) {

    return (
        <Box sx={{width:'100%', height:'100%', display:'flex', flexDirection:'column', overflow:'hidden'}}>
            {/* top navbar */}
            <Box sx={{width:'100%'}}>
                <TopNav />
            </Box>
            {/* rest */}
            <Box flexGrow={1} sx={{overflow:'hidden'}}>
                <Box sx={{width:'100%', height:'100%', display:'flex', overflow:'hidden'}}>
                    <Box flexGrow={1} sx={{ overflow:'hidden' }}>
                        {/* ------ MAIN CONTENT ------ */}
                        <Box sx={{width:'100%', height:'100%'}}>
                            {children}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}