import Head from 'next/head';
import BPTreeView from '../../components/business-process/tree/core';
import BPActivityView from '../../components/business-process/activity/core';
import {BPColors, BPStandards} from '../../utils/business-process/standards';
import Navbar from '../dashboard/Navbar';

const BPIndex = (props) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100vh', // 100vh = 100% of viewport height.
      }}
    >
      <Head>
        <title>Business Process - CLOG</title>
      </Head>

      {/* The core layout */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* <div
          style={{
            width: '100%',
            height: 70,
            flexShrink: 0,
            backgroundColor: '#fbfbfb',
            borderBottom: BPStandards.border,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
        {/* </div> */}
        <div
          style={{
            width: '100%',
            height: '55%',
            maxHeight: 'calc(55vh - 37px)',
            flexShrink: 1,
            flexGrow: 0,
            backgroundColor: '#ffffff',
          }}
        >
          <BPTreeView />
        </div>

        {/* RootView Divider */}
        <div
          style={{
            width: '100%',
            height: 4,
            flexShrink: 0,
            backgroundColor: BPColors.border,
          }}
        />

        <div
          style={{
            width: '100%',
            height: '45%',
            maxHeight: 'calc(45vh - 37px)',
            flexShrink: 1,
            flexGrow: 0,
            backgroundColor: '#ffffff',
          }}
        >
          <BPActivityView />
        </div>
      </div>
    </div>
  );
};

export default BPIndex;
