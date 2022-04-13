import Count from './Count'
import Grid from '@mui/material/Grid';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import { red } from '@mui/material/colors';



export default function Counts(props) {
    const sumHighPriority = () => {
        let sum = 0;
        for (let i = 0; i < props.data.length; i++) {
            if (props.data[i].priority === "High") {
                sum++;
            }
        }
        return sum;
    }
    const sumMediumPriority = () => {
        let sum = 0;
        for (let i = 0; i < props.data.length; i++) {
            if (props.data[i].priority === "Medium") {
                sum++;
            }
        }
        return sum;
    }
    const sumErrors = () => {
        let sum = 0;
        for (let i = 0; i < props.data.length; i++) {
            if (props.data[i].type === "Error") {
                sum++;
            }
        }
        return sum;
    }
    const sumWarnings = () => {
        let sum = 0;
        for (let i = 0; i < props.data.length; i++) {
            if (props.data[i].type === "Warning") {
                sum++;
            }
        }
        return sum;
    }
    return (
        <Grid container direction='row' spacing={2}>
            <Grid item xs={3}>
                {/* <Paper elevation={3}>
                    <Box px={2} pt={4}>
                      <Typography variant="h5" gutterBottom component="div">
                        Count
                      </Typography>
                    </Box>
                  </Paper> */}
                <Count icon={<ErrorOutlineRoundedIcon sx={{ color: red[500] }}/>} countTitle={"High Priority Logs"} total={sumHighPriority()} onClick={props.setFilters}/>
            </Grid>
            <Grid item xs={3}>
                {/* <Paper elevation={3}>
                    <Box px={2} pt={4}>
                        <Typography variant="h5" gutterBottom component="div">
                            Count
                        </Typography>
                    </Box>
                </Paper> */}
                <Count countTitle={"Medium Priority Logs"} total={sumMediumPriority()} onClick={props.setFilters}/>
            </Grid>
            <Grid item xs={3}>
                {/* <Paper elevation={3}>
                    <Box px={2} pt={4}>
                        <Typography variant="h5" gutterBottom component="div">
                            Count
                        </Typography>
                    </Box>
                </Paper> */}
                <Count countTitle={"Errors"} total={sumErrors()} onClick={props.setFilters}/>
            </Grid >
            <Grid item xs={3}>
                {/* <Paper elevation={3}>
                    <Box px={2} pt={4}>
                        <Typography variant="h5" gutterBottom component="div">
                            Count
                        </Typography>
                    </Box>
                </Paper> */}
                <Count countTitle={"Warnings"} total={sumWarnings()} onClick={props.setFilters}/>
            </Grid>
        </Grid>
    )
}

