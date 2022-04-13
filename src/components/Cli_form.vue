<template>
  <q-form v-model="cli_form" @change="emitEvent">
    <div class="row">
      <q-icon class="q-mr-sm q-mt-md" name="person"></q-icon>
      <div class="col">
        <q-input
          dense
          clearable
          v-model="cli_form.username"
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
          v-model="cli_form.name"
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
          v-model="cli_form.surname"
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
      v-model="cli_form.email"
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
        v-model="cli_form.phone"
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
        v-model="cli_form.nif"
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
        v-model="cli_form.addresline"
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
        v-model="cli_form.zipcode"
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
        v-model="cli_form.city"
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
        v-model="cli_form.state"
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
        v-model="cli_form.country"
        type="text"
        label="Country"
        :rules="nameRules">
      </q-input>
    </div>
    <q-card-actions align="right" class="text-teal">
      <q-btn
        flat
        label="CANCEL"
        v-close-popup />
      <q-btn
        flat
        label="CONFIRM"
        v-close-popup
        type="submit"/>
    </q-card-actions>
  </q-form>
</template>

<script>
import { defineComponent, ref } from "vue";

// Reactive form for client data inputs
const cli_form = ref({
  t_Id: 0,
  p_Id: 0,
  entity_Id: 0,
  territory_Id: 0,
  client_Id: 0,
  username: '',
  name: '',
  surname: '',
  email: '',
  phone: '',
  nif: '',
  addresline: '',
  zipcode: '',
  city: '',
  state: '',
  country: ''
})

export default defineComponent({
  name: "Form",
  setup(){
    return{
      cli_form,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
    }
  },
  methods:{
    emitEvent(){
      this.$emit('emit_form', cli_form.value)
    }
  }
})
</script>


