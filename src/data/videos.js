// Films from the official Rudra Studiio YouTube channel (@rudrastudiio)
import { studio } from "./studio";

export const YOUTUBE_CHANNEL_URL = studio.youtubeUrl;

const ytThumb = (id, quality) => `https://i.ytimg.com/vi/${id}/${quality}.jpg`;
const ytEmbed = (id) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`;

const film = (id, title, category, duration) => ({
  id,
  youtubeId: id,
  title,
  category,
  duration,
  // Best quality first; the UI falls back down the list if a size does not exist for this video
  thumbnailSources: [ytThumb(id, "maxresdefault"), ytThumb(id, "sddefault"), ytThumb(id, "hqdefault")],
  thumbnail: ytThumb(id, "hqdefault"),
  youtubeEmbedUrl: ytEmbed(id),
  watchUrl: `https://www.youtube.com/watch?v=${id}`
});

export const studioVideos = [
  film("m9iJEAXsRLY", "Anand & Nupur – Wedding Cinematic Film", "Wedding Film", "6:00"),
  film("VYCamjnRO6s", "Vijay & Snehal – Pre-Wedding", "Pre-Wedding Film", "4:42"),
  film("Ovhz4r-lxhw", "Sumeet & Rekha – Wedding Cinematic", "Wedding Film", "9:03"),
  film("-X97q6CQZFI", "Zulwa Palana – Naming Ceremony (4K)", "Baby & Family", "4:40")
];
