const { createApp, ref } = Vue;

createApp({
  data() {
    return {
      listResult: [],
      eventData: [],
      alerts: []
    };
  },
  created() {
    this.getEventData();
  },

  methods: {
    async fetchData(url) {
      let response = await fetch(url);
      return await response.json();
    },

    async getEventData(){
      var url = document.location.href;
      var params = url.split('?')[1].split('=')[1];
      data = await this.fetchData(`http://localhost:3000/api/v1/events/${params}`)
      this.processEvents(data);

      
    },

    async getDataResult(date, people) {
      var url = document.location.href;
      var params = url.split('?')[1].split('=')[1];
      let data = await this.fetchData(`http://localhost:3000/api/v1/events/${params}/avaliable_event?estimated_date=${date}&estimated_quantity_people=${people}`);
      this.processResult(data)

    },
    processResult(response) {
      this.listResult = []
      console.log(response)
      if (response.base_price_event || response.message){
        var result = new Object();
        result.base_price_event = response.base_price_event
        result.message = response.message
        this.listResult.push(result)
        console.log(response.base_price_event)}
      else{
      response.forEach(item => {
      var result = new Object();
      result.message = item.message
      result.estimated_date_present = item.estimated_date_present
      result.base_price_event = item.base_price_event
      result.estimated_people = item.estimated_quantity_people_present
      result.min_quantity_people = item.min_quantity_people
      result.max_quantity_people = item.max_quantity_people
      result.estimated_date = item.estimated_date

      this.listResult.push(result)
      })}

    },

    processEvents(events) {
      var alert = new Object();
      alert.message = events.message
      this.alerts.push(alert)
      var item = new Object();
      item.name = events.name
      if(item.name === undefined){
        this.eventData = []
      }
      else{
        this.eventData.push(item)
        console.log(this.eventData.name)}

    },

    async availabilityEvent() {
      const formData = new FormData(document.getElementById('availabilityEvent'));
      const estimated_date = formData.get('estimated_date');
      const estimated_people = formData.get('people');
      let result = await this.getDataResult(estimated_date, estimated_people)
    },

    async keypress(event) {
      event.preventDefault();
      await this.searchBuffet();
    }
  },


}).mount('#app');
