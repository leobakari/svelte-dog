import logger from '$lib/monitoring/server/logger';

export async function handle({ event, resolve }) {
  const startTime = Date.now();
  const requestId = crypto.randomUUID();
  
  event.locals.requestId = requestId;

  logger.info('Request received', {
    requestId,
    method: event.request.method,
    url: event.url.pathname,
    userAgent: event.request.headers.get('user-agent'),
    ip: event.getClientAddress()
  });

  try {
    const response = await resolve(event);
    const duration = Date.now() - startTime;

    logger.info('Request completed', {
      requestId,
      method: event.request.method,
      url: event.url.pathname,
      status: response.status,
      duration: `${duration}ms`
    });

    return response;
  } catch (error) {
    const duration = Date.now() - startTime;

    logger.error('Request failed', {
      requestId,
      method: event.request.method,
      url: event.url.pathname,
      error: error.message,
      stack: error.stack,
      duration: `${duration}ms`
    });

    throw error;
  }
}
