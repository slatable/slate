import { SlateFunction, TSlateFunction, SlateContainer } from '@slatable/slate';
import { Subscription } from '@reactivex/rxjs';
  
export class RedoFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'Redo';
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'sys');
    this.event$ = this.container.on('editor:' + RedoFunction.namespace).subscribe(() => {
      (this.container.editor as any).redo()
    });
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }
}