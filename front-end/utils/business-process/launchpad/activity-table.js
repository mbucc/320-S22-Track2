import {sampleEAIDomains} from '../sample-data';

export const getActivityGrid = () => {
  return {
    onStart: () => [],
    onOverride: ({setState, newValue}) => {
      if (!newValue) {
        setState([]);
      }
      let result = [];
      // TODO: Mock behavior right now.
      sampleEAIDomains.forEach((domain) => {
        if (domain.children) {
          domain.children.forEach((publishingBusinessDomain) => {
            if (publishingBusinessDomain.children) {
              publishingBusinessDomain.children.forEach((businessProcess) => {
                if (businessProcess.activities) {
                  // Check if children's names have the newValue.
                  const hasChild = businessProcess.activities.find(
                      // TODO: In the future, the fetching should be based on the EAI transaction ID per documentation.
                      (child) => child.name === newValue
                  );
                  if (hasChild && result.length === 0) {
                    result = result.concat(businessProcess.activities);
                  }
                }
              });
            }
          });
        }
      });
      setState(result);
    },
  };
};
