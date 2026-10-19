-- Integrity 360 Degree — content seed.
-- Everything the site showed before the database: settings, page copy,
-- divisions, 123 projects with their photos, clients and the journey.
-- Generated from the site's data files; image paths point into the "media"
-- storage bucket (upload the files with scripts/upload-media.mjs).

-- Site settings --------------------------------------------------------------
insert into public.site_settings (id, brand, contact, socials, nav, trust_stats, hero_panels, reach, quote_options) values (
  1,
  '{"name":"Integrity 360 Degree","lines":["Integrity","360","Degree"],"tagline":"Service, Innovation and Excellence","belief":"Nothing is insignificant"}'::jsonb,
  '{"address":["House 62, Road 1, Level 9B, Block I","Banani, Dhaka 1213"],"phones":["+8801627222888","+8801722110411"],"whatsapp":"8801627222888","email":"marketing@integrity360d.com","hr_email":"integrity360hr@gmail.com","hours_short":"Sun–Thu 9:00–18:00 · Sat 10:00–16:00","emails":[{"label":"Projects & quotes","value":"marketing@integrity360d.com"},{"label":"General","value":"integrity360degree@gmail.com"},{"label":"Marketing","value":"integrity360marketing@gmail.com"},{"label":"Careers","value":"integrity360hr@gmail.com"}],"hours":[{"day":"Sunday – Thursday","time":"9:00 AM – 6:00 PM"},{"day":"Saturday","time":"10:00 AM – 4:00 PM"},{"day":"Friday","time":"Closed"}],"response":"We reply within 24 hours on business days.","landmarks":"Near Banani 11 Market and Banani Club. Reachable by bus, CNG and ride-share; parking nearby.","map":"https://www.google.com/maps/search/?api=1&query=House+62+Road+1+Block+I+Banani+Dhaka+1213"}'::jsonb,
  '[{"label":"Facebook","href":"https://www.facebook.com/integrity360degree"},{"label":"YouTube","href":"https://www.youtube.com/@integrity360degree"}]'::jsonb,
  '[{"label":"Services","href":"/services"},{"label":"Projects","href":"/projects"},{"label":"About","href":"/about"},{"label":"Clients","href":"/clients"},{"label":"Process","href":"/process"},{"label":"Contact","href":"/contact"}]'::jsonb,
  '[{"value":15,"suffix":"+","label":"Years, since 2010"},{"value":40,"suffix":"+","label":"Professionals"},{"value":100,"suffix":"k","label":"Sq ft workshop & storage"},{"value":65,"suffix":"","label":"Stalls across 20 expos"},{"value":23,"suffix":"","label":"Bank branches opened"}]'::jsonb,
  '[{"image":"projects/yolo-fest/1.jpg","alt":"Yolo Fest stage for Airtel"},{"image":"projects/luxurious-cafe/1.jpg","alt":"Café interior with a teal wall and mural"},{"image":"projects/samsung-s9-launch/1.jpg","alt":"Samsung S9+ launch on stage"},{"image":"projects/modern-office-space/1.jpg","alt":"Law chamber waiting area and library"},{"image":"projects/bpl-opening-2024/1.jpg","alt":"BPL 2024 opening stage at the stadium"}]'::jsonb,
  '{"figures":[{"value":"18","unit":"malls","text":"OK Mobile Ramadan & Eid activation in 18 shopping malls and 6 recreation points."},{"value":"20+","unit":"newspapers","text":"Elite Paint dealer meet covered by 20+ newspapers and 10 TV channels."}],"pins":[{"name":"Dhaka","lat":23.81,"lon":90.41,"note":"BICC, Mirpur Stadium, Banani, hotel venues","major":true},{"name":"Gazipur","lat":24,"lon":90.42,"note":"Angona Resort, H Power"},{"name":"Savar","lat":23.86,"lon":90.26,"note":"BRAC CDM"}],"cities":[{"name":"Rangpur","lat":25.74,"lon":89.25},{"name":"Rajshahi","lat":24.37,"lon":88.6},{"name":"Mymensingh","lat":24.75,"lon":90.41},{"name":"Sylhet","lat":24.89,"lon":91.87},{"name":"Khulna","lat":22.85,"lon":89.54},{"name":"Barishal","lat":22.7,"lon":90.37},{"name":"Chattogram","lat":22.36,"lon":91.78},{"name":"Cox''s Bazar","lat":21.43,"lon":92}]}'::jsonb,
  '{"divisions":["Events & Fairs","Exhibition Stall","Interior & Architecture","Brand, PR & Digital","Not sure yet"],"budgets":["Under BDT 1,00,000","1,00,000 – 5,00,000","5,00,000 – 10,00,000","10,00,000 – 20,00,000","Above 20,00,000","Prefer to discuss"],"timelines":["As soon as possible","1–3 months","3–6 months","6–12 months","Flexible"]}'::jsonb
);

-- Reusable content blocks ----------------------------------------------------
insert into public.content_blocks (key, content) values ('about', '{"lead":"Established in 2010, Integrity 360 Degree is a one-stop solution provider, delivering a complete range of creative, strategic and innovative services.","overview":"With over a decade of experience, we specialise in PR communication, stall and interior solutions, advertising, market research, event management, media production, product activation, branding, fair management, printing and publications, residential and corporate interiors, and digital marketing.","mission":"Our mission is to bring ideas to life with a 360-degree approach, combining creativity with precision. Whether it''s building impactful brands, executing corporate events or designing inspiring interior spaces, our team ensures excellence and innovation at every step.","name":"Our name reflects our philosophy — delivering integrity in every detail, and offering 360-degree solutions that cover every part of a project, from concept development to execution.","promise":"We believe every project is unique. Whether it''s residential, commercial or institutional, our designers, architects and event team work closely with clients to bring their vision to life — on time, on budget and beyond expectations.","pillars":[{"title":"15+ years","text":"Of business experience and knowledge."},{"title":"Ready infrastructure","text":"A 100,000 sq ft workshop and storage, and an office in Banani."},{"title":"Skilled manpower","text":"40+ architects, engineers, designers and event professionals."}],"why":[{"title":"Creative design","text":"Solutions tailored to each brief."},{"title":"Fast execution","text":"Quick turnaround without cutting quality."},{"title":"Quality assurance","text":"We stand behind every project we deliver."},{"title":"Skilled manpower","text":"Our own team of architects, engineers and designers."}],"values":["Integrity","Excellence","Commitment","Teamwork"],"wheel":["Exhibition Stand","Advertising","Interior Design","Public Relation","Event Management","Landscaping","Exterior Design","Branding"]}'::jsonb);
insert into public.content_blocks (key, content) values ('process_steps', '[{"title":"Brief","text":"Goals, budget and timeline."},{"title":"Concept","text":"Ideas and 3D visuals."},{"title":"Plan","text":"Vendors, venue and schedule."},{"title":"Approve","text":"Final design sign-off."},{"title":"Build","text":"Our own workshop and crew."},{"title":"On-site","text":"Supervision on the day."},{"title":"Handover","text":"Report and follow-up."}]'::jsonb);
insert into public.content_blocks (key, content) values ('process_detail', '[{"title":"Brief","text":"We listen first: goals, audience, budget, timeline, venue or site. A site visit if the project needs one."},{"title":"Concept","text":"Ideas, layouts and 3D visuals, so you can see the stall, stage or room before anything is built."},{"title":"Plan","text":"Drawings, materials, vendors, venue bookings, permissions and a schedule everyone works to."},{"title":"Approve","text":"Final design and cost sign-off. Nothing goes into production without it."},{"title":"Build","text":"Fabrication in our own 100,000 sq ft workshop, with our own crew, then installation on site."},{"title":"On-site","text":"Our team supervises set-up and runs the day — stage, sound, light, guests and press."},{"title":"Handover","text":"Dismantling, storage, a report with photos and coverage, and follow-up for the next one."}]'::jsonb);
insert into public.content_blocks (key, content) values ('builds', '[{"id":"stall","label":"Expo stall","title":["A Stall,","Built"],"steps":[{"title":"Concept","text":"A floor plan and 3D views, drawn around the products and the visitors'' path."},{"title":"Fabricate","text":"Walls, counters and lightboxes are built in our 100,000 sq ft workshop."},{"title":"Brand","text":"Graphics, screens and display go up on site, matched to the brand."},{"title":"Light up","text":"Spotlights last. The stall is ready when it reads from across the hall."}]},{"id":"office","label":"Office","title":["A Room,","Assembled"],"steps":[{"title":"Shell","text":"We begin with the volume alone: floor, two walls, and where the light enters."},{"title":"Ground","text":"A rug and a low table fix the centre. Everything else is measured from here."},{"title":"Furnish","text":"Seating, storage and a single shelf arrive only once the room asks for them."},{"title":"Light","text":"Lamps come last. The room is finished when it reads well in the dark."}]},{"id":"stage","label":"Event stage","title":["A Stage,","Raised"],"steps":[{"title":"Deck","text":"The stage deck and steps go down first, sized to the venue and the crowd."},{"title":"Truss","text":"An aluminium truss frame rises to carry lights, sound and the LED wall."},{"title":"Screen & sound","text":"LED panels and speaker stacks are hung and tested before doors open."},{"title":"Show","text":"Beams on. The audience arrives to a stage that is already alive."}]}]'::jsonb);
insert into public.content_blocks (key, content) values ('finishes', '[{"name":"Smoked Oak","floor":"#6b4a34","wall":"#e6dccb","accent":"#7b5136","fabric":"#c9bca6"},{"name":"Sage Lime","floor":"#8a8f7c","wall":"#dfe3d6","accent":"#5f6f5b","fabric":"#f1eade"},{"name":"Obsidian","floor":"#2b2829","wall":"#4a4347","accent":"#ff5113","fabric":"#8c8279"}]'::jsonb);

