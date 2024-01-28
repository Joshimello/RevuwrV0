<script>
  import { invalidateAll } from "$app/navigation"
  import { Button } from "$lib/components/ui/button"
  import { toast } from "svelte-sonner"
  import { onMount } from "svelte"

  export let form

  const onSubmit = () => {
    toast.loading('Loading...')
  }

  onMount(async () => {
    if (form) {
      if (form.type == 'error') {
        toast.error(form.message)
      }
      if (form.type == 'success') {
        toast.success(form.message)
      }
      if (form.invalidate) {
        invalidateAll()
      }
    }
  })

</script>
 
<form method="POST" action="?/logout" on:submit={onSubmit}>
  <Button variant="destructive" type="submit">Logout</Button>
</form>