<script lang="ts">

  import { generate } from "generate-password-ts";
	import { onMount } from "svelte";

  // You can guess what this is.
  let password: String;
  let passwordLength = 12;
  let buttonPressed = false;
  let isDarkMode = false;

  // This toggles the site's dark theme.
  function toggleDarkMode()
  {
    if (localStorage.getItem("darkMode") === "true")
    {
      localStorage.setItem("darkMode", "false");
      document.documentElement.classList.remove("dark");
      isDarkMode = false;
    }
    else
    {
      localStorage.setItem("darkMode", "true");
      document.documentElement.classList.add("dark");
      isDarkMode = true;
    }
  }

  // If the user prefers dark mode,
  // It will be automatically switched on load.
  onMount(() =>
  {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches)
    {
      toggleDarkMode();
    }})

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

<section class="flex flex-col items-center justify-between h-screen bg-gray-200 dark:bg-gray-800 font-poppins">
  <div class="flex flex-col items-center justify-center flex-grow">
    <div class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center">
      <div class="flex justify-center mb-4">
        {#if isDarkMode}
          <img
            src="/cat-dark.png"
            alt="Little cat icon"
            class="icon"
            on:contextmenu={disableRightClick}
            draggable="false"
          />
        {:else}
          <img
            src="/cat-light.png"
            alt="Little cat icon"
            class="icon"
            on:contextmenu={disableRightClick}
            draggable="false"
          />
        {/if}
      </div>

      <button
        class="inline-flex justify-center items-center gap-2 border font-semibold rounded-full px-4 py-2 leading-5 text-sm border-indigo-700 bg-indigo-700 text-white hover:text-white hover:bg-indigo-600 hover:border-indigo-600 focus:ring focus:ring-indigo-400/50 active:bg-indigo-700 active:border-indigo-700 dark:focus:ring-indigo-400/90"
        on:click={generatePassword}
      >Generate
    </button>

      <p class="mb-5 mt-5 text-gray-900 dark:text-gray-100">{password}</p>
      <input type="range" min="8" max="24" bind:value={passwordLength} class="w-full slider" />
      <p class="text-gray-900 dark:text-gray-100 mt-5">Current meows: {passwordLength}</p>
    </div>
    <p class="text-gray-500 dark:bg-gray-800 dark:text-gray-400 mt-5">@pravariar</p>
  </div>

  <div class="flex flex-col items-center justify-center mb-10">
    <button
      class="bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 py-1 px-2 rounded-lg"
      on:click={toggleDarkMode}
    >🌙
  </button>
  </div>
</section>



<footer class="bg-gray-200 dark:bg-gray-800">
  <div class="text-center w-full mx-auto max-w-screen-xl p-4">
    <p class="text-sm text-gray-500 sm:text-center dark:text-gray-400">Powered by Vercel :3</p>
  </div>
</footer>


<style>

  .icon {
    width: 48px;
    height: 48px; 
  }

</style>