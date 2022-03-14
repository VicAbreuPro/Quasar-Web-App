<template>
  <q-page class="text-h5 text-center q-mt-xl">
    <div v-if="user">
      <p> Welcome back <strong><span style="color:blue">{{user.user_metadata.username}}</span></strong> </p>
    </div>
    <div class="q-ml-xl q-mr-xl q-mt-lg">
      <q-carousel
        v-model="slide"
        transition-prev="scale"
        transition-next="scale"
        autoplay
        animated
        control-color="white"
        navigation
        padding
        arrows
        height="300px"
        class="bg-primary text-white shadow-1 rounded-borders"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-icon name="home" size="56px" />
          <div class="q-mt-md text-center">
            {{ homeSlide }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-icon name="live_tv" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <q-icon name="layers" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <q-icon name="terrain" size="56px" />
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
      </q-carousel>
    </div>
    <div class="row q-mt-xl">
      <q-card
        class="my-card text-white q-ml-xl"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
        <q-card-section>
          <div class="text-h6">Total Clients: {{tClients}}</div>
          <div class="text-subtitle2">Most from:</div>
          <div class="q-mt-sm"> {{ tpClients }} </div>
        </q-card-section>
      </q-card>

      <q-card
        class="my-card text-white q-ml-md"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
        <q-card-section>
          <div class="text-h6">Products Count: {{tProducts}}</div>
          <div class="text-subtitle2">Most frequent product:</div>
          <div class="q-mt-sm"> {{tpProduct}}</div>
        </q-card-section>
      </q-card>
    </div>
    <div class="row q-mt-lg">
      <q-card
        class="my-card text-white q-ml-xl"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
        <q-card-section>
          <div class="text-h6">Total Sales:</div>
          <div class="text-subtitle2">Top Sale:</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ lorem }}
        </q-card-section>
      </q-card>

      <q-card
        class="my-card text-white q-ml-md"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
        <q-card-section>
          <div class="text-h6">Sales Amount:</div>
          <div class="text-subtitle2"></div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ lorem }}
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import useApi from "src/composables/UseApi";
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
    name: "HomePage",

    setup(){
      // Get logged user using composable
      const{user} = useAuthUser()
      const{getSales, getProducts, getClientList, topCliLocation, topProduct} = useApi()
      const{notifyError, notifySuccess} = useNotify()
      const tClients = ref('')
      const tpClients = ref('')
      const tProducts = ref('')
      const tpProduct = ref('')
      const tSales = ref('')
      const tSales_v = ref('')
      const clientList = ref([])
      const productList = ref([])

      const mapClients = async () =>{
        try {
          var aux = false
          clientList.value = await getClientList()
          tpClients.value = await topCliLocation()
          tClients.value = clientList.value.length

          if (tClients.value != null && tpClients.value != null) aux =true
          if(aux != true) notifyError("Client Data Not Loaded Correctly!")

        } catch (error) {
          console.log(error)
        }
      }

      const mapProducts = async () =>{
        try {
          var aux = false
          productList.value = await getProducts()
          tProducts.value = productList.value.length
          tpProduct.value = await topProduct()

        } catch (error) {

        }
      }

      const mapSales = async () =>{
        try {
          saleList.value = await getSales()

        } catch (error) {
          notifyError("Error in load data!")
        }
      }

      onMounted(() =>{
        mapClients()
        mapProducts()
      })

      return{
        tpClients,
        tClients,
        tProducts,
        tpProduct,
        user,
        slide: ref('style'),
        homeSlide: '',
        lorem:''
      }
    }
})
</script>
