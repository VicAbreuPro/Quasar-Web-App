<template>
  <q-page padding>
      <div class="row">
        <q-btn color="primary" label="Add New Sale" @click="changeAux(1)"></q-btn>
        <q-btn class="q-ml-sm" style="background: #09b85d; color: white" label="UPDATE SALE" @click="updateSale()" />
        <q-toggle class="q-ml-md" v-model="toggle" label="Show Sale state"></q-toggle>
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
          class="col fixed-header">

          <template v-if="toggle != false" v-slot:body="props" >
            <q-tr :props="props" :class="props.row.valor<5000?'lowstate':'text-black' && props.row.valor>8000?'highstate':'text-black'">
              <q-td key="sale_id" :props="props" >
                {{props.row.sale_id}}
              </q-td>
              <q-td key="product_model" :props="props" >
                {{props.row.model}}
              </q-td>
              <q-td key="product_serial" :props="props" >
                {{props.row.serial}}
              </q-td>
              <q-td key="client_id" :props="props" >
                {{props.row.client_id}}
              </q-td>
              <q-td key="value_s" :props="props" >
                {{props.row.valor}}
              </q-td>
              <q-td key="sale_date" :props="props" :class="props.row.valor>5000?'bluestate':'text-black'" >
                {{props.row.date}}
              </q-td>

            </q-tr>
          </template>
        </q-table>
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
  { name: 'value_s',  align: 'center', label: 'Value €', field: 'valor', sortable: true },
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

        saleList.value = await getSales()
        console.log(saleList.value[0].valor)
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
      toggle: ref(false),
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

<style lang="sass">
  .fixed-header

    height: 700px

    .q-table__top,
    .q-table__bottom,
    thead tr:first-child th

      background-color: white

    thead tr th
      position: sticky
      z-index: 1
    thead tr:first-child th
      top: 0


    &.q-table--loading thead tr:last-child th

      top: 48px
</style>

