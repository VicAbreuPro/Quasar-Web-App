<template>
  <q-page padding>
    <q-form class = "row justify-center" @submit="changePass">
      <p class ="col-12 text-h4 text-center q-mt-xl"> Change Password Page</p>

      <div class="fixed-center">
        <div class="col justify-center">
          <div class="row">
            <q-icon class="q-mr-lg q-mt-lg" name="key"></q-icon>
            <q-input
              v-model="newPassword"
              type="text"
              label="New Password"
              lazy-rules
              :rule="nameRules"></q-input>
          </div>
          <q-btn class="full-width q-mt-lg" label="CHANGE PASSWORD" color="primary" type="submit" ></q-btn>
          <q-btn class="full-width q-mt-lg" label="CANCEL" color="primary" to="/"></q-btn>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import useAuthUser from "src/composables/UseAuthUser";
import { defineComponent, ref } from "vue";
import useNotify from "src/composables/UseNotify";

//UserRouter to use push and replace methods
//UseRoute to get info about current route
import {useRouter, useRoute} from 'vue-router';

export default defineComponent({
  name: 'ChangePasswordPage',

  setup(){

    const{notifyError, notifySuccess} = useNotify()

    // To redirect user to another route
    const router = useRouter()

    //Get current route
    const route = useRoute()

    // Get in current route the parameter access token defined in index.js
    const token = route.query.token

    //Get Method to reset password in custom composable
    const{resetPassword} = useAuthUser()

    const newPassword = ref('')

    const changePass = async () =>{
      await resetPassword(token, newPassword.value)

      notifySuccess('Password Changed!')
      
      router.replace({name: 'loginPg'})
    }

    return{
      newPassword,
      changePass,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
    }
  }
})
</script>
