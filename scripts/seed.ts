import postgres from "postgres"

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" })

async function seed() {
  console.log("Seeding database...")

  await sql`
    DROP TABLE IF EXISTS booking_seats;
    DROP TABLE IF EXISTS seats;
    DROP TABLE IF EXISTS bookings;
    DROP TABLE IF EXISTS showtimes;
    DROP TABLE IF EXISTS screens;
    DROP TABLE IF EXISTS cinemas;
    DROP TABLE IF EXISTS movies;
  `

  await sql`
    CREATE TABLE movies (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      poster_url TEXT,
      backdrop_url TEXT,
      certification TEXT,
      rating NUMERIC(3, 1),
      duration INTEGER,
      genre TEXT[],
      language TEXT,
      description TEXT,
      release_date DATE
    );
  `

  await sql`
    CREATE TABLE cinemas (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      location TEXT NOT NULL
    );
  `

  await sql`
    CREATE TABLE screens (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      cinema_id UUID REFERENCES cinemas(id),
      name TEXT NOT NULL,
      type TEXT
    );
  `

  await sql`
    CREATE TABLE showtimes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      movie_id UUID REFERENCES movies(id),
      screen_id UUID REFERENCES screens(id),
      cinema_id UUID REFERENCES cinemas(id),
      show_date DATE NOT NULL,
      show_time TIME NOT NULL,
      start_time TIMESTAMP WITH TIME ZONE NOT NULL,
      price INTEGER NOT NULL,
      format TEXT
    );
  `

  await sql`
    CREATE TABLE seats (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      showtime_id UUID REFERENCES showtimes(id),
      seat_number TEXT NOT NULL,
      row_label TEXT,
      seat_type TEXT,
      price INTEGER,
      is_available BOOLEAN DEFAULT true
    );
  `

  await sql`
    CREATE TABLE bookings (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES auth.users(id),
      showtime_id UUID REFERENCES showtimes(id),
      booking_reference TEXT,
      total_amount INTEGER,
      payment_status TEXT DEFAULT 'pending',
      booking_status TEXT DEFAULT 'confirmed',
      created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
    );
  `

  await sql`
    CREATE TABLE booking_seats (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      booking_id UUID REFERENCES bookings(id),
      seat_id UUID REFERENCES seats(id)
    );
  `

  // Enable RLS
  await sql`ALTER TABLE bookings ENABLE ROW LEVEL SECURITY`
  await sql`CREATE POLICY "Users can view own bookings" ON bookings FOR SELECT USING (auth.uid() = user_id)`
  await sql`CREATE POLICY "Users can insert own bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id)`

  await sql`ALTER TABLE movies ENABLE ROW LEVEL SECURITY`
  await sql`CREATE POLICY "Public read movies" ON movies FOR SELECT USING (true)`

  await sql`ALTER TABLE cinemas ENABLE ROW LEVEL SECURITY`
  await sql`CREATE POLICY "Public read cinemas" ON cinemas FOR SELECT USING (true)`

  await sql`ALTER TABLE screens ENABLE ROW LEVEL SECURITY`
  await sql`CREATE POLICY "Public read screens" ON screens FOR SELECT USING (true)`

  await sql`ALTER TABLE showtimes ENABLE ROW LEVEL SECURITY`
  await sql`CREATE POLICY "Public read showtimes" ON showtimes FOR SELECT USING (true)`

  await sql`ALTER TABLE seats ENABLE ROW LEVEL SECURITY`
  await sql`CREATE POLICY "Public read seats" ON seats FOR SELECT USING (true)`

  // Seed Movies with Indian and International titles
  const movies = await sql`
    INSERT INTO movies (title, poster_url, backdrop_url, certification, rating, duration, genre, language, description, release_date)
    VALUES 
    (
      'Jawan', 
      '/jawan-poster.jpg', 
      '/jawan-backdrop.jpg', 
      'UA', 
      8.4,
      169, 
      ARRAY['Action', 'Thriller', 'Drama'], 
      'Hindi', 
      'A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society.', 
      '2023-09-07'
    ),
    (
      'Pathaan', 
      '/pathaan-poster.jpg', 
      '/pathaan-backdrop.jpg', 
      'UA', 
      8.0,
      146, 
      ARRAY['Action', 'Thriller', 'Adventure'], 
      'Hindi', 
      'An Indian spy takes on the leader of a group of mercenaries who have nefarious plans to target his homeland.', 
      '2023-01-25'
    ),
    (
      'RRR', 
      '/rrr-poster.jpg', 
      '/rrr-backdrop.jpg', 
      'UA', 
      9.1,
      187, 
      ARRAY['Action', 'Drama', 'Period'], 
      'Telugu', 
      'A fictional story about two legendary revolutionaries and their journey away from home before they started fighting for their country in 1920s.', 
      '2022-03-25'
    ),
    (
      'Brahmastra', 
      '/brahmastra-poster.jpg', 
      '/brahmastra-backdrop.jpg', 
      'UA', 
      7.8,
      167, 
      ARRAY['Fantasy', 'Adventure', 'Action'], 
      'Hindi', 
      'A DJ with superpowers and his ladylove embark on a mission to protect the Brahmastra, a weapon of enormous energy, from dark forces closing in on them.', 
      '2022-09-09'
    ),
    (
      'KGF Chapter 2', 
      '/kgf2-poster.jpg', 
      '/kgf2-backdrop.jpg', 
      'UA', 
      9.2,
      168, 
      ARRAY['Action', 'Crime', 'Drama'], 
      'Kannada', 
      'In the blood-soaked Kolar Gold Fields, Rocky''s name strikes fear into his foes, while the government sees him as a threat to law and order.', 
      '2022-04-14'
    ),
    (
      'Oppenheimer', 
      '/oppenheimer-poster.jpg', 
      '/oppenheimer-backdrop.jpg', 
      'UA', 
      9.4,
      180, 
      ARRAY['Biography', 'Drama', 'History'], 
      'English', 
      'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.', 
      '2023-07-21'
    ),
    (
      'Interstellar', 
      '/interstellar-poster.jpg', 
      '/interstellar-backdrop.jpg', 
      'UA', 
      9.6,
      169, 
      ARRAY['Sci-Fi', 'Adventure', 'Drama'], 
      'English', 
      'A team of explorers travel through a wormhole in space in an attempt to ensure humanity''s survival.', 
      '2014-11-07'
    ),
    (
      'Inception', 
      '/inception-poster.jpg', 
      '/inception-backdrop.jpg', 
      'UA', 
      9.3,
      148, 
      ARRAY['Action', 'Sci-Fi', 'Thriller'], 
      'English', 
      'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.', 
      '2010-07-16'
    ),
    (
      '3 Idiots', 
      '/3idiots-poster.jpg', 
      '/3idiots-backdrop.jpg', 
      'UA', 
      9.5,
      170, 
      ARRAY['Comedy', 'Drama'], 
      'Hindi', 
      'Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently.', 
      '2009-12-25'
    ),
    (
      'Dangal', 
      '/dangal-poster.jpg', 
      '/dangal-backdrop.jpg', 
      'U', 
      9.3,
      161, 
      ARRAY['Biography', 'Drama', 'Sport'], 
      'Hindi', 
      'Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.', 
      '2016-12-23'
    ),
    (
      'Baahubali 2', 
      '/baahubali2-poster.jpg', 
      '/baahubali2-backdrop.jpg', 
      'UA', 
      9.0,
      167, 
      ARRAY['Action', 'Drama', 'Fantasy'], 
      'Telugu', 
      'When Shiva, the son of Bahubali, learns about his heritage, he begins to look for answers. His story is juxtaposed with past events that unfolded in the Mahishmati Kingdom.', 
      '2017-04-28'
    ),
    (
      'Dune: Part Two', 
      '/dune2-poster.jpg', 
      '/dune2-backdrop.jpg', 
      'UA', 
      9.1,
      166, 
      ARRAY['Sci-Fi', 'Adventure', 'Action'], 
      'English', 
      'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.', 
      '2024-03-01'
    ),
    (
      'The Dark Knight',
      '/dark-knight-poster.jpg',
      '/dark-knight-backdrop.jpg',
      'UA',
      9.7,
      152,
      ARRAY['Action', 'Crime', 'Drama'],
      'English',
      'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
      '2008-07-18'
    ),
    (
      '12th Fail',
      '/12th-fail-poster.jpg',
      '/12th-fail-backdrop.jpg',
      'U',
      9.2,
      147,
      ARRAY['Biography', 'Drama'],
      'Hindi',
      'Based on the true story of IPS officer Manoj Kumar Sharma, 12th Fail sheds light on his life, struggles, and how he overcomes them to achieve his dream.',
      '2023-10-27'
    ),
    (
      'Kantara',
      '/kantara-poster.jpg',
      '/kantara-backdrop.jpg',
      'UA',
      9.3,
      148,
      ARRAY['Action', 'Adventure', 'Drama'],
      'Kannada',
      'When greed paves the way for betrayal, scheming and murder, a young tribal reluctantly dons the traditions of his ancestors to seek justice.',
      '2022-09-30'
    ),
    (
      'Spider-Man: Across the Spider-Verse',
      '/spider-verse-poster.jpg',
      '/spider-verse-backdrop.jpg',
      'U',
      9.4,
      140,
      ARRAY['Animation', 'Action', 'Adventure'],
      'English',
      'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
      '2023-06-02'
    ),
    (
      'Sita Ramam',
      '/sita-ramam-poster.jpg',
      '/sita-ramam-backdrop.jpg',
      'U',
      8.8,
      163,
      ARRAY['Action', 'Drama', 'Mystery'],
      'Telugu',
      'An orphan soldier, Lieutenant Ram''s life changes, after he gets a letter from a girl named Sita. He meets her and love blossoms between them. When he comes back to his camp in Kashmir,he sends a letter to Sita which won''t reach her.',
      '2022-08-05'
    ),
    (
      'Avengers: Endgame',
      '/endgame-poster.jpg',
      '/endgame-backdrop.jpg',
      'UA',
      9.0,
      181,
      ARRAY['Action', 'Adventure', 'Drama'],
      'English',
      'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos'' actions and restore balance to the universe.',
      '2019-04-26'
    ),
    (
      'Sholay',
      '/sholay-poster.jpg',
      '/sholay-backdrop.jpg',
      'U',
      9.1,
      204,
      ARRAY['Action', 'Adventure', 'Comedy'],
      'Hindi',
      'After his family is murdered by a notorious and ruthless bandit, a former police officer enlists the services of two outlaws to capture him.',
      '1975-08-15'
    ),
    (
      'Zindagi Na Milegi Dobara',
      '/znmd-poster.jpg',
      '/znmd-backdrop.jpg',
      'UA',
      8.9,
      155,
      ARRAY['Comedy', 'Drama'],
      'Hindi',
      'Three friends decide to turn their fantasy vacation into reality after one of their friends gets engaged.',
      '2011-07-15'
    )
    RETURNING id, title;
  `

  // Seed Cinemas with Indian cinema chains
  const cinemas = await sql`
    INSERT INTO cinemas (name, location)
    VALUES 
    ('PVR Cinemas Phoenix Mall', 'Lower Parel, Mumbai'),
    ('INOX Megaplex', 'Inorbit Mall, Malad, Mumbai'),
    ('Cinepolis Fun Cinemas', 'Andheri West, Mumbai'),
    ('PVR Select City Walk', 'Saket, New Delhi'),
    ('INOX Garuda Mall', 'Magrath Road, Bangalore'),
    ('Cinepolis Mantri Square', 'Malleshwaram, Bangalore')
    RETURNING id, name;
  `

  // Seed Screens
  const screens = []
  for (const cinema of cinemas) {
    const s = await sql`
      INSERT INTO screens (cinema_id, name, type)
      VALUES 
      (${cinema.id}, 'Screen 1', 'IMAX'),
      (${cinema.id}, 'Screen 2', 'Standard'),
      (${cinema.id}, 'Screen 3', 'Gold Class'),
      (${cinema.id}, 'Screen 4', '4DX')
      RETURNING id, cinema_id, name, type;
    `
    screens.push(...s)
  }

  // Seed Showtimes (Next 5 days) with INR pricing
  const today = new Date()
  for (let i = 0; i < 5; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)

    for (const movie of movies) {
      // Each movie shows in 2-3 random theaters
      const shuffledScreens = screens.sort(() => 0.5 - Math.random())
      const selectedScreens = shuffledScreens.slice(0, Math.floor(Math.random() * 4) + 3)

      for (const screen of selectedScreens) {
        // Show times throughout the day
        const times = ["10:00", "13:30", "16:45", "19:30", "22:15"]
        for (const time of times) {
          if (Math.random() > 0.4) {
            // 60% chance of a showtime
            const [hours, minutes] = time.split(":").map(Number)
            const showtime = new Date(date)
            showtime.setHours(hours, minutes, 0, 0)

            // Base price in INR (₹250-300)
            let price = 280

            // Screen type premium
            if (screen.type === "IMAX") price += 120
            if (screen.type === "Gold Class") price += 200
            if (screen.type === "4DX") price += 150

            // Evening show premium
            if (hours >= 18) price += 50

            // Weekend premium (Saturday/Sunday)
            if (showtime.getDay() === 0 || showtime.getDay() === 6) price += 30

            // Format date and time for separate columns
            const showDate = showtime.toISOString().split('T')[0]
            const showTime = time + ":00"

            await sql`
              INSERT INTO showtimes (movie_id, screen_id, cinema_id, show_date, show_time, start_time, price, format)
              VALUES (${movie.id}, ${screen.id}, ${screen.cinema_id}, ${showDate}, ${showTime}, ${showtime.toISOString()}, ${price}, ${screen.type});
            `
          }
        }
      }
    }
  }

  console.log("Seeding complete!")
  console.log(`- ${movies.length} movies added`)
  console.log(`- ${cinemas.length} cinemas added`)
  console.log(`- ${screens.length} screens added`)
  console.log("- Showtimes generated for next 5 days")
  console.log("All prices are in Indian Rupees (INR)")
}

seed().catch(console.error)
