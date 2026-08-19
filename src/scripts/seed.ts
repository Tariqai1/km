import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import path from 'path';
import bcrypt from 'bcryptjs';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Since models might not be loaded in the script environment, we need to import or define them.
// We'll import the schemas here.
import Admin from '../models/Admin';
import Category from '../models/Category';
import Product from '../models/Product';
import Enquiry from '../models/Enquiry';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

function slugify(str: string) {
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI as string);
    console.log('Connected to MongoDB.');

    console.log('Clearing existing data...');
    await Admin.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await Enquiry.deleteMany({});
    console.log('Existing data cleared.');

    // 1. Create Admin
    const passwordHash = await bcrypt.hash('KMAdmin@2024', 12);
    await Admin.create({
      email: 'admin@kmengineering.com',
      passwordHash,
      role: 'admin',
    });
    console.log('Admin user created.');

    // 2. Create Categories
    const categoryNames = [
      'Tutti Frutti Processing',
      'Vibro Sifting & Screening',
      'Bakery Spiral Mixers',
      'Namkeen & Snack Machines',
      'Dough Mixers',
      'Industrial Bakery Equipment'
    ];

    const categories = await Promise.all(
      categoryNames.map(name => Category.create({ 
        name, 
        slug: slugify(name),
        description: `High quality machines for ${name}.`
      }))
    );
    console.log(`${categories.length} Categories created.`);

    // 3. Create Products
    const productsData = [
      {
        title: 'Tutti Frutti Cubing Machine',
        category: categories[0]._id,
        features: ['High speed cubing', 'Stainless steel body'],
        specifications: { Capacity: '500kg/hr', Power: '3HP' },
        price: 'Contact for price',
      },
      {
        title: 'Papaya Peeling Machine',
        category: categories[0]._id,
        features: ['Automatic peeling', 'Low waste'],
        specifications: { Capacity: '300kg/hr', Power: '2HP' },
      },
      {
        title: 'Circular Vibro Sifter 36"',
        category: categories[1]._id,
        features: ['Multiple deck options', 'Low noise'],
        specifications: { Diameter: '36 inch', Motor: '1HP' },
        isFeatured: true,
      },
      {
        title: 'Spiral Mixer 50kg',
        category: categories[2]._id,
        features: ['Dual speed', 'Timer control'],
        specifications: { Capacity: '50kg flour', Power: '3HP/5HP' },
      },
      {
        title: 'Spiral Mixer 90kg',
        category: categories[2]._id,
        features: ['Heavy duty bowl', 'Safety guard'],
        specifications: { Capacity: '90kg flour', Power: '5HP/7.5HP' },
        isFeatured: true,
      },
      {
        title: 'Namkeen Extruder',
        category: categories[3]._id,
        features: ['Multiple dies', 'Easy cleaning'],
        specifications: { Capacity: '100kg/hr', Motor: '2HP' },
      },
      {
        title: 'Continuous Fryer',
        category: categories[3]._id,
        features: ['Oil filtration', 'Temperature control'],
        specifications: { 'Belt Width': '400mm', Heating: 'Gas/Diesel' },
      },
      {
        title: 'Planetary Mixer 40L',
        category: categories[4]._id,
        features: ['3 attachments', 'Variable speed'],
        specifications: { Volume: '40 Liters', Power: '2HP' },
      },
      {
        title: 'Rotary Rack Oven',
        category: categories[5]._id,
        features: ['Even baking', 'Steam system'],
        specifications: { Trays: '84', Fuel: 'Diesel/Gas/Wood' },
        isFeatured: true,
      },
      {
        title: 'Bread Slicer',
        category: categories[5]._id,
        features: ['Adjustable thickness', 'High speed'],
        specifications: { Capacity: '300 loaves/hr', Power: '0.5HP' },
      }
    ];

    const placeholderImage = { url: 'https://res.cloudinary.com/gksfzjxf/image/upload/v1/products/placeholder.jpg', cloudinaryId: 'products/placeholder' };

    const products = await Promise.all(
      productsData.map(data => Product.create({
        ...data,
        slug: slugify(data.title),
        description: `This is a high-quality ${data.title} manufactured by K.M. Engineering Works.`,
        images: [placeholderImage],
        status: 'Active'
      }))
    );
    console.log(`${products.length} Products created.`);

    // 4. Create Enquiries
    const enquiriesData = [
      { name: 'Rahul Sharma', phone: '9876543210', email: 'rahul@bakery.com', message: 'Interested in Spiral Mixer 50kg.', productInterest: products[3]._id, status: 'New' },
      { name: 'Amit Patel', phone: '9876543211', companyName: 'Patel Snacks', message: 'Need quotation for Namkeen Extruder.', productInterest: products[5]._id, status: 'In-Progress' },
      { name: 'Priya Singh', phone: '9876543212', message: 'Looking for a planetary mixer.', productInterest: products[7]._id, status: 'Contacted' },
      { name: 'Vikram Reddy', phone: '9876543213', email: 'vikram@foodcorp.in', message: 'Want details about Tutti Frutti Cubing Machine.', productInterest: products[0]._id, status: 'New' },
      { name: 'Sanjay Kumar', phone: '9876543214', message: 'Price for Rotary Rack Oven?', productInterest: products[8]._id, status: 'Archived' },
    ];

    const enquiries = await Promise.all(
      enquiriesData.map(data => Enquiry.create(data))
    );
    console.log(`${enquiries.length} Enquiries created.`);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
