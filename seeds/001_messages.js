exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(function() {
      // Inserts seed entries
      return knex('messages').insert([{
            id: 1,
            name: 'Criminal',
            message: 'What Are You?',
            created_at: '2016-06-26 14:26:16 UTC',
            updated_at: '2016-06-26 14:26:16 UTC'
          },
          {
            id: 2,
            name: 'Batman',
            message: 'I\'m Batman',
            created_at: '2016-06-26 14:26:16 UTC',
            updated_at: '2016-06-26 14:26:16 UTC'
          },
          {
            id: 3,
            name: 'Joker',
            message: 'I\'m Joker',
            created_at: '2016-06-26 14:26:16 UTC',
            updated_at: '2016-06-26 14:26:16 UTC'
          }
        ])
        .then(function() {
          return knex.raw("SELECT setval('messages_id_seq', (SELECT MAX(id) FROM messages))")
        })
    })
}
