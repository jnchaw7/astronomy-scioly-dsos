import { dsoIdAssets } from './dso-id-data';

export type FigureGuide = {
  look: string;
  remember: string;
  contextNeeded: boolean;
};

type GuideText = Omit<FigureGuide, 'contextNeeded'> & { contextNeeded?: boolean };

const guides = new Map<string, FigureGuide>();

function add(slug: string, numbers: string, text: GuideText) {
  for (const part of numbers.split(',')) {
    const [first, last] = part.split('-').map(Number);
    for (let number = first; number <= (last ?? first); number += 1) {
      const id = `${slug}-pdf-${String(number).padStart(3, '0')}`;
      guides.set(id, { ...text, contextNeeded: text.contextNeeded ?? false });
    }
  }
}

// These clues were written from the actual practice crops, not generated from
// the filename. A few scientific plots need their paper context to be useful;
// those are marked as such instead of promising a unique visual fingerprint.

add('andromeda-galaxy', '1,3,5,10-12,34', { look: 'Trace the very broad, tilted disk and its layered dark dust lanes. In wide views, check for two small fuzzy companions close to it.', remember: 'Andromeda (M31) is the large inclined Local Group spiral; M32 and M110 are its high-value companion clues.' });
add('andromeda-galaxy', '7,13', { look: 'This crop emphasizes the resolved stellar disk and dark lanes rather than the whole galaxy outline.', remember: 'A huge resolved mosaic with a bright bulge and dusty, inclined disk points to M31.' });
add('andromeda-galaxy', '8,14,17', { look: 'Look for nested bright rings in the longer-wavelength view: cool dust outlines structure that is less obvious in optical light.', remember: 'M31 has prominent dust rings in infrared/far-infrared maps; compare those rings with its smoother optical bulge.' });
add('andromeda-galaxy', '16', { look: 'The same tilted spiral is shown in radio, infrared, optical, ultraviolet, and X-ray panels. Compare which component brightens in each band.', remember: 'This multiwavelength strip is M31: cold gas/dust dominates long wavelengths, while the central region and compact sources stand out in X-rays.' });
add('andromeda-galaxy', '18,21-24', { look: 'Focus on the bright central region inside a much larger tilted disk; some panels isolate X-ray or infrared emission near the nucleus.', remember: 'M31 has a bright central bulge and X-ray-source-rich nucleus; these close-ups are not separate galaxies.' });
add('andromeda-galaxy', '19-20', { look: 'This view is of a small diffuse companion or satellite field, not the main spiral disk. Ask which nearby giant galaxy it orbits.', remember: 'The satellite context is M31: M32 and M110 are dwarf companions often shown beside or separately from Andromeda.' });
add('andromeda-galaxy', '25', { look: 'Read the x-axis: the observations are dated in 1885, while visual magnitude fades with time. This is a historical transient in a nearby spiral.', remember: 'S Andromedae (SN 1885A) was observed in M31. “1885” plus a fading visual light curve is the fast association.', contextNeeded: true });
add('andromeda-galaxy', '28-29', { look: 'The image is about the enormous halo or sky around a nearby galaxy rather than its familiar spiral disk. Background light can probe otherwise invisible halo gas.', remember: 'M31’s extended gaseous halo is studied with sightlines to background quasars; the halo is much larger than the bright disk.', contextNeeded: true });
add('andromeda-galaxy', '33', { look: 'A dense, nearly round star cluster appears as a compact glow with resolved stars rather than spiral arms.', remember: 'Mayall II (G1) is a massive globular cluster associated with M31. A cluster-only image needs this companion context.', contextNeeded: true });
add('andromeda-galaxy', '35-37', { look: 'Look for a smooth, diffuse dwarf elliptical instead of a spiral. Its association is with a giant Local Group neighbor.', remember: 'M32 and M110 are satellites of Andromeda; do not mistake a close-up of one for a new target galaxy.', contextNeeded: true });

