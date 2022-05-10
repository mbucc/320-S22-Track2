import React, {useEffect, useState} from 'react';
import {BPColors, BPDimens, BPStandards} from '../../../utils/business-process/standards';
import styled from 'styled-components';
import {IconArrowBarToRight, IconArrowRight} from '@tabler/icons';

const PaginationButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  height: 35px;
  padding: 0 9px;
  
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  
  user-select: none;
  
  border: ${(props) => props.isActive ? BPStandards.border : '0'};
  border-radius: ${BPDimens.cornerRadius}px;
  overflow: hidden;
  color: ${(props) => props.isActive ? BPColors.black : BPColors.gray[400] + 'af'};
  background-color: transparent;
  
  transition: all 0.12s ease-in-out;
  
  &:hover {
    color: ${BPColors.black};
    background-color: ${BPColors.gray[70]};
  }
`;

const PaginationInput = styled.input`
  color: ${BPColors.black};
  
  &::placeholder {
    color: ${BPColors.gray[300]};
  }
`;

const paginationButtonCount = 7;

/**
 * [BP] Pagination Controller
 * @param {number} pageState - Start from 0.
 * @param {function} onChange
 * @param {number} pageCount
 * @param {object} style
 * @return {JSX.Element}
 */
export const BPPaginationController = ({pageState, onChange, pageCount, style}) => {
  // We allow at most paginationButtonCount number of pagination buttons.
  const [options, setOptions] = useState([]);

  const [gotoState, setGotoState] = useState('');

  useEffect(() => {
    const distanceBetweenStateAndMaxPage = pageCount - pageState - 1;
    const distanceBetweenStateAndMinPage = pageState;
    const maxOptionsCount = Math.min(pageCount, paginationButtonCount);
    if (
      distanceBetweenStateAndMaxPage <= Math.floor(paginationButtonCount / 2) &&
      distanceBetweenStateAndMinPage <= Math.floor(paginationButtonCount / 2)
    ) {
      setOptions(Array.from(Array(pageCount).keys()));
    } else if (distanceBetweenStateAndMaxPage <= Math.floor(paginationButtonCount / 2)) {
      // It means we are at the end of the list.
      // So we create option list from maxPage to maxPage - paginationButtonCount.
      setOptions(
          Array.from(Array(maxOptionsCount).keys())
              .map((i) => pageCount - maxOptionsCount + i)
      );
    } else if (distanceBetweenStateAndMinPage <= Math.floor(paginationButtonCount / 2)) {
      // It means we are at the beginning of the list.
      // So we create option list from 0 to paginationButtonCount.
      setOptions(Array.from(Array(maxOptionsCount).keys()));
    } else {
      // It means we are in the middle of the list.
      // So we create option list from pageState to pageState +- paginationButtonCount.
      setOptions(
          Array.from(Array(maxOptionsCount).keys())
              .map((i) => pageState + i - Math.floor(maxOptionsCount / 2))
      );
    }
  }, [pageState, pageCount]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '9px 10px 9px 18px',
        border: `1px solid ${BPColors.border}`,
        borderRadius: '999px',
        boxShadow: BPStandards.floatShadow,
        backgroundColor: BPColors.white,
        ...style,
      }}
    >
      {options.map((i) => (
        <PaginationButton
          key={i}
          isActive={i === pageState}
          onClick={() => {
            if (onChange && pageState !== i) {
              onChange(i);
            }
          }}
        >
          {i + 1}
        </PaginationButton>
      ))}
      <PaginationButton
        isActive={false}
        onClick={() => {
          if (onChange && pageState !== pageCount - 1) {
            onChange(pageCount - 1);
          }
        }}
        style={{
          paddingLeft: '6px',
          color: BPColors.gray[300],
        }}
      >
        <IconArrowBarToRight
          width={28}
          height={28}
          strokeWidth={2.1}
        />
      </PaginationButton>
      <div
        style={{
          borderRadius: '999px',
          border: `1px solid ${BPColors.border}`,
          width: '95px',
          height: '38px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          marginLeft: '8px',
        }}
      >
        <PaginationInput
          placeholder={'Goto'}
          value={gotoState}
          onChange={(e) => {
            if (e.target.value === '' || e.target.value.match(/^\d+$/)) {
              setGotoState(e.target.value);
            }
          }}
          style={{
            width: '100%',
            height: '100%',
            flexShrink: 1,
            paddingLeft: '13px',
            fontSize: '18px',
            fontWeight: '500',
            border: 'none',
            outline: 'none',
          }}
        />
        <IconArrowRight
          width={22}
          height={22}
          style={{
            color: BPColors.gray[300],
            flexShrink: 0,
            cursor: 'pointer',
            marginLeft: '4px',
            marginRight: '10px',
          }}
          onClick={() => {
            if (gotoState !== '' && gotoState.match(/^\d+$/)) {
              if (onChange && parseInt(gotoState) > 0 && parseInt(gotoState) <= pageCount) {
                onChange(parseInt(gotoState) - 1);
              }
            }
          }}
        />
      </div>
    </div>
  );
};
