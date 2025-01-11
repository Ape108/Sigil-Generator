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
  error: (message: string, error?: Error | unknown) => {
    console.error(formatMessage(LOG_LEVELS.ERROR, message, error));
  },

  warn: (message: string, data?: any) => {
    console.warn(formatMessage(LOG_LEVELS.WARN, message, data));
  },

  info: (message: string, data?: any) => {
    if (isDevEnvironment) {
      console.info(formatMessage(LOG_LEVELS.INFO, message, data));
    }
  },

  debug: (message: string, data?: any) => {
    if (isDevEnvironment) {
      console.debug(formatMessage(LOG_LEVELS.DEBUG, message, data));
    }
  }
}; 