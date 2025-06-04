import { FRONTEND_URL, PORT, STEAM_API_KEY } from "./lib/dotenv.config";
import * as express from "express";
import morgan = require("morgan");
import cors = require("cors");

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.get("/", (_, res) => {
  res.send("Backend Running Successfully!");
});

app.post("/steam_data", async (req, res) => {
  try {
    const { steam_profile_url } = req.body;

    if (!steam_profile_url) {
      res.status(400).json({ message: "Steam profile URL is required" });
    }

    const steamID = steam_profile_url
      .split("https://steamcommunity.com/profiles/")[1]
      .split("/")[0];

    if (!steamID) {
      res.status(404).json({
        message: "Steam ID not found, please recheck the URL",
        hint: "Make sure the URL is correct and the profile is public and follows the [ https://steamcommunity.com/profile/steamId ]",
      });
    }

    const steam_api_endpoint = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamID}&format=json&include_appinfo=true&include_played_free_games=true`;

    const steam_data = await fetch(steam_api_endpoint, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (steam_data.status === 429) {
      console.log(steam_data);
      res.status(429).json({
        message: "Steam API rate limit reached, please try again later",
      });
    }

    const data = await steam_data.json();

    const { game_count, games } = data.response;

    const parsedGames = data.response.games.map((game: any) => {
      return {
        appid: game.appid,
        name: game.name,
        playtime_forever: game.playtime_forever,
        game_header_img: `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${game.appid}/header.jpg`,
      };
    });

    res.status(200).json({
      game_count: game_count,
      games: parsedGames,
      expanded_games: games,
    });
  } catch (error) {
    console.error("Error in fetching data from steam", error);
    res.status(500).json({ message: "Error in fetching data from steam" });
  }
});

app.post("/search/anime", async (req, res) => {
  try {
    const { query } = req.body;

    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);

    const data = await response.json();

    const parsedSearchResults = data.data.map((result: any) => {
      return {
        mal_id: result.mal_id,
        title: result.title,
        title_english: result.title_english,
        type: result.type,
        episodes: result.episodes,
        duration: result.duration,
        status: result.status,
        images: result.images,
      };
    });

    res.status(200).json(parsedSearchResults);
  } catch (error) {
    console.error("Error in fetching data from jikan", error);
    res.status(500).json({ message: "Error in fetching data from jikan" });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
