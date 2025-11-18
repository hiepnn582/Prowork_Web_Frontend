<script setup lang="ts">
//#region Imports
import { computed } from 'vue';
import { ElInput } from 'element-plus';
import { type TInputConfig, type IInputProps, DEFAULT_CONFIG } from './base-input.config';
//#endregion

//#region Props & Emits
const props = defineProps<IInputProps>();

const value = defineModel<string | number>('value');
//#endregion

//#region Composables

//#endregion

//#region Reactive state

//#endregion

//#region Computed
const mergedConfig = computed<TInputConfig>(() => {
  const config = props.config ? { ...DEFAULT_CONFIG, ...props.config } : DEFAULT_CONFIG;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { modelValue: _, ...restConfig } = config;
  return restConfig as TInputConfig;
});
//#endregion

//#region Methods

//#endregion

//#region Lifecycle hooks

//#endregion

//#region Watch/WatchEffect

//#endregion

//#region Expose

//#endregion
</script>

<template>
  <el-input v-model="value" v-bind="mergedConfig" />
</template>
