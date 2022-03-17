import React, {useEffect, useRef, useState} from 'react';
import {BPDimens, BPStandards} from '../../../utils/business-process/standards';

import BPTextInput from './text-input';

import {ClickAwayListener, Popper} from '@mui/material';
import {BPDomainSelectorItem} from './domain-selector-item';

export const BPDomainSelector = ({label, onChange, searchPlaceholder, list = []}) => {
  const [value, setValue] = useState('');
  const [searchInputValue, setSearchInputValue] = useState('');

  const [resultList, setResultList] = useState(list);

  // Popper open state.
  const [isOpen, setIsOpen] = useState(false);

  // Popper anchor element.
  const boxRef = useRef(null);

  const handlePopoverClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (searchInputValue.length > 0) {
      setResultList(
          list.filter((item) => item.name.toLowerCase().includes(searchInputValue.toLowerCase()))
      );
    } else {
      setResultList(list);
    }
  }, [searchInputValue]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ClickAwayListener onClickAway={handlePopoverClose}>
        <div>
          <BPTextInput
            label={label}
            boxRef={(ref) => {
              boxRef.current = ref;
            }}
            value={value}
            onClick={() => setIsOpen(!isOpen)}
            disableInput={true}
            boxStyle={{
              cursor: 'pointer',
            }}
          />
          <Popper
            id={isOpen ? 'bp-date-picker' : undefined}
            open={isOpen}
            anchorEl={boxRef.current}
            onClose={handlePopoverClose}
            placement='bottom-start'
            style={{
              zIndex: 100,
              width: boxRef.current?.clientWidth + 100 ?? 'auto',
            }}
            modifiers={[
              {
                name: 'preventOverflow',
                enabled: true,
                options: {
                  altAxis: true,
                  altBoundary: false,
                  tether: true,
                  rootBoundary: 'viewport',
                  padding: 8,
                },
              },
            ]}
          >
            <div
              style={{
                width: '100%',
                borderRadius: BPDimens.cornerRadius,
                border: BPStandards.border,
                overflow: 'hidden',
                backgroundColor: 'white',
                padding: 8,
                boxShadow: '0px 20px 50px 0px rgba(0,0,0,0.10)',
                marginTop: 6,
                marginBottom: 6,
                transform: 'translateX(-5px)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
              }}
            >
              <BPTextInput
                style={{
                  width: '100%',
                  flexShrink: 0,
                }}
                value={searchInputValue}
                onTextChange={(value) => setSearchInputValue(value)}
                placeholder={searchPlaceholder || 'Search a domain'}
              />
              <div
                style={{
                  width: '100%',
                  maxHeight: '45vh',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  paddingTop: resultList.length > 0 ? 6 : 0,
                }}
              >
                {resultList.map((item) => (
                  <BPDomainSelectorItem
                    key={item.id}
                    item={item}
                    onClick={() => {
                      setValue(item.name);
                      if (onChange) {
                        onChange(item);
                      }
                      setIsOpen(false);
                      // Clean up the search field after every selection.
                      setSearchInputValue('');
                    }}
                  />
                ))}
              </div>
            </div>
          </Popper>
        </div>
      </ClickAwayListener>
    </div>
  );
};
