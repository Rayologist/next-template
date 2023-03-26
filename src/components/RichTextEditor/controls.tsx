import { Tooltip, useMantineTheme } from '@mantine/core';
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap';
import {
  IconArrowBackUp,
  IconArrowForwardUp,
  IconDeviceFloppy,
  IconTrash,
} from '@tabler/icons-react';

export function Undo() {
  const { editor } = useRichTextEditorContext();

  return (
    <Tooltip label="Undo" withArrow sx={{ fontSize: '12px' }}>
      <RichTextEditor.Control
        onClick={() => editor?.commands.undo()}
        aria-label="Undo"
        title="Undo"
      >
        <IconArrowBackUp stroke={1.5} size={16} />
      </RichTextEditor.Control>
    </Tooltip>
  );
}

export function Redo() {
  const { editor } = useRichTextEditorContext();
  return (
    <Tooltip label="Redo" withArrow sx={{ fontSize: '12px' }}>
      <RichTextEditor.Control
        onClick={() => editor?.commands.redo()}
        aria-label="Redo"
        title="Redo"
      >
        <IconArrowForwardUp stroke={1.5} size={16} />
      </RichTextEditor.Control>
    </Tooltip>
  );
}

export function ClearAll() {
  const { editor } = useRichTextEditorContext();
  const theme = useMantineTheme();
  return (
    <Tooltip label="Clear all" withArrow sx={{ fontSize: '12px' }}>
      <RichTextEditor.Control
        onClick={() => editor?.commands.clearContent()}
        aria-label="Clear"
        title="Clear"
      >
        <IconTrash stroke={1.5} size={16} color={theme.colors.red[5]} />
      </RichTextEditor.Control>
    </Tooltip>
  );
}

export function Save() {
  const { editor } = useRichTextEditorContext();
  return (
    <Tooltip label="Save" withArrow sx={{ fontSize: '12px' }}>
      <RichTextEditor.Control
        onClick={() => {
          const content = editor?.getHTML();
          console.log(content); // eslint-disable-line no-console
        }}
        aria-label="Save"
        title="Save"
      >
        <IconDeviceFloppy stroke={1.5} size={16} />
      </RichTextEditor.Control>
    </Tooltip>
  );
}
