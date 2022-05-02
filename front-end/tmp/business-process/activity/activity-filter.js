import React, {useState} from 'react';
import {BPDimens, BPStandards} from '../../../utils/business-process/standards';
import {BPDomainSelector} from '../common/domain-selector';
import {BPSeveritySelector} from '../common/severity-selector';
import {BPButton} from '../common/button';

const BPActivityFilterComponent = ({businessDomainList, onChange}) => {
  const [selectedBusinessDomain, setSelectedBusinessDomain] = useState([]);
  const [selectedSeverity, setSelectedSeverity] = useState(['success', 'info', 'warning', 'error']);

  const [selectedSeverityError, setSelectedSeverityError] = useState(null);

  const onApplyButtonClick = () => {
    if (onChange) {
      onChange({
        businessDomain: selectedBusinessDomain,
        severity: selectedSeverity,
      });
    }
  };

  return (
    <div
      style={{
        width: 250,
        height: '100%',
        flexShrink: 0,
        flexGrow: 0,
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          height: BPDimens.toolbarHeight,
          flexShrink: 0,
          borderBottom: BPStandards.border,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: 18,
          paddingRight: 17,
        }}
      >
        <p style={{fontSize: 17, fontWeight: '500'}}>
          Activities Filter
        </p>
        <BPButton
          id={'bp-activity-filter-apply-button'}
          onClick={onApplyButtonClick}
        >
          Apply
        </BPButton>
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          padding: 18,
          overflowX: 'hidden',
          overflowY: 'auto',
          overscrollBehaviorY: 'contain',
          flexShrink: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          rowGap: 17,
        }}
      >
        <BPDomainSelector
          id={'bp-activity-filter-business-domain-selector'}
          label={'Business Domain'}
          searchPlaceholder={'Search a business domain'}
          list={businessDomainList}
          onChange={(selected) => {
            setSelectedBusinessDomain(selected);
          }}
        />

        <BPSeveritySelector
          id={'bp-activity-filter-severity-selector'}
          label={'Severity'}
          onChange={(selected) => {
            setSelectedSeverity(selected);
            if (selected.length === 0) {
              setSelectedSeverityError('Please select at least one severity');
            } else {
              setSelectedSeverityError(null);
            }
          }}
          error={selectedSeverityError}
        />
      </div>
    </div>
  );
};

export default BPActivityFilterComponent;
