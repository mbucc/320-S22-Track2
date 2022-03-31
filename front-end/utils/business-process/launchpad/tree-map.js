import {sampleEAIDomains} from '../sample-data';

/**
 * Mock tree map fetching launchpad configuration.
 * @return {object} - A launchpad configuration.
 */
export const getTreeMap = () => {
  return {
    onStart: () => [],
    onMount: ({setState}) => {
      setState(sampleEAIDomains);
    },
    onOverride: ({setState, newValue}) => {
      newValue = newValue || {
        eaiDomains: undefined,
        publishingBusinessDomains: undefined,
      };

      let result = sampleEAIDomains;

      // Mock: Filter out the EAI Domains.
      if (newValue.eaiDomains && newValue.eaiDomains.length > 0) {
        result = result.filter((domain) => {
          return newValue.eaiDomains.includes(domain.name);
        });
      }

      if (newValue.publishingBusinessDomains && newValue.publishingBusinessDomains.length > 0) {
        result = result.map((domain) => {
          const newDomain = {...domain};
          newDomain.children = newDomain.children.filter((child) => {
            return newValue.publishingBusinessDomains.includes(child.name);
          });
          return newDomain;
        });
      }

      setState(result);
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
