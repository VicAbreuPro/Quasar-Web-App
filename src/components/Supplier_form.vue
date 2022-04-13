<template>
  <q-form v-model="sup_form" @change="emitEvent">
    <div class="row">
      <q-icon class="q-mr-sm q-mt-md" name="person"></q-icon>
      <div class="col">
        <q-input
          dense
          clearable
          v-model="sup_form.business_name"
          type="text"
          label="Business Name"
          :rules="nameRules">
        </q-input>
      </div>
      <q-icon class=" q-mr-sm q-mt-md q-ml-sm" name="person"></q-icon>
      <div class="col">
        <q-input
          dense
          clearable
          v-model="sup_form.business_type"
          type="text"
          label="Business Type"
          :rules="nameRules">
        </q-input>
      </div>
      <div class="row">
        <q-icon class=" q-mr-sm q-mt-md q-ml-sm" name="badge"></q-icon>
        <q-input
          class="form q-ml-sm"
          dense
          clearable
          v-model="sup_form.nif"
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
          v-model="sup_form.address_line"
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
          v-model="sup_form.zip_code"
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
          v-model="sup_form.city"
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
          v-model="sup_form.state"
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
          v-model="sup_form.country"
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
    </div>
  </q-form>
</template>

<script>
import { defineComponent, ref } from "vue";

// Reactive form for client data inputs
const sup_form = ref({
  t_Id: 0,
  b_Id: 0,
  entity_Id: 0,
  business_name: '',
  business_type: '',
  nif: '',
  address_line: '',
  zip_code: '',
  city: '',
  state: '',
  country: ''
})

export default defineComponent({
  name: "Supplier_form",
  setup(){
    return{
      sup_form,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
    }
  },
  methods:{
    emitEvent(){
      this.$emit('emit_form', sup_form.value)
    }
  }
})
</script>