-- Page copy ------------------------------------------------------------------
insert into public.page_content (key, page, content, sort_order) values ('global.header', 'global', '{"primary_links":[{"label":"Services","href":"/services"},{"label":"Projects","href":"/projects"}],"cta":{"label":"Get a Quote","href":"/contact"}}'::jsonb, 0);
insert into public.page_content (key, page, content, sort_order) values ('global.footer', 'global', '{"labels":{"index":"Index","office":"Office","reach":"Reach","follow":"Follow"},"wordmark":["Integrity","360 Degree"],"cta":{"label":"Get a Quote","href":"/contact"}}'::jsonb, 1);
insert into public.page_content (key, page, content, sort_order) values ('home.meta', 'home', '{"title":"Integrity 360 Degree — Events, Exhibitions, Interiors & Brand","description":"Integrity 360 Degree is a Dhaka-based 360° agency, established in 2010: event and fair management, exhibition stalls, interior and architectural design, PR, media and digital."}'::jsonb, 2);
insert into public.page_content (key, page, content, sort_order) values ('home.hero', 'home', '{"lines":["One Team","for your Brand,","Events &","Spaces"],"belief_label":"Belief","hint":"Move to explore · Scroll","place":["Since 2010","Banani, Dhaka"],"cta":{"label":"Get a Quote","href":"/#contact"}}'::jsonb, 3);
insert into public.page_content (key, page, content, sort_order) values ('home.trust', 'home', '{"eyebrow":"Proof, not promises"}'::jsonb, 4);
insert into public.page_content (key, page, content, sort_order) values ('home.journey', 'home', '{"eyebrow":"Our journey","title":["Since","2010"],"text":"From one office in Banani to stadium-sized events. Every turn of the line is a step we took — scroll to follow it."}'::jsonb, 5);
insert into public.page_content (key, page, content, sort_order) values ('home.divisions', 'home', '{"eyebrow":"Four divisions · One partner","title":["A full","360°","of service"],"hint":"Drag or scroll to turn","explore":"Explore","cta":"Discuss a project"}'::jsonb, 6);
insert into public.page_content (key, page, content, sort_order) values ('home.build', 'home', '{"eyebrow":"3D Study — Scroll to build, drag to rotate","finish_label":"Finish"}'::jsonb, 7);
insert into public.page_content (key, page, content, sort_order) values ('home.work', 'home', '{"title":["Selected","Work"],"cta":{"label":"All projects","href":"/projects"}}'::jsonb, 8);
insert into public.page_content (key, page, content, sort_order) values ('home.reach', 'home', '{"eyebrow":"Across the country","note":"Pins mark venues named in our project records"}'::jsonb, 9);
insert into public.page_content (key, page, content, sort_order) values ('home.clients', 'home', '{"eyebrow":"Belief","title":["We believe in first impression — our clients are our","real marketer."]}'::jsonb, 10);
insert into public.page_content (key, page, content, sort_order) values ('home.process', 'home', '{"title":["How we","work"]}'::jsonb, 11);
insert into public.page_content (key, page, content, sort_order) values ('home.contact', 'home', '{"eyebrow":"Get a free consultation","title":["Let''s build","your next","project."],"labels":{"division":"Division","budget":"Budget (BDT)","timeline":"Timeline","name":"Name","phone":"Phone","email":"Email","message":"Project","office":"Office","call":"Call","hours":"Hours","write":"Write"},"placeholders":{"choose":"Choose","name":"Your name","phone":"+880","email":"you@company.com","message":"What you need, where, and when."},"closed_day":"Friday closed","submit":"Send request","whatsapp":"WhatsApp us","sent_title":"Your email is ready to send.","sent_text":"We opened it in your mail app. Prefer chat? Send the same request on WhatsApp — we reply within 24 hours on business days."}'::jsonb, 12);
insert into public.page_content (key, page, content, sort_order) values ('about.meta', 'about', '{"title":"About — Integrity 360 Degree"}'::jsonb, 13);
insert into public.page_content (key, page, content, sort_order) values ('about.hero', 'about', '{"title":"About","accent":"Us","label":"Since 2010 · Service, Innovation and Excellence"}'::jsonb, 14);
insert into public.page_content (key, page, content, sort_order) values ('about.intro', 'about', '{"image":"projects/nexus-room/1.jpg","image_alt":"Nexus Room with the company values on the walls","caption":"Nexus Room — our values, built in","mission_label":"Mission","name_label":"The name"}'::jsonb, 15);
insert into public.page_content (key, page, content, sort_order) values ('about.belief', 'about', '{"eyebrow":"Belief","title":["Nothing is","insignificant."],"text":"We believe in first impression — that''s why our clients are our real marketer."}'::jsonb, 16);
insert into public.page_content (key, page, content, sort_order) values ('about.why', 'about', '{"title":["Why","us"]}'::jsonb, 17);
insert into public.page_content (key, page, content, sort_order) values ('about.wheel', 'about', '{"eyebrow":"One partner, every side of the project","title":["The","360°","wheel"]}'::jsonb, 18);
insert into public.page_content (key, page, content, sort_order) values ('about.values', 'about', '{"eyebrow":"Our values"}'::jsonb, 19);
insert into public.page_content (key, page, content, sort_order) values ('about.cta', 'about', '{"title":["Let''s talk about your","next project."],"buttons":[{"label":"Contact us","href":"/contact"},{"label":"See projects","href":"/projects"}]}'::jsonb, 20);
insert into public.page_content (key, page, content, sort_order) values ('services.meta', 'services', '{"title":"Services — Integrity 360 Degree","description":"Four divisions under one roof: events and fairs, exhibition stalls, interior and architecture, and brand, PR and digital."}'::jsonb, 21);
insert into public.page_content (key, page, content, sort_order) values ('services.hero', 'services', '{"title":"Services","accent":"360°","label":"Four divisions · One partner","text":"Events, exhibitions, spaces and the brand around them — planned, built and run by one team with its own workshop."}'::jsonb, 22);
insert into public.page_content (key, page, content, sort_order) values ('services.list', 'services', '{"explore":"projects — explore →"}'::jsonb, 23);
insert into public.page_content (key, page, content, sort_order) values ('division.page', 'division', '{"eyebrow":"Division {number} — drag to turn","cta":"Get a Quote","projects_cta":"See projects","what_title":["What we","do"],"projects_title":["Selected","projects"],"all_projects":"All {count} projects","others":"Other divisions"}'::jsonb, 24);
insert into public.page_content (key, page, content, sort_order) values ('projects.meta', 'projects', '{"title":"Projects — Integrity 360 Degree","description":"Events, fairs, activations, exhibition stalls, interiors, PR and media delivered by Integrity 360 Degree since 2010."}'::jsonb, 25);
insert into public.page_content (key, page, content, sort_order) values ('projects.hero', 'projects', '{"title":"Projects","accent":"Since 2010","label":"{count} projects","text":"Concerts and conferences, bank branch openings, stalls for more than sixty exhibitors, offices, cafés and law chambers — filter by division or category."}'::jsonb, 26);
insert into public.page_content (key, page, content, sort_order) values ('projects.filters', 'projects', '{"all":"All","every_category":"Every category","divisions":{"events":"Events & Fairs","exhibition":"Exhibition","interior":"Interior","brand":"Brand, PR & Digital"}}'::jsonb, 27);
insert into public.page_content (key, page, content, sort_order) values ('project.page', 'project', '{"labels":{"client":"Client","venue":"Venue","year":"Year","category":"Category"},"cta":"Plan something similar","more":"More {division}","related":"Related","next":"Next project","model_title":"In 3D","model_hint":"Drag to turn the model"}'::jsonb, 28);
insert into public.page_content (key, page, content, sort_order) values ('clients.meta', 'clients', '{"title":"Clients — Integrity 360 Degree","description":"Banks, pharma, FMCG, telecom, automotive, development agencies and universities we have worked with since 2010."}'::jsonb, 29);
insert into public.page_content (key, page, content, sort_order) values ('clients.hero', 'clients', '{"title":"Clients","accent":"& partners","label":"{count}+ names from our profiles","text":"Multinationals, banks, pharma, telecom and development partners — many of them for more than one programme."}'::jsonb, 30);
insert into public.page_content (key, page, content, sort_order) values ('clients.list', 'clients', '{"note":"Logos are shown only with each client''s permission."}'::jsonb, 31);
insert into public.page_content (key, page, content, sort_order) values ('clients.repeat', 'clients', '{"title":["Clients who","came back"],"text":"Novo Nordisk trusted us with marathons, summits, roadshows and their PR; Shahjalal Islami Bank with AGMs, conferences and 23 branch openings.","projects":["big-bangla-run-2015","shahjalal-branch-openings","national-premix-summit"],"cta":{"label":"All projects","href":"/projects"}}'::jsonb, 32);
insert into public.page_content (key, page, content, sort_order) values ('process.meta', 'process', '{"title":"Process — Integrity 360 Degree","description":"How a project runs with us, from the brief to the handover."}'::jsonb, 33);
insert into public.page_content (key, page, content, sort_order) values ('process.hero', 'process', '{"title":"Process","accent":"Brief to handover","label":"Seven steps, one team","text":"Every project — a stall, a stage, an office or a campaign — runs through the same seven steps, with our own workshop and crew in the middle."}'::jsonb, 34);
insert into public.page_content (key, page, content, sort_order) values ('process.divisions', 'process', '{"divisions":["exhibition","brand"]}'::jsonb, 35);
insert into public.page_content (key, page, content, sort_order) values ('contact.meta', 'contact', '{"title":"Contact — Integrity 360 Degree"}'::jsonb, 36);
insert into public.page_content (key, page, content, sort_order) values ('contact.hero', 'contact', '{"title":"Contact","accent":"Us","label":"Get a free consultation"}'::jsonb, 37);
insert into public.page_content (key, page, content, sort_order) values ('contact.details', 'contact', '{"labels":{"visit":"Visit","hours":"Hours","email":"Email","call":"Call or WhatsApp"},"map_cta":"Open in Google Maps →"}'::jsonb, 38);

