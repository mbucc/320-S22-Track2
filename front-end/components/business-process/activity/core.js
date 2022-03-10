import React from 'react';
import {BPColors} from "../../../utils/business-process/standards";
import BPActivityFilterComponent from "./activity-filter";

const BPActivityView = ({
  onChange,
}) => {
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
      <BPActivityFilterComponent/>

      {/* Divider */}
      <div
        style={{
          width: 1,
          height: '100%',
          backgroundColor: BPColors.border,
        }}
      />

      {/* Table Section */}
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
        <p>Table Section</p>
      </div>
    </div>
  );
};

export default BPActivityView;
