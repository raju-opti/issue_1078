import { 
  createInstance, 
  createForwardingEventProcessor,
  createPollingProjectConfigManager,
} from '@optimizely/optimizely-sdk';

// SDK Key
const sdkKey = 'V7S5hWrscThmFyuSPCPsd';

// Create a polling project config manager to fetch datafile using SDK key
const projectConfigManager = createPollingProjectConfigManager({
  sdkKey: sdkKey
});

// Initialize the SDK client
const optimizelyClient = createInstance({
  projectConfigManager: projectConfigManager,
  eventProcessor: createForwardingEventProcessor()
});

async function getOptimizelyDecision(): Promise<{
  variationKey: string | null;
  enabled: boolean;
  variables: any;
  ruleKey: string | null;
  flagKey: string;
  reasons: string[];
  error?: string;
}> {
  try {
    // Wait for the client to be ready
    await optimizelyClient.onReady();
    
    // Create a user context
    const userContext = optimizelyClient.createUserContext('user123', { age: 22 });
    
    // Call decide for the flag
    const decision = userContext.decide('flag');
    
    return {
      variationKey: decision.variationKey,
      enabled: decision.enabled,
      variables: decision.variables,
      ruleKey: decision.ruleKey,
      flagKey: decision.flagKey,
      reasons: decision.reasons
    };
  } catch (error) {
    console.error('Error getting Optimizely decision:', error);
    return {
      variationKey: null,
      enabled: false,
      variables: {},
      ruleKey: null,
      flagKey: 'flag',
      reasons: [],
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export default defineNitroPlugin((nitroApp) => {
  console.log('Nitro plugin initialized');

  nitroApp.hooks.hook('request', async (event) => {
    const decision = await getOptimizelyDecision();
    
    // Store the decision in the event context so it can be accessed by components
    event.context.optimizelyDecision = decision;
    event.context.pluginMessage = `Hello from Nitro Plugin! Variation: ${decision.variationKey || 'none'}`;
    
    // Add headers as well
    event.node.res.setHeader('X-Hello-World', 'Nitro Plugin Active');
    event.node.res.setHeader('X-Opti-Variation', decision.variationKey || 'none');
  });

  nitroApp.hooks.hook('beforeResponse', async (event, { body }) => {
    console.log('decison from nitro plugin: ', event.context.optimizelyDecision);
    console.log('Hello World - Response being sent for:', event.node.req.url);
  });
});
