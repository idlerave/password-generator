<script lang="ts">
    import { onMount } from "svelte";
    import { generatePassword } from "$lib/components/Generator";
    import { Github, Settings, Copy } from 'lucide-svelte';
    import { slide, fade } from 'svelte/transition';
    import { copyToClipboard } from "$lib/components/Clipboard";

    // You can guess what this is.
    let password: String;
    let passwordLength = 12;
    let buttonPressed = false;
    let uppercase = true;
    let lowercase = true;
    let numbers = true;
    let symbols = true;
    let isDropdownOpen = false;
    let dropdownElement: HTMLElement;
  
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
    function disableRightClick(event: MouseEvent) {
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

    // Closes the dropdown when clicking outside of its place
    onMount(() => {
      const handleClick = (event: MouseEvent) => {
        if (dropdownElement && !dropdownElement.contains(event.target as Node) && isDropdownOpen) {
          isDropdownOpen = false;
        }
      };
      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('click', handleClick);
      };
    });

    function toggleDropdown() {
        isDropdownOpen = !isDropdownOpen;
    }

</script>
  
  <!--shit's a mess-->
  <section class="flex flex-col items-center justify-between h-screen bg-gray-200 dark:bg-gray-800">
    <div class="flex flex-col items-center justify-center flex-grow">
      <div class="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg text-center w-[400px]">
        <div class="flex justify-center mb-4 text-amber-300">
            <button 
                class="bg-transparent border-0 cursor-pointer hover:scale-110 transition-transform duration-200 focus:outline-none"
                on:click={generate}
                title="Click to generate password">
            <img
              src="/cat-dark.png"
              alt="Cute white cat icon - if you click it, it will generate a password"
              class="w-12 h-12"
              on:contextmenu={disableRightClick}
              draggable="false"
            />
            </button>
        </div>
        <div class="relative mb-4 font-mono text-lg px-4 py-3 rounded-md text-gray-100 flex items-center w-full">
          <div class="w-6 flex-shrink-0"></div>
          <span class="truncate flex-grow text-center">{password}</span>
          <div class="flex-shrink-0 w-6 flex justify-between">
              {#if buttonPressed}
              <button 
                  class="hover:text-indigo-400 transition-colors duration-150"
                  on:click={() => copyToClipboard(password as string)}
                  title="Copy to clipboard"
              >
                  <Copy size={16} />
              </button>
              {/if}
          </div>
      </div>
        <input type="range" min="8" max="32" bind:value={passwordLength} class="w-full slider" />
        <p class="text-gray-900 dark:text-gray-100 mt-5">Current meows: {passwordLength}</p>

        <div class="flex justify-center items-center mt-8 w-full relative">
          <div>
            <button
              class="btn btn-sm btn-ghost flex justify-center items-center gap-1 transition-transform duration-300"
              class:rotate-180={isDropdownOpen}
              on:click|stopPropagation={toggleDropdown}
            >
            <Settings class="h-4 w-4 text-white hover:text-gray-300 transition-colors duration-300"/>
            </button>
            
            {#if isDropdownOpen}
            <div 
              bind:this={dropdownElement}
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
      <p class="text-gray-500 dark:bg-gray-800 dark:text-gray-400 mt-5 hover-text">
        {#each [...'@pravariar'] as letter}
          <span>{letter}</span>
        {/each}
      </p>
      <a href="https://github.com/idlerave" target="_blank">
        <Github class="text-gray-500 hover:text-gray-100 transition-colors duration-300 mt-3"/>
      </a>
    </div>
  </section>
  


  <style>
    .hover-text {
      display: inline-block;
      cursor: default;
    }
    
    .hover-text span {
      display: inline-block;
      transition: color 150ms ease;
    }
    
    .hover-text span:hover {
      color: #ffffff;
    }
  
    .hover-text span:hover + span {
      color: #e7e7e7;
    }
  </style>