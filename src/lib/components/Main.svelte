<script lang="ts">

  import { generate } from "generate-password-ts";

  // You can guess what this is.
  let password: String;
  let passwordLength = 12;
  let buttonPressed = false;

  // If the button hasn't been pressed,
  // this will act as a placeholder for the password.
  if (buttonPressed === false)
  {
    password = "Choose and click.";
  }

  // Generates the password using "generate-password-ts".
  // Yes, I'm lazy!
  function generatePassword()
  {
    password = generate({
      length: passwordLength,
      numbers: true,
      symbols: true,
      uppercase: true,
      strict: true,
    });
    buttonPressed = true;
  }

  // Makes the icon "undownloadable". Idk, just a pet peeve, really.
  function disableRightClick(event: MouseEvent)
  {
    event.preventDefault();
  }

</script>

<section class="flex flex-col items-center justify-center h-screen bg-gray-200 font-poppins">

  <div class="bg-white p-8 rounded-lg shadow-lg text-center">
    <div class="flex justify-center mb-4">
      <img
      src="/cat.png"
      alt="Little cat icon"
      class="icon"
      on:contextmenu={disableRightClick}
      draggable="false"
      />
    </div>

    <button
      class="inline-flex justify-center items-center gap-2 border font-semibold rounded-full px-4 py-2 leading-5 text-sm border-indigo-700 bg-indigo-700 text-white hover:text-white hover:bg-indigo-600 hover:border-indigo-600 focus:ring focus:ring-indigo-400/50 active:bg-indigo-700 active:border-indigo-700 dark:focus:ring-indigo-400/90"
      on:click={generatePassword}>Generate
    </button>

    <p class="mb-5 mt-5">{password}</p>
    <input type="range" min="8" max="24" bind:value={passwordLength} class="w-full slider" />
    <p>Current meows: {passwordLength}</p>
  </div>
  <p class="text-gray-500 mt-10">@pravariar</p>

</section>

<style>

  .icon {
    width: 48px;
    height: 48px; 
  }

</style>