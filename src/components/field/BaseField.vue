<script setup lang="ts">
//#region Imports
import { computed, ref } from 'vue';
import { useField } from 'vee-validate';
import { ElFormItem } from 'element-plus';
import { fieldComponentMapper } from '@/constants/index.constants';
import { type TFormItemConfig, type IFieldProps, DEFAULT_CONFIG } from './base-field.config';
//#endregion

//#region Props & Emits
const props = defineProps<IFieldProps>();
//#endregion

//#region Composables

//#endregion

//#region Reactive state
const { value, errorMessage } = useField(() => props.fieldName);

const error = ref({
  error: errorMessage,
  validateEvent: true,
});

//#endregion

//#region Computed
const mergedConfig = computed<TFormItemConfig>(() =>
  props.config ? { ...DEFAULT_CONFIG, ...error, ...props.config } : { ...DEFAULT_CONFIG, ...error },
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
  <el-form-item v-bind="mergedConfig">
    <component :is="fieldComponentMapper[fieldType]" v-model="value" v-bind="fieldConfig" />
  </el-form-item>
</template>
