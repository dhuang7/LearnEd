'use client'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Button from '@mui/material/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import Typography from '@mui/material/Typography';
import ButtonTextfield from '@/components/buttonTextfield';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';


export default function QPRList({
    qprsList, setQPRsList, 
    disableQuestion, disablePredictions, disableResults, 
    hideQuestion, hidePredictions, hideResults,
    hideAddQuestion,
}) {

    function handleAddQPR() {
        setQPRsList(l => [
            ...l,
            {
                question: '',
                predictions: '',
                results:'',
            }
        ])
    }

    function handleDeleteQPR({currentTarget}) {
        const value = Number(currentTarget.dataset.order);
        if (qprsList.length !== 1) {
            setQPRsList(ts => [
                ...ts.slice(0, value),
                ...ts.slice(value+1)
            ])
        } else {
            setQPRsList([{
                question:'',
                predictions:'',
                results:'',
            }])
        }
    }

    // handle typing
    function handleQuestionText(e, value) {
        const {target} = e;
        setQPRsList(ts => {
            ts[value] = {
                ...ts[value],
                question: target.value,
            }

            return [...ts];
        })
    }

    function handlePredicationsText(e, value) {
        const {target} = e;
        setQPRsList(ts => {
            ts[value] = {
                ...ts[value],
                predictions: target.value,
            }

            return [...ts];
        })
    }

    function handleResultsText(e, value) {
        const {target} = e;
        setQPRsList(ts => {
            ts[value] = {
                ...ts[value],
                results: target.value,
            }

            return [...ts];
        })
    }

    return (
        <List disablePadding dense>
            {qprsList.map((v, i) => (
                <ListItem key={i}>
                    <Box sx={{borderRadius:3, border:'1px solid', borderColor:'grey.300', boxSizing:'border-box', p:'.5rem', width:'100%', boxShadow:2}}>
                        <Box sx={{display:'flex', alignItems:'flex-start'}}>
                            {/* Content */}
                            <Box sx={{flexGrow:1}}>
                                {/* question */}
                                {(hideQuestion) ||
                                    <>
                                        <Typography variant='body1' sx={{fontWeight:'bold'}}>Question:</Typography>
                                        <ButtonTextfield disabled={disableQuestion} value={qprsList[i].question} data-order={i} onChange={e=>handleQuestionText(e, i)}></ButtonTextfield>
                                    </>
                                }
                                {/* predictions */}
                                {(hidePredictions) ||
                                    <>
                                        <Typography variant='body1' sx={{fontWeight:'bold'}}>Predictions:</Typography>
                                        <ButtonTextfield disabled={disablePredictions} value={qprsList[i].predictions} data-order={i} onChange={e=>handlePredicationsText(e, i)}></ButtonTextfield>
                                    </>
                                }
                                {/* results */}
                                {(hideResults) ||
                                    <>
                                        <Typography variant='body1' sx={{fontWeight:'bold'}}>Results:</Typography>
                                        <ButtonTextfield disabled={disableResults} value={qprsList[i].results} data-order={i} onChange={e=>handleResultsText(e, i)}></ButtonTextfield>
                                    </>
                                }
                            </Box>
                            {/* trash */}
                            <IconButton size='small' data-order={i} onClick={handleDeleteQPR}>
                                <DeleteRoundedIcon fontSize='small' />
                            </IconButton>
                        </Box>
                        
                    </Box>
                </ListItem>
            ))}
            {/* add new question/prediction */}
            {(hideAddQuestion) ||
                <ListItem>
                    <Button 
                        color='info' 
                        // variant='contained' disableElevation 
                        sx={{borderRadius:3, textTransform:'none'}} 
                        startIcon={<AddRoundedIcon />}
                        onClick={handleAddQPR}
                        // disabled={loading}
                        >
                        Question
                    </Button>
                </ListItem>
            }
        </List>
    );
}