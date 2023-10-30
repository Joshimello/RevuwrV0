import { redirect, fail } from '@sveltejs/kit';

export const actions = {
  default: async ({ locals, request, params }) => {
    const data = await request.formData();
    console.log(data)
  }
}