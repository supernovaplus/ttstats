import { ServerListRawInterface } from '../types/serverTypes';

export const serversList: ServerListRawInterface[] = [
  {
    endpoint: '2epova',
    name: 'S1 Main',
    sname: 'S1',
    enabled: true,
    apiname: 'main',
    uptimeid: '43c6a237ee1b867f13cd5ccb5731926f',
    serverip: 'server.tycoon.community:30120',
    reverseurl: 's1.transporttycoon.eu',
    info: '',
    // info: 'This server is replacing the original server and is running on a new separate database. This server will receive all the future updates.',
    apiKeyAllow: true,
    chartId: "EG6U3"
  },
  {
    endpoint: 'njyvop',
    name: 'S2 Beta',
    sname: 'S2',
    enabled: true,
    apiname: 'beta',
    uptimeid: '676134ceb12cdf3fb6e2272f37ff5455',
    serverip: 'server.tycoon.community:30125',
    reverseurl: 's2.transporttycoon.eu',
    info: 'This server is used for testing. Beta access required.',
    // links: [["more info on wiki", "https://dash.tycoon.community/wiki/index.php/Legacy"]],
    apiKeyAllow: true,
    chartId: "1huiF"
  },
  // {
  //   endpoint: 'w8j4eb',
  //   name: 'EVENT',
  //   sname: 'EVENT',
  //   enabled: true,
  //   apiname: '',
  //   uptimeid: '',
  //   serverip: '',
  //   info: 'This server is only active during events. See #events channel in TT discord for any future events.'
  // },
  // {
  //   endpoint: 'dgpvx3',
  //   name: '[LITE] Transportation',
  //   sname: 'LITE',
  //   enabled: true,
  //   apiname: '',
  //   uptimeid: '',
  //   serverip: '',
  //   info: 'Lite server is running on different game mode than other transport tycoon servers. Server\'s only focus is trucking.',
  //   links: [["more info on wiki", "https://dash.tycoon.community/wiki/index.php/LITE_Transportation"]]
  // },
];
