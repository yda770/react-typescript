import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw, convertFromRaw, EditorState as EditorStateValue } from 'draft-js';
import type { EditorState } from 'draft-js';

interface EventSummaryEditorProps {
  value?: any;
  onChange?: (value: any) => void;
}

const EventSummaryEditor: React.FC<EventSummaryEditorProps> = ({ value, onChange }) => {
  const [editorState, setEditorState] = useState<any>(
    value
      ? EditorStateValue.createWithContent(convertFromRaw(value))
      : EditorStateValue.createEmpty()
  );

  const handleEditorChange = (state: any) => {
    setEditorState(state);
    if (onChange) {
      onChange(convertToRaw(state.getCurrentContent()));
    }
  };

  return (
    <div style={{ direction: 'rtl', background: '#fff', borderRadius: 8, minHeight: 220, height: 200 }}>
      <Editor
        editorState={editorState}
        onEditorStateChange={handleEditorChange}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        toolbar={{
          options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'history'],
          textAlign: { inDropdown: false },
        }}
        localization={{ locale: 'he' }}
      />
    </div>
  );
};

export default EventSummaryEditor;
