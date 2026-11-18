function formatDate(dateString) {
  if (!dateString || dateString === "-") return "-";
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tokyo"
  });
}

function getJSTDate() {
  const now = new Date();
  return new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
}

function calculateDays(startDate) {
  const MS_PER_DAY = 1000 * 60 * 60 * 24;
  const JST_OFFSET_MS = 9 * 60 * 60 * 1000;
  const CUTOFF_HOUR = 15;

  const start = new Date(startDate);
  const nowUtc = Date.now();

  const nowJst = new Date(nowUtc + JST_OFFSET_MS);

  const todayJstCutoff = new Date(nowJst);
  todayJstCutoff.setUTCHours(CUTOFF_HOUR, 0, 0, 0);

  const effectiveNowJst = nowJst < todayJstCutoff
    ? new Date(nowJst.getTime() - MS_PER_DAY)
    : nowJst;

  const daysNowJST = Math.floor(effectiveNowJst.getTime() / MS_PER_DAY);
  const daysStartJST = Math.floor((start.getTime() + JST_OFFSET_MS) / MS_PER_DAY);

  return Math.max(0, daysNowJST - daysStartJST);
}

function scheduleDailyRefreshAt15JST() {
  const nowJst = getJSTDate();

  const targetJst = new Date(nowJst);
  targetJst.setHours(15, 0, 0, 0);

  if (targetJst <= nowJst) {
    targetJst.setDate(targetJst.getDate() + 1);
  }

  const delay = targetJst.getTime() - nowJst.getTime();

  console.log(`Next refresh in ${Math.round(delay / 1000 / 60)} minutes at 15:00 JST`);

  setTimeout(() => {
    console.log('⏰ Refreshing idols at 15:00 JST...');
    renderIdols();
    scheduleDailyRefreshAt15JST();
  }, delay);
}

scheduleDailyRefreshAt15JST();

