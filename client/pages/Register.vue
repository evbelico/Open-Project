<template>
  <q-page padding>
    <q-form
      class="q-gutter-md row items-center justify-center"
      @submit="onSubmit"
      @reset="onReset"
    >
      <div class="col-11">
        <q-input
          v-model="emailAddr"
          type="email"
          label="Adresse e-mail *"
          class="q-my-md"
          stack-label
          rounded
          standout
          lazy-rules
          :rules="emailRules"
        />
        <q-input
          v-model="password"
          type="password"
          label="Mot de passe *"
          min="8"
          class="q-my-md"
          stack-label
          rounded
          standout
          :rules="passwordRules"
        />
        <q-input
          v-model="passwordConf"
          type="password"
          label="Répétez votre mot de passe *"
          min="8"
          class="q-my-md"
          stack-label
          rounded
          standout
          :rules="passwordConfRules"
        />
        <q-input
          v-model="birthday"
          type="date"
          label="Date de naissance *"
          class="q-my-md"
          stack-label
          rounded
          standout
          :rules="[(v) => !!v || 'Please enter your birthdate']"
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
    <RegistrationModal :open-dialog="registrationSuccess" />
  </q-page>
</template>

<script lang="ts">
// import { defineComponent, ref } from '@vue/composition-api';
// import { useMutation } from '@vue/apollo-composable';
// import gql from 'graphql-tag';
// import { RegistrationForm } from '@/components/models';
// import RegistrationModal from '../components/modals/RegistrationModal.vue';

// export default defineComponent({
//   name: 'RegisterPage',
//   components: {
//     RegistrationModal
//   },
//   setup() {
//     const emailAddr = ref('');
//     const password = ref('');
//     const passwordConf = ref('');
//     const birthday = ref('');
//     const registrationSuccess = ref(false);

//     /* User input validation rules */
//     const emailRules = ref([
//       (v: any) => !!v || 'E-mail is required',
//       (v: string) =>
//         /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
//         'E-mail must be valid'
//     ]);

//     const passwordRules = ref([
//       (v: any) => !!v || 'Password is required',
//       (v: string) =>
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
//           v
//         ) ||
//         'Password should at least be 8 characters long and contain one capital letter, one small letter and one special character like !@#$%^&*'
//     ]);

//     const passwordConfRules = ref([
//       (v: any) => !!v || 'Please confirm your chosen password',
//       (v: string) => v == password.value || "Passwords don't match"
//     ]);

//     /* GraphQL mutation
//       - Give a name to the mutation on the client-side, then
//       - Call the real name of the mutation defined on the server side :)
//       - Pass in the variables you need with '() => ({
//           variables : { info: 'some stuff' }
//         })'
//     */
//     const { mutate: registerUser } = useMutation(
//       gql`
//         mutation registerUser(
//           $email: String!
//           $password: String!
//           $birthday: DateTime!
//         ) {
//           register(email: $email, password: $password, birthday: $birthday) {
//             id
//             email
//             birthday
//             token
//           }
//         }
//       `,
//       () => ({
//         variables: {
//           email: emailAddr.value,
//           password: passwordConf.value,
//           birthday: '10/11/1995'
//         }
//       })
//     );

//     async function onSubmit() {
//       if (
//         emailAddr.value != '' &&
//         password.value != '' &&
//         passwordConf.value != '' &&
//         passwordConf.value == password.value
//       ) {
//         const form = ref<RegistrationForm>({
//           email: emailAddr.value,
//           password: password.value,
//           passwordConf: passwordConf.value
//         });
//         try {
//           const data = await registerUser();
//           console.log('GraphQL data :', data);
//           registrationSuccess.value = true;
//         } catch (error) {
//           registrationSuccess.value = false;
//         }
//       } else {
//         console.log(
//           'It fails !!!',
//           emailAddr.value,
//           password.value,
//           passwordConf.value
//         );
//       }
//     }

//     function onReset() {
//       emailAddr.value = '';
//       password.value = '';
//       passwordConf.value = '';
//       birthday.value = '';
//     }

//     return {
//       emailAddr,
//       password,
//       passwordConf,
//       birthday,
//       emailRules,
//       passwordRules,
//       passwordConfRules,
//       registrationSuccess,
//       registerUser,
//       onSubmit,
//       onReset
//     };
//   }
// });
</script>
