<script setup lang="ts">
//#region Imports
import { ElInput } from 'element-plus';
import { type IInputConfig, type IInputProps } from './base-input.config';
import { PLACEHOLDER } from '@/constants/index.constants';
//#endregion

//#region Props & Emits
const props = withDefaults(defineProps<IInputProps>(), {
  config: () =>
    ({
      placeholder: PLACEHOLDER.TYPE_VALUE,
    }) as IInputConfig,
});
//#endregion

//#region Composables

//#endregion

//#region Reactive state

//#endregion

//#region Computed

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
  <el-input v-bind="props.config" />
</template>
