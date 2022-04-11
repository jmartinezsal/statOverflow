--Creating model and seed data
  npx  sequelize model:generate --name User --attributes username:string,email:string,password:string,avatarImage:string

  npx sequelize model:generate --name Question --attributes header:string,content:text,userId:integer

  npx sequelize model:generate --name Answer --attributes answer:text,questionId:integer,userId:integer

  npx sequelize model:generate --name Answers_Voting --attributes upvote:boolean,answerId:integer,userId:integer

  npx sequelize seed:generate --name UserData
  npx sequelize seed:generate --name QuestionData
  npx sequelize seed:generate --name AnswersData
