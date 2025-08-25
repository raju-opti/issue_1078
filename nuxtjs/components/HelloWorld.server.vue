<template>
  <div>
    <div v-if="pluginMessage" style="margin-top: 20px; padding: 15px; background: #f0f0f0; border-radius: 5px;">
      <h3>Plugin Message:</h3>
      <p>{{ pluginMessage }}</p>
    </div>
    <div v-if="optimizelyDecision" style="margin-top: 20px; padding: 15px; background: #e6f3ff; border-radius: 5px;">
      <h3>Optimizely Decision:</h3>
      <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 3px;">
        <thead>
          <tr style="background: #f8f9fa;">
            <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6; font-weight: bold;">Field</th>
            <th style="padding: 12px; text-align: left; border: 1px solid #dee2e6; font-weight: bold;">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: 500;">Flag Key</td>
            <td style="padding: 12px; border: 1px solid #dee2e6;">{{ optimizelyDecision.flagKey || 'N/A' }}</td>
          </tr>
          <tr style="background: #f8f9fa;">
            <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: 500;">Variation Key</td>
            <td style="padding: 12px; border: 1px solid #dee2e6;">{{ optimizelyDecision.variationKey || 'N/A' }}</td>
          </tr>
          <tr>
            <td style="padding: 12px; border: 1px solid #dee2e6; font-weight: 500;">Enabled</td>
            <td style="padding: 12px; border: 1px solid #dee2e6;">
              <span :style="{ color: optimizelyDecision.enabled ? '#28a745' : '#dc3545', fontWeight: 'bold' }">
                {{ optimizelyDecision.enabled ? 'Yes' : 'No' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
console.log('hello world');

// Get the current event context from Nitro
const event = await useRequestEvent();

// Extract plugin data from event context
const pluginMessage = event?.context?.pluginMessage;
const optimizelyDecision = event?.context?.optimizelyDecision;

console.log('pluginMessage: ', pluginMessage);
</script>
