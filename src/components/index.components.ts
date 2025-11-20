import { defineAsyncComponent } from 'vue';

const BaseField = defineAsyncComponent(() => import('./field/BaseField.vue'));
const BaseForm = defineAsyncComponent(() => import('./form/BaseForm.vue'));
const BaseInput = defineAsyncComponent(() => import('./input/BaseInput.vue'));
const BaseButton = defineAsyncComponent(() => import('./button/BaseButton.vue'));

export { BaseField, BaseForm, BaseInput, BaseButton };
