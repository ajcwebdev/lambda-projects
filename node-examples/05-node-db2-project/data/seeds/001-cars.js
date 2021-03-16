exports.seed = function(knex) {
  return knex('cars').truncate()
    .then(function () {
      return knex('cars').insert([
        {
          VIN: 'JB2HT4H26CC000000',
          make: 'Toyota',
          model: 'MDX',
          mileage: 200,
          transmission: 'manual',
          title: 'clean'
        },
        { 
          VIN: 'AFFWAFUM3CA000000', 
          make: 'BMW', 
          model: 'B3', 
          mileage: 3000, 
          transmission: 'automatic', 
          title: 'renewed'
        }
      ])
    })
}

