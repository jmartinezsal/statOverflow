"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Answers", [
      {
        answers:
          "If you have a password on and you're playing with friends in that password mode, there is no level restriction. However, in the open world, there is a level restriction in place.",
        questionId: 1,
        userId: 2,
      },
      {
        answers:
          "I have this same thing occasionally and its due to population. Other people are summoning faster than you.",
        questionId: 2,
        userId: 5,
      },
      {
        answers:
          "I've had the same issue. Have managed to summon maybe 4 out of 30ish attempts. Have only been summoned once in a week. I'm on Xbox",
        questionId: 2,
        userId: 6,
      },
      {
        answers:
          "Siofra river is Ranni's questline. You'll have to finish Caelid before you can finish it.",
        questionId: 3,
        userId: 7,
      },
      {
        answers:
          "Compared to the rest of the spears, VWS looks pretty good damage-wise. The exact scaling can be found on the wiki.",
        questionId: 4,
        userId: 2,
      },
      {
        answers:
          "Scalings run off percentages of base damage. The letters are not made equal, rather they each represent a certain range of percentage values. The weapon scaling just shows what it works best with.",
        questionId: 5,
        userId: 1,
      },
      {
        answers:
          "There's breakpoints at 20/55/80 with the bang for your buck getting lower after each cap. That being said, early game before you upgrade your weapons, its usually a better bet to just get the start requirements and pump vigor (to somewhere between 20 and 40) so you don't die in a single bit",
        questionId: 5,
        userId: 6,
      },
      {
        answers:
          "No. They're Erdtree Incantations, but the Erdtree Seal does not give a boost to erdtree incantations.",
        questionId: 6,
        userId: 6,
      },
      { answers: "Nope, just the armor.", questionId: 6, userId: 9 },
      {
        answers:
          "rng can suck sometimes. I got mine after a little over an hour.",
        questionId: 7,
        userId: 10,
      },
      {
        answers:
          "Endurance depends on the gear you want to use, you might be fine with 10 or you might need 40.",
        questionId: 8,
        userId: 6,
      },
      {
        answers:
          "This is just from experience but it seems that wooden shields are less able to deflect hits, while metal shields are better at it. One exception is the Ant's Skull Plate, which is particularly good at deflecting attacks (staggering enemies by blocking). This is also stated in its flavor text: Excels at repeling enemy attacks.",
        questionId: 9,
        userId: 11,
      },
      {
        answers:
          "Heal is nice to have available specifically to kill revenants. It won't have much heaiing power at low faith but it still does a ton of damage and staggers them.",
        questionId: 10,
        userId: 12,
      },
      {
        answers:
          "Golden vow for a boost to damage and defense, and Beastial vitality for a bit of HP regen",
        questionId: 10,
        userId: 2,
      },
      {
        answers:
          "I recommend checking out anything you may have missed in Eastern Limgrave and the Weeping Peninsula to the south. After that, make sure you start Rogier's quest at the Roundtable, and proceed north to Liurnia.",
        questionId: 11,
        userId: 13,
      },
      {
        answers:
          "The way Ive explained it is the playable space of the world is essentially a big C. You start at the bottom most point of the C, and work your way clockwise. With the exception being the bottom right part of the C which is Caelid. That may prove too difficult at first so youll probably want to tackle that further into the game, probably once you reached the 11 oclock position on the C.",
        questionId: 11,
        userId: 5,
      },
      {
        answers:
          "Castle Morne could be some good content for you if you havent done it yet. Its south of the starting area. Otherwise, Liurnia lakes region and specifically Raya Lucaria could be a next stop for you",
        questionId: 11,
        userId: 4,
      },
      { answers: "Ive had no problems on PC.", questionId: 12, userId: 8 },
      {
        answers:
          "I only have a couple hundred hours of playtime on PC, but I think so.",
        questionId: 12,
        userId: 11,
      },
      {
        answers: "There are some stutters but it's not the end of the world",
        questionId: 12,
        userId: 15,
      },
      {
        answers:
          "Fun fact: you can kill all regular merchants and take their ball bearings so you have all shops at one place in round table",
        questionId: 13,
        userId: 7,
      },
      {
        answers:
          "Use the crystal tear you get from Yura's quest or heal between the second and third Nihil.",
        questionId: 14,
        userId: 1,
      },
      {
        answers:
          "Bring a flask of wondrous physik with a Purifying Crystal Tear and drink it just before phase 2 starts. (Right before he starts shouting Nihil) It will significantly reduce the damage.",
        questionId: 14,
        userId: 5,
      },
      {
        answers: "They will drop 5x the runes they usually would.",
        questionId: 15,
        userId: 1,
      },
      {
        answers: "Another katana like moonveil or meteoric ore blade",
        questionId: 16,
        userId: 1,
      },
      {
        answers:
          "You could always start as Samurai to get an uchi at the beginning then run for a second one and dual wield them. That lets you power stance as well. I did this but with moonveil and uchi for my int/Dex character and it worked well for most of the game.",
        questionId: 16,
        userId: 5,
      },
      {
        answers:
          "Um yeah. But you dont start NG+ as soon as you beat the final boss. Itll ask you if you want to, but you can say no and then continue playing, then go to NG+ whenever you want.",
        questionId: 17,
        userId: 1,
      },
      {
        answers:
          "You can beat the final boss and see the ending. Go back and fight her after. Just don't start ng+.",
        questionId: 17,
        userId: 5,
      },
      {
        answers:
          "everything gets a little harder in NG+. but NG+ doesn't start automatically after you beat the last boss. the game gives you the opportunity to opt out until you're ready.",
        questionId: 17,
        userId: 7,
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Answers", null, {});
  },
};
