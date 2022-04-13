<template>
  <q-form v-model="emp_form" @change="emitEvent">
    <div class="row">
      <q-icon class="q-mr-sm q-mt-md" name="person"></q-icon>
      <div class="col">
        <q-input
          dense
          clearable
          v-model="emp_form.username"
          type="text"
          label="Employee Username"
          :rules="nameRules">
        </q-input>
      </div>
      <q-icon class=" q-mr-sm q-mt-md q-ml-sm" name="person"></q-icon>
      <div class="col">
        <q-input
          dense
          clearable
          v-model="emp_form.name"
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
          v-model="emp_form.surname"
          type="text"
          label="Surname"
          :rules="nameRules">
        </q-input>
      </div>
    </div>
    <div class="row">
      <q-icon class=" q-mr-sm q-mt-md q-ml-sm" name="school"></q-icon>
      <q-input
      class="form q-ml-sm"
      dense
      clearable
      v-model="emp_form.job_title"
      type="text"
      label="Job Title"
      :rules="nameRules">
    </q-input>
    </div>
    <div class="row">
      <q-icon class=" q-mr-sm q-mt-md q-ml-sm" name="email"></q-icon>
      <q-input
      class="form q-ml-sm"
      dense
      clearable
      v-model="emp_form.email"
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
        v-model="emp_form.phone"
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
        v-model="emp_form.nif"
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
        v-model="emp_form.addresline"
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
        v-model="emp_form.zipcode"
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
        v-model="emp_form.city"
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
        v-model="emp_form.state"
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
        v-model="emp_form.country"
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
const emp_form = ref({
  t_Id: 0,
  p_Id: 0,
  entity_Id: 0,
  territory_Id: 0,
  client_Id: 0,
  Job_title: '',
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
  name: "Staff_form",
  setup(){
    return{
      emp_form,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
    }
  },
  methods:{
    emitEvent(){
      this.$emit('emit_form', emp_form.value)
    }
  }
})
</script>
