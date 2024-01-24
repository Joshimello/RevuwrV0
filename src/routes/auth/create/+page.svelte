<script lang="ts">
  import { Input } from "$lib/components/ui/input"
  import { Label } from "$lib/components/ui/label"
  import { Button } from "$lib/components/ui/button"
  import { toast } from "svelte-sonner"
  import { onMount } from "svelte"
  import { goto } from "$app/navigation"

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
      if (form.redirect) {
        goto(form.redirect)
      }
    }
  })

</script>

<div class="flex flex-col my-6">
  <span class="text-2xl font-bold tracking-tight">
    Create account
  </span>
  <span class="text-muted-foreground">
    Enter your email, school ID and password below.
  </span>
</div>

<form method="POST" on:submit={onSubmit}>
  <div class="flex flex-col w-full gap-2 pb-3">
    <Label class="font-bold">Email</Label>
    <Input name="email" type="email" placeholder="name@example.com" required />
  </div>
  <div class="flex flex-col w-full gap-2 pb-3">
    <Label class="font-bold">School ID</Label>
    <Input name="username" type="text" placeholder="111000888" required />
  </div>
  <div class="flex flex-col w-full gap-2 pb-3">
    <Label class="font-bold">Password</Label>
    <Input name="password" type="password" required />
  </div>
  <div class="flex flex-col w-full gap-2 pb-3">
    <Label class="font-bold">Confirm Password</Label>
    <Input name="passwordconf" type="password" required />
  </div>
  <Button type="submit" class="w-full">Create</Button>
</form>