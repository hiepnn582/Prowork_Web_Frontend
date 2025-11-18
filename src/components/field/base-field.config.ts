import type { FormItemProps } from 'element-plus';
import { EFieldType } from '@/constants/index.constants';
import type { TInputConfig } from '../input/base-input.config';
import type { TButtonConfig } from '../button/base-button.config';

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
}

const DEFAULT_CONFIG: TFormItemConfig = {};

export { type TFormItemConfig, type IFieldProps, DEFAULT_CONFIG };
