<script setup lang="ts">
import { ref } from 'vue';
import * as yup from 'yup';
import { useForm } from 'vee-validate';
import { Lock, Message } from '@element-plus/icons-vue';
import { Icon } from '@iconify/vue';
import { EFieldType } from '@/constants/index.constants';
import { BaseField, BaseButton, BaseInput } from '@/components/index.components';
import type { TInputConfig } from '@/components/input/base-input.config';
import type { TButtonConfig } from '@/components/button/base-button.config';

const { values } = useForm({
  validationSchema: yup.object({
    account: yup.string().trim().required('123'),
  }),
});

const passwordValue = ref<string>('');

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
</script>

<template>
  <div class="p-[20px] w-1/2">
    <BaseField
      field-name="account"
      :field-type="EFieldType.Input"
      :field-config="inputAccountConfig"
    />
    <BaseInput v-model:value="passwordValue" :config="inputPasswordConfig" />
    <BaseButton :config="btnForgotConfig"> Forgot Password? </BaseButton>
    <BaseButton :config="btnSubmitConfig"> Get Started </BaseButton>
    <div class="flex items-center justify-between">
      <BaseButton :config="btnGoogleConfig">
        <Icon icon="material-icon-theme:google" :width="18" :height="18" />
      </BaseButton>
      <BaseButton :config="btnFacebookConfig">
        <Icon icon="logos:facebook" :width="18" :height="18" />
      </BaseButton>
    </div>
    <p>{{ values }}</p>
  </div>
</template>
