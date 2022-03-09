<template>
  <q-page padding>
    <div class="row">
      <q-btn color="primary" label="Add New Client" @click="changeAux(1)"></q-btn>
      <q-btn class="q-ml-sm" style="background: #09b85d; color: white" label="UPDATE CLIENT" @click="updateClient()" />
    </div>
    <q-form @submit.prevent="addClient()">
      <div name="addDIV" className="row q-mt-sm" v-if="aux">
        <q-icon class="q-mr-sm q-mt-lg" name="person"></q-icon>
        <q-input
        dense
          clearable
          v-model="cliForm.cli_name"
          type="text"
          label="Client Name"
          :rules="nameRules">
        </q-input>
        <q-icon class="q-ml-md q-mr-sm q-mt-lg" name="location_on"></q-icon>
        <q-input
        dense
          clearable
          v-model="cliForm.cli_location"
          type="text"
          label="Location"
          :rules="nameRules">
        </q-input>
        <q-input
          dense
          clearable
          v-model="cliForm.cli_date"
          class="q-ml-sm q-mt-sm"
          filled type="date"
          hint="Registration Date"
          mask="aaaa-mm-dd"
          :rules="nameRules">
        </q-input>
        <div class="col q-mt-md q-ml-xl" >
          <q-btn
            style='float: right'
            class="row"
            color="primary"
            label="CONFIRM"
            type="submit">
          </q-btn>
          <q-btn
            style='float: right'
            class="row q-mr-sm"
            color="red"
            label="CANCEL"
            @click="changeAux(0)">
          </q-btn>
        </div>
      </div>
    </q-form>

    <div id="divTable" class="row q-mt-md">
      <q-table
        class="col my-sticky-header-table"
        title="Clients"
        :rows="clientList"
        :columns="columns"
        dense
        :pagination="MyPagination"
        :rows-per-page-options="[50, 75, 100, 150, 200]"
        row-key="id"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted} from "vue"
import useApi from "src/composables/UseApi"
import useNotify from "src/composables/UseNotify"
import popUpWindow from "src/composables/PopUpWindows";

const columns = [
  {
    name: 'id',
    label: 'Client ID',
    align: 'left',
    field: 'id',
    sortable: true
  },
  { name: 'cli_name', align: 'center', label: 'Client Name', field: 'name', sortable: true },
  { name: 'location',  align: 'center', label: 'Location', field: 'location', sortable: true },
  { name: 'date',  align: 'center', label: 'Register Date', field: 'date', sortable : true },
]

export default defineComponent({
  name:'ClientPg',

  setup(){

    const {addWindow} = popUpWindow()
    const {notifyError, notifySuccess} = useNotify()
    const {getClientList, postClient} = useApi()
    const clientList = ref([])
    const aux = ref(false)

    // Reactive form for client data inputs
    const cliForm = ref({
        cli_name: '',
        cli_location: '',
        cli_date: ''
    })

    const mapClients = async () =>{
      try {
        clientList.value = await getClientList()
        if(clientList.value != null) notifySuccess("Clients Loaded")
      } catch (error) {
        notifyError("Error in load data!")
      }
    }

    const addClient = async () =>{
      try {
        await postClient(cliForm.value.cli_name, cliForm.value.cli_location, cliForm.value.cli_date)
        notifySuccess("Client Added!")
      } catch (error) {
        console.log(error)
      }
    }

    const updateClient = () =>{

      addWindow('/UpClient')
    }

    const changeAux = (validation) =>{
      if(validation != 0) aux.value = true
      else aux.value = false
    }

    // When view is mounted, call methods below
    onMounted(() =>{
      mapClients()
    })

    return{
      aux,
      cliForm,
      columns,
      clientList,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
      changeAux,
      addClient,
      updateClient
    }
  },
})
</script>
