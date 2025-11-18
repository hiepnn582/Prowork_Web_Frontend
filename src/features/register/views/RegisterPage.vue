<script setup lang="ts">
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { Lock, Message } from '@element-plus/icons-vue';
import { Icon } from '@iconify/vue';
import { EFieldType } from '@/constants/index.constants';
import { BaseField } from '@/components/index.components';
import type { TInputConfig } from '@/components/input/base-input.config';
import type { TButtonConfig } from '@/components/button/base-button.config';

const { values, handleSubmit } = useForm({
  validationSchema: yup.object({
    account: yup.string().trim().required('123'),
    password: yup.string().trim().required('123'),
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

const onSubmit = handleSubmit(() => {});

const onClickSubmit = () => {
  onSubmit();
};
</script>

<template>
  <div class="p-[20px] w-1/2">
    <BaseField
      field-name="account"
      :field-type="EFieldType.Input"
      :field-config="inputAccountConfig"
    />
    <BaseField
      field-name="password"
      :field-type="EFieldType.Input"
      :field-config="inputPasswordConfig"
    />
    <BaseField
      field-name="forgotButton"
      :field-type="EFieldType.Button"
      :field-config="btnForgotConfig"
    >
      Forgot Password?
    </BaseField>
    <BaseField
      field-name="submitButton"
      :field-type="EFieldType.Button"
      :field-config="btnSubmitConfig"
      @onClick="() => onClickSubmit()"
    >
      Get Started
    </BaseField>
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
