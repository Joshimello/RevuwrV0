<script>
  import { goto } from '$app/navigation';

  let user = '', pass = ''

  const post = async () => {
    const response = await fetch(window.location.href, {
      method: 'POST',
      body: JSON.stringify({ user: user, pass: pass })
    });

    const data = await response.json();
    const url = JSON.parse(data.data)[0];
    // await goto(url);
  };
</script>

<div class="w-full h-100vh flex items-center justify-center">
  <div class="w-max flex flex-col gap-1">
    <input class="bg-transparent border-2" type="text" bind:value={user} />
    <input class="bg-transparent border-2" type="password" bind:value={pass} />
    <button class="border-2" on:click={post}>login</button>
  </div>
</div>