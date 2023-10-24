import { handleErrorWithSentry, Replay } from "@sentry/sveltekit";
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
  environment: 'development',
  dsn: 'https://06fd9630d486ad4f3c5f8817673cde5e@o4506077215064064.ingest.sentry.io/4506103781130240',
  tracesSampleRate: 1.0,

  // This sets the sample rate to be 10%. You may want this to be 100% while
  // in development and sample at a lower rate in production
  replaysSessionSampleRate: 0.1,

  // If the entire session is not sampled, use the below sample rate to sample
  // sessions when an error occurs.
  replaysOnErrorSampleRate: 1.0,
  
  // If you don't want to use Session Replay, just remove the line below:
  integrations: [new Replay()],
});

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