const idols = [{
  id: 1,
  name: `Eichi Tenshouin`,
  avatar: `images/btn-tenshouin_eichi.webp`,
  borderColor: "#FFF3B8",
  startDate: `2026-09-29`,
  description: "Megashpere Match Scout",
  detailsDescription: "(Destined Virtuoso) Eichi Tenshouin",
  unbloomedThumb: "icons/card_square2_4944_normal.webp",
  bloomedThumb: "icons/card_square2_4944_evolution.webp",
  unbloomedImage: "cards2/card_rectangle2_4944_normal.webp",
  bloomedImage: "cards2/card_rectangle2_4944_evolution.webp"
},
{
  id: 2,
  name: `Wataru Hibiki`,
  avatar: `images/btn-hibiki_wataru.webp`,
  borderColor: "#A1D8E2",
  startDate: `2026-05-15`,
  description: "Unit Event",
  detailsDescription: "(Ruler of the Rose Garden) Wataru Hibiki",
  unbloomedThumb: 'icons/card_square2_4842_normal.webp',
  bloomedThumb: 'icons/card_square2_4842_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4842_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4842_evolution.webp'
},
{
  id: 3,
  name: `Tori Himemiya`,
  avatar: `images/btn-himemiya_tori.webp`,
  borderColor: "#F5B2B2",
  startDate: `2026-03-30`,
  description: "Theme Scout",
  detailsDescription: "(Decorated Memories) Tori Himemiya",
  unbloomedThumb: 'icons/card_square2_4752_normal.webp',
  bloomedThumb: 'icons/card_square2_4752_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4752_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4752_evolution.webp'
},
{
  id: 4,
  name: `Yuzuru Fushimi`,
  avatar: `images/btn-fushimi_yuzuru.webp`,
  borderColor: "#3E62AD",
  startDate: `2026-01-15`,
  description: "Unit Event",
  detailsDescription: "(Heart-pounding Musica) Yuzuru Fushimi",
  unbloomedThumb: 'icons/card_square2_4658_normal.webp',
  bloomedThumb: 'icons/card_square2_4658_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4658_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4658_evolution.webp'
},
{
  id: 5,
  name: `Hokuto Hidaka`,
  avatar: `images/btn-hidaka_hokuto.webp`,
  borderColor: "#0068B7",
  startDate: `2026-02-15`,
  description: "Large Scale Event",
  detailsDescription: "(Bonds That Color the World) Hokuto Hidaka",
  unbloomedThumb: 'icons/card_square2_4700_normal.webp',
  bloomedThumb: 'icons/card_square2_4700_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4700_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4700_evolution.webp'
},
{
  id: 6,
  name: `Subaru Akehoshi`,
  avatar: `images/btn-akehoshi_subaru.webp`,
  borderColor: "#F3981D",
  startDate: `2026-09-10`,
  description: "Bright me up!! Scout Stage",
  detailsDescription: "(Ever-Growing Dazzle) Subaru Akehoshi",
  unbloomedThumb: 'icons/card_square2_4927_normal.webp',
  bloomedThumb: 'icons/card_square2_4927_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4927_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4927_evolution.webp'
},
{
  id: 7,
  name: `Makoto Yuuki`,
  avatar: `images/btn-yuuki_makoto.webp`,
  borderColor: "#65AB31",
  startDate: `2026-05-30`,
  description: "Megasphere Match Scout",
  detailsDescription: "(Star's Game of Chase) Makoto Yuuki",
  unbloomedThumb: 'icons/(Star\'s_Game_of_Chase)_Makoto_Yuuki_M_Mini.webp',
  bloomedThumb: 'icons/(Star\'s_Game_of_Chase)_Makoto_Yuuki_M_Mini_Bloomed.webp',
  unbloomedImage: 'cards2/(Star\'s_Game_of_Chase)_Makoto_Yuuki_M.webp',
  bloomedImage: 'cards2/(Star\'s_Game_of_Chase)_Makoto_Yuuki_M_Bloomed.webp'
},
{
  id: 8,
  name: `Mao Isara`,
  avatar: `images/btn-isara_mao.webp`,
  borderColor: "#941F57",
  startDate: `2026-10-14`,
  description: "Theme Scout",
  detailsDescription: "(The Pursuit of Food) Mao Isara",
  unbloomedThumb: 'icons/card_square2_4954_normal.webp',
  bloomedThumb: 'icons/card_square2_4954_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4954_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4954_evolution.webp'
},
{
  id: 9,
  name: `Tetora Nagumo`,
  avatar: `images/btn-nagumo_tetora.webp`,
  borderColor: "#302833",
  startDate: `2026-02-14`,
  description: "Special Scout",
  detailsDescription: "(Bonds That Overcome Obstacles) Tetora Nagumo",
  unbloomedThumb: 'icons/card_square2_4705_normal.webp',
  bloomedThumb: 'icons/card_square2_4705_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4705_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4705_evolution.webp'
},
{
  id: 10,
  name: `Midori Takamine`,
  avatar: `images/btn-takamine_midori.webp`,
  borderColor: "#00533F",
  startDate: `2026-10-31`,
  description: "Megasphere Match Tour Event",
  detailsDescription: "(Shooting Star's Motivation) Midori Takamine",
  unbloomedThumb: 'icons/card_square2_4961_normal.webp',
  bloomedThumb: 'icons/card_square2_4961_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4961_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4961_evolution.webp'
},
{
  id: 11,
  name: `Shinobu Sengoku`,
  avatar: `images/btn-sengoku_shinobu.webp`,
  borderColor: "#FFDC00",
  startDate: `2026-08-15`,
  description: "Unit Event",
  detailsDescription: "(Cleaving Flash of Light) Shinobu Sengoku",
  unbloomedThumb: 'icons/card_square2_4907_normal.webp',
  bloomedThumb: 'icons/card_square2_4907_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4907_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4907_evolution.webp'
},
{
  id: 12,
  name: `Chiaki Morisawa`,
  avatar: `images/btn-morisawa_chiaki.webp`,
  borderColor: "#E60033",
  startDate: `2026-04-14`,
  description: "Theme Scout",
  detailsDescription: "(New-Generation Mission) Chiaki Morisawa",
  unbloomedThumb: 'icons/card_square2_4762_normal.webp',
  bloomedThumb: 'icons/card_square2_4762_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4762_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4762_evolution.webp'
},
{
  id: 13,
  name: `Kanata Shinkai`,
  avatar: `images/btn-shinkai_kanata.webp`,
  borderColor: "#008DB7",
  startDate: `2026-01-10`,
  description: "Bright me up!! Scout Stage",
  detailsDescription: "(Journey Filled With Freedom) Kanata Shinkai",
  unbloomedThumb: 'icons/card_square2_4655_normal.webp',
  bloomedThumb: 'icons/card_square2_4655_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4655_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4655_evolution.webp'
},
{
  id: 14,
  name: `Hiiro Amagi`,
  avatar: `images/btn-amagi_hiiro.webp`,
  borderColor: "#BA2636",
  startDate: `2026-04-15`,
  description: "Large Scale Event",
  detailsDescription: "(ONLY SHINE) Hiiro Amagi",
  unbloomedThumb: 'icons/card_square2_4757_normal.webp',
  bloomedThumb: 'icons/card_square2_4757_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4757_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4757_evolution.webp'
},
{
  id: 15,
  name: `Aira Shiratori`,
  avatar: `images/btn-shiratori_aira.webp`,
  borderColor: "#FFF1CF",
  startDate: `2026-08-30`,
  description: "Megashpere Match Scout",
  detailsDescription: "(Soldier's Adversity) Aira Shiratori",
  unbloomedThumb: 'icons/card_square2_4924_normal.webp',
  bloomedThumb: 'icons/card_square2_4924_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4924_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4924_evolution.webp'
},
{
  id: 16,
  name: `Mayoi Ayase`,
  avatar: `images/btn-ayase_mayoi.webp`,
  borderColor: "#522F60",
  startDate: `2026-01-31`,
  description: "Unit Event",
  detailsDescription: "(Meaningful Words I Want to Convey) Mayoi Ayase",
  unbloomedThumb: 'icons/card_square2_4692_normal.webp',
  bloomedThumb: 'icons/card_square2_4692_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4692_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4692_evolution.webp'
},
{
  id: 17,
  name: `Tatsumi Kazehaya`,
  avatar: `images/btn-kazehaya_tatsumi.webp`,
  borderColor: "#7EBEA5",
  startDate: `2025-12-10`,
  description: "Bright me up!! Scout Stage",
  detailsDescription: "(Good Fortune Comes Unexpectedly) Tatsumi Kazehaya",
  unbloomedThumb: 'icons/card_square2_4627_normal.webp',
  bloomedThumb: 'icons/card_square2_4627_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4627_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4627_evolution.webp'
},
{
  id: 18,
  name: `Nagisa Ran`,
  avatar: `images/btn-ran_nagisa.webp`,
  borderColor: "#A73836",
  startDate: `2026-10-25`,
  description: "Bright me up!! Scout Stage",
  detailsDescription: "(The Passion of Pursuit) Nagisa Ran",
  unbloomedThumb: 'icons/card_square2_4958_normal.webp',
  bloomedThumb: 'icons/card_square2_4958_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4958_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4958_evolution.webp'
},
{
  id: 19,
  name: `Hiyori Tomoe`,
  avatar: `images/btn-tomoe_hiyori.webp`,
  borderColor: "#B8D200",
  startDate: `2026-01-25`,
  description: "Bright me up!! Scout Stage",
  detailsDescription: "(Young Nobleman's Attire) Hiyori Tomoe",
  unbloomedThumb: 'icons/card_square2_4666_normal.webp',
  bloomedThumb: 'icons/card_square2_4666_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4666_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4666_evolution.webp'
},
{
  id: 20,
  name: `Ibara Saegusa`,
  avatar: `images/btn-saegusa_ibara.webp`,
  borderColor: "#74325C",
  startDate: `2026-03-14`,
  description: "Theme Scout",
  detailsDescription: "(A Date Kept Secret) Ibara Saegusa",
  unbloomedThumb: 'icons/card_square2_4740_normal.webp',
  bloomedThumb: 'icons/card_square2_4740_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4740_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4740_evolution.webp'
},
{
  id: 21,
  name: `Jun Sazanami`,
  avatar: `images/btn-sazanami_jun.webp`,
  borderColor: "#192F60",
  startDate: `2026-07-14`,
  description: "Theme Scout",
  detailsDescription: "(Breezy BEATS) Jun Sazanami",
  unbloomedThumb: 'icons/card_square2_4891_normal.webp',
  bloomedThumb: 'icons/card_square2_4891_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4891_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4891_evolution.webp'
},
{
  id: 22,
  name: `Shu Itsuki`,
  avatar: `images/btn-itsuki_shu.webp`,
  borderColor: "#E3ACAE",
  startDate: `2026-06-25`,
  description: "Bright me up!! Scout Stage",
  detailsDescription: "(Noir Couture) Shu Itsuki",
  unbloomedThumb: 'icons/card_square2_4873_normal.webp',
  bloomedThumb: 'icons/card_square2_4873_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4873_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4873_evolution.webp'
},
{
  id: 23,
  name: `Mika Kagehira`,
  avatar: `images/btn-kagehira_mika.webp`,
  borderColor: "#006A6C",
  startDate: `2026-07-31`,
  description: "Megashpere Match Tour Event",
  detailsDescription: "(Valkyrie's Heartbeat) Mika Kagehira",
  unbloomedThumb: 'icons/card_square2_4898_normal.webp',
  bloomedThumb: 'icons/card_square2_4898_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4898_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4898_evolution.webp'
},
{
  id: 24,
  name: `Hinata Aoi`,
  avatar: `images/btn-aoi_hinata.webp`,
  borderColor: "#EB6EA0",
  startDate: `2026-07-15`,
  description: "Unit Event",
  detailsDescription: "(Splash You Can't Miss) Hinata Aoi",
  unbloomedThumb: 'icons/card_square2_4887_normal.webp',
  bloomedThumb: 'icons/card_square2_4887_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4887_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4887_evolution.webp'
},
{
  id: 25,
  name: `Yuta Aoi`,
  avatar: `images/btn-aoi_yuta.webp`,
  borderColor: "#00A1E9",
  startDate: `2026-10-30`,
  description: "Megasphere Match Scout",
  detailsDescription: "(Strong-Willed Twin Star) Yuta Aoi",
  unbloomedThumb: 'icons/card_square2_4965_normal.webp',
  bloomedThumb: 'icons/card_square2_4965_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4965_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4965_evolution.webp'
},
{
  id: 26,
  name: `Rinne Amagi`,
  avatar: `images/btn-amagi_rinne.webp`,
  borderColor: "#B7282E",
  startDate: `2026-02-15`,
  description: "Large Scale Event",
  detailsDescription: "(Bonds That Make You Feel Free) Rinne Amagi",
  unbloomedThumb: 'icons/card_square2_4701_normal.webp',
  bloomedThumb: 'icons/card_square2_4701_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4701_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4701_evolution.webp'
},
{
  id: 27,
  name: `HiMERU`,
  avatar: `images/btn-himeru.webp`,
  borderColor: "#89C3EB",
  startDate: `2026-09-25`,
  description: "Bright me up!! Scout Stage",
  detailsDescription: "(Passion Poured In) HiMERU",
  unbloomedThumb: 'icons/card_square2_4938_normal.webp',
  bloomedThumb: 'icons/card_square2_4938_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4938_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4938_evolution.webp'
},
{
  id: 28,
  name: `Kohaku Oukawa`,
  avatar: `images/btn-oukawa_kohaku.webp`,
  borderColor: "#F4B3C2",
  startDate: `2026-09-11`,
  description: "Theme Scout",
  detailsDescription: "(Maid's Hospitality) Kohaku Oukawa",
  unbloomedThumb: 'icons/card_square2_4934_normal.webp',
  bloomedThumb: 'icons/card_square2_4934_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4934_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4934_evolution.webp'
},
{
  id: 29,
  name: `Niki Shiina`,
  avatar: `images/btn-shiina_niki.webp`,
  borderColor: "#507EA5",
  startDate: `2026-03-25`,
  description: "Bright me up!! Scout Stage",
  detailsDescription: "(Ample Time to Prepare) Niki Shiina",
  unbloomedThumb: 'icons/card_square2_4744_normal.webp',
  bloomedThumb: 'icons/card_square2_4744_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4744_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4744_evolution.webp'
},
{
  id: 30,
  name: `Rei Sakuma`,
  avatar: `images/btn-sakuma_rei.webp`,
  borderColor: "#47266E",
  startDate: `2025-12-25`,
  description: "Bright me up!! Scout Stage",
  detailsDescription: "(The Calm Before the Storm) Rei Sakuma",
  unbloomedThumb: 'icons/card_square2_4640_normal.webp',
  bloomedThumb: 'icons/card_square2_4640_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4640_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4640_evolution.webp'
},
{
  id: 31,
  name: `Kaoru Hakaze`,
  avatar: `images/btn-hakaze_kaoru.webp`,
  borderColor: "#FDD35C",
  startDate: `2026-01-30`,
  description: "Theme Scout",
  detailsDescription: "(Perfect Shot) Kaoru Hakaze",
  unbloomedThumb: 'icons/card_square2_4696_normal.webp',
  bloomedThumb: 'icons/card_square2_4696_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4696_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4696_evolution.webp'
},
{
  id: 32,
  name: `Koga Ogami`,
  avatar: `images/btn-ogami_koga.webp`,
  borderColor: "#C9CACA",
  startDate: `2026-09-15`,
  description: "Unit Event",
  detailsDescription: "(Chasing Soul) Koga Ogami",
  unbloomedThumb: 'icons/card_square2_4930_normal.webp',
  bloomedThumb: 'icons/card_square2_4930_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4930_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4930_evolution.webp'
},
{
  id: 33,
  name: `Adonis Otogari`,
  avatar: `images/btn-otogari_adonis.webp`,
  borderColor: "#915DA3",
  startDate: `2025-11-10`,
  description: "Bright me up!! Scout Stage",
  detailsDescription: "(What Surrounds Dreams) Adonis Otogari",
  unbloomedThumb: 'icons/card_square2_4546_normal.webp',
  bloomedThumb: 'icons/card_square2_4546_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4546_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4546_evolution.webp'
},
{
  id: 34,
  name: `Tomoya Mashiro`,
  avatar: `images/btn-mashiro_tomoya.webp`,
  borderColor: "#EEDCB3",
  startDate: `2026-01-14`,
  description: "Theme Scout",
  detailsDescription: "(Galloping Stage) Tomoya Mashiro",
  unbloomedThumb: 'icons/card_square2_4662_normal.webp',
  bloomedThumb: 'icons/card_square2_4662_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4662_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4662_evolution.webp'
},
{
  id: 35,
  name: `Nazuna Nito`,
  avatar: `images/btn-nito_nazuna.webp`,
  borderColor: "#FFEC47",
  startDate: `2025-11-15`,
  description: "Shuffle Event",
  detailsDescription: "(Hooray, Hooray, ResQ) Nazuna Nito",
  unbloomedThumb: 'icons/card_square2_4554_normal.webp',
  bloomedThumb: 'icons/card_square2_4554_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4554_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4554_evolution.webp'
},
{
  id: 36,
  name: `Mitsuru Tenma`,
  avatar: `images/btn-tenma_mitsuru.webp`,
  borderColor: "#ED6D35",
  startDate: `2026-11-15`,
  description: "Unit Event",
  detailsDescription: "() Mitsuru Tenma",
  unbloomedThumb: 'icons/card_square2_4xxx_normal.webp',
  bloomedThumb: 'icons/card_square2_4xxx_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4xxx_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4xxx_evolution.webp'
},
{
  id: 37,
  name: `Hajime Shino`,
  avatar: `images/btn-shino_hajime.webp`,
  borderColor: "#CAB8D9",
  startDate: `2026-06-30`,
  description: "Megasphere Match Tour Event",
  detailsDescription: "(Rabbit's Kindness) Hajime Shino",
  unbloomedThumb: 'icons/card_square2_4876_normal.webp',
  bloomedThumb: 'icons/card_square2_4876_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4876_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4876_evolution.webp'
},
{
  id: 38,
  name: `Keito Hasumi`,
  avatar: `images/btn-hasumi_keito.webp`,
  borderColor: "#316745",
  startDate: `2026-07-25`,
  description: "Bright me up!! Scout Stage",
  detailsDescription: "The Me I Have Yet to Discover) Keito Hasumi",
  unbloomedThumb: 'icons/card_square2_4895_normal.webp',
  bloomedThumb: 'icons/card_square2_4895_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4895_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4895_evolution.webp'
},
{
  id: 39,
  name: `Kuro Kiryu`,
  avatar: `images/btn-kiryu_kuro.webp`,
  borderColor: "#E83929",
  startDate: `2025-08-14`,
  description: "Theme Scout",
  detailsDescription: "(Oniyasha's Karma) Kuro Kiryu",
  unbloomedThumb: 'icons/card_square2_4465_normal.webp',
  bloomedThumb: 'icons/card_square2_4465_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4465_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4465_evolution.webp'
},
{
  id: 40,
  name: `Souma Kanzaki`,
  avatar: `images/btn-kanzaki_souma.webp`,
  borderColor: "#5654A2",
  startDate: `2026-05-25`,
  description: "Bright me up!! Scout Stage",
  detailsDescription: "(Path Adorned With Color) Souma Kanzaki",
  unbloomedThumb: 'icons/card_square2_4850_normal.webp',
  bloomedThumb: 'icons/card_square2_4850_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4850_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4850_evolution.webp'
},
{
  id: 41,
  name: `Ibuki Taki`,
  avatar: `images/btn-taki_ibuki.webp`,
  borderColor: "#66BBCC",
  startDate: `2026-08-14`,
  description: "Theme Scout",
  detailsDescription: "(Trail Spirit) Ibuki Taki",
  unbloomedThumb: 'icons/card_square2_4912_normal.webp',
  bloomedThumb: 'icons/card_square2_4912_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4912_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4912_evolution.webp'
},
{
  id: 42,
  name: `Tsukasa Suou`,
  avatar: `images/btn-suou_tsukasa.webp`,
  borderColor: "#942343",
  startDate: `2026-10-10`,
  description: "Bright me up!! Scout Stage",
  detailsDescription: "(Weaponizing My Confidence) Tsukasa Suou",
  unbloomedThumb: 'icons/card_square2_4947_normal.webp',
  bloomedThumb: 'icons/card_square2_4947_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4947_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4947_evolution.webp'
},
{
  id: 43,
  name: `Leo Tsukinaga`,
  avatar: `images/btn-tsukinaga_leo.webp`,
  borderColor: "#EC6D51",
  startDate: `2026-05-31`,
  description: "Megasphere Match Tour Event",
  detailsDescription: "(Knight's Seriousness) Leo Tsukinaga",
  unbloomedThumb: 'icons/(Seriousness)_Leo_Tsukinaga_M_Mini.webp',
  bloomedThumb: 'icons/(Seriousness)_Leo_Tsukinaga_M_Mini_Bloomed.webp',
  unbloomedImage: 'cards2/(Seriousness)_Leo_Tsukinaga_M.webp',
  bloomedImage: 'cards2/(Seriousness)_Leo_Tsukinaga_M_Bloomed.webp'
},
{
  id: 44,
  name: `Izumi Sena`,
  avatar: `images/btn-sena_izumi.webp`,
  borderColor: "#BBDBF3",
  startDate: `2025-10-14`,
  description: "Theme Scout",
  detailsDescription: "(Séance Lead) Izumi Sena",
  unbloomedThumb: 'icons/card_square2_4521_normal.webp',
  bloomedThumb: 'icons/card_square2_4521_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4521_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4521_evolution.webp'
},
{
  id: 45,
  name: `Ritsu Sakuma`,
  avatar: `images/btn-sakuma_ritsu.webp`,
  borderColor: "#001E43",
  startDate: `2026-08-10`,
  description: "Bright me up!! Scout Stage",
  detailsDescription: "(At a Pace Befitting of Me) Ritsu Sakuma",
  unbloomedThumb: 'icons/card_square2_4904_normal.webp',
  bloomedThumb: 'icons/card_square2_4904_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4904_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4904_evolution.webp'
},
{
  id: 46,
  name: `Arashi Narukami`,
  avatar: `images/btn-narukami_arashi.webp`,
  borderColor: "#EDDE7B",
  startDate: `2026-11-10`,
  description: "Bright me up!! Scout Stage",
  detailsDescription: "() Arashi Narukami",
  unbloomedThumb: 'icons/card_square2_4xxx_normal.webp',
  bloomedThumb: 'icons/card_square2_4xxx_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4xxx_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4xxx_evolution.webp'
},
{
  id: 47,
  name: `Natsume Sakasaki`,
  avatar: `images/btn-sakasaki_natsume.webp`,
  borderColor: "#D70035",
  startDate: `2026-06-14`,
  description: "Theme Scout",
  detailsDescription: "(Summer Spent Together) Natsume Sakasaki",
  unbloomedThumb: 'icons/card_square2_4869_normal.webp',
  bloomedThumb: 'icons/card_square2_4869_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4869_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4869_evolution.webp'
},
{
  id: 48,
  name: `Tsumugi Aoba`,
  avatar: `images/btn-aoba_tsumugi.webp`,
  borderColor: "#00608D",
  startDate: `2026-08-31`,
  description: "Megasphere Match Tour Event",
  detailsDescription: "(Magician's Desire) Tsumugi Aoba",
  unbloomedThumb: 'icons/card_square2_4920_normal.webp',
  bloomedThumb: 'icons/card_square2_4920_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4920_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4920_evolution.webp'
},
{
  id: 49,
  name: `Sora Harukawa`,
  avatar: `images/btn-harukawa_sora.webp`,
  borderColor: "#FFF352",
  startDate: `2026-11-14`,
  description: "Theme Scout",
  detailsDescription: "() Sora Harukawa",
  unbloomedThumb: 'icons/card_square2_4975_normal.webp',
  bloomedThumb: 'icons/card_square2_4975_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4975_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4975_evolution.webp'
},
{
  id: 50,
  name: `Madara Mikejima`,
  avatar: `images/btn-mikejima_madara.webp`,
  borderColor: "#622D18",
  startDate: `2026-09-30`,
  description: "Megasphere Match Tour Event",
  detailsDescription: "(Mama's Conviction) Madara Mikejima",
  unbloomedThumb: 'icons/card_square2_4941_normal.webp',
  bloomedThumb: 'icons/card_square2_4941_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4941_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4941_evolution.webp'
},
{
  id: 51,
  name: `Esu`,
  avatar: `images/btn-esu.webp`,
  borderColor: "#80FFF4",
  startDate: `2025-11-29`,
  description: "Theme Scout",
  detailsDescription: "(Brand New World) Esu",
  unbloomedThumb: 'icons/card_square2_4623_normal.webp',
  bloomedThumb: 'icons/card_square2_4623_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4623_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4623_evolution.webp'
},
{
  id: 52,
  name: `Kanna`,
  avatar: `images/btn-kanna.webp`,
  borderColor: "#8ACCB8",
  startDate: `2026-05-14`,
  description: "Theme Scout",
  detailsDescription: "(Logic Eye) Kanna",
  unbloomedThumb: 'icons/card_square2_4846_normal.webp',
  bloomedThumb: 'icons/card_square2_4846_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4846_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4846_evolution.webp'
},
{
  id: 53,
  name: `Yume`,
  avatar: `images/btn-yume.webp`,
  borderColor: "#CCADD9",
  startDate: `2026-06-29`,
  description: "Megasphere Match Scout",
  detailsDescription: "(Prince's Dream) Yume",
  unbloomedThumb: 'icons/card_square2_4880_normal.webp',
  bloomedThumb: 'icons/card_square2_4880_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4880_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4880_evolution.webp'
},
{
  id: 54,
  name: `Raika`,
  avatar: `images/btn-raika.webp`,
  borderColor: "#298C7C",
  startDate: `2026-10-15`,
  description: "Unit Event",
  detailsDescription: "(SWEET LIE) Raika",
  unbloomedThumb: 'icons/card_square2_4950_normal.webp',
  bloomedThumb: 'icons/card_square2_4950_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4950_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4950_evolution.webp'
},
{
  id: 55,
  name: `Juis Kojika`,
  avatar: `images/btn-kojika_juis.webp`,
  borderColor: "#70ab5e",
  startDate: `2026-03-15`,
  description: "Unit Event",
  detailsDescription: "(Poppin' BUBBLE GUM) Juis Kojika",
  unbloomedThumb: 'icons/card_square2_4736_normal.webp',
  bloomedThumb: 'icons/card_square2_4736_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4736_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4736_evolution.webp'
},
{
  id: 56,
  name: `Nozomi Madoka`,
  avatar: `images/btn-madoka_nozomi.webp`,
  borderColor: "#881f4a",
  startDate: `2026-03-15`,
  description: "-",
  detailsDescription: "(A Performance Worthy of Gratitude) Nozomi Madoka",
  unbloomedThumb: 'icons/card_square2_4733_normal.webp',
  bloomedThumb: 'icons/card_square2_4733_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4733_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4733_evolution.webp'
},
{
  id: 57,
  name: `Mashu Kuon`,
  avatar: `images/btn-kuon_mashu.webp`,
  borderColor: "#ec938c",
  startDate: `2026-07-30`,
  description: "Megasphere Match Scout",
  detailsDescription: "(Clown's Dear Affection) Mashu Kuon",
  unbloomedThumb: 'icons/card_square2_4901_normal.webp',
  bloomedThumb: 'icons/card_square2_4901_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4901_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4901_evolution.webp'
},
{
  id: 58,
  name: `Chitose Tsuzura`,
  avatar: `images/btn-tsuzura_chitose.webp`,
  borderColor: "#424355",
  startDate: `2026-03-15`,
  description: "-",
  detailsDescription: "(Luck That Makes You Want to Show Gratitude) Chitose Tsuzura",
  unbloomedThumb: 'icons/card_square2_4735_normal.webp',
  bloomedThumb: 'icons/card_square2_4735_evolution.webp',
  unbloomedImage: 'cards2/card_rectangle2_4735_normal.webp',
  bloomedImage: 'cards2/card_rectangle2_4735_evolution.webp'
}];

