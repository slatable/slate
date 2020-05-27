import { SlateFunction, TSlateFunction, SlateContainer } from '@slatable/slate';
import { Subscription } from '@reactivex/rxjs';
  
export class LineHeightFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'LineHeight';
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'attr');
    this.event$ = this.container.on<{ lineHeight: string }>('editor:' + LineHeightFunction.namespace).subscribe(({ lineHeight }) => {
      this.setAttribute([[LineHeightFunction.namespace, lineHeight]]);
    });
  }

  // public componentRenderNodes(props: TLeafRenderProps) {
  //   return <strong {...props.attributes}>{props.children}</strong>;
  // }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }

  // public useRangeMardHook<T extends TLeafNode>(value: T): boolean {
  //   return !!value[LineHeightFunction.namespace];
  // }

  public componentDeserialize(el: HTMLElement) {
    return el.style['lineHeight'] as string;
  }


  public componentRenderStyle<T = any>(data?: any): {
    [key: string]: string | number | boolean,
  } {
    return { lineHeight: data }
  }
}