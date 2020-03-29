const connection = require("../connection");
/*
Insert multiple objects in the "incidents" table, using the same ong_id
*/

module.exports = async ong_id => {
  const data = [
    {
      title: "teste",
      description: "descriptiontestingdescription",
      value: 150,
      ong_id: ong_id
    },
    {
      title: "teste 2",
      description: "kkkkkkkkkkkkkkkkkkkkkk",
      value: 400,
      ong_id: ong_id
    },
    {
      title: "send help",
      description: "plz send help",
      value: 1,
      ong_id: ong_id
    },
    {
      title: "I'll always be there for you",
      description: "girl I have no shame",
      value: 777,
      ong_id: ong_id
    },
    {
      title: "I'll always be there for you",
      description: "girl I have no shame",
      value: 777,
      ong_id: ong_id
    },
    {
      title: "I'll always be there for you",
      description: "girl I have no shame",
      value: 777,
      ong_id: ong_id
    },
    {
      title: "I'll always be there for you",
      description: "girl I have no shame",
      value: 777,
      ong_id: ong_id
    },
    {
      title: "I'll always be there for you",
      description: "girl I have no shame",
      value: 777,
      ong_id: ong_id
    },
    {
      title: "I'll always be there for you",
      description: "girl I have no shame",
      value: 777,
      ong_id: ong_id
    },
    {
      title: "I'll always be there for you",
      description: "girl I have no shame",
      value: 777,
      ong_id: ong_id
    },
    {
      title: "I'll always be there for you",
      description: "girl I have no shame",
      value: 777,
      ong_id: ong_id
    },
    {
      title: "I'll always be there for you",
      description: "girl I have no shame",
      value: 777,
      ong_id: ong_id
    },
    {
      title: "I'll always be there for you",
      description: "girl I have no shame",
      value: 777,
      ong_id: ong_id
    },
    {
      title: "I'll always be there for you",
      description: "girl I have no shame",
      value: 777,
      ong_id: ong_id
    },
    {
      title: "I'll always be there for you",
      description: "girl I have no shame",
      value: 777,
      ong_id: ong_id
    },
    {
      title: "I'll always be there for you",
      description: "girl I have no shame",
      value: 777,
      ong_id: ong_id
    },
    {
      title: "I'll always be there for you",
      description: "girl I have no shame",
      value: 777,
      ong_id: ong_id
    },
    {
      title: "I'll always be there for you",
      description: "girl I have no shame",
      value: 777,
      ong_id: ong_id
    },
    {
      title: "I'll always be there for you",
      description: "girl I have no shame",
      value: 777,
      ong_id: ong_id
    }
  ];
  await connection("incidents").insert(data);
};
