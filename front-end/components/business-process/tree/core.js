import React, { useState,useEffect } from 'react';
import BPTreeComponent from './tree-view';
import {BPColors} from '../../../utils/business-process/standards';
import BPTreeFilterComponent from './tree-filter';
import {sampleEAIDomains} from '../../../utils/business-process/sample-data';

const BPTreeView = ({
  onChange,
}) => {
  const [data,setData] = useState(sampleEAIDomains) //TODO: change this to effect once we have fetch working
  const setFilter = () =>{
    setData(sampleEAIDomains)
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {/* Filter Section */}
      <BPTreeFilterComponent setFilter={setFilter}/>

      {/* Divider */}
      <div
        style={{
          width: 1,
          height: '100%',
          backgroundColor: BPColors.border,
        }}
      />

      {/* Map Section */}

      <div
        style={{
          width: '100%',
          height: '100%',
          flexShrink: 1,
          flexGrow: 0,
          backgroundColor: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <BPTreeComponent data={data}/>
      </div>
    </div>
  );
};

export default BPTreeView;
