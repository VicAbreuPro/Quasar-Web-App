<template>
  <q-page padding>
    <div class="row">
      <q-btn label="ADD NEW" class="currency" @click="persistent_add = true" />
      <q-btn class="q-ml-sm" style="background: #09b85d; color: white" label="UPDATE CLIENT" @click="persistent = true" />
      <q-dialog v-model="persistent_add" persistent transition-show="scale" transition-hide="scale">
        <q-card class="bg-black text-white" style="width: 600px">
          <q-card-section>
            <div class="row text-h6 justify-center">Add client</div>
          </q-card-section>
          <q-card-section class="q-pt-none">
            <q-form @submit.prevent="addClient()">
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
              <q-card-actions align="right" class="text-teal">
                <q-btn
                  flat
                  label="CANCEL"
                  v-close-popup />
                <q-btn
                  flat
                  label="CONFIRM"
                  v-close-popup
                  type="submit" />
              </q-card-actions>
            </q-form>
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
  { name: 'Addressline', align: 'center', label: 'Address', field: 'Addressline'},
  { name: 'Zipcode',  align: 'center', label: 'Zip-Code', field: 'Zipcode'},
  { name: 'City',  align: 'center', label: 'City', field: 'City'},
  { name: 'State', align: 'center', label: 'State', field: 'State'},
  { name: 'Country',  align: 'center', label: 'Country', field: 'Country'},
]

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
  name:'ClientPg',

  setup(){

    const {addWindow} = popUpWindow()
    const {notifyError, notifySuccess} = useNotify()
    const {getClientList, postClient} = useApi()
    const clientList = ref([])
    const aux = ref(false)

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
        await postClient(cliForm.value.username, cliForm.value.first_name, cliForm.value.surname, cliForm.value.email, cliForm.value.phone, cliForm.value.nif, cliForm.value.adressline, cliForm.value.zipcode, cliForm.value.city, cliForm.value.district, cliForm.value.country)
        clientList.value = await getClientList()


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
      persistent_add: ref(false),
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

<style lang="sass">
  .fixed-header

    height: 700px

    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th

      background-color: amber

    thead tr th
      position: sticky
      z-index: 1
    thead tr:first-child th
      top: 0


    &.q-table--loading thead tr:last-child th

      top: 48px
</style>
