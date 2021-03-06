<template>
<v-app>
<v-content>
  <v-container id="PasswordReset_root" class="py-0">
    <v-row justify="center" align="center">
      <v-col sm="8" lg="6" xl="4" class="px-8">
        <!-- Logo -->
        <!-- @todo[XL3] Process the reset token -->
        <router-link to="/">
          <v-img
            id="logo"
            src="../../assets/imgs/El-8alaba.png"
            contain
            height="140">
          </v-img>
        </router-link>

        <p class="text-center font-weight-bold display-1">
          Password Reset
        </p>
        <template v-if="!succeeded">
          <p class="body-1 text-center">
            Enter your <span class="font-weight-bold">email address</span>
            that you used to register.
            We'll send you an email with your username and a link to reset your password.
          </p>

          <!-- Error bar -->
          <!-- @todo[XL3] Change this error message -->
          <p
            id="errorBar"
            class="caption red darken-1 white--text text-center py-3 mb-8"
            v-if="userInput.incorrect"
            >Error. Something went wrong.
          </p>

          <v-form ref="passwordResetForm">
            <!-- Email -->
            <v-text-field
              id="emailField"
              color="#1DB954"
              outlined
              label="Email address"
              v-model="userInput.email"
              :rules="[
                validation.required('Email'),
                validation.minLength('Email', 3),
                validation.validEmail(),
              ]"
            />
            <!-- Send -->
            <v-row justify="center" align="center">
              <v-btn
                id="sendBtn"
                color="#1DB954"
                rounded
                dark
                @click="submit"
                min-width="40%"
                x-large
                >Send
              </v-btn>
            </v-row>
          </v-form>
        </template>
        <template v-else>
          <p class="body-1 text-center">
            A message has been sent to you by email with instructions on how to reset your password.
          </p>
        </template>
      </v-col>
    </v-row>
  </v-container>
</v-content>
</v-app>
</template>

<script>
import validation from '@/store/modules/auth/validation';
import cookies from '@/store/modules/auth/cookies';
import api from 'api-client';

/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 */
export default {
  name: 'PasswordReset',
  created() {
    document.title = 'Reset your password - Spotify El8alaba';
    // Store the reset token
    this.resetToken = this.$route.params.resetToken;
  },
  /* istanbul ignore next */
  // Re-route to home if a user is logged in
  beforeRouteEnter(to, from, next) {
    next(() => {
      // Find the loggedIn cookie
      const loggedIn = document.cookie.search(/loggedIn=.+/) !== -1;

      if (loggedIn) {
        next('/home');
      } else {
        // Remove the current user
        // Remove all cookies
        // Continue
        cookies.clearData(['currentUser'], ['loggedIn']);
        next();
      }
    });
  },

  data: () => ({
    userInput: {
      email: '',
      incorrect: false,
    },
    succeeded: false,
    resetToken: undefined,
    validation,
  }),

  methods: {
    /**
     * Submits user input
     */
    async submit() {
      if (!this.$refs.passwordResetForm.validate()) return;

      const response = await api.forgotPassword({
        email: this.userInput.email,
      });

      /**
       * If the request was successful,
       * display the success message, and
       * clear input data.
       */
      // 200 OK
      if (response.status === 200) {
        this.succeeded = true;

        this.userInput.email = '';
        this.userInput.incorrect = false;
      } else {
        this.userInput.incorrect = true;
      }
    },
  },
};
</script>

<style lang="css" scoped>
</style>
