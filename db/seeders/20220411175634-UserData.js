"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        username: "demo_dragon",
        email: "demoDrgn@gmail.com",
        password: "password123",
        avatarImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmmxu2d4jAasjtg6rPwOcLFYBrPcThu1_vGA&usqp=CAU",
      },
      {
        username: "theHorse",
        email: "bakersfield@gmail.com",
        password: "password123",
        avatarImage:
          "https://i.pinimg.com/736x/e7/7c/78/e77c78f6d01ad73b74c02248d9aeba3e.jpg",
      },
      {
        username: "trinkletoes",
        email: "floridaman@gmail.com",
        password: "password123",
        avatarImage:
          "https://i.pinimg.com/originals/f2/64/dc/f264dc90464d9abf83a9740bdfc6e300.jpg",
      },
      {
        username: "templar_slayer",
        email: "temp@gmail.com",
        password: "password123",
        avatarImage:
          "http://mheroesgb.gcdn.netmarble.com/mheroesgb/DIST/Forum/boss_talos01.png",
      },
      {
        username: "OrcishHen",
        email: "tomorrowLand@gmail.com",
        password: "password123",
        avatarImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3gHvgjMaNwuuecEGfIjCTURXE5TEREaDmxg&usqp=CAU",
      },
      {
        username: "Godrick52",
        email: "godrick@gmail.com",
        password: "password123",
        avatarImage:
          "https://21000dollor.com/static/assets/portraits/antman.png",
      },
      {
        username: "HaloSunshine",
        email: "breathtaking@gmail.com",
        password: "password123",
        avatarImage:
          "http://mheroesgb.gcdn.netmarble.com/mheroesgb/DIST/Forum/sv_doctorminerva01_S01.png",
      },
      {
        username: "Captive_Princess",
        email: "helpline@gmail.com",
        password: "password123",
        avatarImage:
          "https://21000dollor.com/static/assets/portraits/absorbingman.png",
      },
      {
        username: "DragonsBane",
        email: "dragula@gmail.com",
        password: "password123",
        avatarImage:
          "https://styles.redditmedia.com/t5_12967t/styles/communityIcon_rh7ocpigb9t51.png",
      },
      {
        username: "Cowardly_Knight",
        email: "knightsfortune@gmail.com",
        password: "password123",
        avatarImage:
          "https://preview.redd.it/7hxso2h84s731.png?width=256&format=png&auto=webp&s=f18e7098ca51570eb581830ba719e17f7c96cb11",
      },
      {
        username: "Timely_Hero",
        email: "thero@gmail.com",
        password: "password123",
        avatarImage:
          "https://i.pinimg.com/474x/de/e1/21/dee121d9b96dd8892642c1e434c23eca.jpg",
      },
      {
        username: "GiantGnome",
        email: "gnomish@gmail.com",
        password: "password123",
        avatarImage:
          "https://i.pinimg.com/736x/de/b4/21/deb42156fd00137aa9be92b6e4709316.jpg",
      },
      {
        username: "UnkindFlattery",
        email: "tombrady@gmail.com",
        password: "password123",
        avatarImage:
          "https://21000dollor.com/static/assets/portraits/sharonrogers.png",
      },
      {
        username: "DeathbecomesMe",
        email: "disneyland@gmail.com",
        password: "password123",
        avatarImage:
          "https://whatsondisneyplus.com/wp-content/uploads/2021/03/raya-profile.png",
      },
      {
        username: "SwordHealer",
        email: "drivinmenuts@gmail.com",
        password: "password123",
        avatarImage:
          "https://i.pinimg.com/736x/ec/b7/e4/ecb7e4b3688f5b56857ce795180cd886.jpg",
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
