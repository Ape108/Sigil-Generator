interface LogLevel {
  ERROR: 'error';
  WARN: 'warn';
  INFO: 'info';
  DEBUG: 'debug';
}

const LOG_LEVELS: LogLevel = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  DEBUG: 'debug'
};

const isDevEnvironment = __DEV__;

function formatMessage(level: string, message: string, data?: any): string {
  const timestamp = new Date().toISOString();
  const dataString = data ? `\nData: ${JSON.stringify(data, null, 2)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${dataString}`;
}

export const logger = {
  info: (message: string, data?: any) => {
    if (__DEV__) {
      console.log(`[${new Date().toISOString()}] [INFO] ${message}`, data || '');
    }
  },
  
  error: (message: string, data?: any) => {
    if (__DEV__) {
      console.error(`[${new Date().toISOString()}] [ERROR] ${message}`, {
        ...(data || {}),
        timestamp: new Date().toISOString()
      });
    }
  },
  
  debug: (message: string, data?: any) => {
    if (__DEV__) {
      console.debug(`[${new Date().toISOString()}] [DEBUG] ${message}`, data || '');
    }
  },
  
  warn: (message: string, data?: any) => {
    if (__DEV__) {
      console.warn(`[${new Date().toISOString()}] [WARN] ${message}`, data || '');
    }
  }
}; 