import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NextLink from 'next/link';
import Link from '@mui/material/Link';






export default function Confirm() {
    return (
        <>
            {/* title */}
            <Typography variant='h6' align='center' color='secondary' sx={{mb:'1rem', fontWeight:'bold'}}>
                Reset Password
            </Typography>
            <Typography variant='body1' align='left' color='info' sx={{mb:'1rem'}}>
                Please confirm your password reset in the link sent to your email.
            </Typography>
            <Box sx={{width:'100%', display:'flex', justifyContent:'right', mb:'1rem'}}>
                <Link href='..' component={NextLink}>
                    <Typography variant='caption'>
                        Back to login
                    </Typography>
                </Link>
            </Box>
        </>
    );
}
