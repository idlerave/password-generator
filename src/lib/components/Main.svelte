<script lang="ts">
    import { onMount } from "svelte";
    import { generatePassword } from "$lib/components/Generator";
    import { Plus } from 'lucide-svelte';
    import { slide } from 'svelte/transition';

    // You can guess what this is.
    let password: String;
    let passwordLength = 12;
    let buttonPressed = false;
    let isDarkMode = false;
    let uppercase = true;
    let lowercase = true;
    let numbers = true;
    let symbols = true;
    let isDropdownOpen = false;
  
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

    // If the button hasn't been pressed,
    // this will act as a placeholder for the password.
    if (buttonPressed === false)
    {
      password = "Click on da cat!";
    }
  
    // Generates a cryptographically sound password using Generator.ts.
    function generate() {
    password = generatePassword(passwordLength, {
        length: passwordLength,
        uppercase,
        lowercase,
        numbers,
        symbols
    });
    buttonPressed = true;
}
  
    // Makes the icon "undownloadable". Idk, just a pet peeve, really.
    function disableRightClick(event: MouseEvent)
    {
      event.preventDefault();
    }
  
    // Checks if at least one option is selected
    function validateOptions(option: string): void {

        const enabledOptions = [uppercase, lowercase, numbers, symbols].filter(Boolean).length;
        
        if (enabledOptions === 0) {
            switch(option) {
                case 'uppercase': uppercase = true; break;
                case 'lowercase': lowercase = true; break;
                case 'numbers': numbers = true; break;
                case 'symbols': symbols = true; break;
            }
        }
    }

    function toggleDropdown() {
        isDropdownOpen = !isDropdownOpen;
    }

</script>
  
  <section class="flex flex-col items-center justify-between h-screen bg-gray-200 dark:bg-gray-800 font-poppins">
    <div class="flex flex-col items-center justify-center flex-grow">
      <div class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center">
        <div class="flex justify-center mb-4">
            <button 
                class="bg-transparent border-0 cursor-pointer hover:scale-110 transition-transform duration-200 focus:outline-none"
                on:click={generate}
                title="Click to generate password">
            <img
              src="/cat-dark.png"
              alt="Cute white cat icon - if you click it, it will generate a password"
              class="w-16 h-16"
              on:contextmenu={disableRightClick}
              draggable="false"
            />
            </button>
        </div>

        <p class="mb-5 mt-5 text-gray-900 dark:text-gray-100 font-mono text-lg">{password}</p>
        <input type="range" min="8" max="32" bind:value={passwordLength} class="w-full slider" />
        <p class="text-gray-900 dark:text-gray-100 mt-5">Current meows: {passwordLength}</p>

        <div class="flex justify-between items-center mt-8 w-full relative">
          <div>
            <button 
              class="btn btn-sm btn-ghost flex justify-center items-center gap-1"
              on:click={toggleDropdown}>
            <Plus class="h-4 w-4 text-white" />
            </button>
            
            {#if isDropdownOpen}
            <div 
              class="absolute left-1/2 transform -translate-x-1/2 top-full mt-2 w-64 bg-white dark:bg-gray-900 shadow-2xl rounded-xl p-4 z-50 border border-gray-100 dark:border-gray-700"
              transition:slide={{ duration: 200 }}
            >
              <div class="flex justify-center items-center mb-3">
                <h3 class="font-bold text-gray-900 dark:text-gray-100 text-sm uppercase tracking-wide">Options</h3>
              </div>
              
              <div class="space-y-3">
                <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Uppercase</span>
                  <div class="relative inline-block w-10 align-middle select-none">
                    <input 
                      type="checkbox" 
                      id="toggle-uppercase" 
                      class="toggle toggle-primary" 
                      bind:checked={uppercase}
                      on:change={() => validateOptions('uppercase')}
                    />
                  </div>
                </div>
                
                <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Lowercase</span>
                  <div class="relative inline-block w-10 align-middle select-none">
                    <input 
                      type="checkbox" 
                      id="toggle-lowercase" 
                      class="toggle toggle-primary" 
                      bind:checked={lowercase}
                      on:change={() => validateOptions('lowercase')}
                    />
                  </div>
                </div>
                
                <div class="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Numbers</span>
                  <div class="relative inline-block w-10 align-middle select-none">
                    <input 
                      type="checkbox" 
                      id="toggle-numbers" 
                      class="toggle toggle-primary" 
                      bind:checked={numbers}
                      on:change={() => validateOptions('numbers')}
                    />
                  </div>
                </div>
                
                <div class="flex items-center justify-between py-2">
                  <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Symbols</span>
                  <div class="relative inline-block w-10 align-middle select-none">
                    <input 
                      type="checkbox" 
                      id="toggle-symbols" 
                      class="toggle toggle-primary" 
                      bind:checked={symbols}
                      on:change={() => validateOptions('symbols')}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/if}
          </div>
        </div>
      </div>
      <p class="text-gray-500 dark:bg-gray-800 dark:text-gray-400 mt-5">@pravariar</p>
    </div>
  </section>
  
  <footer class="bg-gray-200 dark:bg-gray-800">
    <div class="text-center w-full mx-auto max-w-screen-xl p-4">
      <p class="text-sm text-gray-500 sm:text-center dark:text-gray-400">Powered by Vercel :3</p>
    </div>
  </footer>