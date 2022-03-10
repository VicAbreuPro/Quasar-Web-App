<template>
  <q-page padding>
      <div class="row">
        <q-btn color="primary" label="Add New Sale" @click="changeAux(1)"></q-btn>
        <q-btn class="q-ml-sm" style="background: #09b85d; color: white" label="UPDATE SALE" @click="updateSale()" />
      </div>
      <q-form @submit.prevent="addSale()">
        <div name="addDIV" className="row q-mt-sm" v-if="aux">
          <q-icon class="q-mr-sm q-mt-md" name="vpn_key"></q-icon>
          <q-input
            dense
            clearable
            v-model="saleForm.s_serial"
            type="number"
            label="Serial Number"
            :rules="nameRules">
          </q-input>
          <q-icon class="q-ml-xl q-mr-sm q-mt-md" name="star"></q-icon>
          <q-input
            dense
            clearable
            v-model="saleForm.s_model"
            type="text"
            label="Product Model"
            :rules="nameRules">
          </q-input>
          <q-icon class="q-ml-xl q-mt-md q-mr-sm" name="euro"></q-icon>
          <q-input
            dense
            clearable
            v-model="saleForm.s_valor"
            suffix="€"
            label="Product Value"
            :rules="nameRules">
          </q-input>
          <q-icon class="q-ml-xl q-mt-md q-mr-sm" name="person"></q-icon>
          <q-input
            dense
            clearable
            v-model="saleForm.s_cli"
            label="Client ID"
            :rules="nameRules">
          </q-input>
          <q-input
            dense
            clearable
            v-model="saleForm.s_date"
            class="q-ml-md q-mt-sm"
            filled type="date"
            hint="Registration Date"
            mask="aaaa-mm-dd"
            :rules="nameRules">
          </q-input>
          <div class="col q-mt-sm q-mr-xl" >
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
      <div class="q-mt-md">
        <q-table
          dense
          title="Sales"
          :rows="saleList"
          :columns="columns"
          :rows-per-page-options="[50, 75, 100, 150, 200]"
          row-key="id"
          class="col"
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
    name: 'sale_id',
    label: 'Sale ID',
    align: 'center',
    field: 'sale_id',
    sortable: true
  },
  { name: 'product_model', align: 'center', label: 'Model', field: 'model', sortable: true },
  { name: 'product_serial', align: 'center', label: 'Serial Number', field: 'serial', sortable: true },
  { name: 'client_id', align: 'center', label: 'Client ID', field: 'client_id', sortable: true },
  { name: 'value',  align: 'center', label: 'Value €', field: 'valor', sortable: true },
  { name: 'sale_date', align: 'center', label: 'Sale Date', field: 'date', sortable: true },
]

export default defineComponent({
  name: 'SalesPg',

  setup(){

    const {mediumWindow} = popUpWindow()
    const {notifyError, notifySuccess} = useNotify()
    const {getSales, postSale} = useApi()
    const saleList = ref([])
    const aux = ref(false)

    // Reactive form for product data inputs
    const saleForm = ref({
        s_serial: '',
        s_model: '',
        s_valor: '',
        s_cli: '',
        s_date: ''
    })

    const mapSales = async () =>{
      try {
        console.log(saleForm.value)
        saleList.value = await getSales()
        if(saleList.value != null) notifySuccess("Sales Loaded!")
      } catch (error) {
        notifyError("Error in load data!")
      }
    }

    const addSale = async () =>{
      try {
        const status = await postSale(saleForm.value.s_serial, saleForm.value.s_model, saleForm.value.s_cli, saleForm.value.s_valor, saleForm.value.s_date)
        if(status == 200) notifySuccess("New Sale Registered!")
        else notifyError("Error in add register new Sale!")
      } catch (error) {
        notifyError("Internal Error Aplication")
      }
    }

    const updateSale = () =>{
      mediumWindow('/UpSale')
    }

    const changeAux = (validation) =>{
      if(validation != 0) aux.value = true
      else aux.value = false
    }

    onMounted(() =>{
      mapSales()
    })

    return{
      aux,
      saleForm,
      saleList,
      columns,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
      MyPagination:{
        rowsPerPage: 50
      },
      addSale,
      updateSale,
      changeAux
    }
  }
})
</script>