const cardCountData = {
  1: { five: 14, four: 16, three: 20 }, // Eichi
  2: { five: 12, four: 17, three: 20 }, // Wataru
  3: { five: 12, four: 17, three: 18 }, // Tori
  4: { five: 12, four: 18, three: 19 }, // Yuzuru
  5: { five: 14, four: 15, three: 19 }, // Hokuto
  6: { five: 13, four: 18, three: 22 }, // Subaru
  7: { five: 12, four: 19, three: 21 }, // Makoto
  8: { five: 12, four: 19, three: 19 }, // Mao
  9: { five: 12, four: 19, three: 19 }, // Tetora
  10: { five: 12, four: 16, three: 20 },  // Midori
  11: { five: 12, four: 18, three: 17 },  // Shinobu
  12: { five: 14, four: 16, three: 19 },  // Chiaki
  13: { five: 11, four: 19, three: 19 },  // Kanata
  14: { five: 13, four: 17, three: 18 },  // Hiiro
  15: { five: 12, four: 16, three: 18 },  // Aira
  16: { five: 11, four: 19, three: 18 },  // Mayoi
  17: { five: 10, four: 17, three: 18 },  // Tatsumi
  18: { five: 12, four: 14, three: 22 },  // Nagisa
  19: { five: 11, four: 17, three: 18 },  // Hiyori
  20: { five: 12, four: 15, three: 22 },  // Ibara
  21: { five: 12, four: 18, three: 19 },  // Jun
  22: { five: 15, four: 18, three: 16 },  // Shu
  23: { five: 13, four: 16, three: 18 },  // Mika
  24: { five: 13, four: 19, three: 16 },  // Hinata
  25: { five: 14, four: 19, three: 17 },  // Yuta
  26: { five: 13, four: 16, three: 18 },  // Rinne
  27: { five: 12, four: 17, three: 17 },  // HiMERU
  28: { five: 11, four: 20, three: 21 },  // Kohaku
  29: { five: 11, four: 19, three: 18 },  // Niki
  30: { five: 13, four: 18, three: 19 },  // Rei
  31: { five: 12, four: 16, three: 22 },  // Kaoru
  32: { five: 12, four: 19, three: 22 },  // Koga
  33: { five: 11, four: 18, three: 19 },  // Adonis
  34: { five: 13, four: 16, three: 22 },  // Tomoya
  35: { five: 11, four: 18, three: 21 },  // Nazuna
  36: { five: 12, four: 17, three: 21 },  // Mitsuru
  37: { five: 14, four: 16, three: 22 },  // Hajime
  38: { five: 14, four: 16, three: 18 },  // Keito
  39: { five: 11, four: 19, three: 21 },  // Kuro
  40: { five: 11, four: 17, three: 18 },  // Souma
  41: { five: 4, four: 6, three: 6 },     // Ibuki
  42: { five: 14, four: 16, three: 20 },  // Tsukasa
  43: { five: 13, four: 18, three: 18 },  // Leo
  44: { five: 11, four: 19, three: 20 },  // Izumi
  45: { five: 13, four: 19, three: 19 },  // Ritsu
  46: { five: 12, four: 17, three: 21 },  // Arashi
  47: { five: 14, four: 17, three: 17 },  // Natsume
  48: { five: 13, four: 18, three: 21 },  // Tsumugi
  49: { five: 12, four: 19, three: 17 },  // Sora
  50: { five: 17, four: 18, three: 15 },  // Madara
  51: { five: 5, four: 6, three: 10 },     // Esu
  52: { five: 4, four: 7, three: 9 },     // Kanna
  53: { five: 5, four: 8, three: 7 },     // Yume
  54: { five: 5, four: 6, three: 6 },     // Raika
  55: { five: 3, four: 2, three: 2 },     // Juis
  56: { five: 1, four: 4, three: 2 },     // Nozomi
  57: { five: 2, four: 2, three: 3 },     // Mashu
  58: { five: 1, four: 2, three: 4 }      // Chitose
};

