
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {TreeView} from '@lexical/react/LexicalTreeView';

export const TreeViewPlugin = () => {
  const [editor] = useLexicalComposerContext();
  return (
    <TreeView
      viewClassName="bg-white text-black"
      treeTypeButtonClassName="debug-treetype-button"
      timeTravelPanelClassName="debug-timetravel-panel"
      timeTravelButtonClassName="debug-timetravel-button"
      timeTravelPanelSliderClassName="debug-timetravel-panel-slider"
      timeTravelPanelButtonClassName="debug-timetravel-panel-button"
      editor={editor}
    />
  );
}