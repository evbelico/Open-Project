<template>
  <div>
    <!-- <div
      class="grid grid-flow-col justify-between items-center bg-secondary w-screen"
    > -->
    <div
      class="flex items-center flex-row justify-between bg-secondary w-screen mx-auto"
    >
      <div class="ml-2 my-2 w-5/12">
        <!-- <div class="col-span-3 justify-self-stretch ml-2 my-2"> -->
        <nuxt-link to="/">
          <img
            src="~assets/img/Logo.svg"
            alt="Scarabee logo"
            class="justify-self-start"
          />
        </nuxt-link>
      </div>
      <!-- <div class="space-x-10" /> -->
      <!-- <div class="col-span-1 md:none"> -->
      <div class="w-4/12 my-2">
        <nuxt-link to="/register">
          <button
            label="Inscription"
            class="bg-primary text-secondary font-semibold rounded-lg w-36 h-12 mx-5"
          >
            S'inscrire
          </button>
        </nuxt-link>
        <NuxtLink to="/signin">
          <button
            label="Connexion"
            class="bg-secondary text-primary font-semibold border-solid border-2 border-primary rounded-lg w-36 h-12 mx-5"
          >
            Connexion
          </button>
        </NuxtLink>
      </div>
    </div>
    <div>
      <!-- <img src="~assets/img/Logo.svg" alt="Scarabee logo" /> -->
      <!-- <h1 class="font-mono">Scarabée</h1> -->
      <!-- <div class="space-x-10" /> -->
      <!-- <button -->
      <Nuxt />
    </div>
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
