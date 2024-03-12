<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs"
  import { Separator } from "$lib/components/ui/separator"
  import * as Card from "$lib/components/ui/card"
  import { Badge } from "$lib/components/ui/badge"
  import { Button } from "$lib/components/ui/button"
  import { format } from "timeago.js"
  import { FileClock, Ticket } from "lucide-svelte"

  export let data
  $: ({ applications } = data)
</script>

<div class="container py-8">
  <div class="flex flex-col">
    <span class="text-2xl font-bold tracking-tight">Applications</span>
    <span class="text-muted-foreground">Events that you drafted or submitted.</span>    
  </div>

  <Separator class="my-6" />

  <Tabs.Root value="draft">
    <Tabs.List>
      <Tabs.Trigger value="draft">Draft</Tabs.Trigger>
      <Tabs.Trigger value="submitted">Submitted</Tabs.Trigger>
      <Tabs.Trigger value="archived">Archived</Tabs.Trigger>
    </Tabs.List>

    <Tabs.Content value="draft">
      <div class="grid grid-cols-3 gap-6">
        {#each applications.filter(i => i.status == 'draft') as application}
        <Card.Root>
          <Card.Header>
            <Card.Title>
              {application.expand.event.name}
            </Card.Title>
            <Card.Description>
              <div class="flex flex-col">
                <span class="flex gap-1 items-center">
                  <FileClock size="16"/>
                  {#if application.updated_response} Updated {format(application.updated_response)}
                  {:else} Created {format(application.created)} {/if}
                </span>
                <span class="flex gap-1 items-center">
                  <Ticket size="16"/>
                  {application.expand.event.settings.responsePrefix}{application.application_id.toString().padStart(3, '0')}
                </span>
              </div>
              <div class="mt-4">
                <Badge variant="outline">{application.status}</Badge>
              </div>
            </Card.Description>
          </Card.Header>
          <Card.Footer>
            <Button size="sm" href={'/applications/' + application.id} variant="ghost" class="underline">
              View application
            </Button>
          </Card.Footer>
        </Card.Root>
        {/each}
      </div>
    </Tabs.Content>

    <Tabs.Content value="submitted">
      <div class="grid grid-cols-3 gap-6">
        {#each applications.filter(i => !['draft', 'archived'].includes(i.status)) as application}
        <Card.Root>
          <Card.Header>
            <Card.Title>
              {application.expand.event.name}
            </Card.Title>
            <Card.Description>
              <div class="flex flex-col">
                <span class="flex gap-1 items-center">
                  <FileClock size="16"/>
                  {#if application.updated_response} Updated {format(application.updated_response)}
                  {:else} Created {format(application.created)} {/if}
                </span>
                <span class="flex gap-1 items-center">
                  <Ticket size="16"/>
                  {application.expand.event.settings.responsePrefix}{application.application_id.toString().padStart(3, '0')}
                </span>
              </div>
              <div class="mt-4">
                <Badge variant="outline">{application.status}</Badge>
              </div>
            </Card.Description>
          </Card.Header>
          <Card.Footer>
            <Button size="sm" href={'/applications/' + application.id} variant="ghost" class="underline">
              View application
            </Button>
          </Card.Footer>
        </Card.Root>
        {/each}
      </div>
    </Tabs.Content>

    <Tabs.Content value="archived">
      
    </Tabs.Content>
  </Tabs.Root>
</div>