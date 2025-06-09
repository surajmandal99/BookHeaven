/*
  # Add sample books to the database

  1. New Data
    - Insert sample books with various genres
    - Ensure proper stock levels and pricing
    - Use placeholder images from Pexels

  2. Notes
    - Books will be available for immediate browsing
    - Stock levels are set to reasonable amounts
    - Prices are in USD
*/

INSERT INTO books (title, author, description, price, cover_image, genre, stock) VALUES
(
  'The Midnight Library',
  'Matt Haig',
  'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived. To see how things would be if you had made other choices.',
  12.99,
  'https://images.pexels.com/photos/1766604/pexels-photo-1766604.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'Fiction',
  15
),
(
  'Atomic Habits',
  'James Clear',
  'A revolutionary system to get 1 percent better every day. People think when you want to change your life, you need to think big. But world-renowned habits expert James Clear has discovered another way.',
  14.99,
  'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'Self-Help',
  8
),
(
  'Project Hail Mary',
  'Andy Weir',
  'Ryland Grace is the sole survivor on a desperate, last-chance mission—and if he fails, humanity and the Earth itself will perish. Except that right now, he doesn''t know that.',
  15.99,
  'https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'Science Fiction',
  12
),
(
  'The Psychology of Money',
  'Morgan Housel',
  'Timeless lessons on wealth, greed, and happiness. Money—investing, personal finance, and business decisions—is typically taught as a math-based field, where data and formulas tell us exactly what to do.',
  11.99,
  'https://images.pexels.com/photos/3747513/pexels-photo-3747513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'Finance',
  20
),
(
  'The Silent Patient',
  'Alex Michaelides',
  'Alicia Berenson''s life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house in one of London''s most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.',
  13.99,
  'https://images.pexels.com/photos/3358707/pexels-photo-3358707.png?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'Thriller',
  5
),
(
  'Educated',
  'Tara Westover',
  'An unforgettable memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.',
  12.99,
  'https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'Memoir',
  10
),
(
  'Where the Crawdads Sing',
  'Delia Owens',
  'For years, rumors of the "Marsh Girl" have haunted Barkley Cove, a quiet town on the North Carolina coast. So in late 1969, when handsome Chase Andrews is found dead, the locals immediately suspect Kya Clark, the so-called Marsh Girl.',
  14.99,
  'https://images.pexels.com/photos/2846814/pexels-photo-2846814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'Fiction',
  7
),
(
  'Dune',
  'Frank Herbert',
  'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and enhancing consciousness.',
  16.99,
  'https://images.pexels.com/photos/6478650/pexels-photo-6478650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'Science Fiction',
  18
),
(
  'The Seven Husbands of Evelyn Hugo',
  'Taylor Jenkins Reid',
  'Reclusive Hollywood icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life. But when she chooses unknown magazine reporter Monique Grant for the job, no one is more astounded than Monique herself.',
  13.99,
  'https://images.pexels.com/photos/2067569/pexels-photo-2067569.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'Fiction',
  9
),
(
  'Becoming',
  'Michelle Obama',
  'In her memoir, a work of deep reflection and mesmerizing storytelling, Michelle Obama invites readers into her world, chronicling the experiences that have shaped her—from her childhood on the South Side of Chicago to her years as an executive balancing the demands of motherhood and work.',
  16.99,
  'https://images.pexels.com/photos/3747139/pexels-photo-3747139.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'Biography',
  14
),
(
  'The Alchemist',
  'Paulo Coelho',
  'Paulo Coelho''s masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different—and far more satisfying—than he ever imagined.',
  12.99,
  'https://images.pexels.com/photos/1925536/pexels-photo-1925536.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'Philosophy',
  11
),
(
  'The Subtle Art of Not Giving a F*ck',
  'Mark Manson',
  'In this generation-defining self-help guide, a superstar blogger cuts through the crap to show us how to stop trying to be "positive" all the time so that we can truly become better, happier people.',
  13.99,
  'https://images.pexels.com/photos/3747513/pexels-photo-3747513.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'Self-Help',
  16
);