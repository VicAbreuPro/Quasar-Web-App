<template>
  <q-page padding>
      <div class="row">
      <q-btn label="ADD NEW" class="currency" @click="persistent_add = true" />
      <q-btn class="q-ml-sm" style="background: #09b85d; color: white" label="UPDATE Employee" @click="persistent = true" />
      <q-dialog v-model="persistent_add" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-black text-white" style="width: 600px">
          <q-card-section>
            <div class="row text-h6 justify-center">Add Staff</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <Staff_form
              @submit.prevent="addStaff(e_form_aux)"
              @emit_form="get_form"/>
          </q-card-section>
        </q-card>
      </q-dialog>
    </div>
      <div class="q-mt-md">
        <q-table
          dense
          title="Staff"
          :rows="staffList"
          :columns="columns"
          :rows-per-page-options="[50, 75, 100, 150, 200]"
          row-key="id"
          class="col fixed-header">
        </q-table>
      </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted} from "vue"
import useApi from "src/composables/UseApi"
import useNotify from "src/composables/UseNotify"
import popUpWindow from "src/composables/PopUpWindows";
import Staff_form from "src/components/Staff_form.vue";

const columns = [
  {
    name: 'Employee_id',
    label: 'Employee ID',
    align: 'center',
    field: 'Employee_id',
    sortable: true
  },
  { name: 'Job_title',  align: 'center', label: 'Job Title', field: 'Job_title'},
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
  name: 'StaffPg',
  components:{
    Staff_form
  },
  setup(){

    const {mediumWindow} = popUpWindow()
    const {notifyError, notifySuccess} = useNotify()
    const {getStaff, postStaff} = useApi()
    const staffList = ref([])

    const mapStaff = async () =>{
      try {
        staffList.value = await getStaff()
        if(staffList.value != null) notifySuccess("Sales Loaded!")
      } catch (error) {
        notifyError("Error in load data!")
      }
    }

    const addStaff = async (e_form) =>{
      try {
        const status = await postStaff(e_form)
        if(status == 200){
          staffList.value = await getStaff()
          notifySuccess("New Staff Registered!")
        }
        else notifyError("Error in add register new Staff!")
      } catch (error) {
        notifyError("Internal Error Aplication")
      }
    }

    const updateSale = () =>{
      mediumWindow('/UpSale')
    }
    onMounted(() =>{
      mapStaff()
    })

    return{
      persistent_add: ref(false),
      e_form_aux: ref([]),
      staffList,
      columns,
      nameRules: [
        val => (val && val.length > 0) || 'Field is Required!'
      ],
      addStaff,
      updateSale,
    }
  },
  methods:{
    get_form(data){
      this.e_form_aux = data
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

