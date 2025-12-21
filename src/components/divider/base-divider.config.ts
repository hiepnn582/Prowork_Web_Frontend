import type { DividerProps } from 'element-plus';

type TDividerConfig = Partial<DividerProps> & TCustomDividerConfig;

type TCustomDividerConfig = {
  class?: string;
};

interface IDividerProps {
  config?: TDividerConfig;
}

const DEFAULT_CONFIG: TDividerConfig = {};

export { type TDividerConfig, type IDividerProps, DEFAULT_CONFIG };
