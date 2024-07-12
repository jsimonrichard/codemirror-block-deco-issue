import { EditorState, StateField } from "@codemirror/state";
import { Decoration, DecorationSet, EditorView, WidgetType } from "@codemirror/view";

class MyWidget extends WidgetType {
  toDOM() {
    let el = document.createElement("div");
    el.innerHTML = "Hello world! (it's a widget)";
    return el;
  }
}

const buildDecos = (state: EditorState) => {
  const decos: Decoration[] = [];
  const line = state.doc.line(1);
  
  if (state.selection.ranges[0].from < line.to)
    return Decoration.none;

  // if (state.doc.toString().includes('a'))
  //   return Decoration.none;

  return Decoration.set([
    Decoration.replace({
      widget: new MyWidget(),
      inclusive: true,
      block: true,
    }).range(line.from, line.to),
  ]);
};

export const decosExtension = StateField.define<DecorationSet>({
  create(state) {
    return buildDecos(state);
  },
  update(deco, tr) {
    if (tr.selection || tr.docChanged)
      deco = buildDecos(tr.state);
    return deco.map(tr.changes);
  },
  provide: f => EditorView.decorations.from(f),
});