export interface DeviceInfo {
  userAgent: string
  platform: string
  language: string
  screenWidth: number
  screenHeight: number
  timezone: string
  timestamp: string
}

export function getDeviceInfo(): DeviceInfo {
  return {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    timestamp: new Date().toISOString(),
  }
}

