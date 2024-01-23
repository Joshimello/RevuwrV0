<script lang="ts">
  import { Input } from "$lib/components/ui/input"
  import { Label } from "$lib/components/ui/label"
  import { Button } from "$lib/components/ui/button"
</script>

<div class="flex flex-col my-6">
  <span class="text-2xl font-bold tracking-tight">
    Create account
  </span>
  <span class="text-muted-foreground">
    Enter your email, school ID and password below.
  </span>
</div>

<form method="POST">
  <div class="flex flex-col w-full gap-2 pb-3">
    <Label class="font-bold">Email</Label>
    <Input name="email" type="text" placeholder="name@example.com" />
  </div>
  <div class="flex flex-col w-full gap-2 pb-3">
    <Label class="font-bold">School ID</Label>
    <Input name="username" type="text" placeholder="111000888" />
  </div>
  <div class="flex flex-col w-full gap-2 pb-3">
    <Label class="font-bold">Password</Label>
    <Input name="password" type="password" />
  </div>
  <div class="flex flex-col w-full gap-2 pb-3">
    <Label class="font-bold">Confirm Password</Label>
    <Input name="passwordconf" type="password" />
  </div>
</form>

<Button class="w-full">Create</Button>