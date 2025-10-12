import { json } from '@sveltejs/kit';
import logger from '$lib/monitoring/server/logger';

export async function GET({ url }) {
  const startTime = Date.now();
  const requestId = crypto.randomUUID();

  logger.info('Cat fact requested', {
    requestId,
    path: url.pathname
  });

  try {
    const response = await fetch('https://catfact.ninja/fact');
    
    if (!response.ok) {
      throw new Error(`Cat API returned status ${response.status}`);
    }

    const data = await response.json();
    const duration = Date.now() - startTime;

    logger.info('Cat fact fetched successfully', {
      requestId,
      duration: `${duration}ms`,
      factLength: data.fact.length,
      status: 200
    });

    return json({
      success: true,
      fact: data.fact,
      length: data.length
    });

  } catch (error) {
    const duration = Date.now() - startTime;

    logger.error('Failed to fetch cat fact', {
      requestId,
      error: error.message,
      stack: error.stack,
      duration: `${duration}ms`,
      status: 500
    });

    return json({
      success: false,
      error: 'Failed to fetch cat fact'
    }, { status: 500 });
  }
}
