// Your custom interactions with the page
import {
  createUserFlowRunner,
  UserFlowContext,
  UserFlowInteractionsFn,
  UserFlowProvider,
} from '@push-based/user-flow';

const interactions: UserFlowInteractionsFn = async (
  ctx: UserFlowContext
): Promise<any> => {
  const { flow, collectOptions, page } = ctx;
  const { url } = collectOptions;

  await flow.navigate(url, {
    stepName: 'Navigate to Popular',
  });

  // your code goes here
};

const userFlowProvider: UserFlowProvider = {
  flowOptions: {
    name: 'Movie Audit',
    config: {
      settings: {
        throttlingMethod: 'devtools',
        throttling: {
          rttMs: 40,
          throughputKbps: 10 * 1024,
          cpuSlowdownMultiplier: 2,
          requestLatencyMs: 40, // 0 means unset
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
        formFactor: 'desktop',
        screenEmulation: {
          height: 1080,
          width: 1920,
          mobile: false,
          deviceScaleFactor: 1,
        },
      },
    },
  },
  interactions,
  launchOptions: {
    headless: false,
  },
};

module.exports = userFlowProvider;
