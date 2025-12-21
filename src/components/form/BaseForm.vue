<script setup lang="ts">
//#region Imports
import { computed } from 'vue';
import { ElForm } from 'element-plus';
import { type TFormConfig, type IFormProps, DEFAULT_CONFIG } from './base-form.config';
import BaseField from '../field/BaseField.vue';
//#endregion

//#region Props & Emits
const props = defineProps<IFormProps>();

const emit = defineEmits<{
  onClick: [];
}>();
//#endregion

//#region Composables

//#endregion

//#region Reactive state

//#endregion

//#region Computed
const mergedConfig = computed<TFormConfig>(() =>
  props.config ? { ...DEFAULT_CONFIG, ...props.config } : { ...DEFAULT_CONFIG },
);
//#endregion

//#region Methods
const handleClickField = () => {
  emit('onClick');
};
//#endregion

//#region Lifecycle hooks

//#endregion

//#region Watch/WatchEffect

//#endregion

//#region Expose

//#endregion
</script>

<template>
  <el-form v-bind="mergedConfig">
    <BaseField
      v-for="(fieldProp, index) in mergedConfig.fieldPropsList"
      :key="index"
      v-bind="fieldProp"
    >
      <component v-if="fieldProp.content" :is="fieldProp.content()" @onClick="handleClickField" />
    </BaseField>
  </el-form>
</template>
