export interface ContextPack {
  name: string;
  phrases: string[];
}

export interface DeviceState {
  batteryLevel: number;
  isOnline: boolean;
  currentPack: ContextPack;
}

export enum TTSStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  PLAYING = 'PLAYING',
  ERROR = 'ERROR'
}