const imageCache = new Map();

function loadImageCached(src) {
  if (imageCache.has(src)) return Promise.resolve(src);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => { imageCache.set(src, true); resolve(src); };
    img.onerror = () => reject(src);
    img.src = src;
  });
}

const birthdayData = {
  1: { month: 1, day: 10 },
  2: { month: 2, day: 21 },
  3: { month: 1, day: 13 },
  4: { month: 10, day: 18 },
  5: { month: 12, day: 17 },
  6: { month: 6, day: 22 },
  7: { month: 4, day: 30 },
  8: { month: 3, day: 16 },
  9: { month: 6, day: 15 },
  10: { month: 8, day: 29 },
  11: { month: 6, day: 9 },
  12: { month: 9, day: 18 },
  13: { month: 8, day: 30 },
  14: { month: 1, day: 4 },
  15: { month: 11, day: 27 },
  16: { month: 6, day: 6 },
  17: { month: 12, day: 28 },
  18: { month: 10, day: 27 },
  19: { month: 7, day: 24 },
  20: { month: 11, day: 14 },
  21: { month: 8, day: 16 },
  22: { month: 10, day: 30 },
  23: { month: 12, day: 26 },
  24: { month: 3, day: 5 },
  25: { month: 3, day: 5 },
  26: { month: 5, day: 18 },
  27: { month: 7, day: 7 },
  28: { month: 2, day: 5 },
  29: { month: 10, day: 5 },
  30: { month: 11, day: 2 },
  31: { month: 11, day: 3 },
  32: { month: 7, day: 18 },
  33: { month: 8, day: 29 },
  34: { month: 3, day: 29 },
  35: { month: 4, day: 27 },
  36: { month: 9, day: 7 },
  37: { month: 7, day: 15 },
  38: { month: 9, day: 6 },
  39: { month: 1, day: 26 },
  40: { month: 4, day: 20 },
  41: { month: 1, day: 21 },
  42: { month: 4, day: 6 },
  43: { month: 5, day: 5 },
  44: { month: 11, day: 2 },
  45: { month: 9, day: 22 },
  46: { month: 3, day: 3 },
  47: { month: 2, day: 4 },
  48: { month: 8, day: 7 },
  49: { month: 7, day: 1 },
  50: { month: 5, day: 16 },
  51: { month: 9, day: 12 },
  52: { month: 6, day: 1 },
  53: { month: 12, day: 2 },
  54: { month: 5, day: 22 },
  55: { month: 8, day: 5 },
  56: { month: 6, day: 20 },
  57: { month: 14, day: 14 },
  58: { month: 11, day: 19 },
};

