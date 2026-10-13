// Client logos shown in the homepage logo strip.
// Source files live in media/logos-src; `npm run optimize-images` writes media/logos/<file>.webp
// and `npm run upload-r2` publishes them. To add a client: drop the logo into media/logos-src,
// run those two commands, then add a line here. `large: true` shows a logo bigger than the rest.
export const clientLogos = [
  { name: "Kirloskar Pneumatic", file: "kirloskar-pneumatic.webp", large: true },
  { name: "KEM Hospital Pune", file: "kem-hospital-pune.webp" },
  { name: "Aichelin Unitherm", file: "aichelin-unitherm.webp" },
  { name: "Innovera School", file: "innovera-school.webp" },
  { name: "C4i4 Lab - Centre for Industry 4.0", file: "c4i4-lab.webp" },
  { name: "Tirupati Balaji Agro Products", file: "tirupati-balaji-agro.webp" },
  { name: "Madhus Garage Equipment", file: "madhus-garage-equipment.webp" },
  { name: "Client", file: "client-emblem.webp" }
];
