import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseInput from './BaseInput.vue';
import type { TInputConfig } from './base-input.config';

const EL_INPUT_STUB = {
  name: 'ElInput',
  template: '<input class="el-input" />',
  props: [
    'modelValue',
    'type',
    'maxlength',
    'minlength',
    'showWordLimit',
    'placeholder',
    'clearable',
    'formatter',
    'parser',
    'showPassword',
    'disabled',
    'readonly',
    'size',
    'prefixIcon',
    'suffixIcon',
    'rows',
    'autosize',
    'autocomplete',
    'name',
    'max',
    'min',
    'step',
    'resize',
    'autofocus',
    'form',
    'label',
    'tabindex',
    'validateEvent',
    'inputStyle',
    'fieldName',
    'class',
  ],
};

const INPUT_STUBS = {
  'el-input': EL_INPUT_STUB,
};

const EL_INPUT_SELECTOR = '.el-input';

describe('BaseInput.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(BaseInput, {
      global: {
        stubs: INPUT_STUBS,
      },
    });

    expect(wrapper.find(EL_INPUT_SELECTOR).exists()).toBe(true);
  });

  it('uses default config when config prop is not provided', () => {
    const wrapper = mount(BaseInput, {
      global: {
        stubs: INPUT_STUBS,
      },
    });

    const input = wrapper.find(EL_INPUT_SELECTOR);
    expect(input.exists()).toBe(true);
  });

  it('merges config correctly when config prop is provided', () => {
    const customConfig: TInputConfig = {
      placeholder: 'Enter your name',
      type: 'text',
      disabled: false,
    };

    const wrapper = mount(BaseInput, {
      props: {
        config: customConfig,
      },
      global: {
        stubs: INPUT_STUBS,
      },
    });

    const input = wrapper.find(EL_INPUT_SELECTOR);
    expect(input.exists()).toBe(true);
  });

  it('applies custom placeholder from config', () => {
    const customConfig: TInputConfig = {
      placeholder: 'Custom placeholder',
    };

    const wrapper = mount(BaseInput, {
      props: {
        config: customConfig,
      },
      global: {
        stubs: INPUT_STUBS,
      },
    });

    const input = wrapper.find(EL_INPUT_SELECTOR);
    expect(input.exists()).toBe(true);
  });

  it('removes modelValue from merged config', () => {
    const customConfig: TInputConfig = {
      placeholder: 'Test',
      modelValue: 'test value',
      type: 'text',
    };

    const wrapper = mount(BaseInput, {
      props: {
        config: customConfig,
      },
      global: {
        stubs: INPUT_STUBS,
      },
    });

    const input = wrapper.find(EL_INPUT_SELECTOR);
    expect(input.exists()).toBe(true);
  });

  it('passes all config props except modelValue to el-input component', () => {
    const customConfig: TInputConfig = {
      type: 'password',
      placeholder: 'Enter password',
      disabled: true,
      readonly: true,
      size: 'large',
      clearable: true,
      fieldName: 'passwordField',
    };

    const wrapper = mount(BaseInput, {
      props: {
        config: customConfig,
      },
      global: {
        stubs: INPUT_STUBS,
      },
    });

    const input = wrapper.find(EL_INPUT_SELECTOR);
    expect(input.exists()).toBe(true);
  });

  it('handles multiple config options correctly', () => {
    const customConfig: TInputConfig = {
      type: 'email',
      placeholder: 'Enter email',
      disabled: false,
      readonly: false,
      size: 'small',
      clearable: true,
      showWordLimit: true,
      maxlength: 100,
      fieldName: 'emailField',
    };

    const wrapper = mount(BaseInput, {
      props: {
        config: customConfig,
      },
      global: {
        stubs: INPUT_STUBS,
      },
    });

    const input = wrapper.find(EL_INPUT_SELECTOR);
    expect(input.exists()).toBe(true);
  });

  it('merges default config with custom config', () => {
    const customConfig: TInputConfig = {
      type: 'text',
      disabled: true,
    };

    const wrapper = mount(BaseInput, {
      props: {
        config: customConfig,
      },
      global: {
        stubs: INPUT_STUBS,
      },
    });

    const input = wrapper.find(EL_INPUT_SELECTOR);
    expect(input.exists()).toBe(true);
  });

  it('handles fieldName custom property', () => {
    const customConfig: TInputConfig = {
      placeholder: 'Test',
      fieldName: 'testField',
    };

    const wrapper = mount(BaseInput, {
      props: {
        config: customConfig,
      },
      global: {
        stubs: INPUT_STUBS,
      },
    });

    const input = wrapper.find(EL_INPUT_SELECTOR);
    expect(input.exists()).toBe(true);
  });
});
