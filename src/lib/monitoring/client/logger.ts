import { datadogLogs } from '@datadog/browser-logs';
import { browser } from '$app/environment';
import { 
  PUBLIC_DATADOG_CLIENT_TOKEN, 
  PUBLIC_DATADOG_SITE, 
  PUBLIC_DD_ENV, 
  PUBLIC_DD_SERVICE 
} from '$env/static/public';

let initialized = false;

export function initClientLogger() {
  if (browser && !initialized) {
    datadogLogs.init({
      clientToken: PUBLIC_DATADOG_CLIENT_TOKEN,
      site: PUBLIC_DATADOG_SITE,
      forwardErrorsToLogs: true,
      sessionSampleRate: 100,
      service: PUBLIC_DD_SERVICE,
      env: PUBLIC_DD_ENV
    });
    initialized = true;
  }
}

export const clientLogger = {
  info: (message, context) => {
    if (browser) {
      datadogLogs.logger.info(message, context);
    }
  },
  error: (message, context) => {
    if (browser) {
      datadogLogs.logger.error(message, context);
    }
  },
  warn: (message, context) => {
    if (browser) {
      datadogLogs.logger.warn(message, context);
    }
  }
};