add('sombrero-galaxy', '1-2,4,9', { look: 'Find the unusually bright round bulge cut by a thin, nearly edge-on dark dust lane—like a brim crossing the nucleus.', remember: 'The Sombrero (M104) is identified by the massive luminous bulge plus the sharply defined dust ring seen almost edge-on.' });
add('sombrero-galaxy', '3,5', { look: 'Compare the dominant central bulge with inset or composite views; the thin equatorial dust lane survives changes of wavelength.', remember: 'M104’s bulge-to-disk contrast and near-edge-on ring are stronger clues than image color.' });
add('sombrero-galaxy', '6-7', { look: 'This is a closer view of the narrow dust band or a wavelength composite, not a face-on spiral arm.', remember: 'In M104 the dust forms a ring through the broad bulge; infrared and X-ray views change what is visible but not the geometry.' });
add('sombrero-galaxy', '11-14', { look: 'The elongated ring or colored strip is a map of gas/dust across an edge-on disk; compare the bright center with the two outer sides.', remember: 'The Sombrero paper maps a hidden molecular-gas ring beneath its famous optical dust lane.', contextNeeded: true });
add('sombrero-galaxy', '15', { look: 'Read the stacked emission-line panels: CO, [C II], and H-alpha are being compared across different positions in a dusty ring.', remember: 'For M104, CO and [C II] help trace gas and star formation in the dust ring; the line grid is not a generic stellar spectrum.', contextNeeded: true });
add('sombrero-galaxy', '16', { look: 'This is a line-of-sight velocity plot with several gas tracers; the sloped curves show rotation across a nearly edge-on disk.', remember: 'M104’s molecular-gas ring can be recognized in velocity plots by its edge-on rotation and comparison of CO, [C II], and H-alpha.', contextNeeded: true });
add('sombrero-galaxy', '17,19-24', { look: 'Look at diagnostic axes such as [C II]/FIR, PAH, UV intensity, and line ratios. The colored points distinguish nucleus, ring, and other regions.', remember: 'These are Sombrero ring diagnostics: the central region and dusty outer ring do not have identical gas-heating or star-formation behavior.', contextNeeded: true });
add('sombrero-galaxy', '18', { look: 'The two broad spectral-energy curves separate nucleus and ring contributions across wavelength.', remember: 'M104’s nucleus and dust ring produce different parts of the observed spectral energy distribution.', contextNeeded: true });
add('sombrero-galaxy', '25', { look: 'Compare the V-band galaxy image to the nearly identical model below; a broad bulge surrounds a razor-thin midplane.', remember: 'This model of M104 reproduces the bright bulge and obscuring dust ring—its defining visual combination.' });

add('m51', '1-3', { look: 'The bright grand-design spiral has two strong arms and a smaller companion attached near the tip of one arm.', remember: 'M51/Whirlpool is the grand-design spiral interacting with NGC 5195; the companion-arm connection is the quickest ID.' });
add('m51', '4,6', { look: 'This is a nuclear X-ray view: seek the compact active center and curved structures around it rather than the full spiral.', remember: 'M51 has an active nucleus; Chandra images reveal X-ray arcs/outbursts near its central black hole.', contextNeeded: true });
add('m51', '7', { look: 'A before/after field comparison highlights a transient in one spiral arm.', remember: 'M51 has hosted several notable transients and supernovae; a small dated star-field comparison needs the spiral-host context.', contextNeeded: true });
add('m51', '10-11', { look: 'Follow the chain of bright blue star-forming knots embedded in reddish dusty gas along one grand-design arm.', remember: 'M51’s interaction compresses gas in its prominent spiral arms, leaving strings of clusters and nebulae.' });
add('m51', '12', { look: 'Compare the side-by-side ionized-gas and molecular-gas maps. The same curved arms appear in different tracers.', remember: 'This gas-morphology study follows how NGC 5195’s interaction shaped M51’s spiral arms.', contextNeeded: true });
add('m51', '13-14', { look: 'The horizontal axis is azimuthal angle, and the two arms are compared by their gas/velocity behavior.', remember: 'Azimuthal offsets between tracers in the northern and southern arms are a key M51 interaction/spiral-structure plot.', contextNeeded: true });
add('m51', '15', { look: 'The bars are counts of cloud or region categories labeled CR1–CR6; the two histograms compare gas structures.', remember: 'These cloud statistics belong to the M51 arm-kinematics study, not to a standalone galaxy image.', contextNeeded: true });
add('m51', '16-18', { look: 'Locate the bright two-armed spiral in the grayscale map and the colored cloud-region markers overlaid on its arms.', remember: 'M51’s gas clouds are mapped along its grand-design arms and around the companion-perturbed disk.' });
add('m51', '19', { look: 'A simulated top-down spiral disk is colored by gas-column density; the strongest pattern is a two-armed interaction.', remember: 'A gas simulation of M51 should be connected to NGC 5195’s tidal influence on the spiral pattern.', contextNeeded: true });

