import { SlateContainer } from '../container';
export function CreateNewToolbar(container: SlateContainer, DividerComponent: JSX.Element = null) {
  return container.toolbar.component(DividerComponent);
}