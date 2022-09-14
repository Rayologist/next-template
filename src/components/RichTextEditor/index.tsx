import { useState, useRef, useEffect, memo } from 'react';
import { Button, Group } from '@mantine/core';
import { RichTextEditor as MantineRichTextEditor, Editor } from '@mantine/rte';

function RichTextEditor() {
  const [value, onChange] = useState('');
  const editorRef = useRef<Editor>(null);

  useEffect(() => {
    editorRef.current?.focus();
  }, []);

  return (
    <>
      <MantineRichTextEditor ref={editorRef} value={value} onChange={onChange} sticky />
      <Group mt={10} position="right">
        <Button onClick={() => onChange('')} color="red" variant="outline">
          Clear
        </Button>
        {/* eslint-disable-next-line no-console */}
        <Button onClick={() => console.log(value)} variant="outline">
          Save
        </Button>
      </Group>
    </>
  );
}

export default memo(RichTextEditor);
