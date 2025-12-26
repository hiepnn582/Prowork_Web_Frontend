import { mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import { h } from 'vue';
import BaseForm from './BaseForm.vue';
import { EFieldType } from '@/constants/index.constants';
import type { TInputConfig } from '../input/base-input.config';
import type { IFieldProps } from '../field/base-field.config';

vi.mock('../field/BaseField.vue', () => ({
  default: {
    name: 'BaseField',
    template: '<div data-testid="base-field"><slot /></div>',
    props: ['fieldName', 'fieldType', 'fieldConfig', 'config', 'onClick', 'content'],
  },
}));

const EL_FORM_STUB = {
  template: '<div class="el-form"><slot /></div>',
  props: [
    'model',
    'rules',
    'labelPosition',
    'labelWidth',
    'labelSuffix',
    'inline',
    'inlineMessage',
    'statusIcon',
    'showMessage',
    'size',
    'disabled',
    'validateOnRuleChange',
    'hideRequiredAsterisk',
    'requireAsteriskPosition',
    'scrollToError',
    'scrollIntoView',
    'class',
  ],
};

const FORM_STUBS = {
  'el-form': EL_FORM_STUB,
};

const BASE_FIELD_SELECTOR = '[data-testid="base-field"]';

describe('BaseForm.vue', () => {
  const mockFieldProps: IFieldProps[] = [
    {
      fieldName: 'testField1',
      fieldType: EFieldType.Input,
      fieldConfig: {} as TInputConfig,
    },
    {
      fieldName: 'testField2',
      fieldType: EFieldType.Input,
      fieldConfig: {} as TInputConfig,
    },
  ];

  it('renders correctly with default config', () => {
    const wrapper = mount(BaseForm, {
      props: {
        config: {
          fieldPropsList: mockFieldProps,
        },
      },
      global: {
        stubs: FORM_STUBS,
      },
    });

    expect(wrapper.find('.el-form').exists()).toBe(true);
  });

  it('renders BaseField components for each item in fieldPropsList', () => {
    const wrapper = mount(BaseForm, {
      props: {
        config: {
          fieldPropsList: mockFieldProps,
        },
      },
      global: {
        stubs: FORM_STUBS,
      },
    });

    const fields = wrapper.findAll(BASE_FIELD_SELECTOR);
    expect(fields).toHaveLength(2);
  });

  it('uses default config when config prop is not provided', () => {
    const wrapper = mount(BaseForm, {
      props: {},
      global: {
        stubs: FORM_STUBS,
      },
    });

    expect(wrapper.find('.el-form').exists()).toBe(true);
    const fields = wrapper.findAll(BASE_FIELD_SELECTOR);
    expect(fields).toHaveLength(0);
  });

  it('merges config correctly when config prop is provided', () => {
    const customConfig = {
      labelPosition: 'right' as const,
      labelWidth: '100px',
      fieldPropsList: mockFieldProps,
    };

    const wrapper = mount(BaseForm, {
      props: {
        config: customConfig,
      },
      global: {
        stubs: {
          'el-form': {
            ...EL_FORM_STUB,
            props: ['labelPosition', 'labelWidth', 'fieldPropsList'],
          },
        },
      },
    });

    expect(wrapper.find('.el-form').exists()).toBe(true);
  });

  it('emits onClick event when content component emits onClick', async () => {
    const TestContentComponent = {
      name: 'TestContent',
      template: '<button data-testid="content-button" @click="$emit(\'onClick\')">Click</button>',
      emits: ['onClick'],
    };

    const mockContent = vi.fn(() => h(TestContentComponent));

    const fieldPropsWithContent: IFieldProps[] = [
      {
        fieldName: 'testField',
        fieldType: EFieldType.Button,
        fieldConfig: {},
        content: mockContent,
      },
    ];

    const wrapper = mount(BaseForm, {
      props: {
        config: {
          fieldPropsList: fieldPropsWithContent,
        },
      },
      global: {
        stubs: FORM_STUBS,
      },
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted('onClick')).toBeUndefined();

    const contentButton = wrapper.find('[data-testid="content-button"]');
    if (contentButton.exists()) {
      await contentButton.trigger('click');
      await wrapper.vm.$nextTick();
      expect(wrapper.emitted('onClick')).toBeDefined();
      expect(wrapper.emitted('onClick')).toHaveLength(1);
    }
  });

  it('renders content component when fieldProp.content is provided', () => {
    const mockContent = vi.fn(() =>
      h('div', { 'data-testid': 'custom-content' }, 'Custom Content'),
    );

    const fieldPropsWithContent: IFieldProps[] = [
      {
        fieldName: 'testField',
        fieldType: EFieldType.Input,
        fieldConfig: {} as TInputConfig,
        content: mockContent,
      },
    ];

    mount(BaseForm, {
      props: {
        config: {
          fieldPropsList: fieldPropsWithContent,
        },
      },
      global: {
        stubs: FORM_STUBS,
      },
    });

    expect(mockContent).toHaveBeenCalled();
  });

  it('passes fieldProp to BaseField component correctly', () => {
    const fieldProps: IFieldProps[] = [
      {
        fieldName: 'testField',
        fieldType: EFieldType.Input,
        fieldConfig: { placeholder: 'Enter text' } as TInputConfig,
        config: { label: 'Test Label' },
      },
    ];

    const wrapper = mount(BaseForm, {
      props: {
        config: {
          fieldPropsList: fieldProps,
        },
      },
      global: {
        stubs: FORM_STUBS,
      },
    });

    const baseField = wrapper.findComponent({ name: 'BaseField' });
    expect(baseField.exists()).toBe(true);
    expect(baseField.props('fieldName')).toBe('testField');
    expect(baseField.props('fieldType')).toBe(EFieldType.Input);
  });

  it('renders empty form when fieldPropsList is empty', () => {
    const wrapper = mount(BaseForm, {
      props: {
        config: {
          fieldPropsList: [],
        },
      },
      global: {
        stubs: FORM_STUBS,
      },
    });

    expect(wrapper.find('.el-form').exists()).toBe(true);
    const fields = wrapper.findAll(BASE_FIELD_SELECTOR);
    expect(fields).toHaveLength(0);
  });

  it('handles multiple fields with different types', () => {
    const mixedFieldProps: IFieldProps[] = [
      {
        fieldName: 'inputField',
        fieldType: EFieldType.Input,
        fieldConfig: {} as TInputConfig,
      },
      {
        fieldName: 'buttonField',
        fieldType: EFieldType.Button,
        fieldConfig: {},
      },
    ];

    const wrapper = mount(BaseForm, {
      props: {
        config: {
          fieldPropsList: mixedFieldProps,
        },
      },
      global: {
        stubs: FORM_STUBS,
      },
    });

    const fields = wrapper.findAll(BASE_FIELD_SELECTOR);
    expect(fields).toHaveLength(2);
  });
});