add('ngc-4536', '1-4', { look: 'Look for a tilted, open spiral with a small bright nucleus and patchy blue arms, but no obvious close interacting companion.', remember: 'NGC 4536 is a star-forming spiral; the Hubble close-up emphasizes its blue knots and dusty arm structure.' });
add('ngc-4536', '8', { look: 'A rectangular telescope footprint is laid across a galaxy field with selected stars; the paper is measuring distance indicators.', remember: 'NGC 4536 appears in JWST distance-scale work; the plotted footprints select stars for distance measurement.', contextNeeded: true });
add('ngc-4536', '9,12,14', { look: 'The dense cloud of points is a color–magnitude diagram; locate the red-giant branch and its sharp tip/edge.', remember: 'The tip of the red giant branch (TRGB) is used to estimate NGC 4536’s distance. A CMD by itself is not a unique galaxy fingerprint.', contextNeeded: true });
add('ngc-4536', '10', { look: 'The blue points make a period–luminosity relation: longer-period variables line up at a different magnitude.', remember: 'Cepheid period–luminosity data are another distance indicator used for NGC 4536.', contextNeeded: true });
add('ngc-4536', '11,15-17', { look: 'Follow the histogram, edge-response peak, or colored curves that locate a sharp break in red-giant brightness.', remember: 'These plots test where the TRGB break lies for NGC 4536; they are distance-calibration tools, not morphology clues.', contextNeeded: true });
add('ngc-4536', '13', { look: 'Different fitting lines overlay a color–magnitude diagram; the issue is how the red-giant tip is calibrated.', remember: 'The fitted TRGB relation contributes to NGC 4536 distance work.', contextNeeded: true });
add('ngc-4536', '18,20', { look: 'This paper compares distance-measurement fields or fitted luminosity functions across several galaxies; find the panel for the tilted star-forming spiral.', remember: 'NGC 4536 is one of the galaxies in this TRGB calibration comparison; the plot alone may not identify it.', contextNeeded: true });
add('ngc-4536', '22-23', { look: 'This old spectrum or marked galaxy field highlights a supernova rather than the spiral’s overall structure.', remember: 'NGC 4536 hosted Type Ia supernova SN 1981B, an important distance-scale object.', contextNeeded: true });

add('mcg-07-33-027', '1', { look: 'Look for a relatively isolated, nearly face-on spiral with a round bright center and faint, tightly wrapped outer arms.', remember: 'MCG+07-33-027 is the compact star-forming spiral in this packet; its bright core and subdued face-on arms are the image clues.' });
add('mcg-07-33-027', '2', { look: 'The large spiky star to the right is in the foreground—ignore it. Identify the softer spiral on the left.', remember: 'In this MCG+07-33-027 view, the bright right-hand point is a Milky Way foreground star, not a companion or galaxy nucleus.' });

add('ngc-1569', '1,3-4', { look: 'A small irregular body surrounds a brilliant starburst center; colored gas lobes or filaments extend away from the disk.', remember: 'NGC 1569 is a dwarf starburst with super-star clusters and feedback-driven outflow, not a regular spiral.' });
add('ngc-1569', '5,7,13', { look: 'The image zooms onto a few exceptionally bright compact clusters embedded in a messy dwarf-galaxy field.', remember: 'NGC 1569’s super-star clusters A and B are key ID clues in high-resolution Hubble imagery.', contextNeeded: true });
add('ngc-1569', '6,14', { look: 'Use the color–magnitude plot to find distinct stellar populations near a young massive cluster.', remember: 'These cluster-population diagrams come from NGC 1569’s unusually intense recent star formation.', contextNeeded: true });
add('ngc-1569', '15-16', { look: 'The many narrow absorption troughs are overlaid model stellar spectra—this figure studies cluster chemistry.', remember: 'The spectra belong to the chemical-composition work on NGC 1569-B, one of this dwarf starburst’s massive clusters.', contextNeeded: true });
add('ngc-1569', '17-18', { look: 'The plot tests spectral-fit quality or elemental abundance against wavelength/model choice.', remember: 'The target association is NGC 1569-B’s chemical composition, not a unique spectral-line pattern visible without context.', contextNeeded: true });
add('ngc-1569', '22-25,29,32-33', { look: 'Look for a small clumpy dwarf with overlaid far-infrared or H I contours; the maps trace gas and dust around the burst.', remember: 'Herschel and H I maps probe the interstellar medium of NGC 1569 and its feedback-disturbed gas.', contextNeeded: true });
add('ngc-1569', '26-28,30-31,34', { look: 'This is a radial profile or spectral-energy-distribution fit of dust emission, not an optical morphology image.', remember: 'These curves are from the NGC 1569 Herschel study of warm/cold dust and interstellar gas.', contextNeeded: true });

