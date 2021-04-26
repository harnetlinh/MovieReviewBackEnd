module.exports = {
    async up(db, client) {
      await db.collection('movie_db').insert([
        {
          movie_id: "12a3",
          all_rating: [
            {
              user_id: "user01",
              movie_id: "12a3",
              rating: 5,
              comment: "12a3 comment 1",
              movie_name: "super movie",
              date: "2021-04-26 05:44:38"
            },
            {
              user_id: "user02",
              movie_id: "12a3",
              rating: 6,
              comment: "12a3 comment 2",
              movie_name: "super movie",
              date: "2021-04-27 05:44:38"
            },
            {
              user_id: "user01",
              movie_id: "12a3",
              rating: 3,
              comment: "12a3 comment 3",
              movie_name: "super movie",
              date: "2021-05-26 05:44:38"
            },
          ]
        },
        {
          movie_id: "11462aa",
          all_rating: [
            {
              user_id: "user01",
              movie_id: "11462aa",
              rating: 5,
              comment: "11462aa comment 1",
              movie_name: "super movie",
              date: "2020-04-26 05:44:38"
            },
            {
              user_id: "user02",
              movie_id: "11462aa",
              rating: 6,
              comment: "11462aa comment 2",
              movie_name: "super movie",
              date: "2021-06-26 08:44:38"
            },
            {
              user_id: "user01",
              movie_id: "11462aa",
              rating: 3,
              comment: "11462aa comment 3",
              movie_name: "super movie",
              date: "2020-03-16 05:44:00"
            },
          ]
        },
      ], {$set: {blacklisted: true}});
    },
  
    async down(db, client) {
    }
  };