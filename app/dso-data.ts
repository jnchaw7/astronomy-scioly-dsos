import { dsoPdfImages, type DsoPdfImage } from './dso-pdf-data';

const originalDsoImages: DsoPdfImage[] = [
  {
    "id": "andromeda-galaxy-01",
    "name": "Andromeda Galaxy",
    "aliases": [
      "M31",
      "Andromeda"
    ],
    "image": "/dso-bank/andromeda-galaxy-01.webp",
    "band": "Visible",
    "difficulty": "Foundations",
    "context": "Andromeda Galaxy and its two satellite galaxies. Messier 32 above and Messier 110 below."
  },
  {
    "id": "andromeda-galaxy-02",
    "name": "Andromeda Galaxy",
    "aliases": [
      "M31",
      "Andromeda"
    ],
    "image": "/dso-bank/andromeda-galaxy-02.webp",
    "band": "Visible",
    "difficulty": "Foundations",
    "context": "Andromeda Galaxy, with enhancement of H-alpha to highlight its star-forming regions The Andromeda Galaxy (Messier 31). The small Messier 32 galaxy is seen above and slightly to the left (directly south) of the centre of M31, and Messier 110"
  },
  {
    "id": "andromeda-galaxy-03",
    "name": "Andromeda Galaxy",
    "aliases": [
      "M31",
      "Andromeda"
    ],
    "image": "/dso-bank/andromeda-galaxy-03.webp",
    "band": "Infrared",
    "difficulty": "Core",
    "context": "Spitzer's 24-micron mosaic is the sharpest image ever taken of the dust in another spiral galaxy, IR"
  },
  {
    "id": "andromeda-galaxy-04",
    "name": "Andromeda Galaxy",
    "aliases": [
      "M31",
      "Andromeda"
    ],
    "image": "/dso-bank/andromeda-galaxy-04.webp",
    "band": "X-ray",
    "difficulty": "Core",
    "context": "NASA's Nuclear Spectroscope Telescope Array, or NuSTAR, has imaged a swath of the Andromeda galaxy; NuSTAR's view (inset) shows high-energy X-rays coming mostly from X-ray binaries, which are pairs of stars in which one \"dead\" member feeds "
  },
  {
    "id": "andromeda-galaxy-05",
    "name": "Andromeda Galaxy",
    "aliases": [
      "M31",
      "Andromeda"
    ],
    "image": "/dso-bank/andromeda-galaxy-05.webp",
    "band": "Multiwavelength",
    "difficulty": "Invitational",
    "context": "HST mosaic of 414 photographs of the Andromeda galaxy (M31). The vast panorama was assembled from nearly 8,000 separate exposures taken in near-ultraviolet, visible, and near-infrared light. Embedded within this view are 2,753 star clusters"
  },
  {
    "id": "andromeda-galaxy-06",
    "name": "Andromeda Galaxy",
    "aliases": [
      "M31",
      "Andromeda"
    ],
    "image": "/dso-bank/andromeda-galaxy-06.webp",
    "band": "Multiwavelength",
    "difficulty": "Invitational",
    "context": "(Credit: X-ray: NASA/CXO/UMass/Z. Li & Q.D. Wang, ESA/XMM-Newton; Infrared: NASA/JPL-Caltech/WISE, Spitzer, NASA/JPL-Caltech/K. Gordon (U. Az), ESA/Herschel, ESA/Planck, NASA/IRAS, NASA/COBE; Radio: NSF/GBT/WSRT/IRAM/C. Clark (STScI); Ultra"
  },
  {
    "id": "andromeda-galaxy-07",
    "name": "Andromeda Galaxy",
    "aliases": [
      "M31",
      "Andromeda"
    ],
    "image": "/dso-bank/andromeda-galaxy-07.webp",
    "band": "Visible",
    "difficulty": "Nationals",
    "context": "WISE (IR), highlights dust that speckles the Andromeda galaxy's spiral arms"
  },
  {
    "id": "andromeda-galaxy-08",
    "name": "Andromeda Galaxy",
    "aliases": [
      "M31",
      "Andromeda"
    ],
    "image": "/dso-bank/andromeda-galaxy-08.webp",
    "band": "Visible",
    "difficulty": "Nationals",
    "context": "WISE (IR), highlights the Andromeda galaxy's older stellar population in blue"
  },
  {
    "id": "sombrero-galaxy-01",
    "name": "Sombrero Galaxy",
    "aliases": [
      "M104",
      "NGC 4594",
      "Sombrero"
    ],
    "image": "/dso-bank/sombrero-galaxy-01.webp",
    "band": "Infrared",
    "difficulty": "Foundations",
    "context": "HST JWST > MIRI (Mid-IR), resolving the clumpy nature of dust along galaxy’s outer ring"
  },
  {
    "id": "sombrero-galaxy-02",
    "name": "Sombrero Galaxy",
    "aliases": [
      "M104",
      "NGC 4594",
      "Sombrero"
    ],
    "image": "/dso-bank/sombrero-galaxy-02.webp",
    "band": "Infrared",
    "difficulty": "Foundations",
    "context": "HST JWST > MIRI (Mid-IR), resolving the clumpy nature of dust along galaxy’s outer ring"
  },
  {
    "id": "sombrero-galaxy-03",
    "name": "Sombrero Galaxy",
    "aliases": [
      "M104",
      "NGC 4594",
      "Sombrero"
    ],
    "image": "/dso-bank/sombrero-galaxy-03.webp",
    "band": "Infrared",
    "difficulty": "Core",
    "context": "JWST > NIRCam (Near-IR), shows dust from galaxy’s outer ring blocking stellar light from stars within the galaxy. In the central region of the galaxy, the roughly 2,000 globular clusters, or collections of hundreds of thousands of old stars"
  },
  {
    "id": "sombrero-galaxy-04",
    "name": "Sombrero Galaxy",
    "aliases": [
      "M104",
      "NGC 4594",
      "Sombrero"
    ],
    "image": "/dso-bank/sombrero-galaxy-04.webp",
    "band": "Infrared",
    "difficulty": "Core",
    "context": "Spitzer, IR Víctor M. Blanco Telescope, Chile, showing the galaxy's enormous glowing halo"
  },
  {
    "id": "sombrero-galaxy-05",
    "name": "Sombrero Galaxy",
    "aliases": [
      "M104",
      "NGC 4594",
      "Sombrero"
    ],
    "image": "/dso-bank/sombrero-galaxy-05.webp",
    "band": "Infrared",
    "difficulty": "Invitational",
    "context": "Spitzer, IR Víctor M. Blanco Telescope, Chile, showing the galaxy's enormous glowing halo"
  },
  {
    "id": "sombrero-galaxy-06",
    "name": "Sombrero Galaxy",
    "aliases": [
      "M104",
      "NGC 4594",
      "Sombrero"
    ],
    "image": "/dso-bank/sombrero-galaxy-06.webp",
    "band": "Visible",
    "difficulty": "Invitational",
    "context": "HST"
  },
  {
    "id": "sombrero-galaxy-07",
    "name": "Sombrero Galaxy",
    "aliases": [
      "M104",
      "NGC 4594",
      "Sombrero"
    ],
    "image": "/dso-bank/sombrero-galaxy-07.webp",
    "band": "Multiwavelength",
    "difficulty": "Nationals",
    "context": "The main figure shows the combined image from the three telescopes, while the inset images show the separate observatory views. Chandra’s X-ray image (in blue) shows hot gas in the galaxy and point sources that are a mixture of objects with"
  },
  {
    "id": "sombrero-galaxy-08",
    "name": "Sombrero Galaxy",
    "aliases": [
      "M104",
      "NGC 4594",
      "Sombrero"
    ],
    "image": "/dso-bank/sombrero-galaxy-08.webp",
    "band": "Multiwavelength",
    "difficulty": "Nationals",
    "context": "HST/Spitzer (IR) composite; Spitzer picture is composed of four images taken at 3.6 (blue), 4.5 (green), 5.8 (orange), and 8.0 (red) microns. The contribution from starlight (measured at 3.6 microns) has been subtracted from the 5.8 and 8-m"
  },
  {
    "id": "m51-01",
    "name": "M51",
    "aliases": [
      "Whirlpool Galaxy",
      "NGC 5194",
      "M51"
    ],
    "image": "/dso-bank/m51-01.webp",
    "band": "Visible",
    "difficulty": "Foundations",
    "context": "The Whirlpool Galaxy (Spiral Galaxy M51, NGC 5194) and its companion NGC 5195, HST"
  },
  {
    "id": "m51-02",
    "name": "M51",
    "aliases": [
      "Whirlpool Galaxy",
      "NGC 5194",
      "M51"
    ],
    "image": "/dso-bank/m51-02.webp",
    "band": "Visible",
    "difficulty": "Foundations",
    "context": "Sketch made by Lord Rosse (William Parsons, 3rd Earl of Rosse) of the Whirlpool Galaxy in 1845"
  },
  {
    "id": "m51-03",
    "name": "M51",
    "aliases": [
      "Whirlpool Galaxy",
      "NGC 5194",
      "M51"
    ],
    "image": "/dso-bank/m51-03.webp",
    "band": "Infrared",
    "difficulty": "Core",
    "context": "Spitzer, a) 0.4 and 0.7 μm; b) vis-blue/green and IR-red; c) 3.6, 4.5, and 8 μm; d) 24 μm"
  },
  {
    "id": "m51-04",
    "name": "M51",
    "aliases": [
      "Whirlpool Galaxy",
      "NGC 5194",
      "M51"
    ],
    "image": "/dso-bank/m51-04.webp",
    "band": "Infrared",
    "difficulty": "Core",
    "context": "JWST > MIRI, galactic center"
  },
  {
    "id": "m51-05",
    "name": "M51",
    "aliases": [
      "Whirlpool Galaxy",
      "NGC 5194",
      "M51"
    ],
    "image": "/dso-bank/m51-05.webp",
    "band": "Visible",
    "difficulty": "Invitational",
    "context": "HST, 1992, M51’s active galactic nucleus"
  },
  {
    "id": "m51-06",
    "name": "M51",
    "aliases": [
      "Whirlpool Galaxy",
      "NGC 5194",
      "M51"
    ],
    "image": "/dso-bank/m51-06.webp",
    "band": "X-ray",
    "difficulty": "Invitational",
    "context": "One of nearest supermassive black holes to Earth is currently undergoing powerful outbursts, X-ray data (Chandra)"
  },
  {
    "id": "m51-07",
    "name": "M51",
    "aliases": [
      "Whirlpool Galaxy",
      "NGC 5194",
      "M51"
    ],
    "image": "/dso-bank/m51-07.webp",
    "band": "X-ray",
    "difficulty": "Nationals",
    "context": "One of nearest supermassive black holes to Earth is currently undergoing powerful outbursts, X-ray data (Chandra)"
  },
  {
    "id": "ngc-4536-01",
    "name": "NGC 4536",
    "aliases": [
      "NGC 4536"
    ],
    "image": "/dso-bank/ngc-4536-01.webp",
    "band": "Visible",
    "difficulty": "Foundations",
    "context": "Mount Lemmon SkyCenter, Arizona"
  },
  {
    "id": "ngc-4536-02",
    "name": "NGC 4536",
    "aliases": [
      "NGC 4536"
    ],
    "image": "/dso-bank/ngc-4536-02.webp",
    "band": "Visible",
    "difficulty": "Foundations",
    "context": "Extreme rapid star formation, HST > WFC3 Sloan Digital Sky Survey (SDSS)"
  },
  {
    "id": "ngc-4536-03",
    "name": "NGC 4536",
    "aliases": [
      "NGC 4536"
    ],
    "image": "/dso-bank/ngc-4536-03.webp",
    "band": "Visible",
    "difficulty": "Core",
    "context": "Extreme rapid star formation, HST > WFC3 Sloan Digital Sky Survey (SDSS)"
  },
  {
    "id": "ngc-4536-04",
    "name": "NGC 4536",
    "aliases": [
      "NGC 4536"
    ],
    "image": "/dso-bank/ngc-4536-04.webp",
    "band": "Infrared",
    "difficulty": "Core",
    "context": "Spitzer (IR) GALEX (UV)"
  },
  {
    "id": "ngc-4536-05",
    "name": "NGC 4536",
    "aliases": [
      "NGC 4536"
    ],
    "image": "/dso-bank/ngc-4536-05.webp",
    "band": "Infrared",
    "difficulty": "Invitational",
    "context": "Spitzer (IR) GALEX (UV)"
  },
  {
    "id": "ngc-4536-06",
    "name": "NGC 4536",
    "aliases": [
      "NGC 4536"
    ],
    "image": "/dso-bank/ngc-4536-06.webp",
    "band": "Visible",
    "difficulty": "Invitational",
    "context": "HST"
  },
  {
    "id": "ngc-4536-07",
    "name": "NGC 4536",
    "aliases": [
      "NGC 4536"
    ],
    "image": "/dso-bank/ngc-4536-07.webp",
    "band": "Visible",
    "difficulty": "Nationals",
    "context": "HST"
  },
  {
    "id": "ngc-4536-08",
    "name": "NGC 4536",
    "aliases": [
      "NGC 4536"
    ],
    "image": "/dso-bank/ngc-4536-08.webp",
    "band": "Visible",
    "difficulty": "Nationals",
    "context": "NGC 4536"
  },
  {
    "id": "mcg-07-33-027-01",
    "name": "MCG+07-33-027",
    "aliases": [
      "MCG+07-33-027",
      "MCG 07-33-027"
    ],
    "image": "/dso-bank/mcg-07-33-027-01.webp",
    "band": "Visible",
    "difficulty": "Foundations",
    "context": "HST HST > ACS (bright object to right of the galaxy is foreground star in our galaxy)"
  },
  {
    "id": "mcg-07-33-027-02",
    "name": "MCG+07-33-027",
    "aliases": [
      "MCG+07-33-027",
      "MCG 07-33-027"
    ],
    "image": "/dso-bank/mcg-07-33-027-02.webp",
    "band": "Visible",
    "difficulty": "Foundations",
    "context": "HST HST > ACS (bright object to right of the galaxy is foreground star in our galaxy)"
  },
  {
    "id": "ngc-1569-01",
    "name": "NGC 1569",
    "aliases": [
      "NGC 1569"
    ],
    "image": "/dso-bank/ngc-1569-01.webp",
    "band": "Visible",
    "difficulty": "Foundations",
    "context": "HST>ACS/WFC and HST>WFPC2, Core"
  },
  {
    "id": "ngc-1569-02",
    "name": "NGC 1569",
    "aliases": [
      "NGC 1569"
    ],
    "image": "/dso-bank/ngc-1569-02.webp",
    "band": "Visible",
    "difficulty": "Foundations",
    "context": "Center of NGC 1569 as imaged by HST. At center left the two super star clusters NGC 1569 A1 and NGC 1569 A2 are visible."
  },
  {
    "id": "ngc-1569-03",
    "name": "NGC 1569",
    "aliases": [
      "NGC 1569"
    ],
    "image": "/dso-bank/ngc-1569-03.webp",
    "band": "Visible",
    "difficulty": "Core",
    "context": "Deep ground-based image of NGC 1569 showing the filamentary outflow of hydrogen gas, Mount Lemmon SkyCenter, AZ"
  },
  {
    "id": "ngc-1569-04",
    "name": "NGC 1569",
    "aliases": [
      "NGC 1569"
    ],
    "image": "/dso-bank/ngc-1569-04.webp",
    "band": "Visible",
    "difficulty": "Core",
    "context": "Interior of one of the most active galaxies in our local neighbourhood — NGC 1569, HST>ACS"
  },
  {
    "id": "ngc-1569-05",
    "name": "NGC 1569",
    "aliases": [
      "NGC 1569"
    ],
    "image": "/dso-bank/ngc-1569-05.webp",
    "band": "Visible",
    "difficulty": "Invitational",
    "context": "Heavy elements, shows large hot bubbles, or lobes"
  },
  {
    "id": "ngc-1569-06",
    "name": "NGC 1569",
    "aliases": [
      "NGC 1569"
    ],
    "image": "/dso-bank/ngc-1569-06.webp",
    "band": "Visible",
    "difficulty": "Invitational",
    "context": "Heavy elements, shows large hot bubbles, or lobes"
  },
  {
    "id": "ngc-1569-07",
    "name": "NGC 1569",
    "aliases": [
      "NGC 1569"
    ],
    "image": "/dso-bank/ngc-1569-07.webp",
    "band": "Multiwavelength",
    "difficulty": "Nationals",
    "context": "This image illustrates the relationship between starlight, warm, and hot gas in the dwarf galaxy NGC 1569, which is undergoing a burst of star formation. The green color shows X-rays from multimillion degree Celsius gas heated by shock wave"
  },
  {
    "id": "antennae-galaxies-01",
    "name": "Antennae Galaxies",
    "aliases": [
      "Antennae",
      "NGC 4038",
      "NGC 4039"
    ],
    "image": "/dso-bank/antennae-galaxies-01.webp",
    "band": "Visible",
    "difficulty": "Foundations",
    "context": "HST > WFC3, ACS; Visible, NIR"
  },
  {
    "id": "antennae-galaxies-02",
    "name": "Antennae Galaxies",
    "aliases": [
      "Antennae",
      "NGC 4038",
      "NGC 4039"
    ],
    "image": "/dso-bank/antennae-galaxies-02.webp",
    "band": "Multiwavelength",
    "difficulty": "Foundations",
    "context": "Composite, newly formed stars - HST (blue; visible), clouds of dense cold gas from which new stars form - ALMA (red, pink, yellow; radio)"
  },
  {
    "id": "antennae-galaxies-03",
    "name": "Antennae Galaxies",
    "aliases": [
      "Antennae",
      "NGC 4038",
      "NGC 4039"
    ],
    "image": "/dso-bank/antennae-galaxies-03.webp",
    "band": "Visible",
    "difficulty": "Core",
    "context": "Streams of stars and dust, resembling insect antennae, being ejected from both galaxies; ground-based image"
  },
  {
    "id": "antennae-galaxies-04",
    "name": "Antennae Galaxies",
    "aliases": [
      "Antennae",
      "NGC 4038",
      "NGC 4039"
    ],
    "image": "/dso-bank/antennae-galaxies-04.webp",
    "band": "Visible",
    "difficulty": "Core",
    "context": "NGC 4038/9: Antennangalaxien in Corvus; 400 mm Keller Hypergraph f=3200 mm; SBIG STL-11000M/C2 + AO-L; L 39×10 min; R 5×5 min; G 18×5 min; B 14×5 min; -25 °C; Tivoli Southern Sky Guest Farm, Namibia"
  },
  {
    "id": "antennae-galaxies-05",
    "name": "Antennae Galaxies",
    "aliases": [
      "Antennae",
      "NGC 4038",
      "NGC 4039"
    ],
    "image": "/dso-bank/antennae-galaxies-05.webp",
    "band": "Visible",
    "difficulty": "Invitational",
    "context": "NGC 4038/9: Detail of the two core regions with the 4m AAT; © 1991 David Malin"
  },
  {
    "id": "antennae-galaxies-06",
    "name": "Antennae Galaxies",
    "aliases": [
      "Antennae",
      "NGC 4038",
      "NGC 4039"
    ],
    "image": "/dso-bank/antennae-galaxies-06.webp",
    "band": "Visible",
    "difficulty": "Invitational",
    "context": "Taken with one of the NOAO telescopes from the ground"
  },
  {
    "id": "antennae-galaxies-07",
    "name": "Antennae Galaxies",
    "aliases": [
      "Antennae",
      "NGC 4038",
      "NGC 4039"
    ],
    "image": "/dso-bank/antennae-galaxies-07.webp",
    "band": "Multiwavelength",
    "difficulty": "Nationals",
    "context": "Composite X-ray (Chandra) IR (Spitzer)"
  },
  {
    "id": "antennae-galaxies-08",
    "name": "Antennae Galaxies",
    "aliases": [
      "Antennae",
      "NGC 4038",
      "NGC 4039"
    ],
    "image": "/dso-bank/antennae-galaxies-08.webp",
    "band": "Visible",
    "difficulty": "Nationals",
    "context": "Optical (HST)"
  },
  {
    "id": "antennae-galaxies-09",
    "name": "Antennae Galaxies",
    "aliases": [
      "Antennae",
      "NGC 4038",
      "NGC 4039"
    ],
    "image": "/dso-bank/antennae-galaxies-09.webp",
    "band": "Visible",
    "difficulty": "MIT-style",
    "context": "Close-up views of the cores of each galaxy show entrapped dust and gas funneled into the center. The nucleus of NGC 4038 (lower right) is obscured by dust which dims and reddens starlight by scattering the shorter, bluer wavelengths (HST)"
  },
  {
    "id": "arp-143-01",
    "name": "Arp 143",
    "aliases": [
      "Arp 143",
      "NGC 2444",
      "NGC 2445"
    ],
    "image": "/dso-bank/arp-143-01.webp",
    "band": "Visible",
    "difficulty": "Foundations",
    "context": "NGC 2444 on left, NGC 2445 on right, HST > ACS/WFC and WFC3/UVIS"
  },
  {
    "id": "arp-143-02",
    "name": "Arp 143",
    "aliases": [
      "Arp 143",
      "NGC 2444",
      "NGC 2445"
    ],
    "image": "/dso-bank/arp-143-02.webp",
    "band": "Visible",
    "difficulty": "Foundations",
    "context": "NGC 2444 on left, NGC 2445 on right, HST > ACS/WFC and WFC3/UVIS"
  },
  {
    "id": "arp-143-03",
    "name": "Arp 143",
    "aliases": [
      "Arp 143",
      "NGC 2444",
      "NGC 2445"
    ],
    "image": "/dso-bank/arp-143-03.webp",
    "band": "Visible",
    "difficulty": "Core",
    "context": "Each HII region within NGC 2445 has its own designation. Use this photo to help you spot them. 2445 measures ~1.5′ across; 2444 is just ~45″. Locator map at right with stars to magnitude +8 with Arp 143's celestial coordinates given. North "
  },
  {
    "id": "arp-143-04",
    "name": "Arp 143",
    "aliases": [
      "Arp 143",
      "NGC 2444",
      "NGC 2445"
    ],
    "image": "/dso-bank/arp-143-04.webp",
    "band": "Visible",
    "difficulty": "Core",
    "context": "Each HII region within NGC 2445 has its own designation. Use this photo to help you spot them. 2445 measures ~1.5′ across; 2444 is just ~45″. Locator map at right with stars to magnitude +8 with Arp 143's celestial coordinates given. North "
  },
  {
    "id": "arp-143-05",
    "name": "Arp 143",
    "aliases": [
      "Arp 143",
      "NGC 2444",
      "NGC 2445"
    ],
    "image": "/dso-bank/arp-143-05.webp",
    "band": "Visible",
    "difficulty": "Invitational",
    "context": "Each HII region within NGC 2445 has its own designation. Use this photo to help you spot them. 2445 measures ~1.5′ across; 2444 is just ~45″. Locator map at right with stars to magnitude +8 with Arp 143's celestial coordinates given. North "
  },
  {
    "id": "arp-147-01",
    "name": "Arp 147",
    "aliases": [
      "Arp 147"
    ],
    "image": "/dso-bank/arp-147-01.webp",
    "band": "Visible",
    "difficulty": "Foundations",
    "context": "HST > WFPC2, Visible and IR"
  },
  {
    "id": "arp-147-02",
    "name": "Arp 147",
    "aliases": [
      "Arp 147"
    ],
    "image": "/dso-bank/arp-147-02.webp",
    "band": "Multiwavelength",
    "difficulty": "Foundations",
    "context": "Composite X-ray (Chandra, pink) Optical (HST, red, green, blue)"
  },
  {
    "id": "arp-147-03",
    "name": "Arp 147",
    "aliases": [
      "Arp 147"
    ],
    "image": "/dso-bank/arp-147-03.webp",
    "band": "Multiwavelength",
    "difficulty": "Core",
    "context": "Composite X-ray (Chandra, pink) Optical (HST, red, green, blue)"
  },
  {
    "id": "arp-147-04",
    "name": "Arp 147",
    "aliases": [
      "Arp 147"
    ],
    "image": "/dso-bank/arp-147-04.webp",
    "band": "Multiwavelength",
    "difficulty": "Core",
    "context": "Composite X-ray (Chandra, pink) Optical (HST, red, green, blue)"
  },
  {
    "id": "arp-147-05",
    "name": "Arp 147",
    "aliases": [
      "Arp 147"
    ],
    "image": "/dso-bank/arp-147-05.webp",
    "band": "Multiwavelength",
    "difficulty": "Invitational",
    "context": "This composite image of Arp 147 shows Chandra X-ray data in pink, Hubble optical data in red, green and blue, ultraviolet GALEX data in green and infrared Spitzer data in red."
  },
  {
    "id": "arp-147-06",
    "name": "Arp 147",
    "aliases": [
      "Arp 147"
    ],
    "image": "/dso-bank/arp-147-06.webp",
    "band": "Infrared",
    "difficulty": "Invitational",
    "context": "GALEX Spitzer"
  },
  {
    "id": "arp-147-07",
    "name": "Arp 147",
    "aliases": [
      "Arp 147"
    ],
    "image": "/dso-bank/arp-147-07.webp",
    "band": "Infrared",
    "difficulty": "Nationals",
    "context": "GALEX Spitzer"
  },
  {
    "id": "arp-147-08",
    "name": "Arp 147",
    "aliases": [
      "Arp 147"
    ],
    "image": "/dso-bank/arp-147-08.webp",
    "band": "Infrared",
    "difficulty": "Nationals",
    "context": "GALEX Spitzer"
  },
  {
    "id": "arp-147-09",
    "name": "Arp 147",
    "aliases": [
      "Arp 147"
    ],
    "image": "/dso-bank/arp-147-09.webp",
    "band": "Infrared",
    "difficulty": "MIT-style",
    "context": "GALEX Spitzer"
  },
  {
    "id": "cartwheel-galaxy-01",
    "name": "Cartwheel Galaxy",
    "aliases": [
      "Cartwheel",
      "ESO 350-40"
    ],
    "image": "/dso-bank/cartwheel-galaxy-01.webp",
    "band": "Multiwavelength",
    "difficulty": "Foundations",
    "context": "Composite, JWST > NIRCam and MIRI JWST > MIRI"
  },
  {
    "id": "cartwheel-galaxy-02",
    "name": "Cartwheel Galaxy",
    "aliases": [
      "Cartwheel",
      "ESO 350-40"
    ],
    "image": "/dso-bank/cartwheel-galaxy-02.webp",
    "band": "Multiwavelength",
    "difficulty": "Foundations",
    "context": "Composite, JWST > NIRCam and MIRI JWST > MIRI"
  },
  {
    "id": "cartwheel-galaxy-03",
    "name": "Cartwheel Galaxy",
    "aliases": [
      "Cartwheel",
      "ESO 350-40"
    ],
    "image": "/dso-bank/cartwheel-galaxy-03.webp",
    "band": "Radio",
    "difficulty": "Core",
    "context": "Collage of images from ground-based optical and radio telescopes and HST > WFPC2"
  },
  {
    "id": "cartwheel-galaxy-04",
    "name": "Cartwheel Galaxy",
    "aliases": [
      "Cartwheel",
      "ESO 350-40"
    ],
    "image": "/dso-bank/cartwheel-galaxy-04.webp",
    "band": "Multiwavelength",
    "difficulty": "Core",
    "context": "The Cartwheel Galaxy in different light spectra (X-ray, UV, visible, and IR). The image combines data from four different space-based observatories: the Chandra (X-ray/purple), the Galaxy Evolution Explorer (UV/blue), HST (visible/green), a"
  },
  {
    "id": "cartwheel-galaxy-05",
    "name": "Cartwheel Galaxy",
    "aliases": [
      "Cartwheel",
      "ESO 350-40"
    ],
    "image": "/dso-bank/cartwheel-galaxy-05.webp",
    "band": "Multiwavelength",
    "difficulty": "Invitational",
    "context": "The Cartwheel Galaxy in different light spectra (X-ray, UV, visible, and IR). The image combines data from four different space-based observatories: the Chandra (X-ray/purple), the Galaxy Evolution Explorer (UV/blue), HST (visible/green), a"
  },
  {
    "id": "cartwheel-galaxy-06",
    "name": "Cartwheel Galaxy",
    "aliases": [
      "Cartwheel",
      "ESO 350-40"
    ],
    "image": "/dso-bank/cartwheel-galaxy-06.webp",
    "band": "Visible",
    "difficulty": "Invitational",
    "context": "HST, Visible MUSE (VLT), SN in lower left corner of image on the right"
  },
  {
    "id": "cartwheel-galaxy-07",
    "name": "Cartwheel Galaxy",
    "aliases": [
      "Cartwheel",
      "ESO 350-40"
    ],
    "image": "/dso-bank/cartwheel-galaxy-07.webp",
    "band": "Visible",
    "difficulty": "Nationals",
    "context": "HST, Visible MUSE (VLT), SN in lower left corner of image on the right"
  },
  {
    "id": "cartwheel-galaxy-08",
    "name": "Cartwheel Galaxy",
    "aliases": [
      "Cartwheel",
      "ESO 350-40"
    ],
    "image": "/dso-bank/cartwheel-galaxy-08.webp",
    "band": "Visible",
    "difficulty": "Nationals",
    "context": "Top Left Image - HST’s detailed view shows the knot-like structure of the ring, produced by large clusters of new star formation. HST also resolves effects of thousands of supernovae on the ring structure. One flurry of explosions blew a ho"
  },
  {
    "id": "cartwheel-galaxy-09",
    "name": "Cartwheel Galaxy",
    "aliases": [
      "Cartwheel",
      "ESO 350-40"
    ],
    "image": "/dso-bank/cartwheel-galaxy-09.webp",
    "band": "Visible",
    "difficulty": "MIT-style",
    "context": "HST - This close-up image of the galaxy's nucleus reveals the comet-like knots of gas. These knots are mostly confined to the core's left side and appear as white streaks inside the blue ring."
  },
  {
    "id": "cartwheel-galaxy-10",
    "name": "Cartwheel Galaxy",
    "aliases": [
      "Cartwheel",
      "ESO 350-40"
    ],
    "image": "/dso-bank/cartwheel-galaxy-10.webp",
    "band": "Visible",
    "difficulty": "MIT-style",
    "context": "HST - This close-up image of the galaxy's nucleus reveals the comet-like knots of gas. These knots are mostly confined to the core's left side and appear as white streaks inside the blue ring."
  },
  {
    "id": "m82-01",
    "name": "M82",
    "aliases": [
      "M82",
      "Cigar Galaxy"
    ],
    "image": "/dso-bank/m82-01.webp",
    "band": "Visible",
    "difficulty": "Foundations",
    "context": "M82, HST > ACS"
  },
  {
    "id": "m82-02",
    "name": "M82",
    "aliases": [
      "M82",
      "Cigar Galaxy"
    ],
    "image": "/dso-bank/m82-02.webp",
    "band": "Multiwavelength",
    "difficulty": "Foundations",
    "context": "M82 Magnetic field, visible starlight (gray) and a tracing of hydrogen gas (red) observed from the Kitt Peak Observatory, with near-infrared and mid-infrared starlight and dust (yellow) observed by SOFIA and the Spitzer Space Telescope"
  },
  {
    "id": "m82-03",
    "name": "M82",
    "aliases": [
      "M82",
      "Cigar Galaxy"
    ],
    "image": "/dso-bank/m82-03.webp",
    "band": "Multiwavelength",
    "difficulty": "Core",
    "context": "M82. Composite of Chandra (X-ray, blue), HST (visible, hydrogen emission appears in orange, and the bluest visible light appears in yellow-green) and Spitzer (IR, red) images."
  },
  {
    "id": "m82-04",
    "name": "M82",
    "aliases": [
      "M82",
      "Cigar Galaxy"
    ],
    "image": "/dso-bank/m82-04.webp",
    "band": "X-ray",
    "difficulty": "Core",
    "context": "M82, Chandra (X-ray), bright spots in the center are supernova remnants and X-ray binaries"
  },
  {
    "id": "m82-05",
    "name": "M82",
    "aliases": [
      "M82",
      "Cigar Galaxy"
    ],
    "image": "/dso-bank/m82-05.webp",
    "band": "Infrared",
    "difficulty": "Invitational",
    "context": "Center of M82, JWST > NIRCam Amateur photographer, 10\" Newtonian telescope, with a high emphasis on the Hydrogen-alpha starburst areas."
  },
  {
    "id": "m82-06",
    "name": "M82",
    "aliases": [
      "M82",
      "Cigar Galaxy"
    ],
    "image": "/dso-bank/m82-06.webp",
    "band": "Infrared",
    "difficulty": "Invitational",
    "context": "Center of M82, JWST > NIRCam Amateur photographer, 10\" Newtonian telescope, with a high emphasis on the Hydrogen-alpha starburst areas."
  },
  {
    "id": "m82-07",
    "name": "M82",
    "aliases": [
      "M82",
      "Cigar Galaxy"
    ],
    "image": "/dso-bank/m82-07.webp",
    "band": "Multiwavelength",
    "difficulty": "Nationals",
    "context": "M82’s core, image shows the light emitted by sulfur (in red), visible and ultraviolet light from oxygen (in green and blue, respectively), and light from hydrogen (in cyan), HST"
  },
  {
    "id": "m82-08",
    "name": "M82",
    "aliases": [
      "M82",
      "Cigar Galaxy"
    ],
    "image": "/dso-bank/m82-08.webp",
    "band": "Visible",
    "difficulty": "Nationals",
    "context": "M82’s center, home to brilliant stars whose light is shaded by sculptural clouds made of clumps and streaks of dust and gas. The image includes data from the High Resolution Channel of HST’s Advanced Camera for Surveys (ACS)."
  },
  {
    "id": "m82-09",
    "name": "M82",
    "aliases": [
      "M82",
      "Cigar Galaxy"
    ],
    "image": "/dso-bank/m82-09.webp",
    "band": "Visible",
    "difficulty": "MIT-style",
    "context": "Left: A portion of M82's bluish disk, largely composed of young, hot stars. Numerous bright blue-white star-forming clumps and wisps of darker, cooler dust and gas appear superimposed on the diskCenter: The central \"inner-city\" portion of t"
  },
  {
    "id": "m82-10",
    "name": "M82",
    "aliases": [
      "M82",
      "Cigar Galaxy"
    ],
    "image": "/dso-bank/m82-10.webp",
    "band": "Ultraviolet",
    "difficulty": "MIT-style",
    "context": "The spiral galaxies Messier 81 and 82 and the dwarf galaxy Holmberg IX from GALEX"
  },
  {
    "id": "m82-11",
    "name": "M82",
    "aliases": [
      "M82",
      "Cigar Galaxy"
    ],
    "image": "/dso-bank/m82-11.webp",
    "band": "Visible",
    "difficulty": "MIT-style",
    "context": "Messier 81 (left) and Messier 82 (right) in visible light"
  },
  {
    "id": "m82-12",
    "name": "M82",
    "aliases": [
      "M82",
      "Cigar Galaxy"
    ],
    "image": "/dso-bank/m82-12.webp",
    "band": "Infrared",
    "difficulty": "MIT-style",
    "context": "Spitzer, IR"
  },
  {
    "id": "m82-13",
    "name": "M82",
    "aliases": [
      "M82",
      "Cigar Galaxy"
    ],
    "image": "/dso-bank/m82-13.webp",
    "band": "Multiwavelength",
    "difficulty": "MIT-style",
    "context": "Chandra, Composite image of the active galaxy M82 from x-ray observations by Chandra X-Ray Observatory in three energy bands coded in red (lowest energy x-ray photons), green, and blue (highest energy)"
  },
  {
    "id": "m82-14",
    "name": "M82",
    "aliases": [
      "M82",
      "Cigar Galaxy"
    ],
    "image": "/dso-bank/m82-14.webp",
    "band": "Infrared",
    "difficulty": "MIT-style",
    "context": "JWST recently observed edge-on starburst galaxy M82. Webb’s near-infrared-light view is a snapshot in time, revealing a scene that has been evolving over a couple hundred million years. In near-infrared light, astronomers can see the galaxy"
  },
  {
    "id": "m82-15",
    "name": "M82",
    "aliases": [
      "M82",
      "Cigar Galaxy"
    ],
    "image": "/dso-bank/m82-15.webp",
    "band": "Infrared",
    "difficulty": "MIT-style",
    "context": "JWST recently observed edge-on starburst galaxy M82. Webb’s near-infrared-light view is a snapshot in time, revealing a scene that has been evolving over a couple hundred million years. In near-infrared light, astronomers can see the galaxy"
  },
  {
    "id": "gw170817-01",
    "name": "GW170817",
    "aliases": [
      "GW170817",
      "NGC 4993"
    ],
    "image": "/dso-bank/gw170817-01.webp",
    "band": "Visible",
    "difficulty": "Foundations",
    "context": "GW170817 spectrograms Artist concept - neutron star merger"
  },
  {
    "id": "gw170817-02",
    "name": "GW170817",
    "aliases": [
      "GW170817",
      "NGC 4993"
    ],
    "image": "/dso-bank/gw170817-02.webp",
    "band": "Visible",
    "difficulty": "Foundations",
    "context": "GW170817 spectrograms Artist concept - neutron star merger"
  },
  {
    "id": "gw170817-03",
    "name": "GW170817",
    "aliases": [
      "GW170817",
      "NGC 4993"
    ],
    "image": "/dso-bank/gw170817-03.webp",
    "band": "Visible",
    "difficulty": "Core",
    "context": "Hubble picture of NGC 4993 with inset showing GRB 170817A over 6 days"
  },
  {
    "id": "gw170817-04",
    "name": "GW170817",
    "aliases": [
      "GW170817",
      "NGC 4993"
    ],
    "image": "/dso-bank/gw170817-04.webp",
    "band": "Visible",
    "difficulty": "Core",
    "context": "Hubble picture of NGC 4993 with inset showing GRB 170817A over 6 days"
  },
  {
    "id": "gw170817-05",
    "name": "GW170817",
    "aliases": [
      "GW170817",
      "NGC 4993"
    ],
    "image": "/dso-bank/gw170817-05.webp",
    "band": "Visible",
    "difficulty": "Invitational",
    "context": "Hubble picture of NGC 4993 with inset showing GRB 170817A over 6 days"
  },
  {
    "id": "gw170817-06",
    "name": "GW170817",
    "aliases": [
      "GW170817",
      "NGC 4993"
    ],
    "image": "/dso-bank/gw170817-06.webp",
    "band": "Infrared",
    "difficulty": "Invitational",
    "context": "Light curves at various wavelengths of kilonova in NGC 4993 VLA - change in optical and near-infrared"
  },
  {
    "id": "gw170817-07",
    "name": "GW170817",
    "aliases": [
      "GW170817",
      "NGC 4993"
    ],
    "image": "/dso-bank/gw170817-07.webp",
    "band": "Infrared",
    "difficulty": "Nationals",
    "context": "Light curves at various wavelengths of kilonova in NGC 4993 VLA - change in optical and near-infrared"
  },
  {
    "id": "gw170817-08",
    "name": "GW170817",
    "aliases": [
      "GW170817",
      "NGC 4993"
    ],
    "image": "/dso-bank/gw170817-08.webp",
    "band": "Visible",
    "difficulty": "Nationals",
    "context": "Artist concept of strontium emerging from a neutron star merger Artist’s impression shows two tiny but very dense"
  },
  {
    "id": "gw170817-09",
    "name": "GW170817",
    "aliases": [
      "GW170817",
      "NGC 4993"
    ],
    "image": "/dso-bank/gw170817-09.webp",
    "band": "Visible",
    "difficulty": "MIT-style",
    "context": "Artist concept of strontium emerging from a neutron star merger Artist’s impression shows two tiny but very dense"
  },
  {
    "id": "gw170817-10",
    "name": "GW170817",
    "aliases": [
      "GW170817",
      "NGC 4993"
    ],
    "image": "/dso-bank/gw170817-10.webp",
    "band": "Visible",
    "difficulty": "MIT-style",
    "context": "An artist’s impression of a jet emanating from NGC 4993. Image credit: J.A. Biretta et al / NASA / ESA / Hubble Heritage Team / STScI / AURA / Sci.News."
  },
  {
    "id": "gw170817-11",
    "name": "GW170817",
    "aliases": [
      "GW170817",
      "NGC 4993"
    ],
    "image": "/dso-bank/gw170817-11.webp",
    "band": "Visible",
    "difficulty": "MIT-style",
    "context": "An artist’s impression of a jet emanating from NGC 4993. Image credit: J.A. Biretta et al / NASA / ESA / Hubble Heritage Team / STScI / AURA / Sci.News."
  },
  {
    "id": "terzan-5-01",
    "name": "Terzan 5",
    "aliases": [
      "Terzan 5"
    ],
    "image": "/dso-bank/terzan-5-01.webp",
    "band": "Infrared",
    "difficulty": "Foundations",
    "context": "JWST>NIRCam (IR), HST>ACS (optical)"
  },
  {
    "id": "terzan-5-02",
    "name": "Terzan 5",
    "aliases": [
      "Terzan 5"
    ],
    "image": "/dso-bank/terzan-5-02.webp",
    "band": "Visible",
    "difficulty": "Foundations",
    "context": "Panoramic view of the Milky Way (Credit: ESO/S. Brunier) with the location of the two Bulge Fossil Fragments discovered so far (Liller 1 and Terzan 5) highlighted. Credit: F. R. Ferraro / C. Pallanca (University of Bologna)"
  },
  {
    "id": "terzan-5-03",
    "name": "Terzan 5",
    "aliases": [
      "Terzan 5"
    ],
    "image": "/dso-bank/terzan-5-03.webp",
    "band": "Visible",
    "difficulty": "Core",
    "context": "This picture is from the Multi-Conjugate Adaptive Optics Demonstrator (MAD), a prototype adaptive optics system used to demonstrate the feasibility of different techniques in the framework of the E-ELT and the second generation VLT Instrume"
  },
  {
    "id": "terzan-5-04",
    "name": "Terzan 5",
    "aliases": [
      "Terzan 5"
    ],
    "image": "/dso-bank/terzan-5-04.webp",
    "band": "Infrared",
    "difficulty": "Core",
    "context": "HST>ACS, JWST> NIRCam JWST> NIRCam"
  },
  {
    "id": "terzan-5-05",
    "name": "Terzan 5",
    "aliases": [
      "Terzan 5"
    ],
    "image": "/dso-bank/terzan-5-05.webp",
    "band": "Infrared",
    "difficulty": "Invitational",
    "context": "HST>ACS, JWST> NIRCam JWST> NIRCam"
  },
  {
    "id": "terzan-5-06",
    "name": "Terzan 5",
    "aliases": [
      "Terzan 5"
    ],
    "image": "/dso-bank/terzan-5-06.webp",
    "band": "X-ray",
    "difficulty": "Invitational",
    "context": "In this new image of Terzan 5 (right), low, medium and high-energy X-rays detected by Chandra are colored red, green and blue respectively. On the left, an image from the HST shows the same field of view in optical light. Terzan 5 CX1 is la"
  },
  {
    "id": "terzan-5-07",
    "name": "Terzan 5",
    "aliases": [
      "Terzan 5"
    ],
    "image": "/dso-bank/terzan-5-07.webp",
    "band": "X-ray",
    "difficulty": "Nationals",
    "context": "Chandra, X-ray"
  },
  {
    "id": "terzan-5-08",
    "name": "Terzan 5",
    "aliases": [
      "Terzan 5"
    ],
    "image": "/dso-bank/terzan-5-08.webp",
    "band": "Visible",
    "difficulty": "Nationals",
    "context": "Visible light and the gamma-ray source HESS J1747 – 248, Namibia"
  },
  {
    "id": "terzan-5-09",
    "name": "Terzan 5",
    "aliases": [
      "Terzan 5"
    ],
    "image": "/dso-bank/terzan-5-09.webp",
    "band": "Infrared",
    "difficulty": "MIT-style",
    "context": "HST >WFC3, the Multi-conjugate Adaptive Optics Demonstrator (MAD) instrument on Very Large Telescope (VLT) and the second generation Near Infrared Camera at the Keck Telescope."
  },
  {
    "id": "terzan-5-10",
    "name": "Terzan 5",
    "aliases": [
      "Terzan 5"
    ],
    "image": "/dso-bank/terzan-5-10.webp",
    "band": "Infrared",
    "difficulty": "MIT-style",
    "context": "HST >WFC3, the Multi-conjugate Adaptive Optics Demonstrator (MAD) instrument on Very Large Telescope (VLT) and the second generation Near Infrared Camera at the Keck Telescope."
  }
] as DsoPdfImage[];

export const dsoImages: DsoPdfImage[] = [...originalDsoImages, ...dsoPdfImages].map((image) => ({
  ...image,
  context: /\bconstellations?\b/i.test(image.context) ? `Supplied ${image.band} view of ${image.name}.` : image.context,
}));
