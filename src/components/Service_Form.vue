<template>
  <q-form v-model="s_form" @change="emitEvent">
    <div class="row s_form q-mb-md">
      <q-icon class="q-mr-sm q-mt-md" name="person"></q-icon>
      <div class="col">
        <q-input
          dense
          clearable
          v-model="s_form.Client_Id"
          type="number"
          label="Client ID"
          :rules="nameRules">
        </q-input>
      </div>
      <q-icon class=" q-mr-sm q-mt-md q-ml-sm" name="date_range"></q-icon>
      <div class="col">
        <q-input
          dense
          clearable
          v-model="s_form.StartDate"
          type="date"
          hint="Start Date"
          :rules="nameRules">
        </q-input>
      </div>
      <q-icon class=" q-mr-sm q-mt-md q-ml-sm" name="date_range"></q-icon>
      <div class="col">
        <q-input
          dense
          clearable
          v-model="s_form.EndDate"
          type="date"
          hint="End Date">
        </q-input>
      </div>
    </div>
    <div class="row">
      <q-icon class=" q-mr-sm q-mt-md " name="work_outline"></q-icon>
      <q-select
        filled
        class="form q-ml-sm"
        dense
        v-model="s_form.Type"
        :options="type_options"
        label="Service Type"
        :rules="nameRules">
      </q-select>
    </div>
    <div class="row">
      <q-icon class=" q-mr-sm q-mt-md" name="published_with_changes"></q-icon>
      <q-select
        filled
        class="form q-ml-sm"
        dense
        v-model="s_form.Status"
        label="Status"
        :options="status_opt"
        :rules="nameRules">
      </q-select>
    </div>
    <div class="row">
      <q-icon class=" q-mr-sm q-mt-md" name="edit"></q-icon>
      <q-input
        class="form q-ml-sm"
        dense
        clearable
        v-model="s_form.Observations"
        type="text"
        label="Observations"
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
import { defineComponent, ref } from 'vue'

const s_form = ref({
  id: 0,
  type_Id: '',
  Client_Id: '',
  Status: '',
  StartDate: '',
  EndDate: '',
  Type: '',
  Description: '',
  Observations: ''
})

export default defineComponent({
  name: "Service_Form",
  setup() {
    return{
      s_form,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
      type_options:[
        'Reparação Equipamento', 'Diagnóstico de Equipamento', 'Manutenção de Equipamento', 'Montagem de Equipamento'
      ],
      status_opt:[
        'Active', 'Done'
      ]
    }
  },
  methods:{
    emitEvent(){
      this.$emit('emit_form', s_form.value)
    }
  }
})
</script>

