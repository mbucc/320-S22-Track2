import {sampleEAIDomains} from '../sample-data';
import {RequestHandler, RMContentType} from "@taci-tech/launchpad-js";

/**
 * Mock tree map fetching launchpad configuration.
 * @return {object} - A launchpad configuration.
 */
export const getTreeMap = () => {
  return {
    onStart: () => [],
    onMount: ({setState}) => {
      RequestHandler.get({
        path: 'http://cafebabebackend-env.eba-hy52pzjp.us-east-1.elasticbeanstalk.com/clog/businessProcessTree',
        config: {
          contentType: RMContentType.JSON,
          header: {
            'Allow-Control-Allow-Origin': '*',
          },
          query: {
            'startTime': '2022-01-22%2012:55:03.680000',
            'endTime': '2022-04-22%2012:55:03.680000',
            'eaiDomain': 'EAI_DOMAIN_1,EAI_DOMAIN_2',
            'publishingBusinessDomain': 'crm_app',
          },
        },
        handler: {
          200: (data) => {
            setState(data);
          },
        },
      });
    },
    onOverride: ({setState, newValue}) => {
      newValue = newValue || {
        eaiDomains: undefined,
        publishingBusinessDomains: undefined,
      };

      RequestHandler.get({
        path: 'http://cafebabebackend-env.eba-hy52pzjp.us-east-1.elasticbeanstalk.com/clog/businessProcessTree',
        config: {
          contentType: RMContentType.JSON,
          query: {
            'startTime': '2022-01-22%2012:55:03.680000',
            'endTime': '2022-04-22%2012:55:03.680000',
            'eaiDomain': 'EAI_DOMAIN_1,EAI_DOMAIN_2',
            'publishingBusinessDomain': 'crm_app',
          },
        },
        handler: {
          200: (data) => {
            setState(data);
          },
        },
      });
    },
  };
};

export const getEAIDomainList = () => {
  return {
    onStart: () => [],
    onMount: ({setState}) => {
      const list = sampleEAIDomains.map((domain) => {
        return domain.name;
      });
      setState(list);
    },
  };
};

export const getPublishingBusinessDomainList = () => {
  return {
    onStart: () => [],
    onMount: ({setState}) => {
      const list = [];
      sampleEAIDomains.forEach((domain) => {
        domain.children?.forEach((child) => {
          list.push(child.name);
        });
      });
      setState(list);
    },
    onOverride: ({setState, newValue}) => {
      newValue = newValue || [];
      let result = [];
      sampleEAIDomains.forEach((domain) => {
        if (newValue.length === 0 || newValue.includes(domain.name)) {
          result = result.concat(domain.children.map((publishingBusinessDomain) => publishingBusinessDomain.name) || []);
        }
      });
      setState(result);
    },
  };
};
