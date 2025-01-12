'use client'

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import useMediaQuery from "@mui/material/useMediaQuery";

import theme from "@/app/theme";
import { useState, useTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
import createClient from '@/utils/supabase/client';
import MeasureTypesList from './measureTypesList';



export default function AddMeasureTypeModal({component, aimId, measureTypes, setMeasureTypes}) {
    const Component = component || Button;
    const supabase = createClient();
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (!isPending && loading) {
            handleClose();
            setLoading(false);
        }
    }, [isPending])


    // handlers
    function handleOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    // typing handlers

    // stops propagation of the keydown for the textfields
    function handleCancelKeydownPropagation(e) {
        e.stopPropagation();
    }

    async function handleSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);

        const {data, error} = await supabase.rpc('update_measure_types', {
            new_aim_id: aimId,
            measure_types: measureTypes,
        });

        console.log(error);

        startTransition(() => {
            setMeasureTypes(data)
        })
    }

    return (
        <>
            <Component onClick={handleOpen} >
                <AddRoundedIcon color="info" sx={{mx:'.5rem'}} />
                <Typography color="info">Measure Type</Typography>
            </Component>

            {/* open dialog */}
            <Dialog
                open={open}
                maxWidth='sm'
                fullWidth
                fullScreen={fullScreen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                onKeyDown={handleCancelKeydownPropagation}
                >
                {/* form */}
                <form onSubmit={handleSubmit}>
                    {/* title */}
                    <DialogTitle id="alert-dialog-title">
                        Manage Measure Types
                    </DialogTitle>
                    {/* content */}
                    <DialogContent>
                        <Box>
                            <MeasureTypesList measureTypes={measureTypes} setMeasureTypes={setMeasureTypes} />                     
                        </Box>
                    </DialogContent>
                    {/* buttons */}
                    <DialogActions>
                        <Button disabled={loading} onClick={handleClose}>Cancel</Button>
                        <Button disabled={loading} type='submit'>
                            {(loading)
                                ? <CircularProgress size='1rem' />
                                : 'Save'
                            }
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}