add('antennae-galaxies', '1-3,5,7,10-11,13', { look: 'Find the overlapping bright cores and the long, faint tidal tails curling away from the merger.', remember: 'The Antennae are NGC 4038/4039; the two nuclei and pair of extended tails distinguish them from a single ring galaxy.' });
add('antennae-galaxies', '8-9,14', { look: 'The cropped blue/red emission comes from a chaotic two-galaxy overlap rather than a tidy symmetric disk.', remember: 'The Antennae’s overlap region is bright in hot gas, star clusters, and cold molecular material.' });
add('antennae-galaxies', '15-16', { look: 'Locate the two nuclei and the marked overlap region; the colored contours show molecular gas concentrated between them.', remember: 'NGC 4038/4039’s collision compresses gas in the overlap region, creating giant molecular clouds and intense star formation.' });
add('antennae-galaxies', '17-18', { look: 'A velocity/molecular-arm map or correlation plot follows gas along a tidal arm; track the disturbed gas rather than the optical shape.', remember: 'The Antennae paper measures giant molecular clouds in the tidal arm of NGC 4039.', contextNeeded: true });
add('antennae-galaxies', '19-21', { look: 'Marked compact sources and multi-panel flux comparisons investigate whether one bright nucleus or clump could be active.', remember: 'These figures test a possible AGN in the Antennae; an X-ray or radio point alone is not proof of one.', contextNeeded: true });
add('antennae-galaxies', '22-24', { look: 'The ALMA/JWST panels or faint variability/power-spectrum plots compare compact sources S3 and S4 across bands.', remember: 'Those source labels belong to the Antennae AGN-candidate study; cross-band context matters more than a single graph shape.', contextNeeded: true });

add('arp-143', '4-5', { look: 'The colored radio/contour map wraps around an off-center ring, with a separate galaxy close to one edge.', remember: 'Arp 143 is the NGC 2445 ring perturbed by nearby NGC 2444; radio maps pick up disturbed gas.' });
add('arp-143', '7', { look: 'Nine narrow line profiles are laid out as numbered pointings through a ring; they trace molecular gas at different positions.', remember: 'CO detections around Arp 143’s ring show how gas is distributed after the encounter.', contextNeeded: true });
add('arp-143', '8-10,16,19,22,26,28-30,41-42,46', { look: 'Find the lopsided, broken ring and the nearby intruder; the colored maps emphasize bright knots along only part of the ring.', remember: 'NGC 2445’s off-center star-forming ring plus NGC 2444 is the visual fingerprint of Arp 143.' });
add('arp-143', '11,23-25,27,43-44', { look: 'Look for H-alpha, [N II], [S II], or other marked emission lines from individual knots in the disturbed ring.', remember: 'Arp 143 spectroscopy measures ionized gas and star-forming knots in NGC 2445; the line pattern alone needs the ring-system context.', contextNeeded: true });
add('arp-143', '12-15,18,21,45,49-50', { look: 'The plotted quantities are knot fluxes, ages, metallicity, or line ratios; follow how the star-forming ring changes by position.', remember: 'These diagnostic graphs are tied to Arp 143’s collision-triggered ring star formation, not a uniquely shaped plot.', contextNeeded: true });
add('arp-143', '32-40,48', { look: 'The paired gas/stars panels or time-stamped snapshots model a companion crossing a disk and launching a ring wave.', remember: 'Arp 143 simulations connect the off-center ring in NGC 2445 to its interaction with NGC 2444.', contextNeeded: true });

add('arp-147', '1-4,8,15-16,28', { look: 'Find the distinctive “10”: a nearly edge-on smooth galaxy beside a blue knotty ring with a central opening.', remember: 'Arp 147 is the collisional ring pair that looks like 10; the blue ring is the active star-forming member.' });
add('arp-147', '6-7', { look: 'The spectra compare emission lines from a ring galaxy and an early-type companion; H-alpha and [N II] are marked.', remember: 'Arp 147 is a ring-plus-intruder system, so spectra are often separated for the ring and the smoother companion.', contextNeeded: true });
add('arp-147', '10-11', { look: 'Velocity colors change around a circular ring; compare rotating and expanding-ring models rather than treating the colors as a photograph.', remember: 'Arp 147’s collision created an expanding star-forming ring; kinematic maps test that expansion.', contextNeeded: true });
add('arp-147', '14,18-19,21,25', { look: 'Look for stellar ages, masses, or extinction plotted for knots or quadrants around a ring.', remember: 'Arp 147’s blue ring contains massive young star clusters, so age/mass distributions belong to the collision aftermath.', contextNeeded: true });
add('arp-147', '17,20,22', { look: 'The marks are distributed around a circular ring; this figure maps cluster positions or properties by angle and distance from a red section.', remember: 'A ring divided into star-forming regions and measured by azimuth is an Arp 147 research cue.', contextNeeded: true });
add('arp-147', '23-24,26-27', { look: 'The plotted cumulative fractions or scaling relations compare young clusters in a collisional ring with other populations.', remember: 'These are Arp 147 star-cluster demographics; the axes, not the curve shape alone, connect the graph to its ring.', contextNeeded: true });
add('arp-147', '30-31', { look: 'This spectral-energy or population-model plot is about unusually luminous X-ray sources associated with a star-forming ring.', remember: 'Arp 147’s ring has ultraluminous X-ray sources (ULXs), consistent with vigorous post-collision star formation.', contextNeeded: true });

