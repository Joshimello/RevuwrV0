<script>
  import * as Card from "$lib/components/ui/card"
  import { Button } from "$lib/components/ui/button"
  import { Separator } from "$lib/components/ui/separator"
  import { Clock, Flag, UserSearch } from "lucide-svelte"
  import { format } from "timeago.js"
  import { enhance } from '$app/forms'
	import { toast } from "svelte-sonner"
  import { goto } from '$app/navigation'

  let list = new Array(3)

  export let data
  $: ({ events } = data)

  let isApplying = false

</script>

<div class="container py-8">

  <div class="flex flex-col">
    <span class="text-2xl font-bold tracking-tight">Events</span>
    <span class="text-muted-foreground">A list of events that you may apply for.</span>    
  </div>

  <Separator class="my-6" />

  <div class="grid lg:grid-cols-2 gap-6">
    {#each events as event}
    <Card.Root>
      <Card.Header>
        <Card.Title>
          <span class="text-2xl">
            {event.name}
          </span>
        </Card.Title>
        <Card.Description class="flex flex-col gap-1">
          <div class="flex gap-1 items-center">
            <UserSearch size="16" />
            {event.settings.eventTarget.charAt(0).toUpperCase() + event.settings.eventTarget.slice(1)}
          </div>
          <div class="flex gap-1 items-center">
            <Clock size="16" />
            {new Date(event.settings.eventStartDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            - {new Date(event.settings.eventEndDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </div>
          <div class="flex gap-1 items-center">
            <Flag size="16" />
            {new Date() > new Date(event.settings.eventStartDate) ? 'Started' : 'Starting'} {format(event.settings.eventStartDate)}
          </div>
        </Card.Description>
      </Card.Header>

      <Separator/>
      
      <Card.Content>
        <div class="mt-4">
          <p class="">
            {event.settings.eventDescription}
          </p>
        </div>
      </Card.Content>
      <Card.Footer>
        <div class="flex gap-2">
          <form method="POST" use:enhance={() => {
            toast.loading('Loading...')
            isApplying = true
            return async ({ result }) => {
              if (result.type === 'redirect') {
                goto(result.location)
                if (result.location == '/auth/login') {
                  toast.error('Login to continue')
                }
                else {
                  toast.success('Redirecting...')
                }
              }
              else if (result.type == 'error') {
                console.log(result)
                toast.error(result.error.message)
              }
              isApplying = false
            }
          }}>
            <Button type="submit" name="event" value={event.id} size="sm">Apply</Button>
          </form>
          <Button size="sm" href={'/event/' + event.id} variant="outline">Learn more</Button>
        </div>
      </Card.Footer>
    </Card.Root>
    {/each}
  </div>
</div>