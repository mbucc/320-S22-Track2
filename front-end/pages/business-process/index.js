import React, {useState} from 'react';
import Head from 'next/head';
import BPTreeView from '../../components/business-process/tree/core';
import BPActivityView from '../../components/business-process/activity/core';
// import {BPStandards} from '../../utils/business-process/standards';
import Split from 'react-split';
import ReactDOM from 'react-dom';

import {
  BPAdjustableFrameGutter,
} from '../../components/business-process/root/adjustable-frame-gutter';

const BPIndex = () => {
  const [selectedTransactionID, setSelectedTransactionID] = useState(null);

  return (
    <div
      id={'bp-root'}
      style={{
        width: '100%',
      }}
    >
      <Head>
        <title>Business Process - CLOG</title>
      </Head>

      {/* The adjustable frame */}
      <div
        style={{
          width: '100%',
          height: 'calc(100vh - 68.5px)',
          flexShrink: 1,
          flexGrow: 0,
        }}
      >
        <Split
          direction={'vertical'}
          minSize={150}
          sizes={[53, 47]}
          snapOffset={0}
          gutterSize={11}
          gutter={() => {
            const gutterWrapper = document.createElement('div');
            const BPAdjustableFrameGutterContainer = () => (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  flexShrink: 0,
                }}
              >
                <BPAdjustableFrameGutter />
              </div>
            );
            ReactDOM.render(<BPAdjustableFrameGutterContainer />, gutterWrapper);
            return gutterWrapper;
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              width: '100%',
              flexShrink: 1,
              flexGrow: 0,
              backgroundColor: '#ffffff',
            }}
          >
            <BPTreeView onChange={(id) => {
              setSelectedTransactionID(id);
            }}/>
          </div>
          <div
            style={{
              width: '100%',
              flexShrink: 1,
              flexGrow: 0,
              backgroundColor: '#ffffff',
            }}
          >
            <BPActivityView selectedTransaction={selectedTransactionID}/>
          </div>
        </Split>
      </div>
    </div>
  );
};

export default BPIndex;
