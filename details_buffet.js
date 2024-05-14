const { createApp, ref } = Vue;

createApp({
  data() {
    return {
      listEvents: [],
      listBuffets: []
    };
  },

  created() {
    this.getDataListBuffets();
  },
  methods:   
  {
    
    
    async getDataListBuffets() {
      var url = document.location.href;
      var params = url.split('?')[1].split('=')[1];
      console.log(params)
      const api = `http://localhost:3000/api/v1/buffets/${params}/events`;
      let data = await this.fetchData(api);
      // this.processBuffets(data);
      console.log(data)
    },
    
    
    async fetchData(api) {
    let response = await fetch(api);
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

})}
  

}
}).mount('#app');