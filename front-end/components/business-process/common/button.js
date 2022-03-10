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

export {
  BPTextButton,
};
