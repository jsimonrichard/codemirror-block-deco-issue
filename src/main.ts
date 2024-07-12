import { Decoration, DecorationSet, EditorView } from '@codemirror/view';
import './style.css'
import { EditorState, StateField } from '@codemirror/state';
import { basicSetup } from 'codemirror';
import { decosExtension } from './decos';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div id="editor"></div>
  </div>
`

let editor = new EditorView({
  state: EditorState.create({
    doc: 'Hello world!\n\n',
    extensions: [
      basicSetup,
      decosExtension,
    ],
  }),
  parent: document.querySelector<HTMLDivElement>('#editor')!,
});

