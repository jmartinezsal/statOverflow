npx dotenv sequelize model:generate --name User --attributes username:string,email:string,password:string,avatarImage:string

npx dotenv sequelize model:generate --name Question --attributes header:string,content:text,userId:integer

npx dotenv sequelize model:generate --name Answer --attributes answer:text,questionId:integer,userId:integer

npx dotenv sequelize model:generate --name Answers_Voting --attributes votes:integer, upvote:boolean,answerId:integer,userId:integer

npx dotenve sequelize seed:generate