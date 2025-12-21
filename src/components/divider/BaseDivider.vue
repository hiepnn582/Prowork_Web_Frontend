<script setup lang="ts">
//#region Imports
import { computed } from 'vue';
import { ElDivider } from 'element-plus';
import { type TDividerConfig, type IDividerProps, DEFAULT_CONFIG } from './base-divider.config';
//#endregion

//#region Props & Emits
const props = defineProps<IDividerProps>();
//#endregion

//#region Composables

//#endregion

//#region Reactive state

//#endregion

//#region Computed
const mergedConfig = computed<TDividerConfig>(() =>
  props.config ? { ...DEFAULT_CONFIG, ...props.config } : DEFAULT_CONFIG,
);
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
  <el-divider v-bind="mergedConfig">
    <slot />
  </el-divider>
</template>
