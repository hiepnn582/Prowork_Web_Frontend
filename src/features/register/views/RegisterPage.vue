<script setup lang="ts">
//#region Imports
import { h } from 'vue';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { Icon } from '@iconify/vue';
import { Lock, Message } from '@element-plus/icons-vue';
import { EFieldType } from '@/constants/index.constants';
import { BaseField, BaseForm } from '@/components/index.components';
import type { TFormConfig } from '@/components/form/base-form.config';
import type { TInputConfig } from '@/components/input/base-input.config';
import type { TButtonConfig } from '@/components/button/base-button.config';
//#endregion

//#region Props & Emits

//#endregion

//#region Composables
const { values, handleSubmit } = useForm({
  validationSchema: yup.object({
    account: yup.string().trim().required('Account is required'),
    password: yup.string().trim().required('Password is required'),
  }),
});

const inputAccountConfig: TInputConfig = {
  placeholder: 'Email',
  prefixIcon: Message,
};
const inputPasswordConfig: TInputConfig = {
  type: 'password',
  placeholder: 'Password',
  showPassword: true,
  prefixIcon: Lock,
};
const btnForgotConfig: TButtonConfig = {
  type: 'text',
};
const btnSubmitConfig: TButtonConfig = {
  type: 'primary',
  class: 'w-full',
};
const btnGoogleConfig: TButtonConfig = {
  type: 'default',
};
const btnFacebookConfig: TButtonConfig = {
  type: 'default',
};
//#endregion

//#region Reactive state

//#endregion

//#region Computed

//#endregion

//#region Methods
const onSubmit = handleSubmit(() => {});

const onClickSubmit = () => {
  onSubmit();
};

const formConfig: TFormConfig = {
  fieldPropsList: [
    {
      fieldName: 'account',
      fieldType: EFieldType.Input,
      fieldConfig: inputAccountConfig,
    },
    {
      fieldName: 'password',
      fieldType: EFieldType.Input,
      fieldConfig: inputPasswordConfig,
    },
    {
      fieldName: 'forgotButton',
      fieldType: EFieldType.Button,
      fieldConfig: btnForgotConfig,
      content: () => h('span', null, 'Forgot Password?'),
    },
    {
      fieldName: 'submitButton',
      fieldType: EFieldType.Button,
      fieldConfig: btnSubmitConfig,
      content: () => h('span', null, 'Get Started'),
      onClick: onClickSubmit,
    },
  ],
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
  <div class="p-[20px] w-1/2">
    <BaseForm :config="formConfig" />
    <div class="flex items-center justify-between">
      <BaseField
        field-name="googlePasswordButton"
        :field-type="EFieldType.Button"
        :field-config="btnGoogleConfig"
      >
        <Icon icon="material-icon-theme:google" :width="18" :height="18" />
      </BaseField>
      <BaseField
        field-name="facebookPasswordButton"
        :field-type="EFieldType.Button"
        :field-config="btnFacebookConfig"
      >
        <Icon icon="logos:facebook" :width="18" :height="18" />
      </BaseField>
    </div>
    <p>{{ values }}</p>
  </div>
</template>
