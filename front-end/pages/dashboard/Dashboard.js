import React from 'react'
import Timelines from './Timelines'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import DonutCharts from './donutchart'
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';

// import { Dropdown, Option } from "./Dropdown";

// function getWindowDimensions() {
//     const { innerWidth: width, innerHeight: height } = window;
//     return {
//         width,
//         height
//     };
// }

// function useWindowDimensions() {
//     const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

//     useEffect(() => {
//         function handleResize() {
//             setWindowDimensions(getWindowDimensions());
//         }

//         window.addEventListener('resize', handleResize);
//         return () => window.removeEventListener('resize', handleResize);
//     }, []);

//     return windowDimensions;
// }

export default function Dashboard(props) {
    // const { height, width } = useWindowDimensions();
    // console.log(height)
    // const [dimensions, setDimensions] = React.useState({
    //     height: window ? window.innerHeight : 0,
    //     width: window ? window.innerWidth: 0
    // })
    // React.useEffect(() => {
    //     function handleResize() {
    //         setDimensions({
    //             height: window.innerHeight,
    //             width: window.innerWidth
    //         })

    //     }

    //     window.addEventListener('resize', handleResize)
    // })
    return (
        <div className='dashboard'>
            <Box px={10} py={5} sx={{ height: '100%'}}>
                <Grid container direction='column' height={'100%'} spacing={3}>
                    <Grid item xs={1}>
                        <Paper elevation={3}>
                            <Box px={2} pt={4}>
                                <Typography variant="h5" gutterBottom component="div">
                                    Hello
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                    <Grid item xs={1}>
                        <Grid container direction='row' spacing={2}>
                            <Grid item xs={3}>
                                <Paper elevation={3}>
                                    <Box px={2} pt={4}>
                                        <Typography variant="h5" gutterBottom component="div">
                                            Count
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper elevation={3}>
                                    <Box px={2} pt={4}>
                                        <Typography variant="h5" gutterBottom component="div">
                                            Count
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                            <Grid item xs={3}>
                                <Paper elevation={3}>
                                    <Box px={2} pt={4}>
                                        <Typography variant="h5" gutterBottom component="div">
                                            Count
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid >
                            <Grid item xs={3}>
                                <Paper elevation={3}>
                                    <Box px={2} pt={4}>
                                        <Typography variant="h5" gutterBottom component="div">
                                            Count
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Grid container item direction="row" spacing={5}>
                            <Grid item xs={7}>
                                <DonutCharts />
                            </Grid>
                            <Grid item xs={5}>
                                <Timelines />
                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>

            </Box>
        </div>

    )
}
