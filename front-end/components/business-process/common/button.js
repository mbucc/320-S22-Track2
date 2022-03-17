import React from 'react';
import {Button} from '@mui/material';

const BPTextButton = ({children, ...props}) => {
  return (
    <Button
      variant="text"
      sx={{
        borderRadius: 999,
        padding: '6px 14px',
        color: '#000',
        '&:hover': {
          backgroundColor: '#00000008',
        },
      }}
    >
      {children}
    </Button>
  );
};

const BPButton = ({children, ...props}) => {
  return (
    <Button
      size={'small'}
      sx={{
        color: 'white',
        borderRadius: 999,
        backgroundColor: '#22c55e',
        '&:hover': {
          backgroundColor: '#16a34a',
        },
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export {
  BPTextButton,
  BPButton,
};
