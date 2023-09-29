import Table from "./Table"
const characters = [
    {
      name: "Charlie",
      job: "Janitor",
    },
    {
      name: "Mac",
      job: "Bouncer",
    },
    {
      name: "Dee",
      job: "Aspring actress",
    },
    {
      name: "Dennis",
      job: "Bartender",
    },
  ];
  
  export default function MyApp() {
    return (
        <div className="container">
          <Table characterData={characters} />
        </div>
      );
    }
  