import Head from 'next/head';
import BPTreeView from '../../components/business-process/tree/core';
import BPActivityView from '../../components/business-process/activity/core';
import {BPColors, BPStandards} from '../../utils/business-process/standards';
import Split from './split';
//import './style.css';



const BPIndex = () => {
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
          //height: '100%',
          height: '92%',
          
        }}
      >
        <Split />
        
      </div>
      
    </div>
     
     
  );
};

export default BPIndex;
