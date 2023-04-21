export interface ServerListRawInterface {
  endpoint: string;
  name: string;
  sname: string;
  enabled: boolean;
  apiname: string;
}

export interface MainAPIPlayer {
  0: string; //player id
  1: number; //session id
  2: number; //player id
  3: string; //avatar link
  4: boolean; //is staff
  5: string; //job name
  6: boolean; //is donator
}

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

export interface ServerDataObject {
  endpoint: string;
  name: string;
  sname: string;
  enabled: boolean;
  apiname: string;
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
  0: string; //player name
  1: string; //server endpoint
  2: string; //server short name
  3: string; //avatar link
  4: string; //job
}

export interface PlayerFoundState {
  playerFinderMessages: string,
  playerFinderInputField: string,
  playerFinderFound: PlayerFoundList[],
  serverSelect: string;
  jobSelect: string;
}

export type SetServerDispatchType = React.Dispatch<React.SetStateAction<ServerDataObjectList>>;