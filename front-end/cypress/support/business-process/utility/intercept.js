import {sortSeverityTags} from '../../../../utils/business-process/severity';
import {generatePath} from './path-generator';
import {BPGridMockAPI} from '../mock-api/grid';
import {BPTreeMockAPI} from '../mock-api/tree';
import {convertToAPIFormat} from '../../../../utils/business-process/date-options';
import moment from 'moment';

/**
 * Intercept the Tree API with given information.
 * @param {moment.Moment} startDate
 * @param {moment.Moment} endDate
 * @param {string[]|undefined} eaiDomains
 * @param {string[]|undefined} pubDomains
 * @return {Cypress.Chainable<null>}
 */
export const interceptTreeAPI = ({startDate = moment().subtract(30, 'minutes'), endDate = moment(), eaiDomains, pubDomains}) => {
  const treePath = generatePath('/businessProcessTree', {
    'startTime': convertToAPIFormat(startDate.clone()),
    'endTime': convertToAPIFormat(endDate.clone()),
    'eaiDomain': eaiDomains ? eaiDomains.join(',') : undefined,
    'publishingBusinessDomain': pubDomains ? pubDomains.join(',') : undefined,
  });
  return cy.intercept('GET', treePath, {
    statusCode: 200,
    body: BPTreeMockAPI.getTreeResult({
      startDate: startDate.clone(),
      endDate: endDate.clone(),
      eaiDomains: eaiDomains,
      pubDomains: pubDomains,
    }),
  });
};

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

// Used to intercept the EAI Domain selection dropdown.
export const interceptEAIDomainList = () => {
  const path = generatePath('/eaiDomains');
  return cy.intercept('GET', path, {
    statusCode: 200,
    body: BPTreeMockAPI.getEAIDomain(),
  });
};

// Used to intercept the Publishing Business Domain selection dropdown.
export const interceptPubDomainList = () => {
  const path = generatePath('/publishingBusinessDomains');
  return cy.intercept('GET', path, {
    statusCode: 200,
    body: BPTreeMockAPI.getPubDomain(),
  });
};

// Used to intercept the Business Domain selection dropdown.
export const interceptBusinessDomainList = () => {
  const path = generatePath('/businessDomains');
  return cy.intercept('GET', path, {
    statusCode: 200,
    body: BPGridMockAPI.getBusinessDomainList(),
  });
};
