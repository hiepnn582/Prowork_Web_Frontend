import type { FormProps } from 'element-plus';
import type { IFieldProps } from '../field/base-field.config';

type TFormConfig = Partial<FormProps> & TCustomFormConfig;

type TCustomFormConfig = {
  class?: string;
  fieldPropsList?: IFieldProps[];
};

interface IFormProps {
  config?: TFormConfig;
}

const DEFAULT_CONFIG: TFormConfig = {};

export { type TFormConfig, type IFormProps, DEFAULT_CONFIG };
