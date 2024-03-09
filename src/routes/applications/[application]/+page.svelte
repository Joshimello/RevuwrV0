<script lang="ts">
  import { Separator } from "$lib/components/ui/separator"
  import fieldTypes from "./fieldtypes"
  import * as Alert from "$lib/components/ui/alert"
	import { toast } from "svelte-sonner"
  import { enhance } from '$app/forms'
  import { FilePenLine, FileUp, Save, View } from "lucide-svelte"
  import { onMount } from "svelte"
  import { format } from 'timeago.js'
  import { Button } from "$lib/components/ui/button"
  import * as AlertDialog from "$lib/components/ui/alert-dialog"
  import { goto } from '$app/navigation'

  export let data
  $: ({ user, application } = data)
  $: ({ event } = application.expand)
  $: isDraft = application.status == 'draft'

  let value: Record<string, any>[] = []
  let updatedDate: string | null = null
  let isSaving: boolean = false

  onMount(() => {
    updatedDate = application.updated_response ?? null
    if (application.response) {
      value = application.response
    }
  })

  let form: HTMLFormElement

  // $: console.log(JSON.stringify(value, null, 2))
</script>

<div class="fixed inset-x-0 mx-auto bottom-4 max-w-md z-50">
  <Alert.Root>
    {#if isDraft}
      <Save size="16" />
    {:else}
      <View size="16" />
      {/if}
    <Alert.Title>{isDraft ? 'Save as draft or submit when completed!' : 'Viewing submitted application'}</Alert.Title>
    <Alert.Description>
      Last edited {updatedDate ? format(updatedDate) : 'never'}.
      {#if isDraft}
      <form bind:this={form} class="mt-3" method="POST" action="?/submit" use:enhance={() => {
        toast.loading('Saving...')
        isSaving = true
        return async ({ result }) => {
          if(result.type == 'success') {
            updatedDate = result.data?.updated ?? null
            toast.success('Saved!')
          }
          else if (result.type === 'redirect') {
            toast.success('Saved!')
            goto(result.location);
          }
          else if (result.type == 'error') toast.error(result.error.message)
          isSaving = false
        }
      }}>
        <input type="hidden" name="response" value={JSON.stringify(value)} />
        <div class="flex gap-1" >
          <AlertDialog.Root preventScroll={false} portal={form}>
            <AlertDialog.Trigger asChild let:builder>
              <Button builders={[builder]} class="w-full flex items-center gap-2" disabled={isSaving}>
                <FileUp size="16" />
                Submit application
              </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
              <AlertDialog.Header>
                <AlertDialog.Title>Application submission</AlertDialog.Title>
                <AlertDialog.Description>
                  You are about to submit your application. Are you sure? <br>
                  You will not be able to edit your response after submission.
                </AlertDialog.Description>
              </AlertDialog.Header>
              <AlertDialog.Footer>
                <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                <Button type="submit" name="action" value="submit" disabled={isSaving}>
                  Submit
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Root>
          
          <Button type="submit" name="action" value="draft" variant="outline" class="w-full flex items-center gap-2" disabled={isSaving}>
            <FilePenLine size="16" />
            Save as draft
          </Button>
        </div>
      </form>
      {/if}
    </Alert.Description>
  </Alert.Root>
</div>

<div class="container py-8 pb-64">

  <div class="flex flex-col">
    <span class="text-2xl font-bold tracking-tight">{event.name}</span>
    <span class="text-muted-foreground">
      Responding as {user.username}.
      <a href="/auth/login" class="underline">Change user</a>
    </span>    
  </div>

  <Separator class="my-6" />

  <div class="sm:flex flex-col items-center">
    <div class="max-w-xl">
      {#each event.questions as question, idx}
      <svelte:component
        disabled={!isDraft}
        this={fieldTypes[question.type].component}
        bind:content={question.value}
        bind:value={value[idx]}
        id={question.id}
        idx={idx}
      />
      {/each}
    </div>
  </div>

</div>