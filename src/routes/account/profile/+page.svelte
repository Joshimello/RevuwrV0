<script lang="ts">
  import * as Form from "$lib/components/ui/form"
  import { formSchema } from "./schema"
  import { toast } from "svelte-sonner"
  import { superForm } from "sveltekit-superforms/client"

  export let data

  const form = superForm(data.form, {
    validators: formSchema,
    onSubmit: () => {
      toast.loading('Loading...')
    },
    onResult: ({ result: { data } }) => {
      if (data.type == 'error') {
        toast.error(data.message)
      }
      if (data.type == 'success') {
        toast.success(data.message)
      }
    }
  })

</script>

<Form.Root method="POST" controlled form={form} schema={formSchema} let:config class="space-y-6">

  <Form.Field {config} name="name">
    <Form.Item>
      <Form.Label>
        Name
      </Form.Label>
      <Form.Input type="text" />
      <Form.Description>
        Your display name, you should update your name initially.
      </Form.Description>
      <Form.Validation />
    </Form.Item>
  </Form.Field>

  <Form.Field {config} name="email">
    <Form.Item>
      <Form.Label>
        Email
      </Form.Label>
      <Form.Input type="email" />
      <Form.Description>
        Messages will be sent to this email.
      </Form.Description>
      <Form.Validation />
    </Form.Item>
  </Form.Field>

  <Form.Field {config} name="username">
    <Form.Item>
      <Form.Label>
        Student ID
      </Form.Label>
      <Form.Input type="text" />
      <Form.Description>
        Your student ID.
      </Form.Description>
      <Form.Validation />
    </Form.Item>
  </Form.Field>

  <Form.Field {config} name="year">
    <Form.Item>
      <Form.Label>
        Year
      </Form.Label>
      <Form.Input type="text" />
      <Form.Description>
        Your current level of study and year.
      </Form.Description>
      <Form.Validation />
    </Form.Item>
  </Form.Field>

  <Form.Field {config} name="department">
    <Form.Item>
      <Form.Label>
        Department
      </Form.Label>
      <Form.Input type="text" />
      <Form.Description>
        The department you are currently in.
      </Form.Description>
      <Form.Validation />
    </Form.Item>
  </Form.Field>

  <Form.Button>Update profile</Form.Button>

</Form.Root>