add('cartwheel-galaxy', '1-2,5,7-9', { look: 'The large outer ring is linked to a smaller inner ring by spoke-like structures; a few companion galaxies sit outside.', remember: 'The Cartwheel is a collision-made ring system with outer ring, inner ring, and spokes—more wheel-like than Arp 147.' });
add('cartwheel-galaxy', '10-11,13', { look: 'The spectra are explicitly split by inner ring, outer ring, nucleus, or the space between them.', remember: 'Cartwheel stellar-population work compares its inner and outer rings to follow the collision-driven star-formation wave.', contextNeeded: true });
add('cartwheel-galaxy', '12', { look: 'Colored points mark nucleus, inner ring, and outer ring on a line-ratio diagnostic plot.', remember: 'Cartwheel regions differ in ionization and stellar population; the multi-ring regional labels are the clue.', contextNeeded: true });
add('cartwheel-galaxy', '14-17', { look: 'The full-spectrum fitting panels compare stellar populations at different radii; check the ring-region label and emission lines.', remember: 'These Cartwheel graphs measure how young stars and gas vary from the nucleus through the inner and outer rings.', contextNeeded: true });

add('m82', '1-6,9-11,13-16,18-19', { look: 'A narrow edge-on disk throws bright red, orange, or X-ray gas perpendicular to its plane; the outflow is the key shape.', remember: 'M82/Cigar is the nearby starburst with a bipolar superwind driven above and below its disk.' });
add('m82', '8', { look: 'Two nearby galaxies appear in the wide field: a normal large spiral and a much thinner disturbed starburst.', remember: 'M81’s tidal interaction helped trigger M82’s starburst; the pair is a useful context clue.' });
add('m82', '23-29', { look: 'Notice TeV energy, gamma-ray flux, or radio frequency on the axes: these are high-energy spectra of a starburst, not optical light curves.', remember: 'M82’s intense star formation produces cosmic rays and gamma-ray emission studied with VERITAS.', contextNeeded: true });
add('m82', '30,42,48-49,51', { look: 'The maps isolate faint outer arcs or halo fields beyond a bright edge-on disk, asking whether new stars formed outside the core.', remember: 'M82’s wind/halo contains young stars and tidal debris; the spatial relation to the central starburst is the learning cue.', contextNeeded: true });
add('m82', '31-41,43-47,52', { look: 'Look for color–magnitude diagrams, completeness curves, or star-formation histories of halo/arc stars.', remember: 'These M82 papers study young metal-rich stars in its halo and star formation associated with the outflow.', contextNeeded: true });
add('m82', '53-54', { look: 'Two bright compact X-ray spots are marked near the middle of an edge-on starburst.', remember: 'M82 X-1 and X-2 are famous ultraluminous X-ray sources; X-2 is a pulsating neutron-star ULX.' });
add('m82', '55-60', { look: 'The plot uses orbital timing, donor mass, Roche-lobe, or mass-transfer axes for an unusually bright pulsating X-ray binary.', remember: 'M82 X-2’s orbital decay and super-Eddington accretion make it a distinctive ULX research target.', contextNeeded: true });
add('m82', '61-64', { look: 'Spot the new bright point or the multi-band fading light curve inside an edge-on dusty starburst.', remember: 'SN 2014J exploded in M82; the supernova and its light echo appear in several packet images and plots.', contextNeeded: true });