let currentSort = 'highest';

let sidePanelOpenToken = 0;

function renderSidePanelCounts(idol) {
  const section = document.getElementById("side-counts-section");
  const grid = document.getElementById("side-panel-counts");
  if (!section || !grid) return;

  grid.innerHTML = "";
  const stats = cardCountData[idol.id];
  if (!stats) {
    section.style.display = "none";
    return;
  }
  section.style.display = "";

  [
    { star: 5, value: stats.five,  cls: "count-five"  },
    { star: 4, value: stats.four,  cls: "count-four"  },
    { star: 3, value: stats.three, cls: "count-three" }
  ].forEach(({ star, value, cls }) => {
    const tile = document.createElement("div");
    tile.className = `count-tile ${cls}`;

    const label = document.createElement("span");
    label.className = "count-star";
    label.textContent = `${star}⭐`;

    const num = document.createElement("span");
    num.className = "count-num";
    num.textContent = value;

    tile.append(label, num);
    grid.appendChild(tile);
  });
}

function openSidePanel(idol) {
  const panel = document.getElementById("side-panel");
  if (!panel || !idol) return;

  const nameEl = document.getElementById("side-panel-name");
  const imgEl = document.getElementById("side-panel-image");
  const descEl = document.getElementById("side-panel-description");
  const summaryEl = document.getElementById("side-panel-summary");
  const dateEl = document.getElementById("side-panel-date");
  const loaderEl = document.getElementById("side-image-loader");
  const variantsEl = document.getElementById("card-variants");

  const token = ++sidePanelOpenToken;

  nameEl.textContent = idol.name || "";
  descEl.textContent = idol.detailsDescription || "-";
  dateEl.textContent = formatDate(idol.startDate);
  summaryEl.textContent = idol.description || "-";
  renderSidePanelCounts(idol);

  if (idol.unbloomedThumb && idol.bloomedThumb && idol.unbloomedImage && idol.bloomedImage) {
    setupCardVariants(idol);
    variantsEl.style.display = "flex";
  } else {
    variantsEl.style.display = "none";
  }

  imgEl.classList.remove(...SIDE_IMAGE_CLASSES);
  imgEl.style.display = "none";
  loaderEl.style.display = "flex";

  const defaultImage = idol.bloomedImage || idol.detailsImage;
  loadImageCached(defaultImage).then(() => {
    if (token !== sidePanelOpenToken) return;
    imgEl.src = defaultImage;
    imgEl.style.display = "block";
    loaderEl.style.display = "none";
  }).catch(() => {
    if (token !== sidePanelOpenToken) return;
    loaderEl.style.display = "none";
    imgEl.style.display = "block";
    imgEl.src = "";
  });

  panel.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  panel.classList.add("active");
}

