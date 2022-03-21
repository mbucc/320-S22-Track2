const BPColors = {
  white: '#ffffff',
  black: '#000000',

  border: '#f2f2f2',
  transparent: 'transparent',

  gray: {
    30: '#fcfdfd',
    50: '#fafbfb',
    70: '#f7f8f8',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },

  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },

  success: '#22c55e',
  successSecondary: '#86efac',
  successLight: '#f0fdf4',
  info: '#3b82f6',
  infoSecondary: '#bfdbfe',
  infoLight: '#eff6ff',
  warning: '#f59e0b',
  warningSecondary: '#fde68a',
  warningLight: '#fffbeb',
  error: '#ef4444',
  errorSecondary: '#fecaca',
  errorLight: '#fef2f2',
};

const BPDimens = {
  textInputHeight: 40,

  borderWidth: 1,

  smallRadius: 6,
  cornerRadius: 12,
  treeRadius: '7px',

  toolbarHeight: 58,
};

const BPStandards = {
  border: `1px solid ${BPColors.border}`,
  borderFocus: `1px solid ${BPColors.green[600]}`,

  mapEntryTitle: {
    fontSize: 16,
    fontWeight: '500',
  },

  mapSubEntryTitle: {
    fontSize: 15,
    fontWeight: '400',
  },
};

export {
  BPColors,
  BPDimens,
  BPStandards,
};