add('gw170817', '1,5,11,17,37', { look: 'A rising “chirp” sweeps toward higher frequency in two gravitational-wave detector plots; compare Hanford/Livingston traces.', remember: 'The binary-neutron-star inspiral signal is GW170817; gravitational waves were followed by a gamma-ray burst and kilonova.', contextNeeded: true });
add('gw170817', '2,8,35', { look: 'The transient is a small point or fading spot near an otherwise smooth elliptical host, not a galaxy-scale explosion.', remember: 'GW170817’s optical counterpart appeared in NGC 4993 and faded over days as a kilonova.', contextNeeded: true });
add('gw170817', '3,36', { look: 'Multiple wavelength curves or spectra evolve quickly over days—watch the optical light fade and redden.', remember: 'The GW170817 kilonova rapidly changed color and luminosity as neutron-rich ejecta expanded.', contextNeeded: true });
add('gw170817', '4,6,16', { look: 'The diagram shows two neutron stars, a jet, or a large sky-localization region; it is about a multi-messenger merger.', remember: 'GW170817 was localized by the LIGO–Virgo network and then followed electromagnetically.', contextNeeded: true });
add('gw170817', '14-15,18,38-40,43-45', { look: 'Read the component-mass, ejecta-mass, kick-velocity, or viewing-angle axes: this figure models a binary-neutron-star progenitor.', remember: 'These parameter plots are GW170817 merger models. Their curve shapes alone are not unique; the neutron-star-mass/ejecta labels provide context.', contextNeeded: true });
add('gw170817', '19,22-25', { look: 'The marked X-ray sources or delayed X-ray luminosity curves follow a faint afterglow against a host-galaxy background.', remember: 'Chandra monitored GW170817’s delayed X-ray afterglow in NGC 4993.', contextNeeded: true });
add('gw170817', '20-21,41', { look: 'The jet/cocoon sketches or cumulative-rate curves concern an off-axis short gamma-ray burst after a merger.', remember: 'GRB 170817A accompanied GW170817; its weak observed gamma rays helped motivate off-axis jet and cocoon models.', contextNeeded: true });
add('gw170817', '26-31', { look: 'The panels show prompt gamma-ray pulses, spectra, or jet geometry rather than the galaxy itself. Check the delay and two-pulse structure.', remember: 'Prompt gamma-ray analyses connect GRB 170817A with GW170817’s neutron-star merger.', contextNeeded: true });
add('gw170817', '33-34', { look: 'The contours compare the gravitational-wave and gamma-ray constraints on a joint event.', remember: 'GW170817 is a multi-messenger case: a GW signal, GRB 170817A, and kilonova must fit the same merger.', contextNeeded: true });
add('gw170817', '47-52', { look: 'These event-rate or element-abundance plots address how neutron-rich ejecta make heavy elements; check for r-process labels.', remember: 'GW170817 supplied direct evidence that neutron-star mergers can produce r-process material and kilonova light.', contextNeeded: true });

add('terzan-5', '2-5,16', { look: 'This is a very dense, reddish star field with a compact core; some versions overlay X-ray or gamma-ray emission.', remember: 'Terzan 5 is an unusual dense stellar system in the Galactic bulge with many compact sources and millisecond pulsars.' });
add('terzan-5', '8-9', { look: 'The axes discuss look-back time or compact-binary formation in a dense old stellar population.', remember: 'Terzan 5 is studied as a possible bulge fossil and an efficient factory for compact binaries/GW sources.', contextNeeded: true });
add('terzan-5', '12-15', { look: 'Look for [Fe/H] or chemical/kinematic comparisons between a dense stellar system and bulge/halo populations.', remember: 'Terzan 5 has multiple metallicity populations and is closely linked to Galactic-bulge history.', contextNeeded: true });
add('terzan-5', '17', { look: 'The colored rectangular boxes are telescope fields laid across a crowded cluster, not separate galaxies.', remember: 'JWST and HST mapped different parts of Terzan 5 to resolve its multiple stellar populations.', contextNeeded: true });
add('terzan-5', '18-24,26-27', { look: 'The dense color–magnitude diagram bends into several stellar sequences; compare the colored model tracks or selected groups.', remember: 'Terzan 5 has at least two distinct age/metallicity stellar populations; split sequences in a CMD are the important clue.', contextNeeded: true });
add('terzan-5', '25', { look: 'Two U-shaped chi-square curves estimate different best-fit ages for stellar populations in the same dense system.', remember: 'This Terzan 5 fit supports populations of different ages; the paired age minima matter more than their exact numbers.', contextNeeded: true });