function setupCardVariants(idol) {
  const unbloomedPreview = document.getElementById("unbloomed-preview");
  const bloomedPreview = document.getElementById("bloomed-preview");
  const variantOptions = document.querySelectorAll(".variant-option");
  const unbloomedLoader = variantOptions[0].querySelector('.variant-loader');
  const bloomedLoader = variantOptions[1].querySelector('.variant-loader');

  if (!imageCache.has(idol.unbloomedThumb)) {
    unbloomedPreview.classList.add('loading');
    unbloomedLoader.classList.add('active');
  }
  if (!imageCache.has(idol.bloomedThumb)) {
    bloomedPreview.classList.add('loading');
    bloomedLoader.classList.add('active');
  }

  loadImageCached(idol.unbloomedThumb).then(() => {
    unbloomedPreview.src = idol.unbloomedThumb;
    unbloomedPreview.classList.remove('loading');
    unbloomedLoader.classList.remove('active');
  }).catch(() => {
    unbloomedPreview.classList.remove('loading');
    unbloomedLoader.classList.remove('active');
  });

  loadImageCached(idol.bloomedThumb).then(() => {
    bloomedPreview.src = idol.bloomedThumb;
    bloomedPreview.classList.remove('loading');
    bloomedLoader.classList.remove('active');
  }).catch(() => {
    bloomedPreview.classList.remove('loading');
    bloomedLoader.classList.remove('active');
  });

  variantOptions.forEach(option => option.classList.remove("active"));
  document.querySelector('[data-type="bloomed"]').classList.add("active");

  variantOptions.forEach(option => {
    option.onclick = function() {
      if (this.classList.contains("active")) return;

      const type = this.dataset.type;
      const newImage = type === "unbloomed" ? idol.unbloomedImage : idol.bloomedImage;

      variantOptions.forEach(opt => opt.classList.remove("active"));
      this.classList.add("active");

      swapSidePanelImage(newImage, type === "unbloomed" ? "left" : "right");
    };
  });
}

