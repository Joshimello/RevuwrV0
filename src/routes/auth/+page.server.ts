import { PB_URL, PB_USER, PB_PASS } from '$env/static/private';
import { error } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

export const load = async ({ params }) => {

};

export const actions = {
  default: async ({ request, params, cookies }) => {
    const pb = new PocketBase(PB_URL);

    const body = await request.json();
    const { user, pass } = body;

    console.log(cookies.get('uwu'))

    try {
      const authData = await pb.collection('users').authWithPassword(user, pass);
    }

    catch(err) {
      throw error(401, 'Unauthorized')
    }

    cookies.set('uwu', pb.authStore.token)
    // console.log(pb.authStore.isValid);
    // console.log(pb.authStore.token);
    // console.log(pb.authStore.model.id);

    return '/';
  }
};