// Distinctive single panels inside the larger paper series. These override the
// family-level explanation so the first hint points to what is on that crop.
add('arp-147', '22', { look: 'Two scatter plots compare properties around the ring: one horizontal axis is azimuth, the other distance from the red region.', remember: 'In Arp 147, star-cluster properties were checked around the collisional ring. “Azimuth” plus “red region” is the useful paper-specific cue.', contextNeeded: true });
add('arp-147', '10', { look: 'Four circular velocity models compare face-on/inclined and rotating/expanding rings; the color changes around each ring.', remember: 'Arp 147 is tested as an expanding collision ring, not merely a rotating disk.', contextNeeded: true });
add('arp-147', '24', { look: 'Three vertically separated curves give cumulative fractions against log cluster mass.', remember: 'Those mass-distribution curves describe young clusters in Arp 147’s star-forming ring.', contextNeeded: true });
add('arp-147', '31', { look: 'Two rainbow-colored panels have evolutionary time on the horizontal axis and a bright diagonal population band.', remember: 'This is an Arp 147 ULX population-model panel, rather than a direct image of the collisional ring.', contextNeeded: true });
add('arp-143', '9', { look: 'Six narrowband images compare H-alpha, [N II], [S II], H-beta, and [O III] emission around a broken ring.', remember: 'Arp 143’s NGC 2445 ring is analyzed knot by knot using several ionized-gas lines.', contextNeeded: true });
add('arp-143', '10', { look: 'Colored H-alpha-amplitude patches form an incomplete ring around a central gap.', remember: 'The patchy, off-center H-alpha ring is NGC 2445 in Arp 143.' });
add('arp-143', '13-14', { look: 'A colored scatter plot tests a galactocentric trend; the companion panel places the same measurements on a lopsided ring.', remember: 'These Arp 143 panels connect chemical/ionization measurements to location in NGC 2445’s disturbed ring.', contextNeeded: true });
add('arp-143', '21', { look: 'The plotted axes are nitrogen-to-oxygen ratio and oxygen abundance, colored by H-alpha flux.', remember: 'This abundance diagram belongs to the star-forming knots of Arp 143; it is not uniquely identifying without ring context.', contextNeeded: true });
add('arp-143', '26', { look: 'A long, bent H I tail appears beside the optical field; follow the neutral-gas structure away from the ring.', remember: 'The H I tail is evidence of the interaction in the Arp 143 system.' });
add('arp-143', '32', { look: 'Four panels compare gas, stars, and an infrared view; the gas is thrown into a ring while the stellar companion stays separate.', remember: 'Arp 143 collision simulations explain NGC 2445’s off-center gas ring and NGC 2444’s role.', contextNeeded: true });
add('arp-143', '37-40', { look: 'Small time-stamped simulation frames show an intruder passing a disk and an expanding ring forming over hundreds of Myr.', remember: 'These Arp 143 simulations illustrate how the NGC 2445 ring could form after NGC 2444’s passage.', contextNeeded: true });
add('arp-143', '48', { look: 'The hand-drawn schematic marks knots along the leading edge of an expanding, asymmetric ring.', remember: 'Knot placement around NGC 2445’s ring is a key Arp 143 star-formation clue.', contextNeeded: true });
add('m82', '31', { look: 'Two curves stay high, then drop steeply at faint magnitude: this measures detection completeness.', remember: 'The M82 halo-star paper checks which faint stars its observations could recover.', contextNeeded: true });
add('m82', '32-36,38-39,52', { look: 'A color–magnitude diagram or paired stellar-sequence plot separates stars in the arc and halo.', remember: 'The M82 outer-field papers use resolved stars to test young, metal-rich populations beyond the main disk.', contextNeeded: true });
add('m82', '37', { look: 'The upper and lower traces compare an observed stellar spectrum and its residual/model.', remember: 'This spectrum supports the young-star population analysis in M82’s halo/arc.', contextNeeded: true });
add('m82', '40-41', { look: 'Smooth peaked curves compare the probability or distribution of two stellar-population components.', remember: 'The M82 halo-star study fits population properties rather than showing a unique galaxy morphology.', contextNeeded: true });
add('m82', '44', { look: 'A sharp completeness cutoff and two color-error clouds show where faint halo stars become hard to measure.', remember: 'These quality plots support the M82 wind/halo star-formation study.', contextNeeded: true });
add('m82', '46', { look: 'Two stair-step plots compare star-formation rates and their cumulative histories for separate stellar fields.', remember: 'The M82 outflow/halo paper reconstructs when stars formed beyond its central starburst.', contextNeeded: true });
add('m82', '55-56', { look: 'Timing contours and a curved orbital-decay fit are shown for a pulsating ULX binary.', remember: 'M82 X-2 is the pulsating neutron-star ULX whose orbit has been measured to decay.', contextNeeded: true });
add('m82', '57-59', { look: 'Donor-mass, mass-transfer, Roche-radius, or magnetic-field panels constrain a super-Eddington X-ray binary.', remember: 'These are physical models for the M82 X-2 ULX; identify the neutron-star-accretion topic first.', contextNeeded: true });
add('m82', '60', { look: 'Red and black light curves compare NuSTAR and XMM observations of an X-ray binary.', remember: 'The contrasting instrument curves are measurements of M82 X-2, its pulsating ULX.', contextNeeded: true });
add('gw170817', '5', { look: 'The detector plot is labeled for a different 2017 gravitational-wave event and illustrates how adding Virgo improves localization.', remember: 'This is a comparison figure in the GW170817 packet—not a unique image of GW170817. Link it to the three-detector localization method, not to its exact waveform.', contextNeeded: true });
add('gw170817', '17', { look: 'A short sharp peak in gamma-ray light curves follows the merger; compare the high- and low-energy channels.', remember: 'GRB 170817A was the short gamma-ray counterpart of the GW170817 neutron-star merger.', contextNeeded: true });
add('gw170817', '23-24', { look: 'Delayed X-ray detections are plotted as luminosity versus days after the trigger, with neighboring field sources for comparison.', remember: 'Chandra followed the rising GW170817 X-ray afterglow while separating it from unrelated nearby sources.', contextNeeded: true });
add('gw170817', '29', { look: 'A narrow second gamma-ray pulse is marked against a much longer first-pulse contour.', remember: 'The two-component prompt emission is one modeling clue for GRB 170817A after GW170817.', contextNeeded: true });
add('gw170817', '38', { look: 'One axis is enclosed mass density and another is circular velocity versus radius—this is a host-galaxy model.', remember: 'The host NGC 4993 is modeled to understand the environment of GW170817; this curve by itself is not an event fingerprint.', contextNeeded: true });
add('gw170817', '48', { look: 'The curves compare cosmic event rates with redshift; a neutron-star merger is one of the channels plotted.', remember: 'The rate plot gives population context for GW170817; it is not uniquely identifiable without the merger study.', contextNeeded: true });
add('terzan-5', '12', { look: 'Red triangles sit above many green bulge stars on a metallicity/element-abundance diagram.', remember: 'Terzan 5’s chemical populations have been compared to Milky Way bulge stars, supporting a bulge-fossil connection.', contextNeeded: true });
add('terzan-5', '18-19,22', { look: 'A dense color–magnitude diagram has a thick, bent stellar sequence and a separate red-highlighted subset.', remember: 'The split sequences are evidence for multiple populations in Terzan 5, not just one simple globular-cluster age.', contextNeeded: true });
add('terzan-5', '23-24,26', { look: 'Colored isochrone tracks or selected boxes sit on top of the dense stellar sequence.', remember: 'The fitted tracks test the different ages and metallicities of Terzan 5’s populations.', contextNeeded: true });

