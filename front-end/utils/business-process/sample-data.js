const sampleEAIDomains = [
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

export {
  sampleEAIDomains,
};
