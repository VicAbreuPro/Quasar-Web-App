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
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";

export default defineComponent({
    name: "HomePage",

    setup(){
      // Get logged user using composable
      const{user} = useAuthUser()

      return{
        user,
        slide: ref('style'),
        homeSlide: ''
      }
    }
})
</script>
