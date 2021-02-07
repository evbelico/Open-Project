<template>
  <q-page padding>
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md row items-center justify-center"
    >
      <div class="col-11">
        <q-input
          v-model="emailAddr"
          type="text"
          label="Adresse e-mail *"
          stack-label
          rounded
          standout
        />
        <q-input
          v-model="password"
          type="password"
          label="Mot de passe *"
          stack-label
          rounded
          standout
        />
        <q-input
          v-model="passwordConf"
          type="password"
          label="Répétez votre mot de passe *"
          stack-label
          rounded
          standout
        />
      </div>
      <q-btn
        label="Submit"
        type="submit"
        color="primary"
        text-color="secondary"
      />
      <q-btn
        label="Reset"
        type="reset"
        color="secondary"
        flat
        class="q-ml-sm"
      />
    </q-form>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api';
import { RegistrationForm } from '../components/models';

export default defineComponent({
  name: 'PageRegister',
  setup() {
    const emailAddr = ref('');
    const password = ref('');
    const passwordConf = ref('');

    function onSubmit() {
      if (
        emailAddr.value != '' &&
        password.value != '' &&
        passwordConf.value != '' &&
        passwordConf.value == password.value
      ) {
        const form = ref<RegistrationForm>({
          email: emailAddr.value,
          password: password.value,
          passwordConf: passwordConf.value
        });
        console.log(
          'Here is the form :',
          form.value.email,
          form.value.password,
          form.value.passwordConf
        );
      } else {
        console.log(
          'It fails !!!',
          emailAddr.value,
          password.value,
          passwordConf.value
        );
      }
    }

    function onReset() {
      emailAddr.value = '';
      password.value = '';
      passwordConf.value = '';
    }

    return { emailAddr, password, passwordConf, onSubmit, onReset };
  }
});
</script>
