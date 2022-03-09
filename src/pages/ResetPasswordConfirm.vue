<template>
  <q-page padding>
    <p class="col-12 text-h4 text-center q-mt-xl">You Will Receive an Email with Password Change Process!</p>
    <p class="col-12 text-h6 text-center q-mt-xl"> Please check your Email inbox!: <strong>{{$route.query.email}}</strong></p>
    <q-btn class="full-width q-mt-lg" label="BACK" color="primary" to="/"></q-btn>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: 'PageResetConfirm'
})
</script>
