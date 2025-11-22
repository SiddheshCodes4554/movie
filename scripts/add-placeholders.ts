import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'
import https from 'https'
import fs from 'fs'
import path from 'path'

// Load environment variables
config({ path: resolve(process.cwd(), '.env.local') })

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Placeholder images using a free service
const placeholderImages = {
    'inception-poster.jpg': 'https://via.placeholder.com/300x450/1a1a2e/eee?text=INCEPTION',
    '3idiots-poster.jpg': 'https://via.placeholder.com/300x450/f4d03f/333?text=3+IDIOTS',
    'dangal-poster.jpg': 'https://via.placeholder.com/300x450/d35400/fff?text=DANGAL',
    'baahubali2-poster.jpg': 'https://via.placeholder.com/300x450/8b0000/ffd700?text=BAAHUBALI+2',
    'dune2-poster.jpg': 'https://via.placeholder.com/300x450/d4a574/000?text=DUNE+PART+TWO',

    // Backdrop images for all movies
    'jawan-backdrop.jpg': 'https://via.placeholder.com/1920x1080/8b0000/fff?text=JAWAN',
    'pathaan-backdrop.jpg': 'https://via.placeholder.com/1920x1080/1e3a8a/fff?text=PATHAAN',
    'rrr-backdrop.jpg': 'https://via.placeholder.com/1920x1080/d97706/fff?text=RRR',
    'brahmastra-backdrop.jpg': 'https://via.placeholder.com/1920x1080/1e40af/ffd700?text=BRAHMASTRA',
    'kgf2-backdrop.jpg': 'https://via.placeholder.com/1920x1080/000/ffd700?text=KGF+2',
    'oppenheimer-backdrop.jpg': 'https://via.placeholder.com/1920x1080/d97706/000?text=OPPENHEIMER',
    'interstellar-backdrop.jpg': 'https://via.placeholder.com/1920x1080/0c4a6e/fff?text=INTERSTELLAR',
    'inception-backdrop.jpg': 'https://via.placeholder.com/1920x1080/1a1a2e/fff?text=INCEPTION',
    '3idiots-backdrop.jpg': 'https://via.placeholder.com/1920x1080/f4d03f/333?text=3+IDIOTS',
    'dangal-backdrop.jpg': 'https://via.placeholder.com/1920x1080/d35400/fff?text=DANGAL',
    'baahubali2-backdrop.jpg': 'https://via.placeholder.com/1920x1080/8b0000/ffd700?text=BAAHUBALI+2',
    'dune2-backdrop.jpg': 'https://via.placeholder.com/1920x1080/d4a574/000?text=DUNE+PART+TWO'
}

async function downloadImage(url: string, filepath: string) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode === 200) {
                const fileStream = fs.createWriteStream(filepath)
                response.pipe(fileStream)
                fileStream.on('finish', () => {
                    fileStream.close()
                    resolve(true)
                })
            } else {
                reject(new Error(`Failed to download: ${response.statusCode}`))
            }
        }).on('error', reject)
    })
}

async function addPlaceholderImages() {
    console.log('📸 Adding placeholder images...')

    const publicDir = path.join(process.cwd(), 'public')

    for (const [filename, url] of Object.entries(placeholderImages)) {
        const filepath = path.join(publicDir, filename)

        try {
            await downloadImage(url, filepath)
            console.log(`✅ Downloaded ${filename}`)
        } catch (error) {
            console.error(`❌ Failed to download ${filename}:`, error)
        }
    }

    console.log('\n🎉 All placeholder images added!')
}

addPlaceholderImages()
