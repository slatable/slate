import React, { useCallback } from 'react';
import { SlateContainer } from '../container';
import { Editable, } from 'slate-react';
import { EditableProps } from 'slate-react/dist/components/editable';
import { LeafRender } from '../transforms/leafElement';
import { ElementRender } from '../transforms/elementRender';

interface TEditorProps extends EditableProps {
  errorComponent: React.ReactElement,
  container: SlateContainer,
}

interface TEditorStates {
  hasError: boolean,
}

export class Editor extends React.Component<TEditorProps, TEditorStates> {
  constructor(props: TEditorProps) {
    super(props);
    this.state = {
      hasError: false,
    }
  }

  shouldComponentUpdate(prev: any, next: any) {
    return true
  }

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) return this.props.errorComponent;
    const LeafRenderer = LeafRender(this.props.container);
    const ElementRenderer = ElementRender(this.props.container);
    const leaf = useCallback(props => <LeafRenderer {...props} />, []);
    const element = useCallback(props => <ElementRenderer {...props} />, []);
    const onBlur = () => this.props.container.setLastSelectionWhenBlur();
    return <Editable renderLeaf={leaf} renderElement={element} onBlur={() => onBlur} {...this.props} />
  }
}