import React, {useState} from 'react';
import Head from 'next/head';
import BPTreeView from '../../components/business-process/tree/core';
import BPActivityView from '../../components/business-process/activity/core';
import {BPColors, BPStandards} from '../../utils/business-process/standards';
import Split from './split';
//import './style.css';



const BPIndex = () => {
  const [selectedTransactionID, setSelectedTransactionID] = useState(null);

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

      <div
          style={{
            width: '100%',
            //height: 70,
            height: '8%',
            flexShrink: 0,
            backgroundColor: '#fbfbfb',
            borderBottom: BPStandards.border,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <p style={{fontSize: 16, fontWeight: '500', opacity: 0.3}}>
            Navigation Placeholder
          </p>
        </div>
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
          <BPTreeView onChange={(id) => {
            setSelectedTransactionID(id);
          }}/>
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
          <BPActivityView selectedTransaction={selectedTransactionID}/>
        </div>
      </div>
      
    </div>
     
     
  );
};

export default BPIndex;
