"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Questions", [
      {
        header: "Summoning Level Based?",
        content:
          "Is summoning strictly level based or is it also NG based? If I swap my character to NG+ will I still be able to help players with bosses on their first playthrough if within the level range, or conversely can I help players in NG+ with my character that hasn't swapped over yet?",
        userId: 1,
      },
      {
        header: "Not able to summon",
        content:
          "Havent been able to summon anyone in since last week. I can be summoned just fine. Internet is perfect, game has been restarted multiple times. I can see their gold signs and it starts to summon, however it then says, Unable to Summon",
        userId: 3,
      },
      {
        header: "Where to go after Rennala",
        content:
          "Where should I go after defeating Rennala and starting Ranni's quest line? The last I read, if I remember correctly some said Caelid, some said Altus Plateau (which I just arrived at), and I think some have said Siofra river. If it helps in terms of items to hunt for, I'm running a Dex/Faith build",
        userId: 4,
      },
      {
        header: "Vykes War Spear",
        content:
          "I just got Vyke's war spear and I'm liking it from a flavor perspective. How well does it scale with Dex and Faith moving forward as it's upgraded.",
        userId: 4,
      },
      {
        header: "How does Scaling Work?",
        content:
          "So Im new to the series and was hoping someone could explain how the scalings work? I know the higher the better but for instance when a weapon benefits from B level scaling how much points should I put into that stat to maximize value?",
        userId: 5,
      },
      {
        header: "Seals that boost crucible knight incantations?",
        content:
          "Are there any seals that help boost Crucible Knight Incantations? I know the armor set description lists giving Crucible Knight Incantations a buff, are there any specific seals to additionally buff on top of the armor set bonus?",
        userId: 8,
      },
      {
        header: "Halo Scythe",
        content:
          "How long did it take you to get a halo scythe? I've killed this guy at least 20 times.",
        userId: 9,
      },
      {
        header: "Stopping point for endurance",
        content: "What's a good stopping point for endurance",
        userId: 10,
      },
      {
        header: "Shield Effectiveness",
        content:
          "So I know different shields have different invisible deflection values that determine how severely staggered an enemy is when you block an attack with your shield. Has anyone compiled this information for the different shields? Im using the crucible knight armor and Silurias tree so it looks nice when I run the crucible hornshield, but Im not sure if its really worth the extra weight over the Twinbird Kite Shield I currently run since the guard boost difference isnt that big.",
        userId: 4,
      },
      {
        header: "Low faith incantations",
        content:
          "Other than flame cleanse me and flame grant me strength, is their any other generalist, low faith incantations that are worth using?",
        userId: 11,
      },
      {
        header: "Where should I go after defeating Godrick?",
        content:
          "Where should I go after defeating Godrick? I've been pretty much shuffling off in every direction finding cool stuff, but I don't know where my main path should lead. I am level 43 right now, finding a lot of the places I am exploring are ending up being too difficult. Should I head south?",
        userId: 12,
      },
      {
        header: "Is the game playable on PC?",
        content:
          "Is the game playable on PC? I really wanna try it, but FromSoftware ports are usually pretty crappy, and there were reports of serious performance issues on release. Was it fixed with the latest patches?",
        userId: 14,
      },
      {
        header: "Killed an NPC",
        content:
          "I killed Patches just because I wanted his stupid cookbook and he wasnt selling to me at the time, and now I realize I wont be able to get that sick armor set later on. Bummer. Dumb move on my part, I really should have known better. I never killed NPCs in previous Souls games! What have I become?!",
        userId: 15,
      },
      {
        header: "Blood rings from Mohg.",
        content:
          "How do I get rid of the blood rings that mohg throws around you? Do I just need to sit there and eat it and try to out heal it?",
        userId: 10,
      },
      {
        header: "Glowing eyes",
        content:
          "Why do some enemies eyes glow like little golden firecrackers. Are they special",
        userId: 12,
      },
      {
        header: "Left hand weapon for this build.",
        content:
          "Working on an new character dex/arc build. I am going to make a beeline for uchigatana...but what is a good left hand weapon for this build? Should I ensure it's another katana, or just find something else (dagger, sword, whatever) with bleed?",
        userId: 8,
      },
      {
        header: "Does ng+ make the game harder?",
        content:
          "Im in front of the final boss on my first playthrough, but I havent beaten Malenia yet. For folks on ng+ and beyond, do you think starting ng+ will make the fight harder due to increased hp?",
        userId: 6,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Questions", null, {});
  },
};
