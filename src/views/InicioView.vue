<script setup>
import { ref, onMounted } from 'vue'
import DatosEstud from '../components/DatosEstud.vue'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const nam = ref("")
const mat = ref("")
const cori = ref("")
const corp = ref("")

const firebaseConfig = {
  apiKey: "AIzaSyCSlWWUBNe9GtN2hPMyRTg953FzgzfSFVI",
  authDomain: "ideen-e749a.firebaseapp.com",
  projectId: "ideen-e749a",
  storageBucket: "ideen-e749a.appspot.com",
  messagingSenderId: "237417789337",
  appId: "1:237417789337:web:6c530e72be7f86909f4508"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);



onMounted(async () =>{


const docRef = doc(db, "users", auth.currentUser.uid);
const docSnap = await getDoc(docRef);


if (docSnap.exists()) {
  
  // const nam=docSnap.data().name;
  nam.value =docSnap.data().name
  mat.value =docSnap.data().matricula
  cori.value =docSnap.data().correoinst
  corp.value =docSnap.data().correoper

  console.log("Document data:", docSnap.data());
} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}
})
</script>

<template>
  <v-app-bar class="px-md-8 mr-auto" color="#384FFE">
      <v-img class="logo" src="/logoTec.png" alt="logo" aspect-ratio="16/9" />
      <v-spacer class="d-none d-sm-block" />
      <!-- <div class="ml-auto" v-if="true">
        <RouterLink class="whiteboton pa-4" to="/">INICO DE SESION</RouterLink>
        <RouterLink class="whiteboton pa-4" to="/register">REGISTER</RouterLink>
      </div> -->

      <div class="ml-auto" >
        <RouterLink class="whiteboton pa-4" to="/home">INICIO</RouterLink>
        <RouterLink class="whiteboton pa-4" to="/lista">LISTA DE MATERIAS</RouterLink>
      </div>
      </v-app-bar>


  <h1>INFORMACIÓN DEL ALUMNO</h1>
  <div class="icono rounded_circle">
    <v-img src="/alumno.jpeg" alt="alumno" cover />
  </div>
  <v-container class="contenido pa-8 px-4 mx-auto my-14">
    <v-row>
      <v-col cols="12" sm="12" md="6">
        <DatosEstud encabezado="Nombre Completo" :contenido= "nam" />
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <DatosEstud encabezado="Matrícula" :contenido="mat" />
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <DatosEstud encabezado="Correo Institucional" :contenido="cori" />
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <DatosEstud encabezado="Carera" contenido="ITC" />
      </v-col>
      <v-col cols="12" sm="12" md="6">
        <DatosEstud encabezado="Correo Personal" :contenido="corp" />
      </v-col>
    </v-row>
  </v-container>
</template>


<script>

</script>
<style scoped>
h1 {
  text-align: center;
  color: var(--azul);
}

.icono {
  aspect-ratio: 1;
  border-radius: 100000px;
  margin: 2rem auto;
  max-width: 16rem;
  overflow: hidden;
}

.contenido {
  max-width: 40rem;
}

.whiteboton {
  font-weight: bold;
  color: white;
}

.logo {
  max-width: 10rem;
}

</style>
