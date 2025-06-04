export type ANIME_DATA = {
    mal_id: number;
    title: string;
    title_english: string;
    type: string;
    episodes: number;
    duration: string;
    status: string;
    images: {
        jpg: {
            image_url: string;
            large_image_url: string;
            small_image_url: string;
        },
        webp: {
            image_url: string;
            large_image_url: string;
            small_image_url: string;
        }
    };
};
