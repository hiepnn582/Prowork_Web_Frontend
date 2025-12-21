import type { Component } from 'vue';
import { BaseButton, BaseInput } from '@/components/index.components';

enum EFieldType {
  Input = 'Input',
  Button = 'Button',
}

interface IFieldComponentMapper {
  [key: string]: Component;
}

const fieldComponentMapper: IFieldComponentMapper = {
  [EFieldType.Input]: BaseInput,
  [EFieldType.Button]: BaseButton,
};

export { EFieldType, fieldComponentMapper };
