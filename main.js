const { createApp, ref } = Vue

  createApp({

    data(){
      return{
      listBuffets: []
      }
    },
    methods:{
      async getDataListBuffets(){
        let response = await fetch('http://localhost:3000/api/v1/buffets')
        let data = await response.json()

        this.listBuffets = [];

        data.forEach(buffet => {
          var item = new Object();
          item.brand_name = buffet.brand_name
          item.corporate_name = buffet.corporate_name
          item.register_number = buffet.register_number
          item.address = buffet.address
          item.district = buffet.district
          item.state = buffet.state
          item.city = buffet.city
          item.zip_code = buffet.zip_code
          item.description = buffet.description
          item.payment_methods = buffet.payment_methods
          item.owner = buffet.owner_id
          item.id = buffet.id

          this.listBuffets.push(item)
        });
      },
      async getDataBuffet(id){

      }

    }
  }).mount('#app')