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


/**
 * @param {Object} props
* @return {JSX.Element}
*/
export default function Count(props) {
  const seeMore = () => {
    if (props.type === 'severity') {
      props.onClick({ start: props.start, end: props.end, type: 'severity', severity: props.severity });
    } else {
      props.onClick({ start: props.start, end: props.end, type: 'priority', severity: props.priority })
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {props.countTitle}
        </Typography>
        <Typography component="p" variant="h4">
          {props.total}
        </Typography>
        <Grid container direction='row'>
          <Grid item xs={6}>
            <Button variant="text" onClick={() => seeMore()}>
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
  );
}
