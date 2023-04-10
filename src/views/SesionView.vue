<script setup>
import { ref, onMounted } from 'vue'
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import inicio from "../views/InicioView.vue"
import router from '../router';


</script>

<template>
  <v-app-bar class="px-md-8 mr-auto" color="#384FFE">
      <v-img class="logo" src="/logoTec.png" alt="logo" aspect-ratio="16/9" />
      <v-spacer class="d-none d-sm-block" />
      <div class="ml-auto" v-if="true">
        <RouterLink class="whiteboton pa-4" to="/">INICO DE SESION</RouterLink>
        <RouterLink class="whiteboton pa-4" to="/register">REGISTER</RouterLink>
      </div>

      <!-- <div class="ml-auto" v-else>
        <RouterLink class="whiteboton pa-4" to="/home">INICIO</RouterLink>
        <RouterLink class="whiteboton pa-4" to="/lista">LISTA DE MATERIAS</RouterLink>
      </div> -->
      </v-app-bar>

  <div style="padding: 1rem ">
    <h1>INICIO DE SESION</h1>

    <v-responsive class="mx-auto" max-width="344" style="padding-top: 3rem;">
      <v-form ref="form" v-model="valid" @submit.prevent="submitcuenta">
        <v-text-field v-model="cuenta.correo" :rules= "emailRules"
        label="Correo institucional" placeholder="a0xxxxxx@tec.mx" type="email" variant="outlined"></v-text-field>


        <br>
        <v-text-field v-model="cuenta.contra" :rules= "passwordRules"
        label="Contraseña"  type="password" variant="outlined"></v-text-field>
        <br>
        <v-btn
            block
            size="large"
            type="submit"
            variant="elevated"
            style="background-color: var(--azul); color: white; "
          >
            Inicia sesión
          </v-btn>
      </v-form>
    </v-responsive>
  <v-responsive>
    <v-dialog v-model="dialogo" width="20rem" height="10rem">
        <v-card-title style="background-color: white;">Contraseña incorecta</v-card-title>
        <v-card-text style="background-color: white;">Contraseña o correo no coincidentes</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn @click="dialogo = false" style="background-color: blue;">cerrar</v-btn>
        </v-card-actions>
    </v-dialog>
  </v-responsive>

    
     
    
  </div>
  
</template>


<script>
const firebaseConfig = {
  apiKey: "AIzaSyCSlWWUBNe9GtN2hPMyRTg953FzgzfSFVI",
  authDomain: "ideen-e749a.firebaseapp.com",
  projectId: "ideen-e749a",
  storageBucket: "ideen-e749a.appspot.com",
  messagingSenderId: "237417789337",
  appId: "1:237417789337:web:6c530e72be7f86909f4508"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export default{
data: () => ({
    valid: true,
    dialogo: false,
    cuenta :{
      correo: "",
      contra: "",
    },
    emailRules:[
      value => {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return pattern.test(value) || 'Email invalido'
      },
      v => !!v || 'Campo requerido',
    ],
    passwordRules: [
    v => !!v || 'Campo requerido', 
    v => v.length >= 6 || 'Necesitas 6 caracteres',
    ],
  }),
  methods: {
    async submitcuenta () {
      const { valid } = await this.$refs.form.validate()
       if (valid){
        const user=await signInWithEmailAndPassword(auth, this.cuenta.correo, this.cuenta.contra).then((userCredential) => {;
          const userinf=userCredential.user.uid
          router.push("/home")
        }).catch((error) => {
          this.dialogo=true


        // const errorCode = error.code;
        // const errorMessage = error.message;
        // alert(errorMessage)
        // ..
      });
        

       }
    }
  },
}

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
  max-width: 50rem;
}

.campo{
  max-width: 50rem;
}
.whiteboton {
  font-weight: bold;
  color: white;
}

.logo {
  max-width: 10rem;
}

</style>
