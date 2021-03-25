<template>
  <q-page padding>
    <q-form
      class="q-gutter-md row items-center justify-around"
      @submit="onSubmit"
      @reset="onReset"
    >
      <div class="col-11">
        <q-input
          v-model="emailAddr"
          class="q-my-md"
          type="email"
          label="Adresse e-mail *"
          rounded
          standout
        />
        <q-input
          v-model="password"
          class="q-my-md"
          type="password"
          label="Mot de passe *"
          rounded
          standout
        />
        <!-- <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        /> -->
      </div>
      <q-btn
        label="Connexion"
        class="justify-center"
        type="submit"
        color="primary"
        text-color="secondary"
      />
    </q-form>
  </q-page>
</template>

<script lang="ts">
// import { defineComponent } from '@vue/composition-api';
// import { useRouter, useRoute } from 'vue-router';

// export default defineComponent({
//   name: 'SigninPage',
//   setup() {
//     const router = useRouter();
//     const route = useRoute();
//     console.log('Helllooooo : ', route.params);
//     console.log('Params :', route.currentRoute.params);
//   }
// });
</script>
