import type { InputProps } from 'element-plus';
import { PLACEHOLDER } from '@/constants/index.constants';

type TInputConfig = Partial<InputProps> & TCustomInputConfig;

type TCustomInputConfig = {
  fieldName?: string;
};

interface IInputProps {
  config?: TInputConfig;
}

const DEFAULT_CONFIG: TInputConfig = {
  placeholder: PLACEHOLDER.TYPE_VALUE,
};

export { type TInputConfig, type IInputProps, DEFAULT_CONFIG };
