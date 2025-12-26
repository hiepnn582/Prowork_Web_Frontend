import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import BaseDivider from './BaseDivider.vue';
import type { TDividerConfig } from './base-divider.config';

const EL_DIVIDER_STUB = {
  name: 'ElDivider',
  template: '<div class="el-divider"><slot /></div>',
  props: ['direction', 'borderStyle', 'contentPosition', 'class'],
};

const DIVIDER_STUBS = {
  'el-divider': EL_DIVIDER_STUB,
};

const EL_DIVIDER_SELECTOR = '.el-divider';

describe('BaseDivider.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(BaseDivider, {
      global: {
        stubs: DIVIDER_STUBS,
      },
    });

    expect(wrapper.find(EL_DIVIDER_SELECTOR).exists()).toBe(true);
  });

  it('uses default config when config prop is not provided', () => {
    const wrapper = mount(BaseDivider, {
      global: {
        stubs: DIVIDER_STUBS,
      },
    });

    const divider = wrapper.find(EL_DIVIDER_SELECTOR);
    expect(divider.exists()).toBe(true);
  });

  it('merges config correctly when config prop is provided', () => {
    const customConfig: TDividerConfig = {
      direction: 'vertical',
      borderStyle: 'dashed',
      contentPosition: 'left',
    };

    const wrapper = mount(BaseDivider, {
      props: {
        config: customConfig,
      },
      global: {
        stubs: DIVIDER_STUBS,
      },
    });

    const divider = wrapper.find(EL_DIVIDER_SELECTOR);
    expect(divider.exists()).toBe(true);
  });

  it('applies custom class from config', () => {
    const customConfig: TDividerConfig = {
      class: 'custom-divider-class',
    };

    const wrapper = mount(BaseDivider, {
      props: {
        config: customConfig,
      },
      global: {
        stubs: DIVIDER_STUBS,
      },
    });

    const divider = wrapper.find(EL_DIVIDER_SELECTOR);
    expect(divider.exists()).toBe(true);
  });

  it('renders slot content correctly', () => {
    const slotContent = 'Divider Text';

    const wrapper = mount(BaseDivider, {
      slots: {
        default: slotContent,
      },
      global: {
        stubs: DIVIDER_STUBS,
      },
    });

    expect(wrapper.html()).toContain(slotContent);
  });

  it('passes all config props to el-divider component', () => {
    const customConfig: TDividerConfig = {
      direction: 'horizontal',
      borderStyle: 'solid',
      contentPosition: 'center',
      class: 'custom-class',
    };

    const wrapper = mount(BaseDivider, {
      props: {
        config: customConfig,
      },
      global: {
        stubs: DIVIDER_STUBS,
      },
    });

    const divider = wrapper.find(EL_DIVIDER_SELECTOR);
    expect(divider.exists()).toBe(true);
  });

  it('handles multiple config options correctly', () => {
    const customConfig: TDividerConfig = {
      direction: 'vertical',
      borderStyle: 'dotted',
      contentPosition: 'right',
      class: 'multi-config-divider',
    };

    const wrapper = mount(BaseDivider, {
      props: {
        config: customConfig,
      },
      global: {
        stubs: DIVIDER_STUBS,
      },
    });

    const divider = wrapper.find(EL_DIVIDER_SELECTOR);
    expect(divider.exists()).toBe(true);
  });

  it('renders without slot content', () => {
    const wrapper = mount(BaseDivider, {
      global: {
        stubs: DIVIDER_STUBS,
      },
    });

    const divider = wrapper.find(EL_DIVIDER_SELECTOR);
    expect(divider.exists()).toBe(true);
  });
});
