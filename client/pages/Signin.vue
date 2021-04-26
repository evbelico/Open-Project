<template>
  <div class="container mx-auto">
    <form class="flex flex-col flex-nowrap items-center w-full" method="POST">
      <h1 class="subtitle justify-start">Sign into your account</h1>
      <div class="w-full sm:w-1/2 lg:w-1/3 text-left">
        <label for="email" class="block">Email address *</label>
        <input
          v-model="emailAddr"
          type="email"
          label="Enter your e-mail address"
          class="rounded border-2 border-secondary w-full"
          required
          autocomplete="true"
        />
      </div>
    </form>
  </div>
</template>

<script lang="js">
import gql from 'graphql-tag';

export default {
  name: 'SigninPage',
  data() {
    return {
      emailAddr: '',
      password: '',
      confirmAccount: false,
    }
  },
  created() {
    const routeVar = this.$route;
    console.log(this.$route);
    const objTest = Object.entries(routeVar.query);
    if (objTest.length !== 0 && objTest[0] === "token" && objTest[1].length > 0) {
      this.confirmAccount = true;
      return this.verifyAccount(objTest[1]);
    }
    console.log("Testing object entries :", objTest );
    // this.$route.query
  },
  methods: {
    async verifyAccount(token) {
      await this.$apollo.mutate({
        mutation: gql`
          mutation verifyUserAccount(
            $sentToken: String!
          ) {
            checkRegistrationToken(sentToken: $sentToken) {
              id
              email
              token
              tokenExpired
              validated
            }
          }
        `,
        variables: {
          sentToken: token,
        },
      }).then((data) => {
        console.log("Hello this is data :", data);
      }).catch((error) => {
        console.error("Error in account verif :", error);
      });
    },
  }
}
</script>
