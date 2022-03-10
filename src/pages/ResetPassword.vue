<template>
  <q-page padding>
    <q-form class = "row justify-center" @submit.prevent="newPassword()">
      <p class ="col-12 text-h4 text-center q-mt-xl"> Reset Password Page</p>

      <div class="fixed-center">
        <div class="col justify-center">
          <div class="row">
            <q-icon class="q-mr-lg q-mt-lg" name="email"></q-icon>
            <q-input
              v-model="email"
              type="email"
              label="Email"
              lazy-rules
              :rule="nameRules"></q-input>
          </div>
          <q-btn class="full-width q-mt-lg" label="RESET PASSWORD" color="primary" type="submit"></q-btn>
          <q-btn class="full-width q-mt-lg" label="CANCEL" color="primary" to="/"></q-btn>
        </div>
      </div>
    </q-form>
  </q-page>
</template>

<script>
import useAuthUser from "src/composables/UseAuthUser";
import {useRouter} from 'vue-router';
import useNotify from "src/composables/UseNotify";
import { defineComponent, ref } from "vue";

export default{
  name: "ResetPassword",

  setup(){

    const{notifyError, notifySuccess} = useNotify()

    const router = useRouter()

    const{sendPasswordRestEmail} = useAuthUser()

    const email = ref('')

    const newPassword = async () =>{
      try {
        await sendPasswordRestEmail(email.value)

        notifySuccess(`Email sent to ${email.value}`)

        router.push({
          name: 'resetConfirm',
          query: {email: email.value}
        })
      } catch (error) {
        alert(error.message)
      }
    }

    return {
      email,
      newPassword,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
    }
  }

};
</script>
