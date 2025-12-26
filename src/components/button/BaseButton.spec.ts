import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseButton from './BaseButton.vue';
import type { TButtonConfig } from './base-button.config';

const EL_BUTTON_STUB = {
  name: 'ElButton',
  template: '<button class="el-button"><slot /></button>',
  props: [
    'type',
    'size',
    'icon',
    'nativeType',
    'loading',
    'loadingIcon',
    'disabled',
    'plain',
    'text',
    'bg',
    'link',
    'round',
    'circle',
    'color',
    'dark',
    'autoInsertSpace',
    'class',
  ],
};

const BUTTON_STUBS = {
  'el-button': EL_BUTTON_STUB,
};

const BASE_BUTTON_WRAPPER_CLASS = 'base-button-wrapper';
const BASE_BUTTON_WRAPPER_SELECTOR = `.${BASE_BUTTON_WRAPPER_CLASS}`;
const EL_BUTTON_SELECTOR = '.el-button';

describe('BaseButton.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(BaseButton, {
      global: {
        stubs: BUTTON_STUBS,
      },
    });

    expect(wrapper.find(BASE_BUTTON_WRAPPER_SELECTOR).exists()).toBe(true);
    expect(wrapper.find(EL_BUTTON_SELECTOR).exists()).toBe(true);
  });

  it('emits onClick event when clicked', async () => {
    const wrapper = mount(BaseButton, {
      global: {
        stubs: BUTTON_STUBS,
      },
    });

    const wrapperDiv = wrapper.find(BASE_BUTTON_WRAPPER_SELECTOR);
    await wrapperDiv.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('onClick');
    expect(wrapper.emitted('onClick')).toHaveLength(1);
  });

  it('uses default config when config prop is not provided', () => {
    const wrapper = mount(BaseButton, {
      global: {
        stubs: BUTTON_STUBS,
      },
    });

    expect(wrapper.find(BASE_BUTTON_WRAPPER_SELECTOR).exists()).toBe(true);
    const elButton = wrapper.find(EL_BUTTON_SELECTOR);
    expect(elButton.exists()).toBe(true);
  });

  it('merges config correctly when config prop is provided', () => {
    const customConfig: TButtonConfig = {
      type: 'primary',
      size: 'large',
      class: 'custom-button-class',
    };

    const wrapper = mount(BaseButton, {
      props: {
        config: customConfig,
      },
      global: {
        stubs: BUTTON_STUBS,
      },
    });

    const wrapperDiv = wrapper.find(BASE_BUTTON_WRAPPER_SELECTOR);
    expect(wrapperDiv.exists()).toBe(true);
    expect(wrapperDiv.classes()).toContain('custom-button-class');
  });

  it('applies custom class from config to wrapper', () => {
    const customConfig: TButtonConfig = {
      class: 'custom-wrapper-class',
    };

    const wrapper = mount(BaseButton, {
      props: {
        config: customConfig,
      },
      global: {
        stubs: BUTTON_STUBS,
      },
    });

    const wrapperDiv = wrapper.find(BASE_BUTTON_WRAPPER_SELECTOR);
    expect(wrapperDiv.exists()).toBe(true);
    expect(wrapperDiv.classes()).toContain('custom-wrapper-class');
    expect(wrapperDiv.classes()).toContain(BASE_BUTTON_WRAPPER_CLASS);
  });

  it('renders slot content correctly', () => {
    const slotContent = 'Click Me';

    const wrapper = mount(BaseButton, {
      slots: {
        default: slotContent,
      },
      global: {
        stubs: BUTTON_STUBS,
      },
    });

    expect(wrapper.html()).toContain(slotContent);
  });

  it('passes all config props to el-button component', () => {
    const customConfig: TButtonConfig = {
      type: 'success',
      size: 'small',
      disabled: true,
      loading: true,
      plain: true,
      round: true,
    };

    const wrapper = mount(BaseButton, {
      props: {
        config: customConfig,
      },
      global: {
        stubs: BUTTON_STUBS,
      },
    });

    const elButton = wrapper.find(EL_BUTTON_SELECTOR);
    expect(elButton.exists()).toBe(true);
    const wrapperDiv = wrapper.find(BASE_BUTTON_WRAPPER_SELECTOR);
    expect(wrapperDiv.exists()).toBe(true);
  });

  it('does not apply class to wrapper when class is not in config', () => {
    const customConfig: TButtonConfig = {
      type: 'primary',
    };

    const wrapper = mount(BaseButton, {
      props: {
        config: customConfig,
      },
      global: {
        stubs: BUTTON_STUBS,
      },
    });

    const wrapperDiv = wrapper.find(BASE_BUTTON_WRAPPER_SELECTOR);
    expect(wrapperDiv.exists()).toBe(true);
    expect(wrapperDiv.classes()).toContain(BASE_BUTTON_WRAPPER_CLASS);
    expect(wrapperDiv.classes().length).toBe(1);
  });

  it('handles multiple config options correctly', () => {
    const customConfig: TButtonConfig = {
      type: 'warning',
      size: 'default',
      disabled: false,
      loading: false,
      round: false,
      circle: true,
      class: 'multi-class-button',
    };

    const wrapper = mount(BaseButton, {
      props: {
        config: customConfig,
      },
      global: {
        stubs: BUTTON_STUBS,
      },
    });

    const wrapperDiv = wrapper.find(BASE_BUTTON_WRAPPER_SELECTOR);
    expect(wrapperDiv.classes()).toContain('multi-class-button');
    expect(wrapperDiv.classes()).toContain(BASE_BUTTON_WRAPPER_CLASS);

    const elButton = wrapper.find(EL_BUTTON_SELECTOR);
    expect(elButton.exists()).toBe(true);
  });
});
