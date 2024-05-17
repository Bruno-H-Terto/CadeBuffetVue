
const { createApp, ref } = Vue;

createApp({
  data() {
    return {
      filterBuffet: '',
      listBuffets: []
    };
  },

  computed:{
    listResult(){
      if(this.filterBuffet){
        return this.listBuffets.filter(buffet => {
          return buffet.brand_name.toLowerCase().includes(this.filterBuffet.toLowerCase())
        });
      }else{
        return this.listBuffets;
      }
  }
  },
  created() {
    this.getDataListBuffets();
  },

  methods: {
    async fetchData(url) {
      let response = await fetch(url);
      return await response.json();
    },

    detailsBuffet(id){
      const url = 'details_buffet.html?id=' + id;
      window.location.href = url;
    },

    processBuffets(buffets) {
      buffets.forEach(buffet => {
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
        item.phone_number = buffet.phone_number

        this.listBuffets.push(item)

  })},
    
    async getDataListBuffets() {
      let data = await this.fetchData('http://localhost:3000/api/v1/buffets');
      this.processBuffets(data);
    },
  }


    
}).mount('#app');
