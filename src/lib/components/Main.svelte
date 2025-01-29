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

  // Makes the icon undraggable. Idk, just a pet peeve, really.
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
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
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