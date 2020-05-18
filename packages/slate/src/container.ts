import { EventEmitter } from '@flowx/events';
import { TSlateFunction } from './function';
import { ReactEditor, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { createEditor } from 'slate';

export class SlateContainer extends EventEmitter {
  public editor: ReactEditor;
  private readonly functions: Map<string, TSlateFunction> = new Map();
  private readonly counter: Map<string, number> = new Map();
  private readonly extras: Map<string, any> = new Map();

  constructor() {
    super();
    this.extras.set('wrappers', new Map<string, (editor: ReactEditor) => ReactEditor>());
  }

  /**
   * 创建一个编辑器对象
   * 支持：历史记录、React
   * 同时将最新的编辑器的editor对象插入到container中
   * 插件：通过reduce插件来扩展功能
   */
  public createEditor() {
    const editor = this.onContext(withReact(withHistory(createEditor())));
    const wrappers: Map<string, (editor: ReactEditor) => ReactEditor> = this.extras.get('wrappers');
    return Array.from(wrappers).reduce((prev, current) => current[1](prev), editor);
  }

  /**
   * 将最新的编辑器的editor对象插入到container中
   * @param editor 
   */
  private onContext(editor: ReactEditor) {
    const onChange = editor.onChange;
    editor.onChange = () => {
      this.editor = editor;
      onChange.call(editor);
    }
    return editor;
  }

  /**
   * 注册功能
   * @param classModule 
   */
  public register<T extends TSlateFunction>(classModule: {
    new(container: SlateContainer): T,
    readonly namespace: string,
  }) {
    if (!this.counter.has(classModule.namespace)) {
      this.counter.set(classModule.namespace, 1);
    } else {
      this.counter.set(classModule.namespace, this.counter.get(classModule.namespace) + 1);
    }
    if (this.functions.has(classModule.namespace)) return this;
    const func = new classModule(this);
    const wrappers: Map<string, (editor: ReactEditor) => ReactEditor> = this.extras.get('wrappers');
    if (func.componentWithWrapper) wrappers.set(classModule.namespace, func.componentWithWrapper.bind(func));
    return this;
  }

  /**
   * 卸载功能
   * @param namespace 
   */
  public unRegister<T extends TSlateFunction>(namespace: string | { 
    new(container: SlateContainer): T, 
    readonly namespace: string 
  }) {
    namespace = typeof namespace !== 'string' ? namespace.namespace : namespace;
    if (this.counter.has(namespace)) {
      const count = this.counter.get(namespace);
      if (count > 1) {
        this.counter.set(namespace, count - 1);
        return this;
      }
      this.counter.delete(namespace);
    }
    if (this.functions.has(namespace)) {
      const target = this.functions.get(namespace);
      if (target.componentTerminate) target.componentTerminate();
      this.functions.delete(namespace);
    }
    const wrappers: Map<string, (editor: ReactEditor) => ReactEditor> = this.extras.get('wrappers');
    if (wrappers.has(namespace)) wrappers.delete(namespace);
    return this;
  }
}