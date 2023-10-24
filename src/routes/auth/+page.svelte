<script lang="ts">
  import * as C from 'carbon-components-svelte';
</script>

<C.Content class="w-full h-100vh flex items-center justify-center">
  <C.FluidForm
    class="flex flex-col w-80"
    method="post"
    action=""
  >
    <C.TextInput
      name="user"
      labelText="Username"
      placeholder="Enter username..."
      required
    />
    <C.PasswordInput
      name="pass"
      labelText="Password"
      placeholder="Enter password..."
      type="password"
      required
    />
    <C.Button type="submit">Submit</C.Button>
  </C.FluidForm>
</C.Content>