-- Divisions ------------------------------------------------------------------
insert into public.divisions (id, number, name, title_line1, title_line2, tagline, intro, card_title, card_short, card_services, cover_image, scene, extra_title, extra_items, sort_order) values (
  'events', '01', 'Events, Fairs & Activations', 'Events', '& Fairs', 'Concept, management, artists and execution — one team from brief to the last guest out.', 'We plan and run corporate events, conferences, concerts, sports events, convocations, launches and fairs, and take brands to people through activations in schools, markets, malls and on the road.',
  'Events & Fairs', 'Concerts, conferences, sports, launches and product activations.', array['Corporate events & conferences', 'Concerts & festivals', 'Sports events', 'Fair management', 'Product activations', 'Launches & dealer meets']::text[], 'projects/yolo-fest/1.jpg', 'stage',
  null, '{}'::text[], 0
);
insert into public.division_service_groups (division_id, title, items, sort_order) values ('events', 'Corporate & conferences', array['Corporate events', 'Conferences & seminars', 'AGMs & managers'' conferences', 'Product launches', 'Dealer meets', 'Contract signing ceremonies', 'Anniversaries']::text[], 0);
insert into public.division_service_groups (division_id, title, items, sort_order) values ('events', 'Concerts, sports & festivals', array['Concerts & festivals', 'Sports events & marathons', 'Convocations', 'Opening ceremonies', 'Corporate dinners']::text[], 1);
insert into public.division_service_groups (division_id, title, items, sort_order) values ('events', 'Fair management', array['Creative management', 'Stall display set-up & management', 'Stall interior design', 'Volunteer recruitment & training', 'Ground transportation & logistics']::text[], 2);
insert into public.division_service_groups (division_id, title, items, sort_order) values ('events', 'Activations', array['Door-to-door marketing', 'Brand promotion', 'Shop merchandising', 'Activation kiosks', 'School, colony & market activations', 'Branded vans & roadshows']::text[], 3);
insert into public.division_service_groups (division_id, title, items, sort_order) values ('events', 'Family & social', array['Weddings', 'Birthdays', 'Family days & corporate tours']::text[], 4);
insert into public.division_service_groups (division_id, title, items, sort_order) values ('events', 'On every event', array['Planning', 'Venue & vendors', 'Stage, truss, sound & light', 'LED screens', 'Technical support', 'On-site management']::text[], 5);
insert into public.division_figures (division_id, value, label, sort_order) values ('events', '23', 'Bank branch openings, one client', 0);
insert into public.division_figures (division_id, value, label, sort_order) values ('events', '18', 'Malls in one activation, plus 6 recreation points', 1);
insert into public.division_figures (division_id, value, label, sort_order) values ('events', '21.1', 'Kilometres, Big Bangla Run ’15', 2);
insert into public.division_figures (division_id, value, label, sort_order) values ('events', '20+', 'Companies served with activation kiosks', 3);
insert into public.divisions (id, number, name, title_line1, title_line2, tagline, intro, card_title, card_short, card_services, cover_image, scene, extra_title, extra_items, sort_order) values (
  'exhibition', '02', 'Exhibition & Stall Design', 'Exhibition', 'Stalls', 'An extended arm of your business — like a branch office on the expo floor.', 'On-demand, cost-effective stalls for exporters and exhibitors: we design, fabricate, brand and run them, then take them down and store them for the next show.',
  'Exhibition Stalls', 'An extended arm of your business at every expo.', array['Concept & 3D design', 'Fabrication', 'Erection & branding', 'On-site support', 'Storage & logistics', 'Dismantling']::text[], 'projects/expo-stalls-01/2.jpg', 'stall',
  'Expos we build for', array['BTKG & Motor Show', 'GAP & GTB', 'Furnitech & FoodPro', 'IPF', 'Meditex & Bangla Med', 'Asian Pharma', 'Buildcon & Rehab', 'Papertech', 'Leathertech', 'Garmentech', 'Fire & Safety', 'Real Estate', 'Wood & WAPSA', 'Elevator, Lift & Escalator', 'DTG', 'Power & Solar', 'Poultry', 'DITF']::text[], 1
);
insert into public.division_service_groups (division_id, title, items, sort_order) values ('exhibition', 'Concept & design', array['Custom stall design', '3D visualisation', 'Graphics & branding', 'Layout for products and visitor flow']::text[], 0);
insert into public.division_service_groups (division_id, title, items, sort_order) values ('exhibition', 'Build', array['Fabrication in our own workshop', 'Erection & commissioning', 'Lighting & screens', 'Furniture & display units']::text[], 1);
insert into public.division_service_groups (division_id, title, items, sort_order) values ('exhibition', 'Show & after', array['Project management', 'PR around the show', 'On-site support', 'Dismantling', 'Storage & logistics']::text[], 2);
insert into public.division_figures (division_id, value, label, sort_order) values ('exhibition', '≈65', 'Stalls built', 0);
insert into public.division_figures (division_id, value, label, sort_order) values ('exhibition', '≈20', 'Expos', 1);
insert into public.division_figures (division_id, value, label, sort_order) values ('exhibition', '100k', 'Sq ft of workshop & storage', 2);
insert into public.division_figures (division_id, value, label, sort_order) values ('exhibition', '60+', 'Exhibitors in our stall portfolio', 3);
insert into public.divisions (id, number, name, title_line1, title_line2, tagline, intro, card_title, card_short, card_services, cover_image, scene, extra_title, extra_items, sort_order) values (
  'interior', '03', 'Interior & Architecture', 'Interior &', 'Architecture', 'Simple. Sophisticated. You.', 'Interior design and architectural support for residential, commercial and institutional spaces — from concept to execution, on time, on budget and beyond expectations.',
  'Interior & Architecture', 'Offices, cafés, law chambers, facades and gates.', array['Corporate & residential interiors', 'Restaurants, cafés & retail', 'Facades, gates & parking', 'Custom furniture & cabinetry', 'Acoustic panels', 'Solar, water & fire safety']::text[], 'projects/luxurious-cafe/1.jpg', 'room',
  null, '{}'::text[], 2
);
insert into public.division_service_groups (division_id, title, items, sort_order) values ('interior', 'Commercial', array['Corporate offices', 'Law chambers', 'Brand shops', 'Restaurants & cafés', 'Bakeries & retail', 'Banquet halls']::text[], 0);
insert into public.division_service_groups (division_id, title, items, sort_order) values ('interior', 'Residential', array['Homes & apartments', 'Dining spaces', 'Washrooms', 'Kitchens & storage']::text[], 1);
insert into public.division_service_groups (division_id, title, items, sort_order) values ('interior', 'Architecture & exterior', array['Building design', 'Facades', 'Front gates', 'Parking gates & ceilings', 'Lift lobbies']::text[], 2);
insert into public.division_service_groups (division_id, title, items, sort_order) values ('interior', 'Details', array['Custom furniture & cabinetry', 'Acoustic panel walls', 'Ceilings & lighting', '3D visualisation']::text[], 3);
insert into public.division_service_groups (division_id, title, items, sort_order) values ('interior', 'Utilities', array['Rooftop solar', 'Water treatment', 'Fire exit stairs', 'Power substations', 'Green rooftops']::text[], 4);
insert into public.division_figures (division_id, value, label, sort_order) values ('interior', '15+', 'Years designing spaces', 0);
insert into public.division_figures (division_id, value, label, sort_order) values ('interior', '40+', 'Designers, architects & engineers', 1);
insert into public.division_figures (division_id, value, label, sort_order) values ('interior', '100k', 'Sq ft workshop for furniture & joinery', 2);
insert into public.division_figures (division_id, value, label, sort_order) values ('interior', '27+', 'Interior clients in our profile', 3);
insert into public.divisions (id, number, name, title_line1, title_line2, tagline, intro, card_title, card_short, card_services, cover_image, scene, extra_title, extra_items, sort_order) values (
  'brand', '04', 'Brand, PR, Media & Digital', 'Brand, PR', '& Digital', 'We believe in first impression — that''s why our clients are our real marketer.', 'Press and media relations, advertising, media production, digital content, design and printing, promotional items and LED displays — the pieces that carry a brand before and after the event.',
  'Brand, PR & Digital', 'PR coverage, media, digital content, print and LED.', array['Press & media relations', 'Advertising & branding', 'Media production', 'Digital content', 'Design & printing', 'Promotional items & LED']::text[], 'projects/samsung-s9-launch/1.jpg', 'brand',
  null, '{}'::text[], 3
);
insert into public.division_service_groups (division_id, title, items, sort_order) values ('brand', 'Public relations', array['Press releases', 'Press conferences', 'TV reporting', 'Customised news', '1-2-1 interviews', 'PR campaigns', 'Invitations', 'Event PR', 'Brochures']::text[], 0);
insert into public.division_service_groups (division_id, title, items, sort_order) values ('brand', 'Media production', array['Television commercials', 'Business videos', 'Education & industrial films', 'Documentaries', 'Graphics & animation ad films', 'Media monitoring & buying', 'Product placement', 'Product photography']::text[], 1);
insert into public.division_service_groups (division_id, title, items, sort_order) values ('brand', 'Advertising & digital', array['Digital, print & outdoor advertising', 'Brand strategy', 'Market research', 'Digital content', 'Web banners']::text[], 2);
insert into public.division_service_groups (division_id, title, items, sort_order) values ('brand', 'Design & printing', array['Desk & wall calendars', 'Greeting cards', 'Brochures & publications']::text[], 3);
insert into public.division_service_groups (division_id, title, items, sort_order) values ('brand', 'Promotional items', array['T-shirts & caps', 'Corporate gifts', 'Office & tech accessories', 'Bags & drinkware']::text[], 4);
insert into public.division_service_groups (division_id, title, items, sort_order) values ('brand', 'LED displays', array['Indoor LED screens', 'Outdoor LED screens', 'Video scoreboards', 'Digital kiosks']::text[], 5);
insert into public.division_figures (division_id, value, label, sort_order) values ('brand', '20+', 'Newspapers and 10 TV channels for one dealer meet', 0);
insert into public.division_figures (division_id, value, label, sort_order) values ('brand', '20+', 'Companies served with digital content', 1);
insert into public.division_figures (division_id, value, label, sort_order) values ('brand', '10+', 'Companies served with web banners', 2);
insert into public.division_figures (division_id, value, label, sort_order) values ('brand', '15', 'Companies'' calendars in one year', 3);

-- Clients --------------------------------------------------------------------
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Shahjalal Islami Bank', 'Banking & finance', true, 2, 0, 0);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('EXIM Bank', 'Banking & finance', true, 2, 1, 1);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Trust Bank', 'Banking & finance', true, 2, 2, 2);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('City Bank', 'Banking & finance', false, null, null, 3);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('IPDC', 'Banking & finance', false, null, null, 4);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('IDLC', 'Banking & finance', false, null, null, 5);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('bKash', 'Banking & finance', true, 1, 2, 6);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Mastercard', 'Banking & finance', false, null, null, 7);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('American Express', 'Banking & finance', false, null, null, 8);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Novo Nordisk', 'Pharma & health', true, 1, 0, 9);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('GSK', 'Pharma & health', false, null, null, 10);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Renata', 'Pharma & health', false, null, null, 11);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Lazz Pharma', 'Pharma & health', false, null, null, 12);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Nitika Pharmaceuticals', 'Pharma & health', false, null, null, 13);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Reckitt Benckiser', 'Pharma & health', false, null, null, 14);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('BIRDEM', 'Pharma & health', false, null, null, 15);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('BADAS', 'Pharma & health', false, null, null, 16);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('DSK Hospital', 'Pharma & health', false, null, null, 17);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Unilever', 'FMCG & food', true, 1, 4, 18);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Coca-Cola', 'FMCG & food', true, 1, 1, 19);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Nestlé', 'FMCG & food', false, null, null, 20);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Marico', 'FMCG & food', false, null, null, 21);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Arla', 'FMCG & food', false, null, null, 22);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Dabur', 'FMCG & food', false, null, null, 23);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Kazi Farms', 'FMCG & food', true, 2, 6, 24);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Olympia Bakery', 'FMCG & food', true, 2, 11, 25);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Kwality Icecream', 'FMCG & food', false, null, null, 26);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('ECO Food', 'FMCG & food', false, null, null, 27);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Magnolia Tea', 'FMCG & food', false, null, null, 28);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Square', 'FMCG & food', false, null, null, 29);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('BAT', 'FMCG & food', false, null, null, 30);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Samsung', 'Telecom & technology', true, 1, 3, 31);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Banglalink', 'Telecom & technology', true, 1, 10, 32);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Airtel', 'Telecom & technology', true, 1, 9, 33);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Robi', 'Telecom & technology', true, 1, 11, 34);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('OK Mobile', 'Telecom & technology', true, 2, 8, 35);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('WE Mobile', 'Telecom & technology', false, null, null, 36);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Walton', 'Telecom & technology', true, 1, 8, 37);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Pridesys IT', 'Telecom & technology', false, null, null, 38);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Ekhanei.com', 'Telecom & technology', false, null, null, 39);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Oraimo', 'Telecom & technology', false, null, null, 40);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Bajaj', 'Automotive & industry', true, 1, 5, 41);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Runner', 'Automotive & industry', true, 1, 6, 42);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Jeep', 'Automotive & industry', true, 1, 7, 43);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Yamaha', 'Automotive & industry', false, null, null, 44);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('TVS', 'Automotive & industry', false, null, null, 45);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('H Power', 'Automotive & industry', true, 2, 9, 46);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Haojue', 'Automotive & industry', false, null, null, 47);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('JAMS Group', 'Automotive & industry', false, null, null, 48);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Forbes Marshall', 'Automotive & industry', true, 2, 7, 49);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Global Lift', 'Automotive & industry', true, 2, 10, 50);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Mozitor Elevator', 'Automotive & industry', false, null, null, 51);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Euro Elevator', 'Automotive & industry', false, null, null, 52);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('ESSAB', 'Automotive & industry', false, null, null, 53);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Zenith Safety Solution', 'Automotive & industry', false, null, null, 54);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Hankuk Engineering', 'Automotive & industry', false, null, null, 55);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Marubeni', 'Automotive & industry', false, null, null, 56);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('USAID', 'Development & education', true, 2, 3, 57);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('ILO', 'Development & education', true, 2, 4, 58);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Aga Khan Foundation', 'Development & education', false, null, null, 59);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Save the Children', 'Development & education', false, null, null, 60);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('BRAC', 'Development & education', false, null, null, 61);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Northern University', 'Development & education', false, null, null, 62);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('AUST', 'Development & education', false, null, null, 63);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('World University', 'Development & education', false, null, null, 64);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('USTC', 'Development & education', false, null, null, 65);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('MUAC', 'Development & education', false, null, null, 66);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('The Financial Express', 'Media, retail & services', false, null, null, 67);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Dhaka Tribune', 'Media, retail & services', false, null, null, 68);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('TV Bangladesh', 'Media, retail & services', false, null, null, 69);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('DHL Global Forwarding', 'Media, retail & services', true, 2, 5, 70);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Transport Team Express', 'Media, retail & services', false, null, null, 71);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('US-Bangla', 'Media, retail & services', false, null, null, 72);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Bestseller', 'Media, retail & services', false, null, null, 73);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Hallmark', 'Media, retail & services', false, null, null, 74);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Lock & Lock', 'Media, retail & services', false, null, null, 75);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('C&T Home Care', 'Media, retail & services', false, null, null, 76);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Berger', 'Media, retail & services', false, null, null, 77);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('RAK Ceramics', 'Media, retail & services', false, null, null, 78);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Elite Paint', 'Media, retail & services', false, null, null, 79);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Mobil', 'Media, retail & services', false, null, null, 80);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('CP Bangladesh', 'Media, retail & services', false, null, null, 81);
insert into public.clients (name, industry, show_in_marquee, marquee_row, marquee_order, sort_order) values ('Forever Living', 'Media, retail & services', false, null, null, 82);

