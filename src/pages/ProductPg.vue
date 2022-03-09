<template>
  <q-page padding>
    <div class="row">
      <q-btn color="primary" label="Add New Product" @click="changeAux(1)"></q-btn>
      <q-btn class="q-ml-sm" style="background: #09b85d; color: white" label="UPDATE PRODUCT" @click="updateProduct()" />
    </div>
    <q-form @submit.prevent="addProduct()">
      <div name="addDIV" className="row q-mt-sm" v-if="aux">
        <q-icon class="q-mr-sm q-mt-md" name="vpn_key"></q-icon>
        <q-input
        dense
          clearable
          v-model="productForm.p_serial"
          type="number"
          label="Serial Number"
          :rules="nameRules">
        </q-input>
        <q-icon class="q-ml-xl q-mr-sm q-mt-md" name="location_on"></q-icon>
        <q-input
        dense
          clearable
          v-model="productForm.p_model"
          type="text"
          label="Product Model"
          :rules="nameRules">
        </q-input>
        <q-icon class="q-ml-xl q-mt-md q-mr-sm" name="euro"></q-icon>
        <q-input
          dense
          clearable
          v-model="productForm.p_value"
          suffix="€"
          label="Product Value"
          :rules="nameRules">
        </q-input>
        <div class="col q-mt-sm q-ml-xl" >
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

    <div class="row q-mt-md">
      <q-table
        dense
        title="Products"
        :rows="productList"
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
    name: 'serial',
    label: 'Serial Number',
    align: 'center',
    field: 'serial',
    sortable: true
  },
  { name: 'product_model', align: 'center', label: 'Model', field: 'model', sortable: true },
  { name: 'value',  align: 'center', label: 'Value €', field: 'valor', sortable: true },
]

export default defineComponent({
  name: "ProductPg",

  setup(){

    const {addWindow} = popUpWindow()
    const {notifyError, notifySuccess} = useNotify()
    const {getProducts, postProduct} = useApi()
    const productList = ref([])
    const aux = ref(false)

    // Reactive form for product data inputs
    const productForm = ref({
        p_serial: '',
        p_model: '',
        p_value: '',
    })

    const mapProducts = async () =>{
      try {
        productList.value = await getProducts()
        if(productList.value != null) notifySuccess("Products Loaded")
      } catch (error) {
        notifyError("Error in load data!")
      }
    }

    const addProduct = async () =>{
      try {
        const status = await postProduct(productForm.value.p_serial, productForm.value.p_model, productForm.value.p_value)
        if(status == 200) notifySuccess("New Product Added!")
        else notifyError("Error in add new Product!")
      } catch (error) {
        notifyError("Internal Error Aplication")
      }
    }

    const updateProduct = () =>{
      addWindow('/UpProduct')
    }

    const changeAux = (validation) =>{
      if(validation != 0) aux.value = true
      else aux.value = false
    }

    onMounted(() =>{
      mapProducts()
    })

    return{
      aux,
      productForm,
      columns,
      productList,
      nameRules: [
        val => (val && val.length > 0) || 'Filed is Required!'
      ],
      addProduct,
      updateProduct,
      changeAux
    }
  },



  methods:{
    getProducts(){
      this.$axios.get('https://apivna20.azurewebsites.net/Product/ProductList')
      .then((res) =>{
        console.log(res)
        this.productList = res.data
      })
      .catch((err) =>{
        console.log(err)
      })
    }
  }
});
</script>
