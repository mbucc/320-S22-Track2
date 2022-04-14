import React from 'react';
import styled from 'styled-components';
import {BPColors, BPStandards} from '../../../utils/business-process/standards';

const BPAdjustableFrameGutterDiv = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.1s ease-in-out;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f7f8f8;
  border-top: ${BPStandards.border};
  border-bottom: ${BPStandards.border};
  cursor: row-resize;
  z-index: 90; // The z-index of activity-table-header is 89.
  
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  
  &:hover, &:active {
    height: 140%;
  }
  
  & .bp-adjustable-frame-gutter-handle {
    background-color: #d4d4d4;
    width: 32px;
    height: 3px;
    border-radius: 6px;
    transition: all 0.1s ease-in-out;
  }

  &:hover .bp-adjustable-frame-gutter-handle, &:active .bp-adjustable-frame-gutter-handle {
    width: 48px;
    background-color: ${BPColors.gray[400]};
  }
`;

export const BPAdjustableFrameGutter = () => {
  return (
    <BPAdjustableFrameGutterDiv>
      <div className="bp-adjustable-frame-gutter-handle"/>
    </BPAdjustableFrameGutterDiv>
  );
};
