<script>
  export let data
  $: ({ questions, response } = data)
</script>

<pre>{JSON.stringify(response, null, 2)}</pre>