<template>
  <q-page padding>
    <q-form class = "row justify-center" @submit.prevent="newLogin">
      <p class ="col-12 text-h4 text-center q-mt-xl"> Login Page 2</p>

      <div class="fixed-center">
        <div class="col justify-center">
          <div class="row">
            <q-icon class="q-mr-lg q-mt-lg" name="person"></q-icon>
            <q-input
              v-model="form.email"
              type="email"
              label="Email"
              lazy-rules
              :rules="nameRules">
              </q-input>
          </div>

          <div class="row">
            <q-icon class="q-ml-md q-mt-lg" name="locker"></q-icon>
            <q-input
              v-model="form.password"
              class="q-ml-sm"
              type="password"
              label="Password"
              lazy-rules
              :rules="nameRules"></q-input>
          </div>
          <q-btn class="full-width q-mt-lg" label="LOGIN" color="primary" type="submit"></q-btn>
          <q-btn class="full-width q-mt-md" label="REGISTER" color="primary" to="registerPg" ></q-btn>
        </div>
        <div>
          <q-btn  class="full-width q-mt-sm" flat color="primary" label="Forgot My Password" to="resetPass" />
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import router from "src/router";
import { defineComponent, onMounted, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import {useRouter} from 'vue-router';
import useNotify from "src/composables/UseNotify";

export default({
  name: "LoginPage",

  setup(){

    // Notify Variables from composable
    const {notifyError, notifySuccess} = useNotify()

    const{login, isLoggedIn} = useAuthUser()

    // Prevent user to back to login page and need to logged in again
    onMounted(() =>{

      // If user is logged in
      if(isLoggedIn){
        //Redirect to home page
        router.push({name: 'loginPg'})
      }
    })




    // Reactive form for login inputs
    const form = ref({
      email: '',
      password: ''
    })

    const router = useRouter()

    const newLogin = async () =>{
      try {
        const user = useAuthUser()

        // Call login method in composable passing our login const parameters
        await login(form.value)


        // Success Notification
        notifySuccess('Loggin Success!')

        router.replace({name: 'homePg'})

      } catch (error) {
        //Login Failed Notification
        notifyError(error.message)
      }
    }

    //Input type rule


    return{
      form,
      newLogin,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
    }
  },

  methods:{
    regisPage(){
      router.push({name: 'resetPass'})
    }
  }

});
</script>

