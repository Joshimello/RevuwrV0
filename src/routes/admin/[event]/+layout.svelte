<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs"
  import { page } from '$app/stores'
  import { goto } from "$app/navigation"

  $: routes = {
    ['/admin/' + $page.params.event + '/settings']: 'settings',
    ['/admin/' + $page.params.event + '/questions']: 'questions',
    ['/admin/' + $page.params.event + '/responses']: 'responses'
  }

  $: selected = routes[$page.url.pathname] || undefined

</script>

<Tabs.Root value={selected} onValueChange={value => {
  goto('/admin/' + $page.params.event + '/' + value)
}}>
  <Tabs.List>
    <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
    <Tabs.Trigger value="questions">Questions</Tabs.Trigger>
    <Tabs.Trigger value="responses">Responses</Tabs.Trigger>
  </Tabs.List>
</Tabs.Root>

<div class="py-4">
  <slot />
</div>