export const strongerClues: Record<string, string> = {
  'andromeda-galaxy': 'Think of the nearest giant spiral outside the Milky Way, often shown with M32 and M110.',
  'sombrero-galaxy': 'Think of a huge bulge crossed by a nearly edge-on dust ring; the paper maps gas hidden in that ring.',
  m51: 'Think of a grand-design spiral whose smaller companion reshapes its arms and gas flow.',
  'ngc-4536': 'Think of the star-forming spiral used in Cepheid, TRGB, and Type Ia supernova distance work.',
  'mcg-07-33-027': 'Think of the nearly face-on starburst spiral photographed beside a bright foreground star.',
  'ngc-1569': 'Think of a small dwarf starburst with super-star clusters and gas outflows.',
  'antennae-galaxies': 'Think of two merging nuclei, a collision overlap region, and long tidal tails.',
  'arp-143': 'Think of an off-center star-forming ring disturbed by a nearby lenticular companion.',
  'arp-147': 'Think of the collision-made ring pair that looks like the number 10.',
  'cartwheel-galaxy': 'Think of an outer ring, an inner ring, and spokes after an intruder passed through.',
  m82: 'Think of the edge-on starburst with a bipolar superwind, two famous ULXs, and SN 2014J.',
  gw170817: 'Think of the binary-neutron-star merger with a GW chirp, short GRB, and fading kilonova.',
  'terzan-5': 'Think of the dense Galactic-bulge stellar system with multiple populations and many compact binaries.',
};

export function getDsoFigureGuide(id: string): FigureGuide {
  const guide = guides.get(id);
  if (!guide) throw new Error(`Missing DSO figure guide: ${id}`);
  return guide;
}

export function getDsoStrongerClue(id: string): string {
  return strongerClues[id.slice(0, id.lastIndexOf('-pdf-'))] ?? '';
}

// Keep the hint bank synchronized with every answer-hidden practice figure.
for (const image of dsoIdAssets) getDsoFigureGuide(image.id);
