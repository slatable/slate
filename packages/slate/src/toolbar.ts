import React, { memo } from 'react';
import { ReactEditor } from 'slate-react';
import { SlateContainer } from './container';

export abstract class TSlateToolbar {
  static readonly namespace: string;
  abstract render(editor: ReactEditor): React.FunctionComponent<{ data?: string }>;
  abstract componentTerminate?(): void;
}

export class SlateToolbar {
  private readonly stacks: Map<string, TSlateToolbar> = new Map();
  private readonly container: SlateContainer;

  constructor(container: SlateContainer) {
    this.container = container;
  }

  public register(classModule: { 
    new(container: SlateContainer): TSlateToolbar, 
    readonly namespace: string 
  }) {
    if (this.stacks.has(classModule.namespace)) return this;
    const tool = new classModule(this.container);
    this.stacks.set(classModule.namespace, tool);
    return this;
  }

  public unRegister(namespace: string) {
    if (this.stacks.has(namespace)) {
      const tool = this.stacks.get(namespace);
      if (tool.componentTerminate) tool.componentTerminate();
      this.stacks.delete(namespace);
    }
    return this;
  }

  private buildTools(text: string, DividerComponent: JSX.Element) {
    const _text = text.split('|');
    return _text.map((value, index) => {
      const items: React.FunctionComponentElement<{ data?: string }>[] = [];

      value.split('-').forEach(val => {
        const i = val.indexOf(':');
        let key: string = val, data: string;
        
        if (i > -1) {
          key = val.substring(0, i);
          data = val.substring(i);
        }

        if (this.stacks.has(key)) {
          const CustomComponent = this.stacks.get(key).render(this.container.editor);
          items.push(React.createElement(CustomComponent, { data, key }));
        }
      });

      if (items.length) {
        if (index < _text.length - 1) items.push(DividerComponent);
        return React.createElement(React.Fragment, { key: index }, items);
      }
      
    }).filter(Boolean);
  }

  public component(DividerComponent: JSX.Element): React.FunctionComponent<{ format: string }> {
    return memo((props) => {
      const items = this.buildTools(props.format, DividerComponent);
      return React.createElement(React.Fragment, null, items);
    }, (prev, next) => prev.format !== next.format);
  }
}