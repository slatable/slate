import { SlateFunction, TSlateFunction, SlateContainer } from '@slatable/slate';
import { Subscription } from '@reactivex/rxjs';
  
export class TextIndentFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'TextIndent';
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'attr');
    this.event$ = this.container.on<{ textIndent: number }>('editor:' + TextIndentFunction.namespace).subscribe(({ textIndent }) => {
      this.setAttribute([[TextIndentFunction.namespace, textIndent]]);
    });
  }

  // public componentRenderNodes(props: TLeafRenderProps) {
  //   return <strong {...props.attributes}>{props.children}</strong>;
  // }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }

  // public useRangeMardHook<T extends TLeafNode>(value: T): boolean {
  //   return !!value[TextIndentFunction.namespace];
  // }

  public componentDeserialize(el: HTMLElement) {
    return el.style['textIndent'].replace('em', '');
  }


  public componentRenderStyle<T = any>(data?: any): {
    [key: string]: string | number | boolean,
  } {
    return { textIndent: data + 'em' }
  }
}