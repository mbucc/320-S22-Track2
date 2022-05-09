import {List, ListItem, Typography} from '@mui/material';
import {Box} from '@mui/system';
import {useRouter} from 'next/router';
import axios from 'axios';


/**
 *
 * @return {JSX.Element}
 */
export default function LogDetail({data}) {
  const router = useRouter();
  const logID = router.query.logid;

  const keys = Object.keys(data);

  const titleStyle = {
    margin: '20px',
  };

  const subtitleStyle = {
    marginRight: '10px',
    fontWeight: '600',
  };

  return (
    <>
      {/* <Button
        variant = 'text'
        href = '/LogEvent'
        size = {'large'}
        sx = {{
          borderRadius: 999,
          padding: '6px 14px',
          color: '#000',
          '&:hover': {
            backgroundColor: '#00000008',
          },
        }}>
        Back
      </Button> */}
      <Typography variant = 'h3' style = {titleStyle}>Log Event ID: {logID}</Typography>
      {data === null ? (<Typography variant = 'p'> loading... </Typography>) :
            (<div>
              <Box sx = {{
                width: '90%',
                maxWidth: '800px',
              }}>
                <List>
                  {keys.map((key, i)=>{
                    return (
                      <ListItem key={i} divider data-testid={`logdetail-${key}`}>
                        <Typography variant='subtitle1' sx={subtitleStyle}>
                          {`${key}:`}
                        </Typography>
                        {data[key]}
                      </ListItem>

                    );
                  })
                  }
                </List>
              </Box>
            </div>
            )
      }


    </>
  );
}

export const getServerSideProps = async (ctx) => {
  const query = ctx.query;
  const logID = query.logid;

  const res = await axios.get(`http://cafebabebackend-env.eba-hy52pzjp.us-east-1.elasticbeanstalk.com/clog/logDetail?id=${logID}`);
  const data = res.data;
  return {
    props: {
      data: data,
    },
  };
};
