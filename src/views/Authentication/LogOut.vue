<template>
  <pre>Logging out...</pre>
</template>

<script>
/**
 * @author XL3 <abdelrahman.farid99@eng-st.cu.edu.eg>
 */
import api from 'api-client';

export default {
  name: 'LogOut',
  /* istanbul ignore next */
  // Re-route to login if no user is logged in
  beforeRouteEnter(to, from, next) {
    next(() => {
      // Find the loggedIn cookie
      const notLoggedIn = document.cookie.search(/loggedIn=.+/) === -1;

      if (notLoggedIn) {
        next('/login');
      } else {
        next();
      }
    });
  },

  async mounted() {
    // Remove the current user
    // Remove all cookies
    const response = await api.logoutUser();

    if (response.status === 200) {
      this.$router.push('/');
    }
  },
};
</script>
