const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const app = express();

const dbPath = path.join(__dirname, "cricketTeam.db");

let db = null;

const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initializeDBAndServer();

convertDbObjectToResponseObject(dbobject)=>{
    return {
        playerId: dbObject.player_id,
        playerName: dbObject.player_name,
        jerseyNumber: dbObject.jersey_number,
        role: dbObject.role,
  };
};
app.get("/players/",async(request,response)=>{
    const getPlayersQuery=`
    SELECT * FROM cricket_team;`;
    const playersArray=await db.all(getPlayersQuery);
    response.send(playersArray.map((eachPlayer) =>
   convertDbObjectToResponseObject(eachPlayer);
});
app.post("/players/",async(request,response)=>{
    const playerdetails=request.body;
    const addpalyer=`
    INSERT INTO cricket_team(player_id,playerName,jerseyNumber,role)
    values ("${playerName}","${jerseyNumber}","${role}")`;
    const db response=await db.run(addpalyer);
    const playerId=dbresponse.lastID;
    response.send("playerID:playerID")
});
app.get("/players/:playerId/",async(request,response)=>{
    const playerId=request.params;
    const getplayerId=`
    SELECT * FROM cricket_team WHERE player_id=${playerId};`;
    await db.get(getplayerId)
    response.send("Player Added to Team")
});
app.put("/players/:playerId/",async(request,response)=>{
    const {playerId}=request.params;
    const playerdetails=request.body;
    const {
        playerId,
        playerName,
        jerseyNumber,role;
    };
    const updatedquery=`
    UPDATE cricket_team 
    SET  
        playerId: ${player_id},
         playerName: ${player_name},
         jerseyNumber: ${jersey_number},
         role: ${role},
         WHERE player_id=${playerID}`;
   await db.run(updateBookQuery);
   response.send("Player Details Updated");
});
app.delete("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params;
  const deleteplayers = `
    DELETE FROM
      book
    WHERE
      book_id = ${playerId};`;
  await db.run(deleteplayers);
  response.send("player removed");
});
         
})


