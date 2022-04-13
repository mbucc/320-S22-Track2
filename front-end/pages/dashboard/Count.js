// import React, {useState} from 'react';
import * as React from 'react';
// import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
// import Title from './Title';
import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Link from 'next/link';



function preventDefault(event) {
    event.preventDefault();
}

export default function Count(props) {
    return (
        // <>
        // <Title>High Priority Logs</Title>
        // <Typography component="p" variant="h4">
        //     586
        // </Typography>
        // {/* TODO: make this a dropdown */}
        // <Typography color="text.secondary" sx={{ flex: 1 }}> 
        // in the past 12 hours
        // </Typography>

        // <div>
        //     <Link color="primary" href="#" onClick={preventDefault}>
        //         View logs
        //     </Link>
        // </div>
        // </>
        <Card>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {props.countTitle}
                </Typography>
                <Typography component="p" variant="h4">
                    {props.total}
                </Typography>
                <Grid container direction='row'>
                    {/* <Grid item xs={6}>
                        <Typography>
                            in the last {props.timeframe}
                        </Typography>
                    </Grid> */}
                    <Grid item xs={6}>
                        <Button variant="text">
                            <Link href='//LogEvent//' passHref>
                                <a>
                                    See More
                                </a>
                            </Link>
                        </Button>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}