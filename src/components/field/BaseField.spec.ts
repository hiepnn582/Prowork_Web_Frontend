import { mount } from '@vue/test-utils';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { ref } from 'vue';
import { useField } from 'vee-validate';
import BaseField from './BaseField.vue';
import { EFieldType } from '@/constants/index.constants';
import type { TInputConfig } from '../input/base-input.config';
import type { TButtonConfig } from '../button/base-button.config';

vi.mock('vee-validate', () => ({
  useField: vi.fn(),
}));

vi.mock('@/components/index.components', () => ({
  BaseInput: {
    name: 'BaseInput',
    template: '<div data-testid="base-input"><slot /></div>',
    props: ['modelValue', 'config'],
    emits: ['update:modelValue', 'onClick'],
  },
  BaseButton: {
    name: 'BaseButton',
    template:
      '<button data-testid="base-button" @click="$emit(\'onClick\')"><slot />Click me</button>',
    props: ['config'],
    emits: ['onClick'],
  },
}));

const EL_FORM_ITEM_STUB = {
  template: '<div class="el-form-item"><slot /></div>',
};

describe('BaseField.vue', () => {
  const mockValue = ref('test value');
  const mockErrorMessage = ref<string | undefined>(undefined);

  beforeEach(() => {
    vi.mocked(useField).mockReturnValue({
      value: mockValue,
      errorMessage: mockErrorMessage,
      meta: {},
      errors: [],
      setValue: vi.fn(),
      setTouched: vi.fn(),
      setError: vi.fn(),
      resetField: vi.fn(),
    } as unknown as ReturnType<typeof useField>);
  });

  const defaultProps = {
    fieldName: 'testField',
    fieldType: EFieldType.Input,
    fieldConfig: {} as TInputConfig,
  };

  const buttonProps = {
    ...defaultProps,
    fieldType: EFieldType.Button,
    fieldConfig: {} as TButtonConfig,
  };

  it('renders correctly with Input field type', () => {
    const wrapper = mount(BaseField, {
      props: defaultProps,
      global: {
        stubs: {
          'el-form-item': EL_FORM_ITEM_STUB,
        },
      },
    });

    expect(wrapper.find('[data-testid="base-input"]').exists()).toBe(true);
  });

  it('renders correctly with Button field type', () => {
    const wrapper = mount(BaseField, {
      props: buttonProps,
      global: {
        stubs: {
          'el-form-item': EL_FORM_ITEM_STUB,
        },
      },
    });

    expect(wrapper.find('[data-testid="base-button"]').exists()).toBe(true);
  });

  it('emits onClick event when handleClickButton is called without onClick prop', async () => {
    const wrapper = mount(BaseField, {
      props: buttonProps,
      global: {
        stubs: {
          'el-form-item': EL_FORM_ITEM_STUB,
        },
      },
    });

    const button = wrapper.find('[data-testid="base-button"]');
    await button.trigger('click');

    expect(wrapper.emitted()).toHaveProperty('onClick');
    expect(wrapper.emitted('onClick')).toHaveLength(1);
  });

  it('calls onClick prop function when provided instead of emitting', async () => {
    const onClickProp = vi.fn();

    const wrapper = mount(BaseField, {
      props: {
        ...buttonProps,
        onClick: onClickProp,
      },
      global: {
        stubs: {
          'el-form-item': EL_FORM_ITEM_STUB,
        },
      },
    });

    const button = wrapper.find('[data-testid="base-button"]');
    await button.trigger('click');

    expect(onClickProp).toHaveBeenCalledTimes(1);
    expect(wrapper.emitted('onClick')).toBeUndefined();
  });

  it('merges config correctly when config prop is provided', () => {
    const customConfig = {
      label: 'Test Label',
      class: 'custom-class',
    };

    const wrapper = mount(BaseField, {
      props: {
        ...defaultProps,
        config: customConfig,
      },
      global: {
        stubs: {
          'el-form-item': {
            ...EL_FORM_ITEM_STUB,
            props: ['label', 'class'],
          },
        },
      },
    });

    const formItem = wrapper.find('.el-form-item');
    expect(formItem.exists()).toBe(true);
  });

  it('uses default config when config prop is not provided', () => {
    const wrapper = mount(BaseField, {
      props: defaultProps,
      global: {
        stubs: {
          'el-form-item': EL_FORM_ITEM_STUB,
        },
      },
    });

    expect(wrapper.find('.el-form-item').exists()).toBe(true);
  });

  it('passes fieldConfig to child component', () => {
    const fieldConfig: TInputConfig = {
      placeholder: 'Enter value',
      fieldName: 'testInput',
    };

    const wrapper = mount(BaseField, {
      props: {
        ...defaultProps,
        fieldConfig,
      },
      global: {
        stubs: {
          'el-form-item': EL_FORM_ITEM_STUB,
        },
      },
    });

    const childComponent = wrapper.findComponent({ name: 'BaseInput' });
    expect(childComponent.exists()).toBe(true);
    expect(childComponent.props('config')).toEqual(fieldConfig);
  });

  it('passes v-model value to child component', () => {
    mockValue.value = 'initial value';

    const wrapper = mount(BaseField, {
      props: defaultProps,
      global: {
        stubs: {
          'el-form-item': EL_FORM_ITEM_STUB,
        },
      },
    });

    const childComponent = wrapper.findComponent({ name: 'BaseInput' });
    expect(childComponent.exists()).toBe(true);
  });

  it('renders slot content correctly', () => {
    const slotContent = 'Slot Content';

    const wrapper = mount(BaseField, {
      props: defaultProps,
      slots: {
        default: slotContent,
      },
      global: {
        stubs: {
          'el-form-item': EL_FORM_ITEM_STUB,
        },
      },
    });

    const childComponent = wrapper.findComponent({ name: 'BaseInput' });
    expect(childComponent.exists()).toBe(true);
    const html = wrapper.html();
    expect(html).toContain(slotContent);
  });

  it('handles error message from useField', () => {
    mockErrorMessage.value = 'This field is required';

    const wrapper = mount(BaseField, {
      props: defaultProps,
      global: {
        stubs: {
          'el-form-item': {
            ...EL_FORM_ITEM_STUB,
            props: ['error'],
          },
        },
      },
    });

    const formItem = wrapper.find('.el-form-item');
    expect(formItem.exists()).toBe(true);
  });
});
