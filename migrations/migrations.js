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
              comment: "12a3 comment 1"
            },
            {
              user_id: "user02",
              movie_id: "12a3",
              rating: 6,
              comment: "12a3 comment 2"
            },
            {
              user_id: "user01",
              movie_id: "12a3",
              rating: 3,
              comment: "12a3 comment 3"
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
              comment: "11462aa comment 1"
            },
            {
              user_id: "user02",
              movie_id: "11462aa",
              rating: 6,
              comment: "11462aa comment 2"
            },
            {
              user_id: "user01",
              movie_id: "11462aa",
              rating: 3,
              comment: "11462aa comment 3"
            },
          ]
        },
      ], {$set: {blacklisted: true}});
    },
  
    async down(db, client) {
    }
  };