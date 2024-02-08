<script lang="ts">
  import { onMount } from 'svelte';
  import type { Readable } from 'svelte/store';
  import { createEditor, Editor, EditorContent, BubbleMenu } from 'svelte-tiptap';
  import StarterKit from '@tiptap/starter-kit';
  import Placeholder from '@tiptap/extension-placeholder';
  import { Link } from '@tiptap/extension-link';
  import TextStyle from '@tiptap/extension-text-style'
  import { Color } from '@tiptap/extension-color'
  import { Button } from "$lib/components/ui/button"
  import { Bold, Italic, Link as LinkIcon } from "lucide-svelte"

  let editor: Readable<Editor>;
  let className: string | undefined | null = undefined
  export { className as class }
  export let placeholder: string | undefined | null = undefined
  export let value: string = ''

  onMount(() => {
    editor = createEditor({
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder: placeholder || '',
        }),
        Link.configure({
          autolink: true,
          // openOnClick: false,
        }),
        TextStyle,
        Color,
      ],
      content: value,
      onUpdate: ({ editor }) => {
        value = editor.getHTML()
      },
      editorProps: {
        attributes: {
          class: className || '',
          autocomplete: "off",
          autocorrect: "off",
          autocapitalize: "off",
          spellcheck: "false"
        },
      },
    });
  });

  const toggleBold = () => {
    $editor.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    $editor.chain().focus().toggleItalic().run();
  };

  const setLink = () => {
    if ($editor.isActive('link')) {
      $editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    const previousUrl = $editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) return;
    if (url === '') {
      $editor.chain().focus().extendMarkRange('link').unsetLink().run();
      return;
    }

    $editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  $: isActive = (name: string, attrs = {}) => $editor.isActive(name, attrs);

</script>

{#if editor}
<BubbleMenu editor={$editor}>
  <div data-test-id="bubble-menu" class="flex gap-1">
    <input
      class="colpick"
      type="color"
      on:input={event => $editor.chain().focus().setColor(event.target.value).run()}
      value={$editor.getAttributes('textStyle').color}
      data-testid="setColor"
    />
    <Button variant="outline" class="w-6 h-6" on:click={toggleBold} size="icon">
      <Bold size="12" />
    </Button>
    <Button variant="outline" class="w-6 h-6" on:click={toggleItalic} size="icon">
      <Italic size="12" />
    </Button>
    <Button variant="outline" class="w-6 h-6" on:click={setLink} size="icon">
      <LinkIcon size="12" />
    </Button>
  </div>
</BubbleMenu>
{/if}

<EditorContent editor={$editor} />

<style lang="scss">
  :global(.tiptap p.is-editor-empty:first-child::before) {
    content: attr(data-placeholder);
    font-style: italic;
    float: left;
    pointer-events: none;
    height: 0;
    @apply text-muted-foreground;
  }

  :global(.ProseMirror a) {
    @apply text-blue-600 underline cursor-pointer;
  }

  .colpick {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    border: none;
    cursor: pointer;
    @apply h-6 w-6 border border-input bg-background rounded-md;
  }
  .colpick::-webkit-color-swatch {
    @apply rounded-sm;
    border: none;
  }
  .colpick::-moz-color-swatch {
    @apply rounded-sm;
    border: none;
  }
</style>