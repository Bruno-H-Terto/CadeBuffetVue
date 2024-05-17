const { createApp, ref } = Vue;

createApp({
  data() {
    return {
      listEvents: [],
      listBuffets: [],
      alerts: []
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

      const events = `http://localhost:3000/api/v1/buffets/${params}/events`;
      const buffet = `http://localhost:3000/api/v1/buffets/${params}`;
      let databuffet = await this.fetchData(buffet);
      let dataevents = await this.fetchData(events);
      this.processEvents(dataevents);
      this.processBuffets(databuffet);

    },
    
    
    async fetchData(api) {
    let response = await fetch(api);
    return await response.json();
  },

  processBuffets(buffet) {

      var item = new Object();
      var alert = new Object();
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
      item.phone_number = buffet.phone_number
      item.owner = buffet.owner_id
      item.id = buffet.id
      item.message = buffet.message

      this.listBuffets.push(item)

},

processEvents(events) {
  var alert = new Object();
  alert.message = events.message
  this.alerts.push(alert)
  Array.from(events).forEach(event => {
    var item = new Object();
    item.name = event.name
    item.description = event.description
    item.duration_in_minutes = event.duration_in_minutes
    item.max_quantity_people = event.max_quantity_people
    item.min_quantity_people = event.min_quantity_people
    item.menu = event.menu
    item.owner = event.owner_id
    item.id = event.id
    item.buffet = event.buffet_id
    item.message = events.message
    
    presences = []
    results = []
    presences = [event.alcoholic_drink, event.self_decoration, event.valet, event.parking, event.fixed_location]
    presences.forEach(presence => {
      if(presence){
        results.push('Disponível')}
      else{
        results.push('Indisponível')
      }
    })
    item.alcoholic_drink = results[0]
    item.self_decoration = results[1]
    item.valet = results[2]
    item.parking = results[3]
    item.fixed_location = results[4]

    this.listEvents.push(item)

})},

availabilityEvent(id){
  const url = 'availability.html?id=' + id;
  window.location.href = url;
}
  

}
}).mount('#app');