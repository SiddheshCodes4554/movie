import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

async function updateMovieImages() {
    console.log('🎬 Updating movie images with working URLs...')

    const imageUpdates = [
        { title: 'Jawan', poster: '/jawan-poster.jpg', backdrop: '/jawan-backdrop.jpg' },
        { title: 'Pathaan', poster: '/pathaan-poster.jpg', backdrop: '/pathaan-backdrop.jpg' },
        { title: 'RRR', poster: '/rrr-poster.jpg', backdrop: '/rrr-backdrop.jpg' },
        { title: 'Brahmastra', poster: '/brahmastra-poster.jpg', backdrop: '/brahmastra-backdrop.jpg' },
        { title: 'KGF Chapter 2', poster: '/kgf2-poster.jpg', backdrop: '/kgf2-backdrop.jpg' },
        { title: 'Oppenheimer', poster: '/oppenheimer-poster.jpg', backdrop: '/oppenheimer-backdrop.jpg' },
        { title: 'Interstellar', poster: '/interstellar-poster.jpg', backdrop: '/interstellar-backdrop.jpg' },
        { title: 'Inception', poster: '/inception-poster.jpg', backdrop: '/inception-backdrop.jpg' },
        { title: '3 Idiots', poster: '/3idiots-poster.jpg', backdrop: '/3idiots-poster.jpg' },
        { title: 'Dangal', poster: '/dangal-poster.jpg', backdrop: '/dangal-poster.jpg' },
        { title: 'Baahubali 2', poster: '/baahubali2-poster.jpg', backdrop: '/baahubali2-poster.jpg' },
        { title: 'Dune: Part Two', poster: '/dune2-poster.jpg', backdrop: '/space-nebula-cinematic.jpg' }
    ]

    for (const movie of imageUpdates) {
        const { error } = await supabase
            .from('movies')
            .update({
                poster_url: movie.poster,
                backdrop_url: movie.backdrop
            })
            .eq('title', movie.title)

        if (error) {
            console.error(`❌ Failed to update ${movie.title}:`, error.message)
        } else {
            console.log(`✅ Updated ${movie.title}`)
        }
    }

    console.log('\n🎉 All movie images updated!')
}

updateMovieImages()
