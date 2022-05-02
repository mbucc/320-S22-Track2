import React from 'react';
import {Button} from '@mui/material';
import Link from 'next/link';

/**
 * @param {Object} props
 * @return {JSX.Element}
 */
function Navbar(props) {
  return (
    // change the way content is justified
    <div
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#0C60A8',
        display: 'flex',
        flexShrink: 1,
        padding: 18,
        paddingLeft: 30,
        justifyContent: 'flex-start',
        justifyItems: 'stretch',
      }}
    >
      <div
        style={{
          flexGrow: 0.1,
          paddingRight: 30,
          font: 'sans',
          fontSize: 25,
          fontWeight: 'bold',
          color: 'white',
        }}
      >
        ISO CLOG Monitor
      </div>
      <div
        style={{
          flexGrow: 0.85,
        }}
      >
        {/* nav buttons */}
        <div
          style={{
            justifyContent: 'space-between',
          }}
        >
          <Button
            size={'small'}
            sx={{
              color: 'white',
              fontSize: 14,
              paddingRight: 2,

              '&:hover': {
                fontWeight: 'bolder',
              },
            }}
            onClick={() => props.clearFilters()}
          >
            <Link href="/" passHref>
              <a>Dashboard</a>
            </Link>
          </Button>
          <Button
            size={'small'}
            sx={{
              color: 'white',
              fontSize: 14,
              paddingRight: 2,

              '&:hover': {
                fontWeight: 'bolder',
              },
            }}
          >
            <Link href="./business-process/" passHref>
              <a>Business Processes</a>
            </Link>
          </Button>
          <Button
            size={'small'}
            sx={{
              color: 'white',
              fontSize: 14,

              '&:hover': {
                fontWeight: 'bolder',
              },
            }}
          >
            <Link href='/LogEvent' passHref>
              <a>
                Log Events
              </a>
            </Link>
          </Button>
        </div>
      </div>
      {/* Logout button */}
      <div
        style={{
          justifyItems: 'end',
          color: 'white',
        }}
      >
        <Button
          size={'small'}
          sx={{
            justifyItems: 'end',
            color: 'white',
            fontSize: 14,

            '&:hover': {
              fontWeight: 'bolder',
            },
          }}
          onClick={() => props.setLogin(false)}
        >
          <Link
            href={{
              pathname: '/',
              state: {testVar: 'test'},
            }}
            passHref
          >
            <a>Log Out</a>
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
