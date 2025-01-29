<script lang="ts">
  
  import { generate } from "generate-password-ts";

  let password = "";
  let passwordLength = 12;

</script>

<section class="flex items-center justify-center h-screen bg-gray-200">

  <div class="bg-white p-8 rounded-lg shadow-lg text-center">
    <div class="flex justify-center mb-4">
      <img src="/cat-solid.svg" alt="Little cat icon" class="icon" />
    </div>

    <button
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
      on:click={() => password = generate({
        length: passwordLength,
        numbers: true,
        symbols: true,
        uppercase: true,
        strict: true,
      })}>Generate
    </button>

    <p class="mb-5 mt-5">{password}</p>
    <input type="range" min="8" max="24" bind:value={passwordLength} class="w-full slider" />
    <p>Current meows: {passwordLength}</p>
  </div>

</section>

<style>

  .icon {
    width: 48px; /* Adjust the width as needed */
    height: 48px; /* Adjust the height as needed */
  }

</style>