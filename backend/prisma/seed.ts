import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const seedData = [
  {
    title: "Inception",
    type: "MOVIE" as const,
    director: "Christopher Nolan",
    budget: "$160M",
    location: "Los Angeles, Paris, Tokyo",
    duration: "148 min",
    yearTime: "2010",
    genre: "Sci-Fi, Thriller",
    rating: "8.8/10",
  },
  {
    title: "Breaking Bad",
    type: "TV_SHOW" as const,
    director: "Vince Gilligan",
    budget: "$3M per episode",
    location: "Albuquerque, New Mexico",
    duration: "49 min per episode",
    yearTime: "2008-2013",
    genre: "Crime, Drama, Thriller",
    rating: "9.5/10",
  },
  {
    title: "The Dark Knight",
    type: "MOVIE" as const,
    director: "Christopher Nolan",
    budget: "$185M",
    location: "Chicago, Hong Kong",
    duration: "152 min",
    yearTime: "2008",
    genre: "Action, Crime, Drama",
    rating: "9.0/10",
  },
  {
    title: "Stranger Things",
    type: "TV_SHOW" as const,
    director: "The Duffer Brothers",
    budget: "$8M per episode",
    location: "Atlanta, Georgia",
    duration: "50 min per episode",
    yearTime: "2016-Present",
    genre: "Horror, Drama, Sci-Fi",
    rating: "8.7/10",
  },
  {
    title: "Interstellar",
    type: "MOVIE" as const,
    director: "Christopher Nolan",
    budget: "$165M",
    location: "Iceland, Alberta",
    duration: "169 min",
    yearTime: "2014",
    genre: "Sci-Fi, Drama",
    rating: "8.7/10",
  },
];

async function main() {
  console.log("Starting seed...");

  for (const entry of seedData) {
    // replace `yourModel` with the lowercase model name from schema.prisma (e.g. `movie`, `media`, etc.)
    await (prisma as any).yourModel.create({
      data: entry,
    });
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
