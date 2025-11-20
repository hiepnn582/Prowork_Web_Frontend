import type { VNode } from 'vue';
import type { FormItemProps } from 'element-plus';
import { EFieldType } from '@/constants/index.constants';
import type { TInputConfig } from '../input/base-input.config';
import type { TButtonConfig } from '../button/base-button.config';

type TSlotContent = (slotProps?: Record<string, unknown>) => VNode | VNode[];

type TonClick = () => void;

type TFormItemConfig = Partial<FormItemProps> & TCustomFieldConfig;

type TCustomFieldConfig = {
  class?: string;
};

type TFieldConfig = TInputConfig | TButtonConfig;

interface IFieldProps {
  config?: TFormItemConfig;
  fieldConfig: TFieldConfig;
  fieldType: EFieldType;
  fieldName: string;
  content?: TSlotContent;
  onClick?: TonClick;
}

const DEFAULT_CONFIG: TFormItemConfig = {};

export { type TFormItemConfig, type IFieldProps, DEFAULT_CONFIG };