let sidePanelSwapId = 0;
const SIDE_IMAGE_CLASSES = ["img-in-left", "img-in-right", "img-out-left", "img-out-right"];

function swapSidePanelImage(src, enterFrom) {
  const mainImage = document.getElementById("side-panel-image");
  const mainLoader = document.getElementById("side-image-loader");
  if (!mainImage || !mainLoader) return;

  const swapId = ++sidePanelSwapId;
  const openToken = sidePanelOpenToken;
  const exitTo = enterFrom === "left" ? "right" : "left";
  const isStale = () => swapId !== sidePanelSwapId || openToken !== sidePanelOpenToken;

  mainImage.classList.remove(...SIDE_IMAGE_CLASSES);
  mainImage.classList.add(`img-out-${exitTo}`);

  const exitDone = new Promise(resolve => setTimeout(resolve, 220));
  const loaded = loadImageCached(src).then(() => true, () => false);

  exitDone.then(() => {
    if (!isStale() && !imageCache.has(src)) {
      mainImage.style.display = "none";
      mainLoader.style.display = "flex";
    }
    return loaded;
  }).then(ok => {
    if (isStale()) return;
    mainLoader.style.display = "none";
    mainImage.classList.remove(`img-out-${exitTo}`);
    mainImage.style.display = "block";
    if (ok) mainImage.src = src;
    mainImage.classList.add(`img-in-${enterFrom}`);
    setTimeout(() => mainImage.classList.remove(`img-in-${enterFrom}`), 520);
  });
}

function closeSidePanel() {
  const panel = document.getElementById("side-panel");
  if (panel) {
    panel.classList.remove("active");
    panel.setAttribute("aria-hidden", "true");
  }
  document.body.classList.remove("modal-open");
}

document.addEventListener("DOMContentLoaded", () => {
  const panel = document.getElementById("side-panel");
  const closeBtn = document.querySelector(".side-close-btn");
  if (closeBtn) closeBtn.addEventListener("click", closeSidePanel);

  if (panel) {
    panel.addEventListener("click", (e) => {
      if (e.target === panel) closeSidePanel();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || !panel || !panel.classList.contains("active")) return;
    closeSidePanel();
  });
});

function getRibbonClass(rank) {
  if (rank === 1) return "ribbon gold";
  if (rank === 2) return "ribbon silver";
  if (rank === 3) return "ribbon bronze";
  if (rank <= 10) return "ribbon ten";
  return "ribbon other";
}

function getRibbonText(rank) {
  return `${rank}位`;
}

let previousIdolState = [];
let isFirstLoad = true;

function renderIdols() {
  idols.forEach(idol => {
    idol.days = calculateDays(idol.startDate);
  });

  if (currentSort === 'highest') {
    idols.sort((a, b) => b.days - a.days);
  } else {
    idols.sort((a, b) => a.days - b.days);
  }

  idols.forEach((idol, index) => {
    idol.rank = index + 1;
  });

  const storedState = localStorage.getItem('idolLeaderboardState');

  if (isFirstLoad) {
    isFirstLoad = false;

    if (storedState) {
      previousIdolState = JSON.parse(storedState);

      const hasChanges = idols.some(idol => {
        const prev = previousIdolState.find(p => p.id === idol.id);
        return !prev || prev.days !== idol.days || prev.rank !== idol.rank;
      });

      if (hasChanges) {
        renderCardsWithStoredState();
        setTimeout(() => {
          animateLeaderboardChanges();
        }, 500);
      } else {
        renderCardsInitial();
      }
    } else {
      renderCardsInitial();
    }
  } else {
    animateLeaderboardChanges();
  }

  const currentState = idols.map(idol => ({
    id: idol.id,
    rank: idol.rank,
    days: idol.days
  }));
  localStorage.setItem('idolLeaderboardState', JSON.stringify(currentState));
}

