const { Client } = require("pg");

const client = new Client({
  database: "postgres",
  user: "postgres",
  password: "4y7sV96vA9wv46VR",
  port: 5432,
  host: "localhost",
});

const booksData = [
  {
    title: "A Court of Thorns and Roses",
    author: "Sarah J Maas",
    description:
      "Feyre, a human huntress, is taken to the faerie realm after killing a magical creature. In this dangerous world of faeries, she uncovers secrets, discovers her own powers, and becomes involved in a complicated love triangle that impacts both human and faerie realms.",
  },
  {
    title: "Empire of Pain",
    author: "Patrick Radden Keefe",
    description:
      "The story delves into the Sackler family's connection to the opioid crisis. It focuses on Purdue Pharma, the company they owned, and its aggressive promotion of OxyContin as a safe painkiller. The narrative explores the devastating impact of addiction and overdose caused by the widespread use of the drug.",
  },
  {
    title:
      "Righteous Mind: Why Good People Are Divided By Politics and Religion",
    author: "Jonathan Haidt",
    description:
      "'The Righteous Mind' explores the psychological basis of human morality and the varying perspectives people hold. It identifies six innate moral foundations—care, fairness, loyalty, authority, sanctity, and liberty—that shape our moral judgments. These foundations, influenced by culture and evolution, contribute to the moral divides in society. The book examines the complexities of moral reasoning and how individuals and groups form their moral beliefs.",
  },
  {
    title: "A Cambodian Odyssey",
    author: "Haing Ngor",
    description:
      "'A Cambodian Odyssey' is a memoir that takes readers on a personal journey through Cambodia. It explores the country's history, culture, and landscapes, including the ancient temples of Angkor Wat, the Khmer Rouge regime, and the resilience of the Cambodian people. Through vivid descriptions and heartfelt reflections, the book captures the essence of Cambodia's vibrant tapestry.",
  },
  {
    title: "The Gulag Archipelago",
    author: "Aleksandr Solzhenitsyn",
    description:
      "'The Gulag Archipelago' is a seminal work that exposes the extensive system of Soviet forced labor camps known as the Gulag. Drawing from personal experiences and prisoner testimonies, it vividly depicts the harsh conditions, cruelty, and human suffering endured by millions. The book serves as a powerful indictment of the oppressive regime and stands as a testament to the resilience of the human spirit in the face of unimaginable adversity.",
  },
];

async function seedDatabase() {
  try {
    await client.connect();

    await client.query(
      `CREATE TABLE if not exists books(book_id SERIAL PRIMARY KEY, title VARCHAR(500), author VARCHAR(500), description VARCHAR(1000));`
    );

    for (const book of booksData) {
      await client.query(
        "INSERT INTO books (title, author, description) VALUES ($1, $2, $3)",
        [book.title, book.author, book.description]
      );
    }

    console.log("Database seeding completed successfully");

    await client.end();
  } catch (error) {
    console.error("Error seeding database:", error);
    await client.end();
  }
}

seedDatabase();
