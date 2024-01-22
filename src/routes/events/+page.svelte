<script>
  import * as Card from "$lib/components/ui/card"
  import { Button } from "$lib/components/ui/button"
  import { Separator } from "$lib/components/ui/separator"
  import { UserSearch } from "lucide-svelte"

  let list = new Array(3)
</script>

<div class="container py-8">

  <div class="flex flex-col">
    <span class="text-2xl font-bold tracking-tight">Events</span>
    <span class="text-muted-foreground">A list of events that you may apply for.</span>    
  </div>

  <Separator class="my-6" />

  <div class="grid lg:grid-cols-2 gap-6">
    {#each list as item}
    <Card.Root>
      <Card.Header>
        <Card.Title>
          <span class="text-2xl">
            Co-Pilot Learning Circle Program
          </span>
        </Card.Title>
        <Card.Description>
          <div class="flex gap-1 items-center">
            <UserSearch size="16" />
            Students
          </div>
        </Card.Description>
      </Card.Header>

      <Separator/>
      
      <Card.Content>
        <div class="mt-4">
          <p class="">
            Introduction: Originating from “student study groups”, the focus has shifted from "text-based learning" to primarily encourage students to actively explore. The main ethos is to motivate students to explore knowledge, attitudes, and skills that extend beyond the classroom or delve into interdisciplinary fields.
          </p>
        </div>
      </Card.Content>
      <Card.Footer>
        <div class="flex gap-2">
          <Button size="sm" href="/dashboard">Apply</Button>
          <Button size="sm" href="/dashboard" variant="outline">Learn more</Button>
        </div>
      </Card.Footer>
    </Card.Root>
    {/each}
  </div>
</div>