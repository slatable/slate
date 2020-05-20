import React, { useCallback } from 'react';
import { SlateContainer } from '../container';
import { Editable, } from 'slate-react';
import { EditableProps } from 'slate-react/dist/components/editable';
import { SwtichRender } from '../transforms/switchRender';

interface TEditorProps extends EditableProps {
  // errorComponent: JSX.Element,
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

  componentDidCatch(error: any) {
    console.log('error', error)
    this.setState({
      hasError: true,
    });
  }

  render() {
    // if (this.state.hasError) return <React.Fragment>{this.props.errorComponent}</React.Fragment>
    const Switcher = SwtichRender(this.props.container);
    const Rendering = (props: any) => <Switcher {...props} />;
    const onBlur = () => this.props.container.setLastSelectionWhenBlur();
    return <Editable renderLeaf={Rendering} renderElement={Rendering} onBlur={onBlur} {...this.props} />
  }
}