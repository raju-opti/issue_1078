import { 
  createInstance, 
  createForwardingEventProcessor,
  createPollingProjectConfigManager,
  EventDispatcher
} from '@optimizely/optimizely-sdk';

// Custom event dispatcher that logs the parameter passed in
const customEventDispatcher: EventDispatcher = {
  dispatchEvent: (logEvent: any): Promise<{ statusCode: number }> => {
    console.log('Event dispatched:', JSON.stringify(logEvent, null, 2));
    return Promise.resolve({ statusCode: 200 });
  }
};

// Create a forwarding event processor with the custom event dispatcher
const forwardingEventProcessor = createForwardingEventProcessor(
  customEventDispatcher
);

// SDK Key
const sdkKey = 'V7S5hWrscThmFyuSPCPsd';

// Create a polling project config manager to fetch datafile using SDK key
const projectConfigManager = createPollingProjectConfigManager({
  sdkKey: sdkKey
});

// Initialize the SDK client
const optimizelyClient = createInstance({
  projectConfigManager: projectConfigManager,
  eventProcessor: forwardingEventProcessor
});

export async function getOptimizelyDecision(): Promise<{
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
    console.log('Optimizely client is ready');
    
    // Create a user context
    const userContext = optimizelyClient.createUserContext('user123', { age: 22 });
    
    // Call decide for the flag
    const decision = userContext.decide('flag');
    
    console.log('Decision result:', {
      variationKey: decision.variationKey,
      enabled: decision.enabled,
      variables: decision.variables,
      ruleKey: decision.ruleKey,
      flagKey: decision.flagKey,
      reasons: decision.reasons
    });

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