-- Projects -------------------------------------------------------------------
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'bpl-opening-2024', 'BPL Opening Ceremony', 'events', 'Sports', null, 'Bangladesh Premier League', null, '2024',
  'Stage, truss, LED and event management for the opening of BPL 2024.', true, null, 'published', 0
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'bpl-opening-2024'), 'projects/bpl-opening-2024/1.jpg', 747, 426, 'BPL Opening Ceremony — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'bpl-led-scoreboard-2025', 'BPL LED Video Scoreboard', 'brand', 'LED Display', null, 'Bangladesh Premier League', 'Mirpur Stadium', '2025',
  'LED video display scoreboard for BPL 2025 at Mirpur Stadium.', true, 1, 'published', 1
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'bpl-led-scoreboard-2025'), 'projects/bpl-led-scoreboard-2025/1.jpg', 759, 434, 'BPL LED Video Scoreboard — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'samsung-s9-launch', 'S9+ Launch', 'events', 'Launch', (select id from public.clients where name = 'Samsung'), 'Samsung', null, null,
  'Launch event for the Samsung Galaxy S9+.', true, 9, 'published', 2
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'samsung-s9-launch'), 'projects/samsung-s9-launch/1.jpg', 546, 333, 'S9+ Launch — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'world-university-foundation-day', 'Foundation Day', 'events', 'Corporate event', (select id from public.clients where name = 'World University'), 'World University', null, '2024',
  'World University Foundation Day 2024.', false, null, 'published', 3
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'world-university-foundation-day'), 'projects/world-university-foundation-day/1.jpg', 754, 456, 'Foundation Day — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'events-2024-army-oraimo-ustc', 'Army Stadium, Oraimo & USTC', 'events', 'Corporate event', null, 'Oraimo · USTC', 'Bangladesh Army Stadium · BICC', '2024',
  'Event at Bangladesh Army Stadium 2024; Oraimo SpaceBuds Z “Magical Night 2.0” powered by Foodi; and the 5th Convocation of the University of Science and Technology, Chittagong (USTC) at BICC.', false, null, 'published', 4
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'events-2024-army-oraimo-ustc'), 'projects/events-2024-army-oraimo-ustc/1.jpg', 720, 445, 'Army Stadium, Oraimo & USTC — photo 1', 0),
  ((select id from public.projects where slug = 'events-2024-army-oraimo-ustc'), 'projects/events-2024-army-oraimo-ustc/2.jpg', 746, 368, 'Army Stadium, Oraimo & USTC — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'swiss-bangladesh-expo-meet-the-press', 'Meet the Press', 'events', 'Press event', null, 'Swiss-Bangladesh Expo', null, '2020',
  'Meet the Press for the Swiss-Bangladesh Expo 2020.', false, null, 'published', 5
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'swiss-bangladesh-expo-meet-the-press'), 'projects/swiss-bangladesh-expo-meet-the-press/1.jpg', 754, 381, 'Meet the Press — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'coca-cola-ceremony-2020', 'Chinese Ceremony', 'events', 'Ceremony', (select id from public.clients where name = 'Coca-Cola'), 'Coca-Cola', null, '2020',
  'Ceremony for Coca-Cola, 2020.', false, null, 'published', 6
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'coca-cola-ceremony-2020'), 'projects/coca-cola-ceremony-2020/1.jpg', 525, 315, 'Chinese Ceremony — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'garo-community-meet-and-greet', 'Meet & Greet Session', 'events', 'Community event', null, 'Garo Community of Bangladesh', null, null,
  'Meet & greet session for the Garo community of Bangladesh.', false, null, 'published', 7
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'garo-community-meet-and-greet'), 'projects/garo-community-meet-and-greet/1.jpg', 518, 340, 'Meet & Greet Session — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'dhaka-tribune-police-check-post', 'Police Check Post', 'events', 'Public project', (select id from public.clients where name = 'Dhaka Tribune'), 'Dhaka Tribune', null, '2019–2020',
  'Police check post project with Dhaka Tribune, 2019–2020.', false, null, 'published', 8
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'dhaka-tribune-police-check-post'), 'projects/dhaka-tribune-police-check-post/1.jpg', 317, 190, 'Police Check Post — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'airport-third-terminal-opening', 'Airport 3rd Terminal Opening', 'events', 'Ceremony', null, null, null, null,
  'Opening ceremony of the airport''s third terminal.', false, null, 'published', 9
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'airport-third-terminal-opening'), 'projects/airport-third-terminal-opening/1.jpg', 560, 316, 'Airport 3rd Terminal Opening — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'corporate-dinner', 'Corporate Dinner', 'events', 'Corporate event', null, null, null, null,
  'Corporate dinner set-up with draped ceiling, lighting and banquet seating.', false, null, 'published', 10
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'corporate-dinner'), 'projects/corporate-dinner/1.jpg', 768, 456, 'Corporate Dinner — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'bangladesh-utshob', 'Bangladesh Utshob', 'events', 'Concert', (select id from public.clients where name = 'Banglalink'), 'Banglalink', null, null,
  'Concert and festival for Banglalink.', false, null, 'published', 11
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'bangladesh-utshob'), 'projects/bangladesh-utshob/1.jpg', 856, 450, 'Bangladesh Utshob — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'yolo-fest', 'Yolo Fest', 'events', 'Concert', (select id from public.clients where name = 'Airtel'), 'Airtel', null, null,
  'Yolo Fest concert stage for Airtel.', true, 3, 'published', 12
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'yolo-fest'), 'projects/yolo-fest/1.jpg', 616, 326, 'Yolo Fest — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'pohela-baishakh-mojo-concert', 'Pohela Baishakh Concert', 'events', 'Concert', null, 'Mojo', null, null,
  'Pohela Baishakh concert for Mojo.', false, null, 'published', 13
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'pohela-baishakh-mojo-concert'), 'projects/pohela-baishakh-mojo-concert/1.jpg', 593, 368, 'Pohela Baishakh Concert — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'tresemme-khadi-fest', 'Tresemme Khadi Fest', 'events', 'Concert', (select id from public.clients where name = 'Unilever'), 'Unilever', null, null,
  'Khadi fashion festival for Tresemme, Unilever.', true, 6, 'published', 14
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'tresemme-khadi-fest'), 'projects/tresemme-khadi-fest/1.jpg', 833, 417, 'Tresemme Khadi Fest — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'salim-sulaiman-concert', 'Salim–Sulaiman Concert', 'events', 'Concert', (select id from public.clients where name = 'Aga Khan Foundation'), 'Aga Khan Foundation', null, null,
  'Salim–Sulaiman concert for the Aga Khan Foundation.', false, null, 'published', 15
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'salim-sulaiman-concert'), 'projects/salim-sulaiman-concert/1.jpg', 547, 328, 'Salim–Sulaiman Concert — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'coca-cola-concert', 'Coca-Cola Concert', 'events', 'Concert', (select id from public.clients where name = 'Coca-Cola'), 'Coca-Cola', null, null,
  'Concert for Coca-Cola.', false, null, 'published', 16
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'coca-cola-concert'), 'projects/coca-cola-concert/1.jpg', 451, 301, 'Coca-Cola Concert — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'northern-university-convocation', '6th Convocation', 'events', 'Convocation', (select id from public.clients where name = 'Northern University'), 'Northern University', 'Northern University Campus', null,
  'Sixth convocation of Northern University on its campus.', false, null, 'published', 17
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'northern-university-convocation'), 'projects/northern-university-convocation/1.jpg', 1500, 742, '6th Convocation — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'usaid-national-conference', 'National Conference', 'events', 'Conference', (select id from public.clients where name = 'USAID'), 'USAID', 'BICC', null,
  'USAID national conference at Bangabandhu International Conference Center.', true, null, 'published', 18
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'usaid-national-conference'), 'projects/usaid-national-conference/1.jpg', 1500, 742, 'National Conference — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'financial-express-20th-anniversary', '20th Anniversary', 'events', 'Corporate event', (select id from public.clients where name = 'The Financial Express'), 'The Financial Express', 'Winter Garden, Ruposhi Bangla Hotel', null,
  'Twentieth anniversary celebration of The Financial Express.', false, null, 'published', 19
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'financial-express-20th-anniversary'), 'projects/financial-express-20th-anniversary/1.jpg', 1500, 742, '20th Anniversary — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'ttx-group-10th-anniversary', '10th Anniversary', 'events', 'Corporate event', null, 'Transport Team Express Group', 'Spectra Convention Hall', null,
  'Tenth anniversary of TTX Group.', false, null, 'published', 20
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'ttx-group-10th-anniversary'), 'projects/ttx-group-10th-anniversary/1.jpg', 1500, 742, '10th Anniversary — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'run-for-changing-diabetes', 'Run for Changing Diabetes', 'events', 'Sports', null, 'Novo Nordisk Pharma', 'Shahbag to Press Club (3.4 km)', null,
  'Marathon race from Shahbag to the Press Club for Novo Nordisk.', false, null, 'published', 21
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'run-for-changing-diabetes'), 'projects/run-for-changing-diabetes/1.jpg', 1500, 689, 'Run for Changing Diabetes — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'h-power-dealer-meet', 'Dealer Meet 2015 & 2016', 'events', 'Dealer program', null, 'H Power Motors', 'Radisson Blu & Gazipur', '2015–2016',
  'Two years of dealer meets for H Power Motors.', false, null, 'published', 22
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'h-power-dealer-meet'), 'projects/h-power-dealer-meet/1.jpg', 1500, 742, 'Dealer Meet 2015 & 2016 — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'shahjalal-exim-agm', 'AGM', 'events', 'Event management', null, 'Shahjalal Islami Bank & EXIM Bank', 'BRAC CDM & Raowa Club', null,
  'Annual general meetings for Shahjalal Islami Bank and EXIM Bank.', false, null, 'published', 23
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'shahjalal-exim-agm'), 'projects/shahjalal-exim-agm/1.jpg', 1500, 742, 'AGM — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'shahjalal-managers-conference', 'Manager''s Conference + Scholarship Program', 'events', 'Seminar', (select id from public.clients where name = 'Shahjalal Islami Bank'), 'Shahjalal Islami Bank', 'Ruposhi Bangla & Marriott Convention', null,
  'Managers'' conference and scholarship program.', false, null, 'published', 24
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'shahjalal-managers-conference'), 'projects/shahjalal-managers-conference/1.jpg', 1500, 742, 'Manager''s Conference + Scholarship Program — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'shahjalal-branch-openings', '23 Branch Openings', 'events', 'Launch', (select id from public.clients where name = 'Shahjalal Islami Bank'), 'Shahjalal Islami Bank', '23 branches across the country', null,
  'Opening events for 23 Shahjalal Islami Bank branches around the country.', true, null, 'published', 25
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'shahjalal-branch-openings'), 'projects/shahjalal-branch-openings/1.jpg', 1500, 742, '23 Branch Openings — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'ilo-medtronic-conference', 'Conferences', 'events', 'Conference', null, 'ILO · Medtronic India', 'Ball Room, Ruposhi Bangla Hotel', null,
  'Conferences for ILO and Medtronic India.', false, null, 'published', 26
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'ilo-medtronic-conference'), 'projects/ilo-medtronic-conference/1.jpg', 1500, 742, 'Conferences — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'dphe-follow-up-program', 'Follow-Up Program', 'events', 'Seminar', null, 'Local Government Division', 'Department of Public Health & Engineering (DPHE)', null,
  'Follow-up program for the Local Government Division at DPHE.', false, null, 'published', 27
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'dphe-follow-up-program'), 'projects/dphe-follow-up-program/1.jpg', 1500, 742, 'Follow-Up Program — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'hankuk-contract-signing', 'Contract Signing Ceremony', 'events', 'Ceremony', (select id from public.clients where name = 'Hankuk Engineering'), 'Hankuk Engineering', 'Pan Pacific Sonargaon, Dhaka', null,
  'Contract signing ceremony for Hankuk Engineering.', false, null, 'published', 28
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'hankuk-contract-signing'), 'projects/hankuk-contract-signing/1.jpg', 1500, 742, 'Contract Signing Ceremony — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'diabetes-day-roadshow', 'Diabetes Day Awareness Roadshow', 'events', 'Roadshow', null, 'Novo Nordisk Pharma', 'Shahbag Mor', null,
  'Awareness roadshow on World Diabetes Day, 14 November.', false, null, 'published', 29
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'diabetes-day-roadshow'), 'projects/diabetes-day-roadshow/1.jpg', 1500, 742, 'Diabetes Day Awareness Roadshow — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'national-premix-summit', 'National Premix Summit', 'events', 'Conference', null, 'Novo Nordisk Pharma', 'BRAC CDM, Savar', null,
  'National Premix Summit for Novo Nordisk.', false, null, 'published', 30
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'national-premix-summit'), 'projects/national-premix-summit/1.jpg', 1500, 742, 'National Premix Summit — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'dhl-family-day-out', 'Family Day Out', 'events', 'Corporate tour', (select id from public.clients where name = 'DHL Global Forwarding'), 'DHL Global Forwarding', 'Angona Resort, Gazipur', null,
  'Family day out for DHL Global Forwarding.', false, null, 'published', 31
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'dhl-family-day-out'), 'projects/dhl-family-day-out/1.jpg', 1500, 742, 'Family Day Out — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'birthday-event', 'Birthday Event Planning', 'events', 'Family event', null, 'Private client', 'Hotel Le Méridien, Dhaka', null,
  'Birthday event planning for a prominent banker.', false, null, 'published', 32
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'birthday-event'), 'projects/birthday-event/1.jpg', 1500, 742, 'Birthday Event Planning — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'wedding-events', 'Wedding Event Planning', 'events', 'Family event', null, 'Private clients', 'Pan Pacific Sonargaon, Ruposhi Bangla, The Westin, Le Méridien, ICCB, BICC', null,
  'Wedding planning at most of the city''s prominent venues.', false, null, 'published', 33
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'wedding-events'), 'projects/wedding-events/1.jpg', 1500, 516, 'Wedding Event Planning — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'jams-auto-launch', 'JAMS Auto Launching Program', 'events', 'Launch', (select id from public.clients where name = 'JAMS Group'), 'JAMS Group', 'Ball Room, The Westin', null,
  'Launch program for JAMS Auto.', false, null, 'published', 34
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'jams-auto-launch'), 'projects/jams-auto-launch/1.jpg', 1500, 742, 'JAMS Auto Launching Program — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'forever-living-success-day', 'Success Day', 'events', 'Conference', null, 'Forever Living Products', 'Celebrity Hall, BICC', null,
  'Forever Living Success Day.', false, null, 'published', 35
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'forever-living-success-day'), 'projects/forever-living-success-day/1.jpg', 1500, 742, 'Success Day — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'big-bangla-run-2015', 'Big Bangla Run ’15', 'events', 'Sports', null, 'Novo Nordisk Pharma', 'Ladies Club to Manik Mia Avenue (21.1 km)', '2015',
  'Half-marathon from Ladies Club to Manik Mia Avenue.', true, null, 'published', 36
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'big-bangla-run-2015'), 'projects/big-bangla-run-2015/1.jpg', 1500, 742, 'Big Bangla Run ’15 — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'big-bangla-run-2014', 'Big Bangla Run ’14', 'events', 'Sports', null, 'Novo Nordisk & Sports International', 'Ladies Club to Manik Mia Avenue', '2014',
  'Mass sports event and its PR.', false, null, 'published', 37
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'big-bangla-run-2014'), 'projects/big-bangla-run-2014/1.jpg', 1500, 742, 'Big Bangla Run ’14 — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'preety-housing-fair', 'Preety Housing Fair', 'events', 'Fair management', null, null, null, null,
  'Fair management and stall set-up for the housing fair.', false, null, 'published', 38
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'preety-housing-fair'), 'projects/preety-housing-fair/1.jpg', 1424, 1325, 'Preety Housing Fair — photo 1', 0),
  ((select id from public.projects where slug = 'preety-housing-fair'), 'projects/preety-housing-fair/2.jpg', 1424, 1325, 'Preety Housing Fair — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'robi-boishakhi-mela', 'Boishakhi Mela', 'events', 'Fair management', (select id from public.clients where name = 'Robi'), 'Robi', null, null,
  'Boishakhi Mela for Robi.', false, null, 'published', 39
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'robi-boishakhi-mela'), 'projects/robi-boishakhi-mela/1.jpg', 1424, 1325, 'Boishakhi Mela — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'aust-job-fiesta', 'AUST Job Fiesta', 'events', 'Fair management', (select id from public.clients where name = 'AUST'), 'AUST', null, null,
  'National job fair and career symposium for AUST.', false, null, 'published', 40
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'aust-job-fiesta'), 'projects/aust-job-fiesta/1.jpg', 1424, 1325, 'AUST Job Fiesta — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'malaysian-edu-expo', 'Malaysian Edu Expo', 'events', 'Fair management', (select id from public.clients where name = 'MUAC'), 'MUAC', 'Ruposhi Bangla · Radisson · Spectra · Westin', null,
  'Education expo across four Dhaka venues.', false, null, 'published', 41
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'malaysian-edu-expo'), 'projects/malaysian-edu-expo/1.jpg', 1500, 758, 'Malaysian Edu Expo — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'meril-car-van-activation', 'Car Van Activation', 'events', 'Activation', null, 'Meril', null, null,
  'Branded van activation for Meril.', false, null, 'published', 42
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'meril-car-van-activation'), 'projects/meril-car-van-activation/1.jpg', 593, 312, 'Car Van Activation — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'coca-cola-rim-zim-activation', 'Rim Zim Activation', 'events', 'Activation', (select id from public.clients where name = 'Coca-Cola'), 'Coca-Cola', null, null,
  'Market activation for Coca-Cola Rim Zim.', false, null, 'published', 43
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'coca-cola-rim-zim-activation'), 'projects/coca-cola-rim-zim-activation/1.jpg', 602, 309, 'Rim Zim Activation — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'dano-school-activation', 'School Activation', 'events', 'Activation', null, 'DANO', null, null,
  'School activation for DANO.', false, null, 'published', 44
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'dano-school-activation'), 'projects/dano-school-activation/1.jpg', 847, 445, 'School Activation — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'walton-colony-carnival', 'Colony Carnival', 'events', 'Activation', (select id from public.clients where name = 'Walton'), 'Walton', null, null,
  'Colony carnival activation for Walton.', true, 8, 'published', 45
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'walton-colony-carnival'), 'projects/walton-colony-carnival/1.jpg', 612, 309, 'Colony Carnival — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'parachute-beliphool-activation', 'Beliphool Hair Oil Activation', 'events', 'Activation', null, 'Parachute', null, null,
  'Activation for Parachute Beliphool hair oil.', false, null, 'published', 46
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'parachute-beliphool-activation'), 'projects/parachute-beliphool-activation/1.jpg', 769, 406, 'Beliphool Hair Oil Activation — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'maggi-wet-market-activation', 'Wet Market Activation', 'events', 'Activation', null, 'Maggi', null, null,
  'Wet market activation for Maggi.', false, null, 'published', 47
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'maggi-wet-market-activation'), 'projects/maggi-wet-market-activation/1.jpg', 711, 426, 'Wet Market Activation — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'teer-activation', 'Activation for Teer', 'events', 'Activation', null, 'Teer', null, null,
  'Brand activation for Teer.', false, null, 'published', 48
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'teer-activation'), 'projects/teer-activation/1.jpg', 427, 310, 'Activation for Teer — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'pureit-corporate-activation', 'Pureit Corporate Activation', 'events', 'Activation', (select id from public.clients where name = 'Unilever'), 'Unilever', null, null,
  'Corporate activation for Unilever Pureit.', false, null, 'published', 49
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'pureit-corporate-activation'), 'projects/pureit-corporate-activation/1.jpg', 427, 309, 'Pureit Corporate Activation — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'activation-kiosks', 'Activation Kiosks', 'events', 'Activation', null, '20+ companies', null, null,
  'Activation kiosk designs for more than 20 companies.', false, null, 'published', 50
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'activation-kiosks'), 'projects/activation-kiosks/1.jpg', 1500, 758, 'Activation Kiosks — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'ok-mobile-ramadan-eid', 'Ramadan & Eid Activation', 'events', 'Activation', (select id from public.clients where name = 'OK Mobile'), 'OK Mobile', '18 shopping malls & 6 recreation points', null,
  'Activation in 18 shopping malls and 6 recreation points.', true, null, 'published', 51
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'ok-mobile-ramadan-eid'), 'projects/ok-mobile-ramadan-eid/1.jpg', 1500, 758, 'Ramadan & Eid Activation — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'branded-van-horse-chariot', 'Branded Van & Horse Chariot', 'events', 'Activation', null, null, null, null,
  'Product activation through branded vans and a horse chariot.', false, null, 'published', 52
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'branded-van-horse-chariot'), 'projects/branded-van-horse-chariot/1.jpg', 1500, 758, 'Branded Van & Horse Chariot — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'big-bangla-run-2014-pr', 'PR Coverage: Big Bangla Run ’14', 'brand', 'Public relations', null, 'Novo Nordisk & Sports International', null, '2014',
  'Print coverage for Big Bangla Run 2014.', false, null, 'published', 53
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'big-bangla-run-2014-pr'), 'projects/big-bangla-run-2014-pr/1.jpg', 1500, 742, 'PR Coverage: Big Bangla Run ’14 — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'big-bangla-run-2015-press-conference', 'Pre-Press Conference: Big Bangla Run ’15', 'brand', 'Public relations', null, 'Novo Nordisk & Sports International', 'Daily Star Building', '2015',
  'Pre-event press conference and its coverage.', false, null, 'published', 54
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'big-bangla-run-2015-press-conference'), 'projects/big-bangla-run-2015-press-conference/1.jpg', 1500, 742, 'Pre-Press Conference: Big Bangla Run ’15 — photo 1', 0),
  ((select id from public.projects where slug = 'big-bangla-run-2015-press-conference'), 'projects/big-bangla-run-2015-press-conference/2.jpg', 1500, 742, 'Pre-Press Conference: Big Bangla Run ’15 — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'big-bangla-run-2015-pr', 'PR Coverage: Big Bangla Run ’15', 'brand', 'Public relations', null, 'Novo Nordisk & Sports International', null, '2015',
  'Print coverage for Big Bangla Run 2015.', false, null, 'published', 55
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'big-bangla-run-2015-pr'), 'projects/big-bangla-run-2015-pr/1.jpg', 1500, 742, 'PR Coverage: Big Bangla Run ’15 — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'ibrahim-medinet-pr', 'PR Coverage: Ibrahim Medinet Service', 'brand', 'Public relations', (select id from public.clients where name = 'BIRDEM'), 'BIRDEM', 'Banani 11', null,
  'Press coverage for BIRDEM''s Ibrahim Medinet Service.', false, null, 'published', 56
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'ibrahim-medinet-pr'), 'projects/ibrahim-medinet-pr/1.jpg', 1500, 742, 'PR Coverage: Ibrahim Medinet Service — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'endocrine-conference-pr', 'Endocrine Conference PR', 'brand', 'Public relations', (select id from public.clients where name = 'Novo Nordisk'), 'Novo Nordisk', 'Mirpur BHRF', null,
  'PR coverage for the endocrine conference.', false, null, 'published', 57
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'endocrine-conference-pr'), 'projects/endocrine-conference-pr/1.jpg', 1500, 742, 'Endocrine Conference PR — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'cdic-camp-pr', 'CDIC Camp PR', 'brand', 'Public relations', (select id from public.clients where name = 'Novo Nordisk'), 'Novo Nordisk', 'BRAC CDM, Savar', null,
  'PR coverage for the CDIC camp.', false, null, 'published', 58
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'cdic-camp-pr'), 'projects/cdic-camp-pr/1.jpg', 1500, 742, 'CDIC Camp PR — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'world-diabetes-day-pr', 'World Diabetes Day PR', 'brand', 'Public relations', null, 'Novo Nordisk & BADAS', 'Shahbag & BIRDEM', null,
  'PR coverage for World Diabetes Day.', false, null, 'published', 59
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'world-diabetes-day-pr'), 'projects/world-diabetes-day-pr/1.jpg', 1500, 742, 'World Diabetes Day PR — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'moka-cafe-featured-pr', 'Featured PR', 'brand', 'Public relations', null, 'Moka Café & Bistro', null, null,
  'Featured lifestyle-page coverage.', false, null, 'published', 60
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'moka-cafe-featured-pr'), 'projects/moka-cafe-featured-pr/1.jpg', 1500, 758, 'Featured PR — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'elite-paint-dealer-meet', 'Elite Paint Dealer Meet', 'brand', 'Public relations', (select id from public.clients where name = 'Elite Paint'), 'Elite Paint', 'Raowa Club', null,
  'Dealer meet covered by more than 20 newspapers and 10 TV channels.', true, null, 'published', 61
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'elite-paint-dealer-meet'), 'projects/elite-paint-dealer-meet/1.jpg', 1500, 758, 'Elite Paint Dealer Meet — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'give-me-five-campaign', '“Give Me Five” Campaign Launch', 'brand', 'Public relations', (select id from public.clients where name = 'CP Bangladesh'), 'CP Bangladesh', 'Lakeshore Hotel, Gulshan', null,
  'Campaign launch for CP Bangladesh.', false, null, 'published', 62
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'give-me-five-campaign'), 'projects/give-me-five-campaign/1.jpg', 1500, 758, '“Give Me Five” Campaign Launch — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'h-power-product-shoot', 'Product Photo Shoot', 'brand', 'Media production', null, 'H Power Motors', null, null,
  'Product photography for three bike models.', false, null, 'published', 63
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'h-power-product-shoot'), 'projects/h-power-product-shoot/1.jpg', 1500, 758, 'Product Photo Shoot — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'digital-content', 'Digital Content Development', 'brand', 'Digital marketing', null, '20+ companies', null, null,
  'Digital marketing content for more than 20 companies.', false, null, 'published', 64
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'digital-content'), 'projects/digital-content/1.jpg', 1500, 758, 'Digital Content Development — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'web-banners', 'Web Templates', 'brand', 'Digital marketing', null, '10+ companies', null, null,
  'Web banner content for more than 10 companies.', false, null, 'published', 65
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'web-banners'), 'projects/web-banners/1.jpg', 1500, 758, 'Web Templates — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'calendar-printing', 'Calendar Design & Printing', 'brand', 'Design & printing', null, '15 companies', null, null,
  'Desk and wall calendars for 15 companies in a year.', false, null, 'published', 66
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'calendar-printing'), 'projects/calendar-printing/1.jpg', 1500, 758, 'Calendar Design & Printing — photo 1', 0),
  ((select id from public.projects where slug = 'calendar-printing'), 'projects/calendar-printing/2.jpg', 1500, 758, 'Calendar Design & Printing — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'eid-greeting-cards', 'Eid Greeting Cards', 'brand', 'Design & printing', null, null, null, null,
  'Greeting card design and printing.', false, null, 'published', 67
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'eid-greeting-cards'), 'projects/eid-greeting-cards/1.jpg', 1500, 758, 'Eid Greeting Cards — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  't-shirts-and-caps', 'T-Shirts & Caps', 'brand', 'Promotional items', null, null, null, null,
  'Branded apparel for campaigns and events.', false, null, 'published', 68
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 't-shirts-and-caps'), 'projects/t-shirts-and-caps/1.jpg', 1500, 758, 'T-Shirts & Caps — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'gift-items', 'Gift Items', 'brand', 'Promotional items', null, 'MNC & pharma companies', null, null,
  'Bulk gift items supplied to MNC and pharma companies.', false, null, 'published', 69
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'gift-items'), 'projects/gift-items/1.jpg', 1500, 758, 'Gift Items — photo 1', 0),
  ((select id from public.projects where slug = 'gift-items'), 'projects/gift-items/2.jpg', 1500, 758, 'Gift Items — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'led-displays', 'Indoor & Outdoor LED Display', 'brand', 'LED Display', null, null, null, null,
  'Indoor and outdoor LED screens, kiosks and displays.', false, null, 'published', 70
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'led-displays'), 'projects/led-displays/1.jpg', 1500, 758, 'Indoor & Outdoor LED Display — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'expo-stalls-01', 'Expo Stalls — Set I', 'exhibition', 'Stall design', null, 'Mazim Corporation · Mozitor Elevator · Rifat Aluminum and more', null, null,
  'Stall design and fabrication for Mazim Corporation, Mozitor Elevator, Rifat Aluminum, Rosemount BD, Shaheli Elevator, Tetra Technology.', true, 5, 'published', 71
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'expo-stalls-01'), 'projects/expo-stalls-01/2.jpg', 662, 344, 'Expo Stalls — Set I — photo 1', 0),
  ((select id from public.projects where slug = 'expo-stalls-01'), 'projects/expo-stalls-01/3.jpg', 586, 364, 'Expo Stalls — Set I — photo 2', 1),
  ((select id from public.projects where slug = 'expo-stalls-01'), 'projects/expo-stalls-01/1.jpg', 1039, 723, 'Expo Stalls — Set I — photo 3', 2);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'expo-stalls-02', 'Expo Stalls — Set II', 'exhibition', 'Stall design', null, 'Duma (Maa Enterprise) · Canlar Mekatronik · Ekhanei.com and more', null, null,
  'Stall design and fabrication for Duma (Maa Enterprise), Canlar Mekatronik, Ekhanei.com, Energyshield Engineering, Asif Enterprise, Eastman Technocrafts.', false, null, 'published', 72
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'expo-stalls-02'), 'projects/expo-stalls-02/1.jpg', 1039, 723, 'Expo Stalls — Set II — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'expo-stalls-03', 'Expo Stalls — Set III', 'exhibition', 'Stall design', null, 'Pridesys IT · Magnolia Tea · ATAC and more', null, null,
  'Stall design and fabrication for Pridesys IT, Magnolia Tea, ATAC, Canlar Mekatronik, EFFE, Jilong Machinery.', false, null, 'published', 73
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'expo-stalls-03'), 'projects/expo-stalls-03/1.jpg', 1039, 723, 'Expo Stalls — Set III — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'expo-stalls-04', 'Expo Stalls — Set IV', 'exhibition', 'Stall design', null, 'Jilong Machine Industry · Marubeni Corporation · IBN Corporation and more', null, null,
  'Stall design and fabrication for Jilong Machine Industry, Marubeni Corporation, IBN Corporation, Ramsons, Nitika Pharmaceuticals, Polar Vista.', false, null, 'published', 74
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'expo-stalls-04'), 'projects/expo-stalls-04/1.jpg', 1039, 723, 'Expo Stalls — Set IV — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'expo-stalls-05', 'Expo Stalls — Set V', 'exhibition', 'Stall design', null, 'Safa Tex · Shah Sharif · Samico International and more', null, null,
  'Stall design and fabrication for Safa Tex, Shah Sharif, Samico International, Sun Trading Co., Sattar International, Sun Sir.', false, null, 'published', 75
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'expo-stalls-05'), 'projects/expo-stalls-05/1.jpg', 1039, 723, 'Expo Stalls — Set V — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'expo-stalls-06', 'Expo Stalls — Set VI', 'exhibition', 'Stall design', null, 'SWAC · ECO Food · Pacific Associates and more', null, null,
  'Stall design and fabrication for SWAC, ECO Food, Pacific Associates, Haojue (Karnaphuli Group), Kazi Farms, Kwality Icecream.', true, null, 'published', 76
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'expo-stalls-06'), 'projects/expo-stalls-06/1.jpg', 1039, 726, 'Expo Stalls — Set VI — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'expo-stalls-07', 'Expo Stalls — Set VII', 'exhibition', 'Stall design', null, 'Lock & Lock · MB Traders · MNS Corporation and more', null, null,
  'Stall design and fabrication for Lock & Lock, MB Traders, MNS Corporation, Paragon, MAQL, Shanhai Deck Lace.', false, null, 'published', 77
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'expo-stalls-07'), 'projects/expo-stalls-07/1.jpg', 1039, 723, 'Expo Stalls — Set VII — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'expo-stalls-08', 'Expo Stalls — Set VIII', 'exhibition', 'Stall design', null, 'Sonali Group · TETRA Technology · WE Mobile and more', null, null,
  'Stall design and fabrication for Sonali Group, TETRA Technology, WE Mobile, Wintex Resources, Shima Seiki.', false, null, 'published', 78
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'expo-stalls-08'), 'projects/expo-stalls-08/1.jpg', 1039, 723, 'Expo Stalls — Set VIII — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'expo-stalls-09', 'Expo Stalls — Set IX', 'exhibition', 'Stall design', null, 'Forbes Marshall · ERP.COM · Euro Elevator and more', null, null,
  'Stall design and fabrication for Forbes Marshall, ERP.COM, Euro Elevator, Global Lift, Horizon Techno, K.L.D.', false, null, 'published', 79
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'expo-stalls-09'), 'projects/expo-stalls-09/1.jpg', 722, 456, 'Expo Stalls — Set IX — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'expo-stalls-10', 'Expo Stalls — Set X', 'exhibition', 'Stall design', null, 'Renata · Nahar Agro · Alltech and more', null, null,
  'Stall design and fabrication for Renata, Nahar Agro, Alltech, Chowa Agro, Asgor Trading, Guardtech.', false, null, 'published', 80
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'expo-stalls-10'), 'projects/expo-stalls-10/1.jpg', 1039, 723, 'Expo Stalls — Set X — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'expo-stalls-11', 'Expo Stalls — Set XI', 'exhibition', 'Stall design', null, 'Luna Plastic · Aristo Corporation · Taasin Trading Corporation and more', null, null,
  'Stall design and fabrication for Luna Plastic, Aristo Corporation, Taasin Trading Corporation, Earnest Eng., SMS Feed, IESL.', false, null, 'published', 81
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'expo-stalls-11'), 'projects/expo-stalls-11/1.jpg', 1039, 721, 'Expo Stalls — Set XI — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'brand-shop-interiors', 'Brand Shop Interiors', 'interior', 'Retail', null, 'Bajaj · TV Bangladesh · WE Mobile · US Bangla · Runner · Haojue', null, null,
  'Brand shops for Bajaj, TV Bangladesh, WE Mobile, US-Bangla Freight, Runner Automobiles and Haojue (Karnaphuli Group).', false, null, 'published', 82
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'brand-shop-interiors'), 'projects/brand-shop-interiors/1.jpg', 1039, 730, 'Brand Shop Interiors — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'restaurant-shop-interiors', 'Restaurant & Shop Interiors', 'interior', 'Restaurant & retail', null, 'Cafe 99 · Emporium · Hallmark · Feroza', null, null,
  'Cafe 99, restaurants in Mirpur and Uttara, Emporium Banquet Hall, Feroza Super Shop and a Hallmark gift shop.', false, null, 'published', 83
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'restaurant-shop-interiors'), 'projects/restaurant-shop-interiors/1.jpg', 1039, 730, 'Restaurant & Shop Interiors — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'office-interiors', 'Office Interiors', 'interior', 'Office', null, 'Shah Sharif · Mafco Group · MB Traders', null, null,
  'Head offices for Shah Sharif, Mafco Group and MB Traders, an office in Uttara and an electronics super shop at Bashundhara.', false, null, 'published', 84
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'office-interiors'), 'projects/office-interiors/1.jpg', 1039, 730, 'Office Interiors — photo 1', 0),
  ((select id from public.projects where slug = 'office-interiors'), 'projects/office-interiors/2.jpg', 1039, 730, 'Office Interiors — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'residential-interiors', 'Residential Interiors', 'interior', 'Residential', null, 'Private clients', null, null,
  'Residential interiors.', false, null, 'published', 85
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'residential-interiors'), 'projects/residential-interiors/1.jpg', 1039, 730, 'Residential Interiors — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'elegant-bar-setup', 'Elegant Bar Setup', 'interior', 'Restaurant', null, null, null, null,
  'A modern bar that pairs warm wood textures with sleek metallic finishes, built around a high-end espresso machine, fresh fruit and an array of syrups and spirits.', false, null, 'published', 86
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'elegant-bar-setup'), 'projects/elegant-bar-setup/1.jpg', 931, 621, 'Elegant Bar Setup — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'luxurious-cafe', 'Luxurious Café', 'interior', 'Restaurant', null, null, null, null,
  'Ambient lighting, clean lines and a sophisticated wall paint create a cosy yet upscale café and lounge.', true, null, 'published', 87
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'luxurious-cafe'), 'projects/luxurious-cafe/1.jpg', 827, 552, 'Luxurious Café — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'relax-furniture', 'Relax Furniture', 'interior', 'Restaurant', null, null, null, null,
  'A refined dining area with warm-toned marble flooring and ample natural light — elegance and comfort for a boutique café or bistro.', false, null, 'published', 88
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'relax-furniture'), 'projects/relax-furniture/1.jpg', 654, 436, 'Relax Furniture — photo 1', 0),
  ((select id from public.projects where slug = 'relax-furniture'), 'projects/relax-furniture/2.jpg', 654, 436, 'Relax Furniture — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'inspiring-wall-art', 'Inspiring Wall Art', 'interior', 'Restaurant', null, null, null, null,
  'A mural of diverse hands reaching toward a shared coffee cup, set against teal walls, warm wooden tables and plush green banquettes.', true, 2, 'published', 89
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'inspiring-wall-art'), 'projects/inspiring-wall-art/1.jpg', 1063, 709, 'Inspiring Wall Art — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'modern-office-space', 'Modern Office Space', 'interior', 'Law chamber', null, null, null, null,
  'A refined waiting area with plush grey seating and tasteful wall art that welcomes clients and visitors.', false, null, 'published', 90
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'modern-office-space'), 'projects/modern-office-space/1.jpg', 827, 552, 'Modern Office Space — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'aesthetic-showcases', 'Aesthetic Showcases', 'interior', 'Law chamber', null, null, null, null,
  'A law chamber conference room centred on a sleek dark-wood table with high-back leather chairs.', false, null, 'published', 91
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'aesthetic-showcases'), 'projects/aesthetic-showcases/1.jpg', 830, 554, 'Aesthetic Showcases — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'corporate-conference', 'Corporate Conference', 'interior', 'Law chamber', null, null, null, null,
  'A soundproof conference room with dark wood, leather seating and backlit shelving with intricate paneling.', false, null, 'published', 92
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'corporate-conference'), 'projects/corporate-conference/1.jpg', 827, 552, 'Corporate Conference — photo 1', 0),
  ((select id from public.projects where slug = 'corporate-conference'), 'projects/corporate-conference/2.jpg', 408, 272, 'Corporate Conference — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'elegant-seating', 'Elegant Seating', 'interior', 'Law chamber', null, null, null, null,
  'Modern sofas for client waiting areas and informal discussions.', false, null, 'published', 93
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'elegant-seating'), 'projects/elegant-seating/1.jpg', 504, 336, 'Elegant Seating — photo 1', 0),
  ((select id from public.projects where slug = 'elegant-seating'), 'projects/elegant-seating/2.jpg', 425, 258, 'Elegant Seating — photo 2', 1),
  ((select id from public.projects where slug = 'elegant-seating'), 'projects/elegant-seating/3.jpg', 425, 637, 'Elegant Seating — photo 3', 2);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'head-of-chamber', 'Head of Chamber', 'interior', 'Law chamber', null, null, null, null,
  'A cabin for authority and comfort: premium furnishings, glass partitions for privacy and tasteful décor.', false, null, 'published', 94
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'head-of-chamber'), 'projects/head-of-chamber/1.jpg', 700, 467, 'Head of Chamber — photo 1', 0),
  ((select id from public.projects where slug = 'head-of-chamber'), 'projects/head-of-chamber/2.jpg', 467, 700, 'Head of Chamber — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'maximize-space', 'Maximize Space', 'interior', 'Law chamber', null, null, null, null,
  'A compact room that maximises function without giving up style — efficient layout, modern finishes, thoughtful detail.', false, null, 'published', 95
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'maximize-space'), 'projects/maximize-space/1.jpg', 431, 647, 'Maximize Space — photo 1', 0),
  ((select id from public.projects where slug = 'maximize-space'), 'projects/maximize-space/2.jpg', 431, 647, 'Maximize Space — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'utilize-every-corner', 'Utilize Every Corner', 'interior', 'Law chamber', null, null, null, null,
  'Smart storage and a purposeful layout turn limited space into a fully working, stylish room.', false, null, 'published', 96
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'utilize-every-corner'), 'projects/utilize-every-corner/1.jpg', 675, 450, 'Utilize Every Corner — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'olympia-bakery', 'Olympia Bakery, Banani', 'interior', 'Bakery & pastry', null, null, null, null,
  'A warm, artisanal branch interior with cosy seating, clean workflow and a glass-fronted, lit pastry display.', true, 7, 'published', 97
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'olympia-bakery'), 'projects/olympia-bakery/1.jpg', 640, 443, 'Olympia Bakery, Banani — photo 1', 0),
  ((select id from public.projects where slug = 'olympia-bakery'), 'projects/olympia-bakery/2.jpg', 466, 330, 'Olympia Bakery, Banani — photo 2', 1),
  ((select id from public.projects where slug = 'olympia-bakery'), 'projects/olympia-bakery/3.jpg', 732, 487, 'Olympia Bakery, Banani — photo 3', 2),
  ((select id from public.projects where slug = 'olympia-bakery'), 'projects/olympia-bakery/4.jpg', 827, 518, 'Olympia Bakery, Banani — photo 4', 3);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'lift-lobby', 'Lift Lobby', 'interior', 'Corporate office', null, null, null, null,
  'A minimalist lift lobby with ambient lighting, natural materials and elegant wall paneling.', false, null, 'published', 98
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'lift-lobby'), 'projects/lift-lobby/1.jpg', 613, 409, 'Lift Lobby — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'luxurious-chamber', 'Luxurious Chamber', 'interior', 'Corporate office', null, null, null, null,
  'The Managing Director''s room: bespoke furniture, rich wood, acoustic control and refined textures.', false, null, 'published', 99
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'luxurious-chamber'), 'projects/luxurious-chamber/1.jpg', 577, 385, 'Luxurious Chamber — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'high-end-work-station', 'High End Work Station', 'interior', 'Corporate office', null, null, null, null,
  'Modular, ergonomic desks with integrated cable management, soft lighting and acoustic panels.', false, null, 'published', 100
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'high-end-work-station'), 'projects/high-end-work-station/1.jpg', 750, 500, 'High End Work Station — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'cool-work-environment', 'Cool Work Environment', 'interior', 'Corporate office', null, null, null, null,
  'A biophilic workstation with sustainable materials, warm wood, greenery and natural light.', false, null, 'published', 101
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'cool-work-environment'), 'projects/cool-work-environment/1.jpg', 588, 392, 'Cool Work Environment — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'nexus-room', 'Nexus Room', 'interior', 'Corporate office', null, null, null, null,
  'A boardroom with the company''s values — Integrity, Excellence, Commitment, Teamwork — set into the walls.', true, 4, 'published', 102
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'nexus-room'), 'projects/nexus-room/1.jpg', 616, 411, 'Nexus Room — photo 1', 0),
  ((select id from public.projects where slug = 'nexus-room'), 'projects/nexus-room/2.jpg', 638, 425, 'Nexus Room — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'director-chamber', 'Director Chamber', 'interior', 'Corporate office', null, null, null, null,
  'A director''s chamber with dark wood, glass and leather.', false, null, 'published', 103
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'director-chamber'), 'projects/director-chamber/1.jpg', 575, 383, 'Director Chamber — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'smart-lower-cabinet', 'Smart Lower Cabinet', 'interior', 'Corporate office', null, null, null, null,
  'Low built-in cabinetry that keeps the room clear.', false, null, 'published', 104
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'smart-lower-cabinet'), 'projects/smart-lower-cabinet/1.jpg', 687, 458, 'Smart Lower Cabinet — photo 1', 0),
  ((select id from public.projects where slug = 'smart-lower-cabinet'), 'projects/smart-lower-cabinet/2.jpg', 687, 458, 'Smart Lower Cabinet — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'cool-seating-arrangement', 'Cool Seating Arrangement', 'interior', 'Corporate office', null, null, null, null,
  'Seating by the window for short meetings and breaks.', false, null, 'published', 105
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'cool-seating-arrangement'), 'projects/cool-seating-arrangement/1.jpg', 750, 500, 'Cool Seating Arrangement — photo 1', 0),
  ((select id from public.projects where slug = 'cool-seating-arrangement'), 'projects/cool-seating-arrangement/2.jpg', 609, 406, 'Cool Seating Arrangement — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'exclusive-upper-cabinet', 'Exclusive Upper Cabinet', 'interior', 'Corporate office', null, null, null, null,
  'Upper cabinetry with integrated lighting.', false, null, 'published', 106
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'exclusive-upper-cabinet'), 'projects/exclusive-upper-cabinet/1.jpg', 639, 426, 'Exclusive Upper Cabinet — photo 1', 0),
  ((select id from public.projects where slug = 'exclusive-upper-cabinet'), 'projects/exclusive-upper-cabinet/2.jpg', 515, 344, 'Exclusive Upper Cabinet — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'elevate-your-space', 'Elevate Your Space', 'interior', 'Exterior & facade', null, null, null, null,
  'Modern architectural facades and cool-lit interiors that make a bold first impression, inside and out.', false, null, 'published', 107
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'elevate-your-space'), 'projects/elevate-your-space/1.jpg', 742, 495, 'Elevate Your Space — photo 1', 0),
  ((select id from public.projects where slug = 'elevate-your-space'), 'projects/elevate-your-space/2.jpg', 767, 358, 'Elevate Your Space — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'welcoming-elegance', 'Welcoming Elegance', 'interior', 'Exterior & facade', null, null, null, null,
  'A front gate designed as the property''s first impression — security and style in durable materials.', false, null, 'published', 108
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'welcoming-elegance'), 'projects/welcoming-elegance/1.jpg', 678, 452, 'Welcoming Elegance — photo 1', 0),
  ((select id from public.projects where slug = 'welcoming-elegance'), 'projects/welcoming-elegance/2.jpg', 430, 645, 'Welcoming Elegance — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'heart-of-shared-moments', 'Heart of Shared Moments', 'interior', 'Dining', null, null, null, null,
  'Dining spaces that balance comfort, style and function, with natural light and premium materials.', false, null, 'published', 109
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'heart-of-shared-moments'), 'projects/heart-of-shared-moments/1.jpg', 542, 361, 'Heart of Shared Moments — photo 1', 0),
  ((select id from public.projects where slug = 'heart-of-shared-moments'), 'projects/heart-of-shared-moments/2.jpg', 542, 361, 'Heart of Shared Moments — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'seamless-protection', 'Seamless Protection', 'interior', 'Exterior & facade', null, null, null, null,
  'A parking gate and ceiling that blend security, weather protection and integrated lighting with the facade.', false, null, 'published', 110
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'seamless-protection'), 'projects/seamless-protection/1.jpg', 604, 387, 'Seamless Protection — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'comfort-meets', 'Comfort Meets', 'interior', 'Interior', null, null, null, null,
  'Ceiling and lighting details for shared spaces.', false, null, 'published', 111
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'comfort-meets'), 'projects/comfort-meets/1.jpg', 605, 404, 'Comfort Meets — photo 1', 0),
  ((select id from public.projects where slug = 'comfort-meets'), 'projects/comfort-meets/2.jpg', 405, 270, 'Comfort Meets — photo 2', 1),
  ((select id from public.projects where slug = 'comfort-meets'), 'projects/comfort-meets/3.jpg', 405, 270, 'Comfort Meets — photo 3', 2);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'private-retreat', 'Private Retreat', 'interior', 'Washroom', null, null, null, null,
  'A washroom as a calm sanctuary — sleek fixtures, natural stone, brushed metal and smart storage.', false, null, 'published', 112
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'private-retreat'), 'projects/private-retreat/1.jpg', 686, 458, 'Private Retreat — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'smart-workhub', 'Smart Workhub', 'interior', 'Corporate office', null, null, null, null,
  'Open-plan desks tailored for organisation, comfort and focus.', false, null, 'published', 113
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'smart-workhub'), 'projects/smart-workhub/1.jpg', 828, 552, 'Smart Workhub — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'command-room', 'Command Room', 'interior', 'Corporate office', null, null, null, null,
  'A floor manager''s room with direct oversight of the work floor and technology-integrated desks.', false, null, 'published', 114
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'command-room'), 'projects/command-room/1.jpg', 732, 488, 'Command Room — photo 1', 0),
  ((select id from public.projects where slug = 'command-room'), 'projects/command-room/2.jpg', 584, 389, 'Command Room — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'acoustic-panel-wall', 'Acoustic Panel Wall', 'interior', 'Acoustics', null, null, null, null,
  'Acoustic panels that cut echo and noise in offices, studios and conference rooms.', false, null, 'published', 115
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'acoustic-panel-wall'), 'projects/acoustic-panel-wall/1.jpg', 493, 329, 'Acoustic Panel Wall — photo 1', 0);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'architectural-elegance', 'Architectural Elegance', 'interior', 'Interior', null, null, null, null,
  'Ceilings, partitions and corridors drawn as one.', false, null, 'published', 116
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'architectural-elegance'), 'projects/architectural-elegance/1.jpg', 537, 358, 'Architectural Elegance — photo 1', 0),
  ((select id from public.projects where slug = 'architectural-elegance'), 'projects/architectural-elegance/2.jpg', 656, 437, 'Architectural Elegance — photo 2', 1),
  ((select id from public.projects where slug = 'architectural-elegance'), 'projects/architectural-elegance/3.jpg', 402, 268, 'Architectural Elegance — photo 3', 2),
  ((select id from public.projects where slug = 'architectural-elegance'), 'projects/architectural-elegance/4.jpg', 402, 268, 'Architectural Elegance — photo 4', 3);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'sophistication-meets', 'Sophistication Meets', 'interior', 'Meeting room', null, null, null, null,
  'A meeting room with refined finishes and carefully curated lighting.', false, null, 'published', 117
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'sophistication-meets'), 'projects/sophistication-meets/1.jpg', 601, 401, 'Sophistication Meets — photo 1', 0),
  ((select id from public.projects where slug = 'sophistication-meets'), 'projects/sophistication-meets/2.jpg', 601, 401, 'Sophistication Meets — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'relaxation-and-connection', 'Relaxation and Connection', 'interior', 'Break room', null, null, null, null,
  'A tea room with soft seating, warm light and calming décor.', false, null, 'published', 118
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'relaxation-and-connection'), 'projects/relaxation-and-connection/1.jpg', 687, 458, 'Relaxation and Connection — photo 1', 0),
  ((select id from public.projects where slug = 'relaxation-and-connection'), 'projects/relaxation-and-connection/2.jpg', 518, 345, 'Relaxation and Connection — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'green-cityscape', 'Green Cityscape', 'interior', 'Utilities', null, null, null, null,
  'A planted rooftop terrace.', false, null, 'published', 119
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'green-cityscape'), 'projects/green-cityscape/1.jpg', 644, 430, 'Green Cityscape — photo 1', 0),
  ((select id from public.projects where slug = 'green-cityscape'), 'projects/green-cityscape/2.jpg', 644, 430, 'Green Cityscape — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'harnessing-clean-energy', 'Harnessing Clean Energy', 'interior', 'Utilities', null, null, null, null,
  'Rooftop solar installation.', false, null, 'published', 120
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'harnessing-clean-energy'), 'projects/harnessing-clean-energy/1.jpg', 600, 400, 'Harnessing Clean Energy — photo 1', 0),
  ((select id from public.projects where slug = 'harnessing-clean-energy'), 'projects/harnessing-clean-energy/2.jpg', 602, 401, 'Harnessing Clean Energy — photo 2', 1);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'fire-exit-stair', 'Fire Exit Stair', 'interior', 'Utilities', null, null, null, null,
  'External steel fire exit stair.', false, null, 'published', 121
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'fire-exit-stair'), 'projects/fire-exit-stair/1.jpg', 684, 456, 'Fire Exit Stair — photo 1', 0),
  ((select id from public.projects where slug = 'fire-exit-stair'), 'projects/fire-exit-stair/2.jpg', 684, 456, 'Fire Exit Stair — photo 2', 1),
  ((select id from public.projects where slug = 'fire-exit-stair'), 'projects/fire-exit-stair/3.jpg', 1000, 1500, 'Fire Exit Stair — photo 3', 2);
