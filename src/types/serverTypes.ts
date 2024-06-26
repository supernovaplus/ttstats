export interface ServerListRawInterface {
  endpoint: string;
  name: string;
  sname: string;
  enabled: boolean;
  apiname: string;
  uptimeid: string;
  serverip: string;
  /** link, url */
  links?: [string, string][];
  info?: string;
  apiKeyAllow?: boolean;
  chartId: string | null;
}

export interface MainAPIPlayer {
  /** Player Name */
  0: string;
  /** Source ID (FiveM assigned player ID) */
  1: number;
  /** Player ID */
  2: number;
  /** Avatar Link */
  3: string;
  /** Is Staff */
  4: boolean;
  /** Job Name, eg. Airline Pilot */
  5: string;
  /** Is Donator */
  6: boolean;
}

export interface MainAPIPlayerHighest {
  index: number;
  name: string;
  id: number;
  sname: string;
}

/**
 * DXP Array
 *
 * @property {boolean} 0 - Whether DXP is active.
 * @property {string} [1] - The DXP host (optional).
 * @property {number} [2] - Time remaining for DXP (optional).
 * @property {number} [3] - Extra DXP time (optional).
 * @property {number} [4] - Duration for which DXP has been active (optional).
 */
export type DXP = [boolean, string?, number?, number?, number?];

export interface MainAPIServer {
  beta: string;
  dxp: DXP;
  number: string;
  limit: number;
  motd: string;
  region: string;
  uptime: string;
  name: string;
}

export interface MainAPIPlayersResponse {
  players: MainAPIPlayer[];
  server: MainAPIServer;
}

export interface ServerDataObject extends ServerListRawInterface {
  error: boolean;
  serverData: null | MainAPIServer;
  playersData: null | MainAPIPlayer[];
  lastUpdated: null | number;
  loaded: boolean;
}

export interface ServerDataObjectList {
  [endpoint: string]: ServerDataObject;
}

export interface ServerFallbackAPIResponse {
  EndPoint: string;
  Data: {
    clients: number;
    gametype: string;
    hostname: string;
    mapname: string;
    sv_maxclients: number;
    enhancedHostSupport: boolean;
    requestSteamTicket: string;
    resources: string[];
    server: string;
    vars: {
      Developers: string;
      Discord: string;
      Uptime: string;
      activitypubFeed: string;
      banner_connecting: string;
      banner_detail: string;
      gamename: string;
      locale: string;
      onesync_enabled: string;
      sv_enforceGameBuild: string;
      sv_enhancedHostSupport: string;
      sv_lan: string;
      sv_licenseKeyToken: string;
      sv_maxClients: string;
      sv_projectDesc: string;
      sv_projectName: string;
      sv_pureLevel: string;
      sv_scriptHookAllowed: string;
      tags: string;
      premium: string;
      can_review: string;
    };
    selfReportedClients: number;
    players: {
      endpoint: string;
      id: number;
      identifiers: string[];
      name: string;
      ping: number;
    }[];
    ownerID: number;
    private: boolean;
    fallback: boolean;
    connectEndPoints: string[];
    upvotePower: number;
    burstPower: number;
    support_status: string;
    svMaxclients: number;
    ownerName: string;
    ownerProfile: string;
    ownerAvatar: string;
    lastSeen: string;
    iconVersion: number;
  };
}

export interface PlayerFoundList {
  playerNameWithId: string; //player name
  server: ServerDataObject; //server data
  player: MainAPIPlayer; //player data
}

export interface PlayerFoundState {
  playerFinderMessages: string;
  playerFinderInputField: string;
  playerFinderFound: PlayerFoundList[];
  serverSelect: string;
  jobSelect: string;
}

export interface SkillBoostData {
  data: {
    bonus: number;
    skill: string;
    aptitude: string;
    short: string;
  };
  timestamp: number;
}

export interface TopVehicleData {
  fetching: boolean;
  timestamp: number;
  sorted_vehicles: [string, number][] | null;
  sorted_classes: [number, number][] | null;
}

export interface TopVehicleDataState {
  loading: boolean;
  error: null | string;
  timestamp: number;
  total_vehicles: number;
  total_classes: number;
  sorted_vehicles: null | [string, number][];
  sorted_classes: null | [number, number][];
}

export interface TopTenDataResponse {
  created_at: number;
  data: {
    stat_name: string;
    nice_name: string;
    updated_at: number;
    prefix: string;
    suffix: string;
    json_data: {
      username: string;
      user_id: number;
      amount: number;
    }[];
  }[];
}

export interface TopTenDataState {
  loading: boolean;
  error: string | null;
  data: TopTenDataResponse['data'] | null;
  selectedStatName: string;
  bannedPlayersList: Set<number>;
  selectedServer: number;
}

export interface HighestIDList {
  index: number;
  name: string;
  id: number;
  server: string;
}

export type SetServerDispatchType = React.Dispatch<React.SetStateAction<ServerDataObjectList>>;

export interface EconomyResponse {
  updated_at: number;
  data: {
    date: number;
    debt: number;
    money: number;
    debts: number;
    mil: number;
    bil: number;
    users: number;
  }[];
}

export interface EconomyTableState {
  loading: boolean;
  data: null | EconomyResponse;
  error: null | string;
  selectedServer: number;
}

export interface TopJobsHistoryResponse {
  updated_at: number;
  data: {
    [key: string]: {
      group_name: string;
      name: string;
      hours: number;
      percentage: number;
    }[];
  };
  fetch_time: number;
}

export interface TopJobsHistoryState {
  loading: boolean;
  data: null | TopJobsHistoryResponse['data'];
  error: null | string;
  updated_at: number;
}

export interface TopVehiclesHistoryResponse {
  updated_at: number;
  data: {
    [key: string]: {
      vclass: string;
      name: string;
      hours: number;
      percentage: number;
    }[];
  };
  fetch_time: number;
}

export interface TopVehiclesHistoryState {
  loading: boolean;
  data: null | TopVehiclesHistoryResponse['data'];
  error: null | string;
  updated_at: number;
}

export interface UserDataContextInterface {
  servers: {
    [serverEndpoint: string]: {
      server: ServerListRawInterface;
      apikey: string;
      charges: string;
      lastChecked: string;
    };
  };
  selectedUserId: string;
}
