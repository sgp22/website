const React = window.React;
const Modifier = window.DraftJS.Modifier;
const EditorState = window.DraftJS.EditorState;
const ContentState = window.DraftJS.ContentState;
const SelectionState = window.DraftJS.SelectionState;

class TocSource extends React.Component {
  componentDidMount() {
    const { editorState, entityType, onComplete } = this.props;

    const content = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    const selectedText = _getTextSelection(content, selection, '');
    const idText = selectedText.replace(/\s+/g, '-').toLowerCase();

    // Uses the Draft.js API to create a new entity with the right data.
    const contentWithEntity = content.createEntity(entityType.type, 'IMMUTABLE', {
      toc: idText,
    });
    const entityKey = contentWithEntity.getLastCreatedEntityKey();

    // We also add some text for the entity to be activated on.
    const text = `${selectedText}`;

    const newContent = Modifier.replaceText(content, selection, text, null, entityKey);
    const nextState = EditorState.push(editorState, newContent, 'insert-characters');

    onComplete(nextState);
  }

  render() {
    return null;
  }
}

/**
 * Get current selected text
 * @param  {Draft.ContentState}
 * @param  {Draft.SelectionState}
 * @param  {String}
 * @return {String}
 */
function _getTextSelection(contentState, selection, blockDelimiter) {
  blockDelimiter = blockDelimiter || '\n';
  var startKey = selection.getStartKey();
  var endKey = selection.getEndKey();
  var blocks = contentState.getBlockMap();

  var lastWasEnd = false;
  var selectedBlock = blocks
    .skipUntil(function (block) {
      return block.getKey() === startKey;
    })
    .takeUntil(function (block) {
      var result = lastWasEnd;

      if (block.getKey() === endKey) {
        lastWasEnd = true;
      }

      return result;
    });

  return selectedBlock
    .map(function (block) {
      var key = block.getKey();
      var text = block.getText();

      var start = 0;
      var end = text.length;

      if (key === startKey) {
        start = selection.getStartOffset();
      }
      if (key === endKey) {
        end = selection.getEndOffset();
      }

      text = text.slice(start, end);
      return text;
    })
    .join(blockDelimiter);
}

const Toc = (props) => {
  const { entityKey, contentState } = props;
  const data = contentState.getEntity(entityKey).getData();
  return React.createElement('h2', {
    role: 'heading',
  }, props.children);
};

window.draftail.registerPlugin({
  type: 'TOCHEADING',
  source: TocSource,
  decorator: Toc,
});
