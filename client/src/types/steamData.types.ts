export type GAME_DATA = {
    appid: number;
    name: string;
    playtime_forever: number;
    game_header_img: string;
};
export type STEAM_DATA = {
    game_count: number;
    games: GAME_DATA[];
};
