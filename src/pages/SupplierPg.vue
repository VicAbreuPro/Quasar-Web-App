<template>
  <q-page padding>
      <div class="row">
      <q-btn label="ADD NEW" class="currency" @click="persistent_add = true" />
      <q-btn class="q-ml-sm" style="background: #09b85d; color: white" label="UPDATE Supplier" @click="persistent = true" />
      <q-dialog v-model="persistent_add" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-black text-white" style="width: 600px">
          <q-card-section>
            <div class="row text-h6 justify-center">Add Supplier</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <Supplier_form
              @submit.prevent="addSupplier(s_form_aux)"
              @emit_form="get_form"/>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
      <div class="q-mt-md">
        <q-table
          dense
          title="Staff"
          :rows="sup_list"
          :columns="columns"
          :rows-per-page-options="[50, 75, 100, 150, 200]"
          row-key="id"
          class="col fixed-header">
        </q-table>
      </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'
import useNotify from "src/composables/UseNotify"
import Supplier_form from 'src/components/Supplier_form.vue'

const columns = [
  {
    name: 'Id',
    label: 'Supplier ID',
    align: 'center',
    field: 'Id',
    sortable: true
  },
  { name: 'Business_name', align: 'center', label: 'Business Name', field: 'Business_name'},
  { name: 'Business_type',  align: 'center', label: 'Business Type', field: 'Business_type'},
  { name: 'Average_Delivery',  align: 'center', label: 'Delivery Average', field: 'Average_Delivery', sortable: true},
  { name: 'Nif',  align: 'center', label: 'NIF', field: 'Nif'},
  { name: 'Addressline', align: 'center', label: 'Address', field: 'Address_line'},
  { name: 'Zipcode',  align: 'center', label: 'Zip-Code', field: 'Zip_code'},
  { name: 'City',  align: 'center', label: 'City', field: 'City'},
  { name: 'State', align: 'center', label: 'State', field: 'State'},
  { name: 'Country',  align: 'center', label: 'Country', field: 'Country'},
]

export default defineComponent({
  name: 'supplierPg',
  components:{
    Supplier_form
  },
  setup() {

    const{getSuppliers, postSupplier} = useApi()
    const {notifyError, notifySuccess} = useNotify()
    const sup_list = ref([])

    const mapSuppliers = async () =>{
      try {
        sup_list.value = await getSuppliers()
        if(sup_list.value != null) notifySuccess("Clients Loaded")
      } catch (error) {
        notifyError("Error in load data!")
      }
    }
    const addSupplier = async (sup_aux) =>{
      try {
        await postSupplier(sup_aux)
        sup_list.value = await getSuppliers()
        notifySuccess("Supplier Added!")
      } catch (error) {
        console.log(error)
      }
    }
    onMounted(() =>{
      mapSuppliers()
    })
    return{
      persistent_add: ref(false),
      s_form_aux: ref([]),
      columns,
      sup_list,
      addSupplier
    }
  },
  methods:{
    get_form(data){
      this.s_form_aux = data
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
