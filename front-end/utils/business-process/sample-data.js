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
                severity: 'info',
                sampleContent: 'Activity 1',
              },
            ],
          },
          {
            name: 'Business Process 1002',
            severity: 'success',
          },
          {
            name: 'Business Process 1003',
            severity: 'warning',
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
