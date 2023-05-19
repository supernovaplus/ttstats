import { ServerListRawInterface } from '../types/serverTypes';

export const ServerTypes = {
  NORMAL: 0,
  EVENT: 1,
  LITE: 2,
};

export const serversList: ServerListRawInterface[] = [
  {
    endpoint: '2epova',
    name: 'Server NY-1',
    sname: 'NY-1',
    enabled: true,
    apiname: 'main',
    uptimeid: '43c6a237ee1b867f13cd5ccb5731926f',
    servertype: ServerTypes.NORMAL,
  },
  {
    endpoint: 'njyvop',
    name: 'Server NY-2 (Beta)',
    sname: 'NY-2B',
    enabled: true,
    apiname: 'beta',
    uptimeid: '676134ceb12cdf3fb6e2272f37ff5455',
    servertype: ServerTypes.NORMAL,
  },
  {
    endpoint: 'w8j4eb',
    name: 'Server EVENT',
    sname: 'EVENT',
    enabled: true,
    apiname: '',
    uptimeid: '',
    servertype: ServerTypes.EVENT,
  },
  {
    endpoint: 'dgpvx3',
    name: 'Server [LITE] Transportation',
    sname: 'LITE',
    enabled: true,
    apiname: '',
    uptimeid: '',
    servertype: ServerTypes.LITE,
  },
];
