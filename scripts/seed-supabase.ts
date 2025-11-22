import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing environment variables!')
    console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
    console.error('\nMake sure you have added the SUPABASE_SERVICE_ROLE_KEY to .env.local')
    console.error('Get it from: https://app.supabase.com/project/_/settings/api')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

async function seed() {
    console.log('🌱 Seeding database with Supabase...')

    try {
        // Clean up existing data
        console.log('🧹 Cleaning up existing data...')
        // Delete in order of dependencies (child tables first)
        const { error: e1 } = await supabase.from('booking_seats').delete().neq('id', '00000000-0000-0000-0000-000000000000')
        if (e1) console.warn('Warning deleting booking_seats:', e1.message)

        const { error: e2 } = await supabase.from('bookings').delete().neq('id', '00000000-0000-0000-0000-000000000000')
        if (e2) console.warn('Warning deleting bookings:', e2.message)

        const { error: e3 } = await supabase.from('seats').delete().neq('id', '00000000-0000-0000-0000-000000000000')
        if (e3) console.warn('Warning deleting seats:', e3.message)

        const { error: e4 } = await supabase.from('showtimes').delete().neq('id', '00000000-0000-0000-0000-000000000000')
        if (e4) console.warn('Warning deleting showtimes:', e4.message)

        const { error: e5 } = await supabase.from('screens').delete().neq('id', '00000000-0000-0000-0000-000000000000')
        if (e5) console.warn('Warning deleting screens:', e5.message)

        const { error: e6 } = await supabase.from('cinemas').delete().neq('id', '00000000-0000-0000-0000-000000000000')
        if (e6) console.warn('Warning deleting cinemas:', e6.message)

        const { error: e7 } = await supabase.from('movies').delete().neq('id', '00000000-0000-0000-0000-000000000000')
        if (e7) console.warn('Warning deleting movies:', e7.message)

        // Seed Movies with Indian and International titles
        console.log('📽️  Adding movies...')
        const { data: movies, error: moviesError } = await supabase
            .from('movies')
            .insert([
                {
                    title: 'Jawan',
                    poster_url: '/jawan-poster.jpg',
                    backdrop_url: '/jawan-backdrop.jpg',
                    rating: '8.4',
                    duration: 169,
                    genre: ['Action', 'Thriller', 'Drama'],
                    language: 'Hindi',
                    description: 'A high-octane action thriller which outlines the emotional journey of a man who is set to rectify the wrongs in the society.',
                    release_date: '2023-09-07'
                },
                {
                    title: 'Pathaan',
                    poster_url: '/pathaan-poster.jpg',
                    backdrop_url: '/pathaan-backdrop.jpg',
                    rating: '8.0',
                    duration: 146,
                    genre: ['Action', 'Thriller', 'Adventure'],
                    language: 'Hindi',
                    description: 'An Indian spy takes on the leader of a group of mercenaries who have nefarious plans to target his homeland.',
                    release_date: '2023-01-25'
                },
                {
                    title: 'RRR',
                    poster_url: '/rrr-poster.jpg',
                    backdrop_url: '/rrr-backdrop.jpg',
                    rating: '9.1',
                    duration: 187,
                    genre: ['Action', 'Drama', 'Period'],
                    language: 'Telugu',
                    description: 'A fictional story about two legendary revolutionaries and their journey away from home before they started fighting for their country in 1920s.',
                    release_date: '2022-03-25'
                },
                {
                    title: 'Brahmastra',
                    poster_url: '/brahmastra-poster.jpg',
                    backdrop_url: '/brahmastra-backdrop.jpg',
                    rating: '7.8',
                    duration: 167,
                    genre: ['Fantasy', 'Adventure', 'Action'],
                    language: 'Hindi',
                    description: 'A DJ with superpowers and his ladylove embark on a mission to protect the Brahmastra, a weapon of enormous energy, from dark forces closing in on them.',
                    release_date: '2022-09-09'
                },
                {
                    title: 'KGF Chapter 2',
                    poster_url: '/kgf2-poster.jpg',
                    backdrop_url: '/kgf2-backdrop.jpg',
                    rating: '9.2',
                    duration: 168,
                    genre: ['Action', 'Crime', 'Drama'],
                    language: 'Kannada',
                    description: "In the blood-soaked Kolar Gold Fields, Rocky's name strikes fear into his foes, while the government sees him as a threat to law and order.",
                    release_date: '2022-04-14'
                },
                {
                    title: 'Oppenheimer',
                    poster_url: '/oppenheimer-poster.jpg',
                    backdrop_url: '/oppenheimer-backdrop.jpg',
                    rating: '9.4',
                    duration: 180,
                    genre: ['Biography', 'Drama', 'History'],
                    language: 'English',
                    description: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.',
                    release_date: '2023-07-21'
                },
                {
                    title: 'Interstellar',
                    poster_url: '/interstellar-poster.jpg',
                    backdrop_url: '/interstellar-backdrop.jpg',
                    rating: '9.6',
                    duration: 169,
                    genre: ['Sci-Fi', 'Adventure', 'Drama'],
                    language: 'English',
                    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
                    release_date: '2014-11-07'
                },
                {
                    title: 'Inception',
                    poster_url: '/inception-poster.png',
                    backdrop_url: '/inception-backdrop.jpg',
                    rating: '9.3',
                    duration: 148,
                    genre: ['Action', 'Sci-Fi', 'Thriller'],
                    language: 'English',
                    description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
                    release_date: '2010-07-16'
                },
                {
                    title: '3 Idiots',
                    poster_url: '/3idiots-poster.png',
                    backdrop_url: '/3idiots-backdrop.jpg',
                    rating: '9.5',
                    duration: 170,
                    genre: ['Comedy', 'Drama'],
                    language: 'Hindi',
                    description: 'Two friends are searching for their long lost companion. They revisit their college days and recall the memories of their friend who inspired them to think differently.',
                    release_date: '2009-12-25'
                },
                {
                    title: 'Dangal',
                    poster_url: '/dangal-poster.png',
                    backdrop_url: '/dangal-backdrop.jpg',
                    rating: '9.3',
                    duration: 161,
                    genre: ['Biography', 'Drama', 'Sport'],
                    language: 'Hindi',
                    description: 'Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.',
                    release_date: '2016-12-23'
                },
                {
                    title: 'Baahubali 2',
                    poster_url: '/baahubali2-poster.png',
                    backdrop_url: '/baahubali2-backdrop.jpg',
                    rating: '9.0',
                    duration: 167,
                    genre: ['Action', 'Drama', 'Fantasy'],
                    language: 'Telugu',
                    description: 'When Shiva, the son of Bahubali, learns about his heritage, he begins to look for answers. His story is juxtaposed with past events that unfolded in the Mahishmati Kingdom.',
                    release_date: '2017-04-28'
                },
                {
                    title: 'Dune: Part Two',
                    poster_url: '/dune2-poster.png',
                    backdrop_url: '/dune2-backdrop.jpg',
                    rating: '9.1',
                    duration: 166,
                    genre: ['Sci-Fi', 'Adventure', 'Action'],
                    language: 'English',
                    description: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
                    release_date: '2024-03-01'
                },
                {
                    title: 'The Dark Knight',
                    poster_url: '/dark-knight-poster.jpg',
                    backdrop_url: '/dark-knight-backdrop.jpg',
                    rating: '9.7',
                    duration: 152,
                    genre: ['Action', 'Crime', 'Drama'],
                    language: 'English',
                    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
                    release_date: '2008-07-18'
                },
                {
                    title: '12th Fail',
                    poster_url: '/12th-fail-poster.jpg',
                    backdrop_url: '/12th-fail-backdrop.jpg',
                    rating: '9.2',
                    duration: 147,
                    genre: ['Biography', 'Drama'],
                    language: 'Hindi',
                    description: 'Based on the true story of IPS officer Manoj Kumar Sharma, 12th Fail sheds light on his life, struggles, and how he overcomes them to achieve his dream.',
                    release_date: '2023-10-27'
                },
                {
                    title: 'Kantara',
                    poster_url: '/kantara-poster.jpg',
                    backdrop_url: '/kantara-backdrop.jpg',
                    rating: '9.3',
                    duration: 148,
                    genre: ['Action', 'Adventure', 'Drama'],
                    language: 'Kannada',
                    description: 'When greed paves the way for betrayal, scheming and murder, a young tribal reluctantly dons the traditions of his ancestors to seek justice.',
                    release_date: '2022-09-30'
                },
                {
                    title: 'Spider-Man: Across the Spider-Verse',
                    poster_url: '/spider-verse-poster.jpg',
                    backdrop_url: '/spider-verse-backdrop.jpg',
                    rating: '9.4',
                    duration: 140,
                    genre: ['Animation', 'Action', 'Adventure'],
                    language: 'English',
                    description: 'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.',
                    release_date: '2023-06-02'
                },
                {
                    title: 'Sita Ramam',
                    poster_url: '/sita-ramam-poster.jpg',
                    backdrop_url: '/sita-ramam-backdrop.jpg',
                    rating: '8.8',
                    duration: 163,
                    genre: ['Action', 'Drama', 'Mystery'],
                    language: 'Telugu',
                    description: 'An orphan soldier, Lieutenant Ram\'s life changes, after he gets a letter from a girl named Sita. He meets her and love blossoms between them. When he comes back to his camp in Kashmir,he sends a letter to Sita which won\'t reach her.',
                    release_date: '2022-08-05'
                },
                {
                    title: 'Avengers: Endgame',
                    poster_url: '/endgame-poster.jpg',
                    backdrop_url: '/endgame-backdrop.jpg',
                    rating: '9.0',
                    duration: 181,
                    genre: ['Action', 'Adventure', 'Drama'],
                    language: 'English',
                    description: 'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos\' actions and restore balance to the universe.',
                    release_date: '2019-04-26'
                },
                {
                    title: 'Sholay',
                    poster_url: '/sholay-poster.jpg',
                    backdrop_url: '/sholay-backdrop.jpg',
                    rating: '9.1',
                    duration: 204,
                    genre: ['Action', 'Adventure', 'Comedy'],
                    language: 'Hindi',
                    description: 'After his family is murdered by a notorious and ruthless bandit, a former police officer enlists the services of two outlaws to capture him.',
                    release_date: '1975-08-15'
                },
                {
                    title: 'Zindagi Na Milegi Dobara',
                    poster_url: '/znmd-poster.jpg',
                    backdrop_url: '/znmd-backdrop.jpg',
                    rating: '8.9',
                    duration: 155,
                    genre: ['Comedy', 'Drama'],
                    language: 'Hindi',
                    description: 'Three friends decide to turn their fantasy vacation into reality after one of their friends gets engaged.',
                    release_date: '2011-07-15'
                }
            ])
            .select()

        if (moviesError) throw moviesError
        console.log(`✅ Added ${movies.length} movies`)

        // Seed Cinemas with Indian cinema chains
        console.log('🎬 Adding cinemas...')
        const { data: cinemas, error: cinemasError } = await supabase
            .from('cinemas')
            .insert([
                { name: 'PVR Cinemas Phoenix Mall', location: 'Lower Parel, Mumbai' },
                { name: 'INOX Megaplex', location: 'Inorbit Mall, Malad, Mumbai' },
                { name: 'Cinepolis Fun Cinemas', location: 'Andheri West, Mumbai' },
                { name: 'PVR Select City Walk', location: 'Saket, New Delhi' },
                { name: 'INOX Garuda Mall', location: 'Magrath Road, Bangalore' },
                { name: 'Cinepolis Mantri Square', location: 'Malleshwaram, Bangalore' }
            ])
            .select()

        if (cinemasError) throw cinemasError
        console.log(`✅ Added ${cinemas.length} cinemas`)

        // Seed Screens
        console.log('📺 Adding screens...')
        const screenInserts = []
        for (const cinema of cinemas) {
            screenInserts.push(
                { cinema_id: cinema.id, name: 'Screen 1', type: 'IMAX' },
                { cinema_id: cinema.id, name: 'Screen 2', type: 'Standard' },
                { cinema_id: cinema.id, name: 'Screen 3', type: 'Gold Class' },
                { cinema_id: cinema.id, name: 'Screen 4', type: '4DX' }
            )
        }

        const { data: screens, error: screensError } = await supabase
            .from('screens')
            .insert(screenInserts)
            .select()

        if (screensError) throw screensError
        console.log(`✅ Added ${screens.length} screens`)

        // Seed Showtimes (Next 5 days) with INR pricing
        console.log('🎟️  Adding showtimes...')
        const showtimeInserts = []
        const today = new Date()

        for (let i = 0; i < 5; i++) {
            const date = new Date(today)
            date.setDate(today.getDate() + i)

            for (const movie of movies) {
                // Each movie shows in 2-3 random screens
                const shuffledScreens = [...screens].sort(() => 0.5 - Math.random())
                const selectedScreens = shuffledScreens.slice(0, Math.floor(Math.random() * 4) + 3)

                for (const screen of selectedScreens) {
                    // Show times throughout the day
                    const times = ['10:00', '13:30', '16:45', '19:30', '22:15']
                    for (const time of times) {
                        if (Math.random() > 0.4) {
                            // 60% chance of a showtime
                            const [hours, minutes] = time.split(':').map(Number)
                            const showtime = new Date(date)
                            showtime.setHours(hours, minutes, 0, 0)

                            // Base price in INR (₹250-300)
                            let price = 280

                            // Screen type premium
                            if (screen.type === 'IMAX') price += 120
                            if (screen.type === 'Gold Class') price += 200
                            if (screen.type === '4DX') price += 150

                            // Evening show premium
                            if (hours >= 18) price += 50

                            // Weekend premium (Saturday/Sunday)
                            if (showtime.getDay() === 0 || showtime.getDay() === 6) price += 30

                            // Format date and time for separate columns
                            const showDate = showtime.toISOString().split('T')[0]
                            const showTime = time + ':00'

                            showtimeInserts.push({
                                movie_id: movie.id,
                                screen_id: screen.id,
                                cinema_id: screen.cinema_id,
                                show_date: showDate,
                                show_time: showTime,
                                start_time: showtime.toISOString(),
                                price: price,
                                format: screen.type
                            })
                        }
                    }
                }
            }
        }

        const { data: showtimes, error: showtimesError } = await supabase
            .from('showtimes')
            .insert(showtimeInserts)
            .select()

        if (showtimesError) throw showtimesError
        console.log(`✅ Added ${showtimes.length} showtimes`)

        // Seed Bookings and Seats
        console.log('🎟️  Adding bookings and booked seats...')

        const seatLayout = [
            { label: "J", count: 8, price: 600 },
            { label: "I", count: 8, price: 600 },
            { label: "H", count: 12, price: 350 },
            { label: "G", count: 12, price: 350 },
            { label: "F", count: 12, price: 350 },
            { label: "E", count: 14, price: 200 },
            { label: "D", count: 14, price: 200 },
            { label: "C", count: 14, price: 200 },
            { label: "B", count: 14, price: 200 },
            { label: "A", count: 14, price: 200 },
        ]

        let totalBookedSeats = 0

        for (const showtime of showtimes) {
            // Random occupancy between 10% and 70%
            const occupancyRate = 0.1 + Math.random() * 0.6
            const totalCapacity = seatLayout.reduce((acc, row) => acc + row.count, 0)
            const seatsToBookCount = Math.floor(totalCapacity * occupancyRate)

            if (seatsToBookCount === 0) continue

            // Generate all available seats for this showtime
            const allSeats = []
            for (const row of seatLayout) {
                for (let i = 1; i <= row.count; i++) {
                    allSeats.push({
                        seat_number: `${row.label}${i}`,
                        price: row.price,
                        row: row.label,
                        number: i
                    })
                }
            }

            // Shuffle and pick seats to book
            const shuffledSeats = allSeats.sort(() => 0.5 - Math.random())
            const selectedSeats = shuffledSeats.slice(0, seatsToBookCount)

            // Create bookings in batches (groups of 1-6 seats)
            let seatIndex = 0
            while (seatIndex < selectedSeats.length) {
                const groupSize = Math.floor(Math.random() * 6) + 1
                const groupSeats = selectedSeats.slice(seatIndex, seatIndex + groupSize)

                if (groupSeats.length === 0) break

                // Insert into 'seats' directly
                // We skip 'bookings' table as it seems to be causing schema cache issues
                // and 'seats' table is sufficient for the frontend to show booked seats.

                const seatInserts = groupSeats.map(seat => ({
                    showtime_id: showtime.id,
                    seat_number: seat.seat_number,
                    row_label: seat.row,
                    seat_type: seat.price === 600 ? 'Recliner' : seat.price === 350 ? 'Premium' : 'Normal',
                    price: seat.price,
                    is_available: false
                }))

                const { error: seatsError } = await supabase
                    .from('seats')
                    .insert(seatInserts)

                if (seatsError) {
                    console.warn('Error creating seats:', seatsError.message)
                } else {
                    totalBookedSeats += seatInserts.length
                }

                seatIndex += groupSize
            }
        }

        console.log(`✅ Added ${totalBookedSeats} booked seats (skipped bookings table due to schema issue)`)

        console.log('\n🎉 Seeding complete!')
        console.log(`📊 Summary:`)
        console.log(`   - ${movies.length} movies`)
        console.log(`   - ${cinemas.length} cinemas`)
        console.log(`   - ${screens.length} screens`)
        console.log(`   - ${showtimes.length} showtimes`)
        console.log(`   - All prices in Indian Rupees (INR)`)
    } catch (error) {
        console.error('❌ Error seeding database:', error)
        process.exit(1)
    }
}

seed()
