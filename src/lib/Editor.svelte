<script lang="ts">
  import Editor from '@tinymce/tinymce-svelte'

  export let value: string = ''
  export let placeholder: string = ''
</script>

<Editor
  bind:value={value}
  scriptSrc={'/tinymce/tinymce.min.js'}
  modelEvents="input change undo redo"
  conf={{
    placeholder: placeholder,
    branding: false,
    promotion: false,
    menubar: false,
    min_height: 200,
    height: 200,
    max_height: 700,
    resize: true,
    autoresize_bottom_margin: 30,
    skin: 'custom',
    icons: 'custom',
    toolbar_location: 'bottom',
    content_style: "body { font-size: 14px }",
    statusbar: false,
    plugins: [
      "autoresize",
      "autolink",
      "lists",
      "link",
      "image",
      "searchreplace",
      "media",
      "table",
    ],
    toolbar: "styles | bold italic underline strikethrough | forecolor backcolor | align bullist numlist | link image table",
    toolbar_groups: {
      align: {
        icon: 'align-justify',
        tooltip: 'Align',
        items: 'alignleft aligncenter alignright'
      }
    },
    file_picker_types: "image",
    file_picker_callback: (cb, value, meta) => {
      const input = document.createElement("input");
      input.setAttribute("type", "file");
      input.setAttribute("accept", "image/*");
      input.addEventListener("change", (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.addEventListener("load", () => {
          const id = "blobid" + new Date().getTime();
          const blobCache = tinymce.activeEditor.editorUpload.blobCache;
          const base64 = reader.result.split(",")[1];
          const blobInfo = blobCache.create(id, file, base64);
          blobCache.add(blobInfo);
          cb(blobInfo.blobUri(), { title: file.name });
        });
        reader.readAsDataURL(file);
      });
      input.click();
    }
  }}
/>