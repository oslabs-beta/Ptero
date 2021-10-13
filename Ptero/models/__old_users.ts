export interface UserInterface {
  username: string;
  api_key: string;
  date_created: Date;
  usage: { count: number };
}

export const Users: Array<UserInterface> = [
  {
    username: "David",
    api_key: "123",
    date_created: new Date('2021-10-09T16:19:18Z'),
    usage: {
      count: 0
    }
  },
  {

    username: "Rachel",
    api_key: "456",
    date_created: new Date('2021-10-09T16:19:18Z'),
    usage: {
      count: 0
    }
  },
  {

    username: "Quentin",
    api_key: "789",
    date_created: new Date('2021-10-09T16:19:18Z'),
    usage: {
      count: 0
    }
  },
  {

    username: "Brian",
    api_key: "111",
    date_created: new Date('2021-10-09T16:19:18Z'),
    usage: {
      count: 0
    }
  },
];