function renderCardsInitial() {
  const container = document.getElementById("idol-container");
  container.innerHTML = "";

  const fragment = document.createDocumentFragment();
  const cards = [];

  idols.filter(idol => !idol.isNew).forEach((idol) => {
    const card = createIdolCard(idol);
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    fragment.appendChild(card);
    cards.push(card);
  });

  container.appendChild(fragment);

  cards.forEach((card, index) => {
    setTimeout(() => {
      requestAnimationFrame(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
    }, index * 40 + 50);
  });

  previousIdolState = idols.map(idol => ({
    id: idol.id,
    rank: idol.rank,
    days: idol.days
  }));
}

function renderCardsWithStoredState() {
  const container = document.getElementById("idol-container");
  container.innerHTML = "";

  previousIdolState.forEach((prevIdol, index) => {
    const currentIdol = idols.find(i => i.id === prevIdol.id);
    if (!currentIdol || currentIdol.isNew) return;

    const tempRank = currentIdol.rank;
    const tempDays = currentIdol.days;
    currentIdol.rank = prevIdol.rank;
    currentIdol.days = prevIdol.days;

    const card = createIdolCard(currentIdol);
    card.style.opacity = '1';
    container.appendChild(card);

    currentIdol.rank = tempRank;
    currentIdol.days = tempDays;
  });

  const sortedCards = Array.from(container.children).sort((a, b) => {
    const aId = parseInt(a.dataset.idolId);
    const bId = parseInt(b.dataset.idolId);
    const aOldRank = previousIdolState.find(p => p.id === aId)?.rank || 999;
    const bOldRank = previousIdolState.find(p => p.id === bId)?.rank || 999;
    return aOldRank - bOldRank;
  });

  container.innerHTML = '';
  sortedCards.forEach(card => container.appendChild(card));
}

function animateLeaderboardChanges() {
  const container = document.getElementById("idol-container");

  idols.forEach(idol => {
    const previousIdol = previousIdolState.find(p => p.id === idol.id);
    if (!previousIdol) return;

    const oldDays = previousIdol.days;
    const newDays = idol.days;

    if (oldDays !== newDays) {
      const cardElement = Array.from(container.children).find(card => {
        const nameEl = card.querySelector('.idol-name');
        return nameEl && nameEl.textContent === idol.name;
      });

      if (cardElement) {
        const daysElement = cardElement.querySelector('.combo');
        if (daysElement) {
          animateDayCount(daysElement, oldDays, newDays);
        }
      }
    }
  });

  setTimeout(() => {
    reorganizeLeaderboard();
  }, 1100);
}

function animateDayCount(element, oldValue, newValue) {
  const duration = 1000;
  const steps = 30;
  const stepDuration = duration / steps;
  const valueChange = newValue - oldValue;
  const stepValue = valueChange / steps;

  let currentStep = 0;

  const interval = setInterval(() => {
    currentStep++;
    const currentValue = Math.round(oldValue + (stepValue * currentStep));
    element.textContent = `${currentValue} day/s`;

    if (currentStep >= steps) {
      clearInterval(interval);
      element.textContent = `${newValue} day/s`;
    }
  }, stepDuration);
}

function reorganizeLeaderboard() {
  const container = document.getElementById("idol-container");

  const entries = Array.from(container.children)
    .map(card => ({
      card,
      idol: idols.find(i => i.id === parseInt(card.dataset.idolId))
    }))
    .filter(entry => entry.idol);

  const firstRects = new Map(entries.map(({ card }) => [card, card.getBoundingClientRect()]));

  entries.sort((a, b) => a.idol.rank - b.idol.rank);
  entries.forEach(({ card, idol }) => {
    const ribbon = card.querySelector('.ribbon');
    if (ribbon) {
      ribbon.className = getRibbonClass(idol.rank);
      ribbon.textContent = getRibbonText(idol.rank);
    }
    container.appendChild(card);
  });

  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (!reduceMotion) {
    entries.forEach(({ card }) => {
      const first = firstRects.get(card);
      const last = card.getBoundingClientRect();
      const dx = first.left - last.left;
      const dy = first.top - last.top;
      if (!dx && !dy) return;

      card.style.transition = 'none';
      card.style.transform = `translate(${dx}px, ${dy}px)`;
      card.style.zIndex = '5';
      void card.offsetWidth;

      card.style.transition = 'transform 0.8s cubic-bezier(0.45, 0, 0.2, 1)';
      card.style.transform = '';

      setTimeout(() => {
        card.style.transition = '';
        card.style.zIndex = '';
      }, 850);
    });
  }

  previousIdolState = idols.map(idol => ({
    id: idol.id,
    rank: idol.rank,
    days: idol.days
  }));
}

function createIdolCard(idol) {
  const card = document.createElement("div");
  card.className = "idol-card";
  card.style.borderColor = idol.borderColor;
  card.dataset.idolId = idol.id;

  const ribbon = document.createElement("div");
  ribbon.className = getRibbonClass(idol.rank);
  ribbon.textContent = getRibbonText(idol.rank);

  const media = document.createElement("div");
  media.className = "idol-card-media";

  const img = document.createElement("img");
  img.src = idol.avatar;
  img.alt = idol.name;

  const expandBtn = document.createElement("button");
  expandBtn.type = "button";
  expandBtn.className = "expand-btn";
  expandBtn.title = "Expand";
  expandBtn.setAttribute("aria-label", `Expand ${idol.name}`);
  expandBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6"/><path d="M9 21H3v-6"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>`;
  expandBtn.addEventListener("click", () => openSidePanel(idol));

  media.appendChild(img);
  media.appendChild(expandBtn);

  const contentWrapper = document.createElement("div");
  contentWrapper.className = "idol-card-content";

  const name = document.createElement("div");
  name.className = "idol-name";
  name.textContent = idol.name;

  const days = document.createElement("div");
  days.className = "combo";
  days.textContent = `${idol.days} day/s`;

  contentWrapper.appendChild(name);
  contentWrapper.appendChild(days);

  card.appendChild(ribbon);
  card.appendChild(media);
  card.appendChild(contentWrapper);

  if (idol.isNew) {
    const newLabel = document.createElement("div");
    newLabel.className = "new-label";
    newLabel.textContent = "NEW";
    card.appendChild(newLabel);
  }

  if (idol.unbloomedImage && idol.bloomedImage) {
    card.addEventListener("mouseenter", () => {
      loadImageCached(idol.unbloomedImage);
      loadImageCached(idol.bloomedImage);
      if (idol.unbloomedThumb) loadImageCached(idol.unbloomedThumb);
      if (idol.bloomedThumb)   loadImageCached(idol.bloomedThumb);
    }, { once: true });
  }

  return card;
}

setInterval(renderIdols, 6 * 60 * 60 * 1000);

document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.querySelector(".hamburger");
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", () => {
      const open = document.body.classList.toggle("nav-open");
      hamburgerBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 700 && document.body.classList.contains("nav-open")) {
        document.body.classList.remove("nav-open");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("click", (e) => {
      if (!document.body.classList.contains("nav-open")) return;
      if (!e.target.closest(".navbar")) {
        document.body.classList.remove("nav-open");
        hamburgerBtn.setAttribute("aria-expanded", "false");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const sortSelect = document.getElementById("sortSelect");

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderIdols();
      try { localStorage.setItem("prefSort", currentSort); } catch(e) {}
    });
  }

  try {
    const ss = localStorage.getItem("prefSort");
    if (ss) {
      currentSort = ss;
      if (sortSelect) sortSelect.value = ss;
    }
  } catch(e) {}
});

document.addEventListener("DOMContentLoaded", () => {
  const fabSettings  = document.getElementById("fab-settings");
  const settingsPanel = document.getElementById("settings-panel");
  const settingsClose = document.getElementById("settings-close");
  const sidePanel     = document.getElementById("side-panel");

  function toggleSettings(force) {
    const open = typeof force === "boolean" ? force : !settingsPanel.classList.contains("open");
    settingsPanel.classList.toggle("open", open);
    if (fabSettings) fabSettings.classList.toggle("fab-settings-active", open);
  }

  if (fabSettings) {
    fabSettings.addEventListener("click", (e) => {
      e.stopPropagation();
      if (sidePanel && sidePanel.classList.contains("active")) return;
      toggleSettings();
    });
  }
  if (settingsClose) settingsClose.addEventListener("click", () => toggleSettings(false));

  document.addEventListener("click", (e) => {
    if (!settingsPanel || !settingsPanel.classList.contains("open")) return;
    if (!settingsPanel.contains(e.target) && e.target !== fabSettings) toggleSettings(false);
  });

});

document.addEventListener("DOMContentLoaded", () => {
  const uiToggle = document.getElementById("settings-ui-toggle");
  const label    = document.getElementById("ui-toggle-label");
  const eyeOn    = uiToggle ? uiToggle.querySelector(".icon-eye")     : null;
  const eyeOff   = uiToggle ? uiToggle.querySelector(".icon-eye-off") : null;
  const FOCUS_KEY = "focusModeActive";

  function applyFocus(active) {
    document.body.classList.toggle("focus-mode", active);
    if (eyeOn)  eyeOn.style.display  = active ? "none" : "";
    if (eyeOff) eyeOff.style.display = active ? ""     : "none";
    if (label)  label.textContent    = active ? "Show UI" : "Hide UI";
    if (uiToggle) uiToggle.classList.toggle("ui-toggle-active", active);
    try { localStorage.setItem(FOCUS_KEY, active ? "1" : "0"); } catch(e) {}
  }

  try { if (localStorage.getItem(FOCUS_KEY) === "1") applyFocus(true); } catch(e) {}

  if (uiToggle) uiToggle.addEventListener("click", () => applyFocus(!document.body.classList.contains("focus-mode")));
});

document.addEventListener("DOMContentLoaded", () => {
  const fabTop = document.getElementById("fab-top");
  if (!fabTop) return;
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        fabTop.classList.toggle("fab-top-visible", window.scrollY > 400);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  fabTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});

document.addEventListener("DOMContentLoaded", () => {
  renderIdols();
});