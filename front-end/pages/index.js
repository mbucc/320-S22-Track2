import {Button} from '@mui/material';
import Link from 'next/link';

const linkButtonStyle = {
  fontSize: 'large',
};

/**
 *
 * @return {JSX.Element}
 */
export default function Home() {
  return (
    <>
      <Button style={linkButtonStyle}>
        <Link href="/LogEvent">CLICK TO SEE LOG EVENT PAGE</Link>
      </Button><Button style={linkButtonStyle}>
        <Link href="/business-process/">BP</Link>
      </Button>
    </>
  );
}
