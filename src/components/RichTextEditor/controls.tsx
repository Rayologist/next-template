import { useMantineTheme } from '@mantine/core';
import { RichTextEditor, useRichTextEditorContext } from '@mantine/tiptap';
import { IconArrowBackUp, IconArrowForwardUp, IconDeviceFloppy, IconTrash } from '@tabler/icons';

export function Undo() {
  const { editor } = useRichTextEditorContext();

  return (
    <RichTextEditor.Control onClick={() => editor?.commands.undo()} aria-label="Undo" title="Undo">
      <IconArrowBackUp stroke={1.5} size={16} />
    </RichTextEditor.Control>
  );
}

export function Redo() {
  const { editor } = useRichTextEditorContext();
  return (
    <RichTextEditor.Control onClick={() => editor?.commands.redo()} aria-label="Redo" title="Redo">
      <IconArrowForwardUp stroke={1.5} size={16} />
    </RichTextEditor.Control>
  );
}

export function ClearAll() {
  const { editor } = useRichTextEditorContext();
  const theme = useMantineTheme();
  return (
    <RichTextEditor.Control
      onClick={() => editor?.commands.clearContent()}
      aria-label="Clear"
      title="Clear"
    >
      <IconTrash stroke={1.5} size={16} color={theme.colors.red[5]} />
    </RichTextEditor.Control>
  );
}

export function Save() {
  const { editor } = useRichTextEditorContext();
  return (
    <RichTextEditor.Control
      onClick={() => {
        const content = editor?.getHTML();
        console.log(content); // eslint-disable-line no-console
      }}
      aria-label="Clear"
      title="Clear"
    >
      <IconDeviceFloppy stroke={1.5} size={16} />
    </RichTextEditor.Control>
  );
}
