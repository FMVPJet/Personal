const projectOrder = [
  "ft-series",
  "ch370",
  "fx-alpha",
  "lt720",
  "transporter",
  "hermes",
  "edu-chair",
  "atem",
];

const rawProjects = [
  {
    slug: "ft-series",
    title: "DeepCool\nFT Series",
    category: "Product Design",
    intro: "Refined engineering, minimal aesthetics.",
    heroFile: "cover.CikdnEEP_3BQro.webp",
    gallery: [
      ["FT_Series_Fans_2.BVL7e6mQ_Z2wPccG.webp", 3840, 2160, "FT12 — refined down to its silhouette"],
      ["FT_Series_Fans_3.YWAX1aeA_ZX1QjI.webp", 3840, 2160, "The transparent hub puts the FOC motor and fluid-dynamic bearing on display"],
      ["ft_series_02.BSMMJttY_Z1Xng9O.webp", 2560, 1440, "The full FT family — FT9 Slim, FT12 Slim, FT12, FT14"],
      ["FT_Series_Fans_5.CTGHFXhC_1MIMSM.webp", 2160, 2880, "FT Series Fans 5"],
      ["FT_Series_Fans_4.BfOC9Ggx_2u66hl.webp", 3840, 2160, "FT Series Fans 4"],
      ["FT_Series_Fans_6.n5GEId6T_ZCR2zV.webp", 3840, 2160, "FT Series Fans 6"],
      ["FT_Series_Fans_7.vp0O0TDV_ZNo9s7.webp", 2880, 1920, "FT9 Slim, in a small-form-factor build"],
    ],
  },
  {
    slug: "ch370",
    title: "DeepCool\nCH370",
    category: "Industrial Design",
    intro: "Compact powerhouse.",
    heroFile: "cover.B9flY4qn_Z1qEgCw.webp",
    gallery: [
      ["01.q0hh7AcP_Z2cJpog.webp", 1920, 1080, "CH370 in a Micro-ATX build"],
      ["02.DWaWIMuu_1bwTgj.webp", 1920, 1080, "Honeycomb perforation — the dominant visual motif, optimised for airflow"],
      ["05.B3j0FS5D_ZviMXx.webp", 1919, 1080, "CH370 detail"],
      ["06.u-YK2o3__Z21yCdA.webp", 1545, 1080, "CH370 interior detail"],
      ["01.DfhXbauI_2nV4Q5.webp", 4000, 4000, "CH370 form study"],
      ["08.CXPQOrOX_2a2zEq.webp", 1920, 1080, "CH370 in white"],
    ],
  },
  {
    slug: "fx-alpha",
    title: "DeepCool\nFX Alpha",
    category: "Product Design",
    intro: "Cooling, sculpted from aluminum.",
    heroFile: "cover.CQh5qE9R_22O4lB.webp",
    gallery: [
      ["573431_FX-Alpha_5.Co1R4CC4_1fWOev.webp", 4400, 3300, "Anodized aluminum and a curved wrap-around shell"],
      ["573431_FX-Alpha_2.WNeqwy8k_Z1oyifB.webp", 4400, 3300, "A flexible PCB threads light evenly along the chamfered edge"],
      ["573431_FX-Alpha_8.Bt51Kzkm_jBAhF.webp", 3300, 4400, "FX Alpha detail"],
      ["573431_FX-Alpha_3.BNmqroX4_Z1RcgbY.webp", 4400, 3300, "FX Alpha form"],
      ["573431_FX-Alpha_4.D0EvbiCu_Z1sB82x.webp", 4400, 3300, "FX Alpha material study"],
      ["573431_FX-Alpha_7.D-MvTMGE_Z1CYH1S.webp", 4400, 3300, "In context — the metal does the talking"],
    ],
  },
  {
    slug: "lt720",
    title: "DeepCool\nLT720",
    category: "Industrial Design",
    intro: "A liquid cooler that doesn’t hide.",
    heroFile: "cover.MgSP7eI__mkkWd.webp",
    gallery: [
      ["573408_LT720_01.CSjfyV6n_2tyQCi.webp", 5120, 2880, "The full system — radiator, three fans, and the angular pump head"],
      ["573408_LT720_04.BFWAa-Pj_1aFgGv.webp", 5120, 2880, "The DeepCool mark, lit through a corner of the cap"],
      ["573408_LT720_06.CsJNxnlD_1RGfwW.webp", 3300, 4400, "LT720 detail"],
      ["573408_LT720_03.DGRdtnSj_1vkdFA.webp", 4400, 3300, "LT720 pump head"],
      ["573408_LT720_05.Bdt49syC_MA26s.webp", 4400, 3300, "LT720 material study"],
      ["573408_LT720_08.koKGKgsM_2snVTi.webp", 5120, 2880, "The white finish, mirror lit"],
      ["573408_LT720_07.DffUFh3H_ihd80.webp", 5120, 2880, "LT720, in context"],
    ],
  },
  {
    slug: "transporter",
    title: "The Transporter",
    category: "Product Design",
    intro: "Replacing the courier — gently.",
    heroFile: "cover.CbOfUB-e_Z1ftTv4.webp",
    gallery: [
      ["8.aNRDJIjD_Z1j5RJk.webp", 1920, 1080, "A pair on the production floor — same chassis, swappable cargo box."],
      ["2.BnzFVscy_ZusAyA.webp", 1920, 1080, "Current vs. autonomous-vehicle market structure."],
      ["6.CMU94NIP_6Kcii.webp", 1920, 1080, "Top-down view — distributed drive, sensing, and compute around the perimeter."],
      ["9.nrlv7Y4W_Z1aIWSy.webp", 2560, 1440, "Transporter system detail"],
      ["10.D2n_SMJB_ZmHCUy.webp", 2560, 1440, "The cargo body lifts cleanly off the chassis."],
      ["7.B18kla2a_Z1lVMAL.webp", 1920, 1080, "Each drawer holds one order."],
      ["11.CbS_Q-7R_CESaJ.webp", 1920, 1080, "Transporter detail"],
      ["12.Cbf30yoR_2hRKVT.webp", 1920, 1080, "Transporter in context"],
      ["13.C1LhsGOv_1PBR7h.webp", 1920, 1080, "On the curb — quiet enough to disappear into the street."],
    ],
  },
  {
    slug: "hermes",
    title: "HERMES",
    category: "Concept Design",
    intro: "Mixed reality. Your world is the canvas.",
    heroFile: "cover.C2qrv5lb_Z27hjkE.webp",
    gallery: [
      ["1.CH2tl8N-_ZU7bYI.webp", 1918, 1081, "Light catches the lens — the rest disappears."],
      ["5.D1XHRjUc_2hGQI2.webp", 1920, 1080, "HERMES concept detail"],
      ["18.DuokIx6e_1Sv8wX.webp", 1920, 1080, "HERMES interaction"],
      ["7.DNSONR-f_285kBx.webp", 1920, 1080, "HERMES product study"],
      ["6.frhrJVb0_Z1Nt0PD.webp", 1920, 1080, "HERMES material study"],
      ["8.D0AN0TKV_o8AAB.webp", 1920, 1080, "HERMES detail"],
      ["11.n-epQOmr_ZI4k1T.webp", 1920, 1080, "HERMES environment"],
      ["12.BCFivC2Z_27PHVB.webp", 1920, 1080, "HERMES study"],
      ["9.CL-dkt3L_Zgd9VB.webp", 1920, 1080, "HERMES field of view"],
      ["17.CUDrrJWI_xAaec.webp", 1920, 1080, "Worn — and quickly forgotten."],
    ],
  },
  {
    slug: "edu-chair",
    title: "BCU Edu Chair",
    category: "Product Design",
    intro: "A chair built for the discussion classroom.",
    heroFile: "cover.Cr4oD9qN_SNznb.webp",
    gallery: [
      ["11.DZoz3C_m_Z19Lnms.webp", 1920, 1080, "In a sunlit corner of the brief — the chair the school asked us to make."],
      ["4.D8YZnCdi_Z13HnAk.webp", 1920, 1080, "Workshop with the team — cardboard, foam, and a tape measure before any pixel was rendered."],
      ["5.V92VTs0__7zMQj.webp", 1920, 1080, "Edu Chair prototype one"],
      ["6.GanSQHoW_20PrzY.webp", 2560, 1380, "Edu Chair prototype two"],
      ["7.DbcvfNes_6ClBv.webp", 1301, 576, "Edu Chair prototype three"],
      ["8.Ck5p439W_7kKAU.webp", 1920, 1080, "Edu Chair detail"],
      ["12.C41XGXzl_Z2dpSsf.webp", 1920, 1080, "In use — the discussion classroom it was made for."],
    ],
    carousel: {
      type: "fade",
      slides: [
        ["5.V92VTs0__7zMQj.webp", 1920, 1080, "Edu Chair prototype one"],
        ["6.GanSQHoW_20PrzY.webp", 2560, 1380, "Edu Chair prototype two"],
        ["7.DbcvfNes_6ClBv.webp", 1301, 576, "Edu Chair prototype three"],
      ],
    },
  },
  {
    slug: "atem",
    title: "ATEM Modular Kit",
    category: "Concept Design",
    intro: "Broadcast hardware, walking onto a creator’s desk.",
    heroFile: "cover.DQen4xt4_1sNjG3.webp",
    gallery: [
      ["1.DzmBb_tN_1D66Lx.webp", 2558, 1440, "Switcher and modules — the kit, fanned out."],
      ["2.3FZRHs-o_1uG27d.webp", 1920, 1080, "Where the kit sits in the ATEM line."],
      ["4.SvYifAcM_Z1VaTgM.webp", 1920, 1080, "Twelve modules wired through a shared bus on the back."],
      ["6.d9JgT7-u_1RLIjm.webp", 1610, 1080, "On a wood desk — quiet enough to live there."],
      ["5.BowmMLUT_MGIk3.webp", 1920, 820, "ATEM Modular Kit detail"],
      ["8.DXGQH4Nw_Z1owYLa.webp", 1920, 1000, "ATEM Modular Kit in context"],
      ["7.BoKb-aQ2_Z1EuBTi.webp", 1920, 1000, "Off the desk — into the location crew's flightcase."],
    ],
  },
];

function slideFromTuple(slug, [file, width, height, alt]) {
  return {
    src: `/assets/photos/boyang/projects/${slug}/${file}`,
    width,
    height,
    alt,
  };
}

const rawBySlug = new Map(rawProjects.map((project) => [project.slug, project]));

export const projectPages = rawProjects.map((project) => ({
  ...project,
  heroImage: `/assets/photos/boyang/projects/${project.slug}/${project.heroFile}`,
  gallery: project.gallery.map((slide) => slideFromTuple(project.slug, slide)),
  carousel: project.carousel
    ? {
        ...project.carousel,
        slides: project.carousel.slides.map((slide) => slideFromTuple(project.slug, slide)),
      }
    : undefined,
  next: {
    slug: projectOrder[(projectOrder.indexOf(project.slug) + 1) % projectOrder.length],
    title: rawBySlug.get(projectOrder[(projectOrder.indexOf(project.slug) + 1) % projectOrder.length]).title,
  },
}));

const projectBySlug = new Map(projectPages.map((project) => [project.slug, project]));

export function getProjectPage(slug) {
  const project = projectBySlug.get(slug);
  if (!project) throw new Error(`Unknown project: ${slug}`);
  return project;
}

export function getProjectSlugs() {
  return [...projectOrder];
}
