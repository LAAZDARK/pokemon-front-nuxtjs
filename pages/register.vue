 <template>
  <div class="sign-in">
    <section class="bg-gray-50 dark:bg-gray-600">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Registro
            </h1>
            <form class="space-y-4 md:space-y-6" @submit.prevent="handleSubmit">
              <div>
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombre</label>
                <input v-model="form.name" type="text" name="name" id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nombre completo" maxlength="50" required="">
              </div>
              <div>
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo
                  electrónico</label>
                <input v-model="form.email" type="email" name="email" id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@email.com" maxlength="50" required="">
              </div>
              <div>
                <label for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contraseña</label>
                <input type="password" v-model="form.password" name="password" id="password" placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required="">
              </div>

              <button type="submit"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Iniciar
                sesión</button>
              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                No tiene una cuenta? <nuxt-link to="/login"
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500">Iniciar sesión</nuxt-link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import { register } from '@/api/authService'

export default ({
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
      }
    }
  },
  methods: {
    // Handles input validation after submission.
    async handleSubmit(e) {
      const data = JSON.stringify({
        name: this.form.name,
        email: this.form.email,
        password: this.form.password
      })
      await register(data).then(async response => {
        console.log(response)
        // this.$auth.$storage.setUniversal('access_token', response.data.access_token)
        // console.log(this.$auth.$state)
        this.$auth.setUserToken(response.data.access_token)
        localStorage.setItem('access_token', response.data.access_token)
        await this.$router.push('/');
      }).catch(error => {
        console.log(error)
      })

    },
  },
})

</script>

