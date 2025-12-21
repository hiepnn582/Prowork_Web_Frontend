import type { ButtonProps } from 'element-plus';

type TButtonConfig = Partial<ButtonProps> & TCustomButtonConfig;

type TCustomButtonConfig = {
  class?: string;
};

interface IButtonProps {
  config?: TButtonConfig;
}

const DEFAULT_CONFIG: TButtonConfig = {};

export { type TButtonConfig, type IButtonProps, DEFAULT_CONFIG };
