import {List, ListItem, Dialog, Typography, DialogContent, CircularProgress, DialogTitle, IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {Box} from '@mui/system';
// import {useRouter} from 'next/router';


/**
 * alternate log detail component, displays a dialog instead of popping into a new page.
 * if using this component, be sure to uncomment the modal and loading states for log detail in LETable.js
 * @return {JSX.Element}
 */
export default function LogDetail({data, modalState, closeModal, detailIsLoading}) {
  const keys = data ? Object.keys(data) : null;

  const titleStyle = {
    margin: '20px',
    display: 'inline-block',
  };

  const subtitleStyle = {
    marginRight: '10px',
    fontWeight: '600',
  };
  return (
    <>
      <Dialog
        open = {modalState}
        onClose = {closeModal}
        BackdropProps = {{
          style: {
            backgroundColor: 'gray',
            opacity: '0.1',
          },
        }}
        PaperProps = {{
          style: {
            boxShadow: 'none',
          },
        }}
        TransitionComponent = {'none'}
        maxWidth = {'xl'}
      >
        <DialogContent>
          {detailIsLoading || !data ? (<CircularProgress color = 'success' />) :
          <>
            <DialogTitle
              style = {{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Typography variant='h3' style={titleStyle}>Log Event ID: {data.global_instance_id}</Typography>
              <IconButton onClick = {closeModal} style = {{alignSelf: 'flex-start'}} size = 'small'>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <div>
              <Box sx={{
                width: '90%',
                maxWidth: '800px',
              }}>
                <List>
                  {keys.map((key, i) => {
                    return (
                      <ListItem key={i} divider>
                        <Typography variant='subtitle1' sx={subtitleStyle}>
                          {`${key}:`}
                        </Typography>
                        {data[key]}
                      </ListItem>

                    );
                  })}
                </List>
              </Box>
            </div></>

          }
        </DialogContent>
      </Dialog>
    </>
  );
}

// export const getServerSideProps = async (ctx) => {
//   const query = ctx.query;
//   const logID = query.logid;

//   const res = await axios.get(`http://cafebabebackend-env.eba-hy52pzjp.us-east-1.elasticbeanstalk.com/clog/logDetail?id=${logID}`);
//   const data = res.data;
//   return {
//     props: {
//       data: data,
//     },
//   };

