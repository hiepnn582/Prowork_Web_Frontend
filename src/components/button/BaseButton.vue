<script setup lang="ts">
//#region Imports
import { computed } from 'vue';
import { ElButton } from 'element-plus';
import { type TButtonConfig, type IButtonProps, DEFAULT_CONFIG } from './base-button.config';
//#endregion

//#region Props & Emits
const props = defineProps<IButtonProps>();
//#endregion

//#region Composables

//#endregion

//#region Reactive state

//#endregion

//#region Computed
const mergedConfig = computed<TButtonConfig>(() =>
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
  <div class="base-button-wrapper">
    <el-button v-bind="mergedConfig">
      <slot />
    </el-button>
  </div>
</template>
