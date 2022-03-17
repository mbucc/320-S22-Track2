export const sampleEAIDomains = [
  {
    name: 'EAI Domain 1',
    children: [
      {
        name: 'Publishing Business Domain 1 from EAI 1',
        children: [
          {
            name: 'Business Process 1001',
            activities: [
              {
                id: '1',
                severity: 'info',
                sampleContent: 'An info activity',
              },
              {
                id: '2',
                severity: 'warning',
                sampleContent: 'A warning activity',
              },
              {
                id: '3',
                severity: 'success',
                sampleContent: 'A successful activity!',
              },
              {
                id: '4',
                severity: 'error',
                sampleContent: 'An error activity!',
              },
            ],
          },
          {
            name: 'Business Process 1002',
            activities: [
              {
                id: '5',
                severity: 'info',
                sampleContent: 'Activity 1',
              },
            ],
          },
          {
            name: 'Business Process 1003',
            activities: [
              {
                id: '6',
                severity: 'info',
                sampleContent: 'Activity 1',
              },
            ],
          },
        ],
      },
      {
        name: 'Publishing Business Domain 2 from EAI 1',
        children: [
          {
            name: 'Business Process 1004',
          },
        ],
      },
      {
        name: 'Publishing Business Domain 3 from EAI 1',
        children: [
          {
            name: 'Business Process 1005',
          },
        ],
      },
    ],
  },
  {
    name: 'EAI Domain 2',
    children: [
      {
        name: 'Publishing Business Domain 1 from EAI 2',
        children: [
          {
            name: 'Business Process 2001',
          },
        ],
      },
      {
        name: 'Publishing Business Domain 2 from EAI 2',
        children: [
          {
            name: 'Business Process 2002',
          },
        ],
      },
    ],
  },
  {
    name: 'EAI Domain 3',
    children: [
      {
        name: 'Publishing Business Domain 1 from EAI 2',
        children: [
          {
            name: 'Business Process 3001',
          },
        ],
      },
    ],
  },
];

export const EAIDomainSample = [
  'EAI Domain 1',
  'EAI Domain 2',
  'EAI Domain 3',
];

export const PublishingBusinessDomainSample = [
  'Publishing Business Domain 1',
  'Publishing Business Domain 2',
  'Publishing Business Domain 3',
  'Publishing Business Domain 4',
  'Publishing Business Domain 5',
  'Publishing Business Domain 6',
  'Publishing Business Domain 7',
  'Publishing Business Domain 8',
  'Publishing Business Domain 9',
  'Publishing Business Domain 10',
  'Publishing Business Domain 11',
  'Publishing Business Domain 12',
];

export const BusinessDomainSample = [
  'Business Domain 1',
  'Business Domain 2',
  'Business Domain 3',
  'Business Domain 4',
  'Business Domain 5',
  'Business Domain 6',
  'Business Domain 7',
  'Business Domain 8',
  'Business Domain 9',
  'Business Domain 10',
  'Business Domain 11',
  'Business Domain 12',
  'Business Domain 13',
  'Business Domain 14',
  'Business Domain 15',
  'Business Domain 16',
  'Business Domain 17',
  'Business Domain 18',
  'Business Domain 19',
  'Business Domain 20',
];
