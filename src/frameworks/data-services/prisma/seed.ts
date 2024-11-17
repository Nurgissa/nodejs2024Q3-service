import { PrismaClient } from '@prisma/client';

const seedData = [
  {
    artist: {
      name: 'Craig David',
      grammy: false,
    },
    album: {
      name: 'Born to Do It',
      year: 2000,
      tracks: [
        {
          name: 'Fill Me In',
          duration: 4.12,
        },
        {
          name: '7 Days',
          duration: 3.56,
        },
        {
          name: 'Walking Away',
          duration: 3.25,
        },
        {
          name: 'Rendezvous',
          duration: 4.37,
        },
      ],
    },
  },
  {
    artist: {
      name: 'Madonna',
      grammy: true,
    },
    album: {
      name: 'Like a Virgin',
      year: 1984,
      tracks: [
        {
          name: 'Material Girl',
          duration: 4.0,
        },
        {
          name: 'Like a Virgin',
          duration: 3.38,
        },
        {
          name: 'Dress You Up',
          duration: 4.02,
        },
        {
          name: 'Angel',
          duration: 3.56,
        },
      ],
    },
  },
  {
    artist: {
      name: 'Adele',
      grammy: true,
    },
    album: {
      name: '21',
      year: 2011,
      tracks: [
        {
          name: 'Rolling in the Deep',
          duration: 3.48,
        },
        {
          name: 'Someone Like You',
          duration: 4.45,
        },
        {
          name: 'Set Fire to the Rain',
          duration: 4.02,
        },
        {
          name: 'Turning Tables',
          duration: 4.1,
        },
      ],
    },
  },
  {
    artist: {
      name: 'Ed Sheeran',
      grammy: true,
    },
    album: {
      name: 'Divide (÷)',
      year: 2017,
      tracks: [
        {
          name: 'Shape of You',
          duration: 3.53,
        },
        {
          name: 'Castle on the Hill',
          duration: 4.21,
        },
        {
          name: 'Perfect',
          duration: 4.23,
        },
        {
          name: 'Galway Girl',
          duration: 2.5,
        },
      ],
    },
  },
  {
    artist: {
      name: 'Taylor Swift',
      grammy: true,
    },
    album: {
      name: '1989',
      year: 2014,
      tracks: [
        {
          name: 'Shake It Off',
          duration: 3.39,
        },
        {
          name: 'Blank Space',
          duration: 3.51,
        },
        {
          name: 'Style',
          duration: 3.51,
        },
        {
          name: 'Wildest Dreams',
          duration: 3.4,
        },
      ],
    },
  },
  {
    artist: {
      name: 'Lizzo',
      grammy: true,
    },
    album: {
      name: 'Cuz I Love You',
      year: 2019,
      tracks: [
        {
          name: 'Truth Hurts',
          duration: 2.53,
        },
        {
          name: 'Juice',
          duration: 3.15,
        },
        {
          name: 'Tempo',
          duration: 2.55,
        },
        {
          name: 'Good as Hell',
          duration: 3.38,
        },
      ],
    },
  },
  {
    artist: {
      name: 'The Weeknd',
      grammy: false,
    },
    album: {
      name: 'After Hours',
      year: 2020,
      tracks: [
        {
          name: 'Blinding Lights',
          duration: 3.2,
        },
        {
          name: 'Save Your Tears',
          duration: 3.36,
        },
        {
          name: 'In Your Eyes',
          duration: 3.58,
        },
        {
          name: 'After Hours',
          duration: 6.01,
        },
      ],
    },
  },
  {
    artist: {
      name: 'Dua Lipa',
      grammy: true,
    },
    album: {
      name: 'Future Nostalgia',
      year: 2020,
      tracks: [
        {
          name: "Don't Start Now",
          duration: 3.03,
        },
        {
          name: 'Levitating',
          duration: 3.24,
        },
        {
          name: 'Physical',
          duration: 3.14,
        },
        {
          name: 'Break My Heart',
          duration: 3.41,
        },
      ],
    },
  },
];

async function main() {
  const prisma = new PrismaClient();

  let artistCount = 0;
  let albumCount = 0;
  let trackCount = 0;

  for (const entry of seedData) {
    const artist = await prisma.artist.create({
      data: {
        name: entry.artist.name,
        grammy: entry.artist.grammy,
      },
    });
    artistCount++;

    const album = await prisma.album.create({
      data: {
        artistId: artist.id,
        name: entry.album.name,
        year: entry.album.year,
      },
    });
    albumCount++;

    const trackList = entry.album.tracks.map((track) => ({
      artistId: artist.id,
      albumId: album.id,
      name: track.name,
      duration: track.duration,
    }));

    const tracks = await prisma.track.createMany({
      data: trackList,
    });
    trackCount += tracks.count;
  }

  console.log(
    `Seeded the database with ${artistCount} artists, ${albumCount} albums and ${trackCount} tracks.`,
  );
}

main();
