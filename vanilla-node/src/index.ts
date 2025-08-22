import { 
  createInstance, 
  createForwardingEventProcessor,
  createPollingProjectConfigManager,
  EventDispatcher
} from '@optimizely/optimizely-sdk';

const customEventDispatcher: EventDispatcher = {
  dispatchEvent: (logEvent: any): Promise<{ statusCode: number }> => {
    console.log('Event dispatched:', JSON.stringify(logEvent, null, 2));
    return Promise.resolve({ statusCode: 200 });
  }
};

const forwardingEventProcessor = createForwardingEventProcessor(
  customEventDispatcher
);

const sdkKey = 'V7S5hWrscThmFyuSPCPsd';

const projectConfigManager = createPollingProjectConfigManager({
  sdkKey: sdkKey
});

const optimizelyClient = createInstance({
  projectConfigManager: projectConfigManager,
  eventProcessor: forwardingEventProcessor
});

optimizelyClient.onReady().then(() => {
  console.log('Optimizely client is ready');
  
  const userContext = optimizelyClient.createUserContext('user123', { age: 22 });
  
  const decision = userContext.decide('flag');
  
  console.log('Decision result:', {
    variationKey: decision.variationKey,
    enabled: decision.enabled,
    variables: decision.variables,
    ruleKey: decision.ruleKey,
    flagKey: decision.flagKey,
    reasons: decision.reasons
  });
}).catch((error) => {
  console.error('Error initializing Optimizely client:', error);
});
