<script lang="ts">
  import * as Table from "$lib/components/ui/table"
  import { Button } from "$lib/components/ui/button"
  import { Link } from "lucide-svelte"
  import * as Dialog from "$lib/components/ui/dialog"

  export let data
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.Head>Review ID</Table.Head>
      <Table.Head>Status</Table.Head>
      <Table.Head>Actions</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each data.reviews as review}
      <Table.Row>
        <Table.Cell>{review.id}</Table.Cell>
        <Table.Cell>

          <Dialog.Root>
            <Dialog.Trigger>Open</Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Title>Review</Dialog.Title>

                {#if review.review}
                  <Table.Root>
                    <Table.Body>
                      {#each Object.entries(review.review) as [key, value]}
                        <Table.Row>
                          <Table.Cell>{key}</Table.Cell>
                          <Table.Cell>
                            <pre>{JSON.stringify(value, null, 2)}
                            </pre>
                          </Table.Cell>
                        </Table.Row>
                      {/each}
                    </Table.Body>
                  </Table.Root>
                {:else}
                  <p>No review data</p>
                {/if}

              </Dialog.Header>
            </Dialog.Content>
          </Dialog.Root>

        </Table.Cell>
        <Table.Cell>
          <div class="flex gap-1">
            <Button variant="outline" size="icon" class="w-8 h-8" href={`/review/${review.id}`} target="_blank">
              <Link size="16"/>
            </Button>
          </div>
        </Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
</Table.Root>