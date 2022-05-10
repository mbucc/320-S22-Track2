import {sortSeverityTags} from '../../../../utils/business-process/severity';
import {generatePath} from './path-generator';
import {BPGridMockAPI} from '../mock-api/grid';

export const interceptGridAPI = ({eaiTransactionId, businessDomains = undefined, severities = undefined}) => {
  const gridPath = generatePath('/businessProcessGrid', {
    'eaiTransactionId': eaiTransactionId,
    'businessDomain': businessDomains,
    'severities': sortSeverityTags(severities),
  });
  return cy.intercept('GET', gridPath, {
    statusCode: 200,
    body: BPGridMockAPI.getGridResult({
      eaiTransactionId: eaiTransactionId,
      businessDomains: businessDomains,
      severities: sortSeverityTags(severities),
    }),
  });
};

export const interceptActivityFilter = () => {
  const businessDomainPath = generatePath('/businessDomains');
  return cy.intercept('GET', businessDomainPath, {
    statusCode: 200,
    body: BPGridMockAPI.getBusinessDomainList(),
  });
};
