const { createApp, ref } = Vue;

createApp({
  data() {
    return {
      filterBuffet: '',
      listBuffets: [],
      alerts: []
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

  methods: {
    async fetchData(url) {
      let response = await fetch(url);
      return await response.json();
    },

    async getDataListBuffets() {
      let data = await this.fetchData('http://localhost:3000/api/v1/buffets');
      this.listBuffets = data;
    },

    detailsBuffet(id){
      const url = 'details_buffet.html?id=' + id;
      window.location.href = url;
    },

    async searchBuffet() {
      const formData = new FormData(document.getElementById('search'));
      const buffet_brand_name = formData.get('Search').toLowerCase();
      let buffet = this.listBuffets.find(buffet => buffet.brand_name.toLowerCase().includes(buffet_brand_name));

      if (buffet) {
        this.detailsBuffet(buffet.id);
      }else{
        this.alerts = []
        return this.alerts.push('Nenhum resultado encontrado para a busca: '+ buffet_brand_name)
      }
    },

    async keypress(event) {
      event.preventDefault();
      await this.searchBuffet();
    }
  },

  created() {
    this.getDataListBuffets();
  }

}).mount('#app');
