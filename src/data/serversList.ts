import { ServerListRawInterface } from '../types/serverTypes';

export const serversList: ServerListRawInterface[] = [
  {
    endpoint: 'njyvop',
    name: 'LG-1 (Legacy)',
    sname: 'LG-1',
    enabled: true,
    apiname: 'main',
    uptimeid: '43c6a237ee1b867f13cd5ccb5731926f',
    serverip: 'server.tycoon.community:30120',
    info: 'This server is running on the original database, but it won\'t receive any future updates.',
    links: [["more info on wiki", "https://dash.tycoon.community/wiki/index.php/Legacy"]],
    apiKeyAllow: true
  },
  {
    endpoint: '2epova',
    name: 'NY-1 (New Main)',
    sname: 'NY-1',
    enabled: true,
    apiname: 'beta',
    uptimeid: '676134ceb12cdf3fb6e2272f37ff5455',
    serverip: 'server.tycoon.community:30121',
    info: 'This server is replacing the original server and is running on a new separate database. This server will receive all the future updates.',
    apiKeyAllow: true
  },
  {
    endpoint: 'w8j4eb',
    name: 'EVENT',
    sname: 'EVENT',
    enabled: true,
    apiname: '',
    uptimeid: '',
    serverip: '',
    info: 'This server is only active during events. See #events channel in TT discord for any future events.'
  },
  {
    endpoint: 'dgpvx3',
    name: '[LITE] Transportation',
    sname: 'LITE',
    enabled: true,
    apiname: '',
    uptimeid: '',
    serverip: '',
    info: 'Lite server is running on different game mode than other transport tycoon servers. Server\'s only focus is trucking.',
    links: [["more info on wiki", "https://dash.tycoon.community/wiki/index.php/LITE_Transportation"]]
  },
];
