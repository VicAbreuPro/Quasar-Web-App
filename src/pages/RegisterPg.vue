<template>
  <q-page padding>
    <q-form class = "row justify-center" @submit.prevent="newUser">
      <p class ="col-12 text-h4 text-center q-mt-xl"> Register Page</p>

      <div class="fixed-center">
        <div class="col justify-center">
          <div class="row">
            <q-icon class="q-mr-lg q-mt-lg" name="person"></q-icon>
            <q-input
              v-model="form.username"
              type="text"
              label="Username"
              lazy-rules
              :rules="nameRules"></q-input>
          </div>

          <div class="row">
            <q-icon class="q-mr-lg q-mt-lg" name="email"></q-icon>
            <q-input
              v-model="form.email"
              type="email"
              label="Email"
              lazy-rules
              :rules="nameRules"></q-input>
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
          <q-btn class="full-width q-mt-lg" label="REGISTER" color="primary" type="submit"></q-btn>
          <q-btn class="full-width q-mt-lg" label="CANCEL" color="primary" to="/"></q-btn>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
//Import components and composables
import { defineComponent, ref } from "vue";
import useNotify from "src/composables/UseNotify";
import useAuthUser from "src/composables/UseAuthUser";

//For redirecting after registration
import {useRouter} from 'vue-router';

export default {
  name: "RegisterPg",

  setup(){
    const{notifyError, notifySuccess} = useNotify()
    const{register} = useAuthUser()
    const router = useRouter()

    // Reactive form for login inputs
    const form = ref({
        username: '',
        email: '',
        password: ''
    })

    const newUser = async () =>{
      try {
        // Call login method in composable passing our login const parameters
        await register(form.value)

        notifySuccess("Registration Done!")

        router.push({
          name: 'emailConfimation',
          query: {email: form.value.email}
        })

      } catch (error) {
        notifyError(error.message)
      }
    }

    return{
      form,
      newUser,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
    }
  }
};
</script>
