<script setup lang="ts">
//#region Imports
import * as yup from 'yup';
import { Icon } from '@iconify/vue';
import { useForm } from 'vee-validate';
import { Lock, Message } from '@element-plus/icons-vue';
import { EFieldType } from '@/constants/index.constants';
import { BaseButton, BaseDivider, BaseForm } from '@/components/index.components';
import type { TFormConfig } from '@/components/form/base-form.config';
import type { TInputConfig } from '@/components/input/base-input.config';
import type { TButtonConfig } from '@/components/button/base-button.config';
import {
  validationMessage,
  VALIDATION_NUMBER,
  VALIDATION_REGEX,
} from '@/constants/validate.constants';
import type { TDividerConfig } from '@/components/divider/base-divider.config';
import { FIELD_NAME } from '../constants/field.constants';
//#endregion

//#region Props & Emits

//#endregion

//#region Composables
const { handleSubmit } = useForm({
  validationSchema: yup.object({
    username: yup
      .string()
      .trim()
      .required(validationMessage.required(FIELD_NAME.USERNAME))
      .max(
        VALIDATION_NUMBER.MAX_USERNAME_CHARACTERS,
        validationMessage.maxCharacters(
          FIELD_NAME.USERNAME,
          VALIDATION_NUMBER.MAX_USERNAME_CHARACTERS,
        ),
      ),
    password: yup
      .string()
      .trim()
      .required(validationMessage.required(FIELD_NAME.PASSWORD))
      .min(
        VALIDATION_NUMBER.MIN_PASSWORD_CHARACTERS,
        validationMessage.minCharacters(
          FIELD_NAME.PASSWORD,
          VALIDATION_NUMBER.MIN_PASSWORD_CHARACTERS,
        ),
      )
      .max(
        VALIDATION_NUMBER.MAX_PASSWORD_CHARACTERS,
        validationMessage.maxCharacters(
          FIELD_NAME.PASSWORD,
          VALIDATION_NUMBER.MAX_PASSWORD_CHARACTERS,
        ),
      )
      .matches(VALIDATION_REGEX.PASSWORD_RULES, validationMessage.passwordRules),
    confirmPassword: yup
      .string()
      .trim()
      .required(validationMessage.required(FIELD_NAME.CONFIRM_PASSWORD))
      .oneOf([yup.ref('password')], validationMessage.confirmPasswordRules),
  }),
});

const inputUsernameConfig: TInputConfig = {
  placeholder: FIELD_NAME.USERNAME,
  prefixIcon: Message,
};

const inputPasswordConfig: TInputConfig = {
  type: 'password',
  placeholder: FIELD_NAME.PASSWORD,
  showPassword: true,
  prefixIcon: Lock,
};

const inputConfirmPasswordConfig: TInputConfig = {
  type: 'password',
  placeholder: FIELD_NAME.CONFIRM_PASSWORD,
  showPassword: true,
  prefixIcon: Lock,
};

const btnForgotConfig: TButtonConfig = {
  type: 'text',
  class: 'mb-[4px]',
};

const btnSubmitConfig: TButtonConfig = {
  type: 'primary',
  class: 'w-full',
};

const btnGoogleConfig: TButtonConfig = {
  type: 'default',
  class: 'w-full',
};

const btnFacebookConfig: TButtonConfig = {
  type: 'default',
  class: 'w-full',
};

const dividerConfig: TDividerConfig = {
  borderStyle: 'dashed',
  class: 'register-divider',
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
      fieldName: 'username',
      fieldType: EFieldType.Input,
      fieldConfig: inputUsernameConfig,
    },
    {
      fieldName: 'password',
      fieldType: EFieldType.Input,
      fieldConfig: inputPasswordConfig,
    },
    {
      fieldName: 'confirmPassword',
      fieldType: EFieldType.Input,
      fieldConfig: inputConfirmPasswordConfig,
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
  <div class="w-screen h-screen overflow-hidden bg-[#bc84e1] flex items-center justify-center">
    <div
      class="shadow-lg w-[400px] max-w-[94%] max-h-[96%] bg-white rounded-3xl p-[20px] sm:p-[40px]"
    >
      <img
        src="/src/assets/images/logo_circle.png"
        alt="logo"
        class="shadow-lg rounded-[20px] size-[80px] mx-auto mb-[18px] select-none"
      />
      <h1 class="text-center text-[24px] font-semibold mb-[4px] select-none">Register</h1>
      <p class="text-center text-gray mb-[18px] leading-5 px-[20px] select-none">
        Stop managing tasks, start executing goals. For free
      </p>
      <BaseForm :config="formConfig" />
      <div class="flex items-center justify-end">
        <BaseButton :config="btnForgotConfig"> Forgot Password? </BaseButton>
      </div>
      <BaseButton :config="btnSubmitConfig" @onClick="() => onClickSubmit()">
        Get Started
      </BaseButton>
      <p class="text-center text-[13px] my-[12px] text-gray select-none">
        <BaseDivider :config="dividerConfig"> Or register with </BaseDivider>
      </p>
      <div class="flex items-center justify-between gap-x-[20px]">
        <BaseButton :config="btnGoogleConfig">
          <Icon icon="material-icon-theme:google" :width="18" :height="18" />
        </BaseButton>
        <BaseButton :config="btnFacebookConfig">
          <Icon icon="logos:facebook" :width="18" :height="18" />
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.register-divider .el-divider__text) {
  font-size: 13px;
}
</style>
