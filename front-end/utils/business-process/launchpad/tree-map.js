import {RequestHandler, RMContentType} from '@taci-tech/launchpad-js';
import {unwrapAPI} from '../api-unwrap';
import {convertToAPIFormat} from '../date-options';
import moment from 'moment';

/**
 * Mock tree map fetching launchpad configuration.
 * @return {object} - A launchpad configuration.
 */
export const getTreeMap = () => {
  return {
    onStart: () => {
      return {
        treeMap: [],
        size: 0,
      };
    },
    onMount: ({setState, setIsLoading}) => {
      setIsLoading(true);
      RequestHandler.get({
        path: 'http://cafebabebackend-env.eba-hy52pzjp.us-east-1.elasticbeanstalk.com/clog/businessProcessTree',
        config: {
          contentType: RMContentType.JSON,
          query: {
            'startTime': convertToAPIFormat(moment().subtract(30, 'minutes')),
            'endTime': convertToAPIFormat(moment()),
          },
        },
        handler: {
          200: (data) => {
            setIsLoading(false);
            setState({
              treeMap: unwrapAPI(data.eaiMap),
              size: data.size,
            });
          },
          0: () => {
            setIsLoading(false);
            setState({
              treeMap: [],
              size: 0,
            });
          },
        },
      });
    },
    onOverride: ({setState, setIsLoading, newValue}) => {
      newValue = newValue || {};

      newValue['startTime'] = convertToAPIFormat(
          moment(newValue['startTime'] || new Date())
      );
      newValue['endTime'] = convertToAPIFormat(
          moment(newValue['endTime'] || new Date())
      );

      const newQuery = Object.keys(newValue).reduce((acc, key) => {
        if (newValue[key]) {
          acc[key] = newValue[key];
        }
        return acc;
      }, {});

      setState({
        treeMap: [],
        size: 0,
      });

      setIsLoading(true);

      RequestHandler.get({
        path: 'http://cafebabebackend-env.eba-hy52pzjp.us-east-1.elasticbeanstalk.com/clog/businessProcessTree',
        config: {
          contentType: RMContentType.JSON,
          query: newQuery,
        },
        handler: {
          200: (data) => {
            setIsLoading(false);
            console.log('API', data);
            setState({
              treeMap: unwrapAPI(data.eaiMap),
              size: data.size,
            });
          },
          0: () => {
            setIsLoading(false);
            setState({
              treeMap: [],
              size: 0,
            });
          },
        },
      });
    },
  };
};

export const getEAIDomainList = () => {
  return {
    onStart: () => [],
    onMount: ({setState, setIsLoading}) => {
      setIsLoading(true);
      RequestHandler.get({
        path: 'http://cafebabebackend-env.eba-hy52pzjp.us-east-1.elasticbeanstalk.com/clog/eaiDomains',
        config: {
          contentType: RMContentType.JSON,
        },
        handler: {
          200: (data) => {
            setIsLoading(false);
            setState(data);
          },
          0: () => {
            setIsLoading(false);
            setState([]);
          },
        },
      });
    },
  };
};

export const getPublishingBusinessDomainList = () => {
  return {
    onStart: () => [],
    onMount: ({setState, setIsLoading}) => {
      setIsLoading(true);
      RequestHandler.get({
        path: 'http://cafebabebackend-env.eba-hy52pzjp.us-east-1.elasticbeanstalk.com/clog/publishingBusinessDomains',
        config: {
          contentType: RMContentType.JSON,
        },
        handler: {
          200: (data) => {
            setIsLoading(false);
            setState(data);
          },
          0: () => {
            setIsLoading(false);
            setState([]);
          },
        },
      });
    },
  };
};
