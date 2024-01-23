<script lang="ts">
  import { Input } from "$lib/components/ui/input"
  import { Label } from "$lib/components/ui/label"
  import { Button } from "$lib/components/ui/button"
  import { toast } from "svelte-sonner"
  import { onMount } from "svelte"

  export let form

  const onSubmit = () => {
    toast.loading('Loading...')
  }

  onMount(async () => {
    if (form) {
      toast.error(form.status)
    }
  })
  
</script>

<div class="flex flex-col my-6">
  <span class="text-2xl font-bold tracking-tight">
    Account Login
  </span>
  <span class="text-muted-foreground">
    Enter your email or school ID, and password below.
  </span>
</div>

<form method="POST">          
  <div class="flex flex-col w-full gap-2 pb-3">
    <Label class="font-bold">Email / School ID</Label>
    <Input name="username" type="text" placeholder="111000888" />
  </div>
  <div class="flex flex-col w-full gap-2 pb-3">
    <Label class="font-bold">Password</Label>
    <Input name="password" type="password" />
  </div>
  <Button type="submit" class="w-full" on:click={onSubmit}>
    Login
  </Button>
</form>

<button class="underline text-sm mt-2">Forgot password?</button>