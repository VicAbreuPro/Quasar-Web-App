<template>
  <q-page padding>
    <p class="col-12 text-h4 text-center q-mt-xl">Thanks for your Registration!</p>
    <p class="col-12 text-h6 text-center q-mt-xl"> Please Confirm your Email to finish your Registration: <strong>{{$route.query.email}}</strong></p>
    <q-btn class="full-width q-mt-lg" label="BACK" color="primary" to="/"></q-btn>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: 'PageEmailConfirmation'
})
</script>
