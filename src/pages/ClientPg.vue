<template>
  <q-page padding>
    <div class="row">
      <q-btn label="ADD NEW" class="currency" @click="persistent_add = true" />
      <q-btn class="q-ml-sm" style="background: #09b85d; color: white" label="UPDATE CLIENT" @click="persistent = true" />
      <div class="row q-ml-auto" style="height: 30px" >
        <label class="q-ml-xl q-pl-xl q-mt-sm" style="font-size: 20px" dense>Search Client</label>
        <q-input
            filled
            class="q-ml-lg"
            style="width: 400px"
            v-model="input"
            dense
            @input="isTyping = true"
            type="text"
            :counter="10"
            :rules="nameRules"
            label="Name"
            required>
        </q-input>
        <q-select
            filled
            style="width: 400px"
            class="q-ml-md"
            dense
            v-model="input_type"
            :options="items"
            :rules="nameRules"
            label="Item"
            required>
        </q-select>
      </div>
      <q-dialog v-model="persistent_add" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-black text-white" style="width: 600px">
          <q-card-section>
            <div class="row text-h6 justify-center">Add client</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <Form
              @submit.prevent="addClient(cli_form_aux)"
              @emit_form="get_form"/>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <div id="divTable" class="row q-mt-md">
      <q-table
        class="col fixed-header"
        title="Clients"
        color="amber"
        :rows="clientList"
        :columns="columns"
        dense
        :rows-per-page-options="[50, 75, 100, 150, 200]"/>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted} from "vue"
import useApi from "src/composables/UseApi"
import useNotify from "src/composables/UseNotify"
import popUpWindow from "src/composables/PopUpWindows";
import Form from "../components/Cli_form.vue"



const columns = [
  {
    name: 'id',
    label: 'Client ID',
    align: 'center',
    field: 'Client_Id',
    sortable: true
  },
  { name: 'Username', align: 'center', label: 'Username', field: 'Username'},
  { name: 'Name',  align: 'center', label: 'First Name', field: 'Name'},
  { name: 'Surname',  align: 'center', label: 'Surname', field: 'Surname'},
  { name: 'Email', align: 'center', label: 'Email', field: 'Email'},
  { name: 'Phone',  align: 'center', label: 'Phone', field: 'Phone'},
  { name: 'Nif',  align: 'center', label: 'NIF', field: 'Nif'},
  { name: 'Addressline', align: 'center', label: 'Address', field: 'Addresline'},
  { name: 'Zipcode',  align: 'center', label: 'Zip-Code', field: 'Zipcode'},
  { name: 'City',  align: 'center', label: 'City', field: 'City'},
  { name: 'State', align: 'center', label: 'State', field: 'State'},
  { name: 'Country',  align: 'center', label: 'Country', field: 'Country'},
]

export default defineComponent({
  name:'ClientPg',
  components:{
    Form
  },

  data(){
    return{
      input: '',
      input_type: '',
    }
  },

  setup(){
    const {addWindow} = popUpWindow()
    const {notifyError, notifySuccess} = useNotify()
    const {getClientList, postClient} = useApi()
    const clientList = ref([])

    const mapClients = async (validation, type, value) =>{
      try {
        clientList.value = await getClientList(validation, type, value)
        if(clientList.value != null) notifySuccess("Clients Loaded")
      } catch (error) {
        notifyError("Error in load data!")
      }
    }
    const addClient = async (cli_aux) =>{
      console.log(cli_aux)
      try {
        await postClient(cli_aux)
        clientList.value = await getClientList()
        notifySuccess("Client Added!")
      } catch (error) {
        console.log(error)
      }
    }
    const updateClient = () =>{
      addWindow('/UpClient')
    }
    // When view is mounted, call methods below
    onMounted(() =>{
      mapClients(1, 'default', 'default')
    })
    return{
      mapClients,
      items:[
        'Username', 'First Name', 'Surname', 'Nif', 'Email', 'Phone', 'City', 'State', 'Country'
      ],
      cli_form_aux: ref([]),
      columns,
      clientList,
      persistent_add: ref(false),
      nameRules: [
        val => (val && val.length > 0) || ''
      ],
      addClient,
      updateClient
    }
  },

  methods:{
    // Get data from event emit from Form.vue component and pass to cli_form_aux
    get_form(data){
      this.cli_form_aux = data
    }
  },

  watch:{
    input(value){
      if(value != ""){
        this.mapClients(0, this.input_type ,value)
      }else{
        this.mapClients(1)
      }
    }
  }
})
</script>

<style lang="sass">
  .fixed-header
    height: 700px
    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th
      background-color: #1c1c1c
    thead tr th
      position: sticky
      z-index: 1
    thead tr:first-child th
      top: 0
    &.q-table--loading thead tr:last-child th
      top: 48px
</style>
