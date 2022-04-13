<template>
  <q-page padding>
    <div class="row">
      <q-btn label="ADD NEW" class="currency" @click="persistent_add = true" />
      <q-btn class="q-ml-sm" style="background: #09b85d; color: white" label="UPDATE SERVICE" @click="persistent = true" />
      <q-dialog v-model="persistent_add" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-black text-white" style="width: 600px">
          <q-card-section>
            <div class="row text-h6 justify-center">Add client</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <Service_Form
              @submit.prevent="addService(s_form_aux)"
              @emit_form="get_form"/>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
    <div class="row q-mt-md">
      <q-table
        dense
        title="Services"
        :rows="serviceList"
        :columns="columns"
        :rows-per-page-options="[50, 75, 100, 150, 200]"
        row-key="Id"
        class="col fixed-header"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted} from "vue"
import useApi from "src/composables/UseApi"
import useNotify from "src/composables/UseNotify"
import popUpWindow from "src/composables/PopUpWindows";
import Service_Form from "../components/Service_Form.vue"

const columns = [
  {
    name: 'Id',
    label: 'Service ID',
    align: 'center',
    field: 'Id',
    sortable: true
  },
  { name: 'Client_Id', align: 'center', label: 'Client ID', field: 'Client_Id', sortable: true },
  { name: 'Status',  align: 'center', label: 'Status', field: 'Status', sortable: true },
  { name: 'S_type', align: 'center', label: 'Service Type', field: 'S_type'},
  { name: 'Description',  align: 'center', label: 'Type Description', field: 'Description'},
  { name: 'StartDate', align: 'center', label: 'Start Date', field: 'StartDate', sortable: true },
  { name: 'EndDate',  align: 'center', label: 'End Date', field: 'EndDate', sortable: true },
  { name: 'Observations', align: 'center', label: 'Observations', field: 'Observations'},
]

export default defineComponent({
  name: "ServicePg",
  components:{
    Service_Form
  },
  setup(){

    const {addWindow} = popUpWindow()
    const {notifyError, notifySuccess} = useNotify()
    const {getServices, postService} = useApi()
    const serviceList = ref([])

    const mapProducts = async () =>{
      try {
        serviceList.value = await getServices()
        if(serviceList.value != null) notifySuccess("Service Data Loaded")
      } catch (error) {
        notifyError("Error in load data!")
      }
    }

    const addService = async (s_aux) =>{
      if     (s_aux.Type == 'Reparação Equipamento')      s_aux.type_Id = 1;
      else if(s_aux.Type == 'Diagnóstico de Equipamento') s_aux.type_Id = 2;
      else if(s_aux.Type == 'Manutenção de Equipamento')  s_aux.type_Id = 3;
      else if(s_aux.Type == 'Montagem de Equipamento')    s_aux.type_Id = 4;

      if(s_aux.Status == 'Active') s_aux.Status = 1
      else if (s_aux.Status == 'Done') s_aux.Status = 0
      try {
        const status = await postService(s_aux)
        if(status == 200){
          serviceList.value = await getServices()
          notifySuccess("New Service Registered!")
        }
        else notifyError("Error in Register New Service!")
      } catch (error) {
        notifyError("Internal Error Aplication")
      }
    }

    const updateProduct = () =>{
      addWindow('/UpProduct')
    }

    onMounted(() =>{
      mapProducts()
    })

    return{
      persistent_add: ref(false),
      s_form_aux: ref([]),
      columns,
      serviceList,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
      addService,
      updateProduct,
    }
  },
  methods:{
    get_form(data){
      this.s_form_aux = data
    }
  }
});
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
