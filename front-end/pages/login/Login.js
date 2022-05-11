import React, {useState} from 'react';
import CustomInput from './CustomInput';
import Button from './Buttons';
import logo from './iso_newengland.png';
import Image from 'next/image';
import moment from 'moment';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// eslint-disable-next-line require-jsdoc
export default function Login({setLogin}) {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const attemptLogin = () => {
    if (user === '' || pass === '') {
      setErr(true);
      return false;
    }
    setErr(false);
    setLogin(true);
    document.cookie = 'loggedIn=true; expires=' + moment().add(2, 'hour').format('ddd, DD YYYY hh:mm:ss UTC');
  };

  const handleUserCharge = (event) => {
    setUser(event.target.value);
  };

  const handlePassChange = (event) => {
    setPass(event.target.value);
  };

  return (
    <div className="App">
      <Image src={logo} style={{minWidth: '50%', height: '50%'}} />
      <h3>ISO CLOG Monitor</h3>
      <form className="form">
        <CustomInput
          labelText="Email"
          id="email"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={handleUserCharge}
          type="text"
          error={err && user === ''}
          errorText={err && user === '' ? 'Please enter an email' : ''}
        />
        <CustomInput
          labelText="Password"
          id="password"
          formControlProps={{
            fullWidth: true,
          }}
          handleChange={handlePassChange}
          type="password"
          error={err && pass === ''}
          errorText={err && (pass == '' || user == '') ? 'Please enter a password' : 'Invalid credentials'}
        />
        <Button type="button" color="primary" className="form__custom-button" onClick={() => attemptLogin()}>
          Log in
        </Button>
        <Button type="button" color="primary" className="form__custom-button" onClick={handleOpen}>
          Forgot Password
        </Button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}>
            <Typography id="modal-modal-description">
              If you have forgotten your password, please file a ticket to retrieve a new set of credentials.
            </Typography>
          </Box>
        </Modal>
      </form>
    </div>
  );
}