insert into public.projects (slug, title, division_id, category, client_id, client_label, venue, year, summary, is_featured, featured_order, status, sort_order) values (
  'power-substation', 'Power Substation', 'interior', 'Utilities', null, null, null, null,
  'Building power substation and generator room.', false, null, 'published', 122
);
insert into public.project_images (project_id, path, width, height, alt, sort_order) values
  ((select id from public.projects where slug = 'power-substation'), 'projects/power-substation/1.jpg', 573, 382, 'Power Substation — photo 1', 0),
  ((select id from public.projects where slug = 'power-substation'), 'projects/power-substation/2.jpg', 639, 426, 'Power Substation — photo 2', 1);

-- Journey --------------------------------------------------------------------
insert into public.journey_milestones (year, title, detail, image_path, sort_order) values ('2010', 'Founded in Banani', 'A one-stop solution provider for PR, events, stalls and interiors.', null, 0);
insert into public.journey_milestones (year, title, detail, image_path, sort_order) values ('2014', 'Big Bangla Run', 'Mass sports event and PR coverage for Novo Nordisk.', null, 1);
insert into public.journey_milestones (year, title, detail, image_path, sort_order) values ('2015', 'Dealer meets & PR', 'H Power dealer meets; Elite Paint covered by 20+ papers and 10 TV channels.', null, 2);
insert into public.journey_milestones (year, title, detail, image_path, sort_order) values ('2016', 'Design & print', 'Desk and wall calendars for 15 companies, Eid cards and gifts.', null, 3);
insert into public.journey_milestones (year, title, detail, image_path, sort_order) values ('2019', 'Police check post', 'Dhaka Tribune project, 2019–2020.', null, 4);
insert into public.journey_milestones (year, title, detail, image_path, sort_order) values ('2020', 'Expos & ceremonies', 'Swiss-Bangladesh Expo and a Coca-Cola ceremony.', 'projects/coca-cola-ceremony-2020/1.jpg', 5);
insert into public.journey_milestones (year, title, detail, image_path, sort_order) values ('2024', 'BPL Opening', 'Stage, LED and event management at the stadium.', 'projects/bpl-opening-2024/1.jpg', 6);
insert into public.journey_milestones (year, title, detail, image_path, sort_order) values ('2025', 'BPL LED scoreboard', 'Video display scoreboard, Mirpur Stadium.', 'projects/bpl-led-scoreboard-2025/1.jpg', 7);
insert into public.journey_milestones (year, title, detail, image_path, sort_order) values ('Today', '15+ years, 40+ people', 'A 100,000 sq ft workshop and four divisions under one roof.', null, 8);
