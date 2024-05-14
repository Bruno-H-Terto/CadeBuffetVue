
const { createApp, ref } = Vue;

createApp({
  data() {
    return {
      searchBuffet: '',
      listBuffets: []
    };
  },

  computed:{
    listResult(){
      if(this.searchBuffet){
        return this.listBuffets.filter(buffet => {
          return buffet.brand_name.toLowerCase().includes(this.searchBuffet.toLowerCase())
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

        this.listBuffets.push(item)

  })},
    
    async getDataListBuffets() {
      let data = await this.fetchData('http://localhost:3000/api/v1/buffets');
      this.processBuffets(data);
    },


    detailsBuffet(id){
      const url = 'details_buffet.html?id=' + id;
      window.location.href = url;
    }
  }


    
}).mount('#app');
