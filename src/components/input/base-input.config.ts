import type { InputProps } from 'element-plus';

interface IInputConfig extends InputProps {
  fieldName?: string;
}

interface IInputProps {
  config?: IInputConfig;
}

export { type IInputConfig, type IInputProps };
