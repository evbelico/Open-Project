<template>
  <div id="register" class="container mx-auto w-full">
    <!-- <form class="grid grid-cols-1 md:grid-cols-12 gap-4 w-11/12" method="POST"> -->
    <form
      class="flex flex-col flex-nowrap justify-center items-center w-full"
      method="POST"
    >
      <h1 class="subtitle justify-start">Create an account</h1>
      <h2
        v-if="netErrors.length > 0"
        class="col-span-12 justify-start text-red-600"
      >
        {{ netErrors }}
      </h2>
      <div class="w-full sm:w-1/2 lg:w-1/3 text-left">
        <label for="email" class="block">Enter your e-mail address *</label>
        <input
          v-model="emailAddr"
          type="email"
          label="Enter your e-mail address *"
          class="rounded border-secondary border-2 w-full"
          required
        />
        <p :class="emailError !== '' ? 'visible text-red-600' : 'invisible'">
          {{ emailError }}
        </p>
      </div>
      <div class="w-full sm:w-1/2 lg:w-1/3 text-left">
        <label for="password" class="block">Pick a password *</label>
        <input
          v-model="password"
          type="password"
          label="Pick a password *"
          class="rounded border-secondary border-2 w-full"
          required
          autocomplete="true"
        />
        <p
          :class="passwordError !== '' ? ' visible text-red-600' : 'invisible'"
        >
          {{ passwordError }}
        </p>
      </div>
      <div class="w-full sm:w-1/2 lg:w-1/3 text-left">
        <label for="password-conf" class="block">Confirm your password *</label>
        <input
          v-model="passwordConf"
          type="password"
          label="Confirm your password *"
          class="rounded border-secondary border-2 w-full"
          required
          autocomplete="true"
        />
        <p
          :class="
            passwordConfError !== '' ? 'visible text-red-600' : 'invisible'
          "
        >
          {{ passwordConfError }}
        </p>
      </div>
      <div class="w-full sm:w-1/2 lg:w-1/3 text-left">
        <label for="birthdate" class="block">Enter your birthdate *</label>
        <input
          v-model="birthdate"
          type="date"
          label="Enter your birthdate"
          class="rounded border-secondary border-2 w-full"
          required
        />
        <p
          :class="birthdateError !== '' ? 'visible text-red-600' : 'invisible'"
        >
          {{ birthdateError }}
        </p>
      </div>
      <div class="w-full sm:w-8/12 lg:w-4/12 mt-2">
        <button
          type="button"
          :class="
            enableBtn == false
              ? 'border-2 rounded-lg border-primary bg-primary text-secondary font-semibold w-1/2 h-12'
              : 'border-2 rounded-lg bg-gray-500 text-gray-300 font-semibold w-1/2 h-12'
          "
          :disabled="enableBtn"
          @click="registerUser()"
        >
          Register
        </button>
      </div>
      <div class="w-full sm:w-8/12 lg:w-4/12 mt-2">
        <button
          type="reset"
          class="border-2 rounded-lg border-primary bg-secondary text-primary font-semibold w-1/2 h-12"
        >
          Reset
        </button>
      </div>
    </form>
    <RegistrationModal
      :show-modal="openModal"
      :success="registerSuccess"
      @toggleModal="closeModal"
    />
  </div>
</template>

<script lang="js">
import gql from 'graphql-tag'
import RegistrationModal from '../components/modals/RegistrationModal.vue'
// import REGISTER_USER_MUTATION from '../apollo/mutations/registerUser'

export default {
  name: 'RegisterPage',
  components: {
    RegistrationModal,
  },
  data() {
    return {
      emailAddr: '',
      password: '',
      passwordConf: '',
      birthdate: '',
      openModal: false,
      registerSuccess: false,
      emailError: '',
      passwordError: '',
      passwordConfError: '',
      birthdateError: '',
      disableBtn: true,
      netErrors: [],
    }
  },
  computed: {
    enableBtn() {
      console.log('Mail + pwd + pwdconf + birth + btn state :', this.emailError, this.passwordError, this.passwordConfError, this.birthdateError);
      console.log('Actual states :', this.emailAddr, this.password, this.passwordConf, this.birthdate.toString());
      if (this.emailError === '' && this.passwordError === '' && this.passwordConfError === '' && this.birthdateError === '') {
        // this.btnDisabled = false
        return false
      } else {
        return true;
      }
    }
  },
  watch: {
    emailAddr(val) {
      if (val === '') {
        this.emailError = 'Please input your e-mail address.';
      } else {
        const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val);
        if (emailRegex === false) {
          this.emailError = 'Invalid e-mail address.';
        } else {
          this.emailError = '';
        }
      }
    },
    password(val) {
      if (val === '') {
        this.passwordError = 'Please pick a password.';
      } else {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/.test(val);
        if (passwordRegex === false) {
          this.passwordError = 'Your password must contain at least on small letter, one capital letter, one number and one special character like "!@#$%^&*"';
        } else {
          this.passwordError = '';
        }
      }
    },
    passwordConf(val) {
      if (val === '') {
        this.passwordConfError = 'Type your password once more.';
      } else if (val !== this.password) {
          this.passwordConfError = 'Passwords do not match.';
        } else {
          this.passwordConfError = '';
        }
    },
    birthdate(val) {
      if (val === null) {
        this.birthdateError = 'Please enter your birthdate';
      } else {
        this.birthdateError = '';
      }
    },
  },
  methods: {
    closeModal(val) {
      this.openModal = val;
    },
    async registerUser() {
      console.log("Entering submit function");
      if (
        this.emailAddr !== '' &&
        this.password !== '' &&
        this.passwordConf !== '' &&
        this.birthdate !== null &&
        this.passwordConf === this.password
      ) {
        console.log("Checkers are ok. Continuing")

        console.log("Entered try/catch function");
        await this.$apollo.mutate({
            mutation: gql`
              mutation registerNewUser(
                $email: String!
                $password: String!
                $birthday: DateTime!
              ) {
                register(
                  email: $email
                  password: $password
                  birthday: $birthday
                ) {
                  id
                  email
                  password
                  birthday
                  token
                  tokenExpired
                }
              }
            `,
            variables: {
              email: this.emailAddr,
              password: this.passwordConf,
              birthday: this.birthdate,
            },
          }).then((data) => {
            console.log("HELLO THIS IS DATA :", data)
            if (!data.register) {
              this.netErrors.push('Woops, user already exists !');
              console.error(this.netErrors);
              this.registerSuccess = false;
            }
            this.openModal = true;
          }).catch((error) => {
            this.netErrors.push(error);
            this.registerSuccess = false;
            console.error("AN ERROR OCCURED :", error)
          })
      }
    },
  }
}
</script>

<style scoped></style>
