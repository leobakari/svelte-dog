import winston from 'winston';
import DatadogWinston from 'datadog-winston';
import { env } from '$env/dynamic/private';


// Setup exportable logger service
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { 
    service: env.DD_SERVICE || 'svelte-dog',
    env: env.DD_ENV || 'dev'
  },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple()
    }),
    new DatadogWinston({
      apiKey: env.DATADOG_API_KEY,
      hostname: 'leo-fw13',
      service: env.DD_SERVICE || 'svelte-dog',
      ddsource: 'nodejs',
      ddtags: `env:${env.DD_ENV || 'dev'}`,
      site: env.DATADOG_SITE || 'datadoghq.eu'
    })
  ]
});

export default logger;
