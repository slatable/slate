import { SlateFunction, TSlateFunction, SlateContainer } from '@slatable/slate';
import { Subscription } from '@reactivex/rxjs';
  
export class UndoFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'Undo';
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'sys');
    this.event$ = this.container.on('editor:' + UndoFunction.namespace).subscribe(() => {
      (this.container.editor as any).undo()
    });
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }
}