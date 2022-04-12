<template>
  <div class="row">
    <q-icon class="q-mr-sm q-mt-md" name="person"></q-icon>
    <div class="col">
      <q-input
        dense
        clearable
        v-model="cliForm.username"
        type="text"
        label="Client Username"
        :rules="nameRules">
      </q-input>
    </div>
    <q-icon class=" q-mr-sm q-mt-md q-ml-sm" name="person"></q-icon>
    <div class="col">
      <q-input
        dense
        clearable
        v-model="cliForm.first_name"
        type="text"
        label="First Name"
        :rules="nameRules">
      </q-input>
    </div>
    <q-icon class=" q-mr-sm q-mt-md q-ml-sm" name="person"></q-icon>
    <div class="col">
      <q-input
        dense
        clearable
        v-model="cliForm.surname"
        type="text"
        label="Surname"
        :rules="nameRules">
      </q-input>
    </div>
  </div>

  <div class="row">
    <q-icon class=" q-mr-sm q-mt-md q-ml-sm" name="email"></q-icon>
    <q-input
    class="form q-ml-sm"
    dense
    clearable
    v-model="cliForm.email"
    type="text"
    label="Email"
    :rules="nameRules">
  </q-input>
  </div>
  <div class="row">
    <q-icon class=" q-mr-sm q-mt-md q-ml-sm" name="phone"></q-icon>
    <q-input
      class="form q-ml-sm"
      dense
      clearable
      v-model="cliForm.phone"
      type="number"
      label="Phone"
      :rules="nameRules">
    </q-input>
  </div>
  <div class="row">
    <q-icon class=" q-mr-sm q-mt-md q-ml-sm" name="badge"></q-icon>
    <q-input
      class="form q-ml-sm"
      dense
      clearable
      v-model="cliForm.nif"
      type="number"
      label="NIF"
      :rules="nameRules">
    </q-input>
  </div>
  <div class="row">
    <q-icon class=" q-mr-sm q-mt-md q-ml-sm" name="place"></q-icon>
    <q-input
      class="form q-ml-sm"
      dense
      clearable
      v-model="cliForm.adressline"
      type="text"
      label="Address"
      :rules="nameRules">
    </q-input>
  </div>
  <div class="row">
      <q-icon class=" q-mr-sm q-mt-md q-ml-sm" name="map"></q-icon>
    <q-input
      class="form q-ml-sm"
      dense
      clearable
      v-model="cliForm.zipcode"
      type="number"
      label="Zip Code"
      :rules="nameRules">
    </q-input>
  </div>
  <div class="row">
    <q-icon class=" q-mr-sm q-mt-md q-ml-sm" name="location_city"></q-icon>
    <q-input
      class="form q-ml-sm"
      dense
      clearable
      v-model="cliForm.city"
      type="text"
      label="City"
      :rules="nameRules">
    </q-input>
  </div>
  <div class="row">
    <q-icon class=" q-mr-sm q-mt-md q-ml-sm" name="gps_fixed"></q-icon>
    <q-input
      class="form q-ml-sm"
      dense
      clearable
      v-model="cliForm.district"
      type="text"
      label="State"
      :rules="nameRules">
    </q-input>
  </div>
  <div class="row">
    <q-icon class=" q-mr-sm q-mt-md q-ml-sm" name="language"></q-icon>
    <q-input
      class="form q-ml-sm"
      dense
      clearable
      v-model="cliForm.country"
      type="text"
      label="Country"
      :rules="nameRules">
    </q-input>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";


// Reactive form for client data inputs
const cliForm = ref({
  username: '',
  first_name: '',
  surname: '',
  email: '',
  phone: '',
  nif: '',
  adressline: '',
  zipcode: '',
  city: '',
  district: '',
  country: ''
})

export default defineComponent({
  name: "Form",
  data(){
    return{
      cliForm
    }
  }

})
</script>


