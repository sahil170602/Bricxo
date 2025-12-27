import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Define all data in one clean structure
const seedData = [
  {
    name: 'Cement',
    slug: 'cement',
    image: '📦',
    products: [
      { name: 'UltraTech Premium PPC', price: 385, originalPrice: 420, unit: 'bag', rating: 4.8, image: '/cement.png', description: 'India’s No. 1 Cement, excellent for foundation and pillars.' },
      { name: 'Ambuja Kawach Water Proof', price: 410, originalPrice: 445, unit: 'bag', rating: 4.9, image: '/cement2.png', description: 'Specially formulated water-repellent cement for roofs.' },
      { name: 'ACC Suraksha Power', price: 375, originalPrice: 390, unit: 'bag', rating: 4.5, image: '/cement.png', description: 'High performance cement for general masonry work.' },
    ]
  },
  {
    name: 'TMT Steel',
    slug: 'steel',
    image: '🏗️',
    products: [
      { name: 'Tata Tiscon 550SD (10mm)', price: 680, originalPrice: 710, unit: 'piece', rating: 5.0, image: '/steel.png', description: 'Super Ductile rebars, ideal for earthquake-prone zones.' },
      { name: 'JSW Neosteel 550D (12mm)', price: 950, originalPrice: 1050, unit: 'piece', rating: 4.7, image: '/steel.png', description: 'High tensile strength steel for heavy load-bearing structures.' },
      { name: 'Kamdhenu Nxt TMT (8mm)', price: 450, originalPrice: 480, unit: 'piece', rating: 4.4, image: '/steel.png', description: 'Double rib pattern for better concrete grip.' },
    ]
  },
  {
    name: 'Bricks & Blocks',
    slug: 'bricks',
    image: '🧱',
    products: [
      { name: 'Red Clay Brick (Class 1)', price: 10, originalPrice: 12, unit: 'piece', rating: 4.6, image: '/bricks.png', description: 'Standard burnt red clay bricks, high durability.' },
      { name: 'AAC Light Weight Block', price: 65, originalPrice: 75, unit: 'block', rating: 4.8, image: '/bricks.png', description: 'Autoclaved Aerated Concrete blocks, heat resistant and lightweight.' },
      { name: 'Fly Ash Brick', price: 7, originalPrice: 9, unit: 'piece', rating: 4.3, image: '/bricks.png', description: 'Eco-friendly bricks made from industrial fly ash.' },
    ]
  },
  {
    name: 'Sand & Aggregates',
    slug: 'sand',
    image: '🏜️',
    products: [
      { name: 'River Sand (Medium)', price: 7500, originalPrice: 8000, unit: 'brass', rating: 4.5, image: '/sand.png', description: 'Clean river sand, perfect for plastering and concrete.' },
      { name: 'M-Sand (Double Washed)', price: 4500, originalPrice: 5000, unit: 'brass', rating: 4.7, image: '/sand.png', description: 'Manufactured sand, stronger and cheaper than river sand.' },
      { name: 'Aggregate (20mm)', price: 3200, originalPrice: 3500, unit: 'brass', rating: 4.6, image: '/sand.png', description: 'Blue metal stone chips for slab casting.' },
    ]
  },
  {
    name: 'Paints',
    slug: 'paints',
    image: '🎨',
    products: [
      { name: 'Asian Paints Royale (White)', price: 450, originalPrice: 520, unit: 'liter', rating: 4.9, image: '/paint.png', description: 'Luxury emulsion for interior walls with Teflon surface protector.' },
      { name: 'Berger WeatherCoat Anti-Dust', price: 380, originalPrice: 420, unit: 'liter', rating: 4.7, image: '/paint.png', description: 'Exterior paint that repels dust and keeps walls new.' },
      { name: 'Dr. Fixit Waterproofing', price: 290, originalPrice: 310, unit: 'liter', rating: 4.8, image: '/paint.png', description: 'Essential waterproofing agent for roof and bathrooms.' },
    ]
  },
  {
    name: 'Plumbing',
    slug: 'plumbing',
    image: '🔧',
    products: [
      { name: 'Astral CPVC Pipe (1 inch)', price: 450, originalPrice: 480, unit: '3m length', rating: 4.8, image: '/plumbing.png', description: 'Hot and cold water plumbing pipes, corrosion resistant.' },
      { name: 'Ashirvad PVC SWR Pipe (4 inch)', price: 850, originalPrice: 950, unit: '6m length', rating: 4.6, image: '/plumbing.png', description: 'Soil, Waste, and Rainwater pipes for drainage.' },
      { name: 'Supreme Water Tank (1000L)', price: 6500, originalPrice: 7200, unit: 'unit', rating: 4.9, image: '/plumbing.png', description: '4-layer tank with anti-bacterial protection.' },
    ]
  },
  {
    name: 'Electricals',
    slug: 'electricals',
    image: '💡',
    products: [
      { name: 'Havells Wires (1.5 sq mm)', price: 1800, originalPrice: 2100, unit: 'coil', rating: 4.9, image: '/electric.png', description: 'Fire resistant copper wires for house wiring.' },
      { name: 'Anchor Roma Switch', price: 45, originalPrice: 60, unit: 'piece', rating: 4.5, image: '/electric.png', description: 'Modular switch, durable and smooth operation.' },
      { name: 'Polycab MCB (Single Pole)', price: 250, originalPrice: 300, unit: 'piece', rating: 4.8, image: '/electric.png', description: 'Miniature Circuit Breaker for overload protection.' },
    ]
  },
  {
    name: 'Tiles',
    slug: 'tiles',
    image: '⬜',
    products: [
      { name: 'Kajaria Vitrified (2x2)', price: 45, originalPrice: 55, unit: 'sq.ft', rating: 4.7, image: '/tile.png', description: 'Double charged vitrified tiles for living room.' },
      { name: 'Somany Anti-Skid Bathroom', price: 35, originalPrice: 42, unit: 'sq.ft', rating: 4.6, image: '/tile.png', description: 'Matte finish tiles that prevent slipping when wet.' },
      { name: 'Johnson Wall Tiles (12x18)', price: 38, originalPrice: 45, unit: 'sq.ft', rating: 4.5, image: '/tile.png', description: 'Digital print wall tiles for kitchen and bathroom.' },
    ]
  }
]

async function main() {
  console.log('🌱 Starting database seed...')

  // Clear existing data to avoid duplicates (Optional, safer for dev)
  // await prisma.orderItem.deleteMany()
  // await prisma.product.deleteMany()
  // await prisma.category.deleteMany()

  for (const categoryData of seedData) {
    // 1. Create or Get Category
    const category = await prisma.category.upsert({
      where: { slug: categoryData.slug },
      update: {},
      create: { 
        name: categoryData.name, 
        slug: categoryData.slug, 
        image: categoryData.image 
      },
    })

    console.log(`Created Category: ${category.name}`)

    // 2. Create Products for this Category
    for (const productData of categoryData.products) {
      await prisma.product.create({
        data: {
          name: productData.name,
          description: productData.description,
          price: productData.price,
          originalPrice: productData.originalPrice,
          unit: productData.unit,
          rating: productData.rating,
          image: productData.image,
          categoryId: category.id,
        },
      })
    }
  }

  console.log('✅ Database populated with realistic data!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })