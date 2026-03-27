import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const MONGODB_URI = 'mongodb+srv://vieturegroup_db_user:PDgmOtV6bKACCLRd@vieture-stayhub.6u9q6ix.mongodb.net/boarding_house_db?retryWrites=true&w=majority&appName=VieTure-StayHub';

const newUser = {
  ten: 'Vieture',
  name: 'Vieture',
  email: 'vieturegroup@gmail.com',
  soDienThoai: '0987654321',
  phone: '0987654321',
  vaiTro: 'admin',
  role: 'admin',
  trangThai: 'hoatDong',
  isActive: true,
  ngayTao: new Date(),
  ngayCapNhat: new Date(),
};

async function createUser() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('boarding_house_db');
    const collection = db.collection('nguoidungs');

    // Check if email already exists
    const existing = await collection.findOne({ email: newUser.email });
    if (existing) {
      console.log('User with this email already exists!');
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash('Vieture', salt);

    const userToInsert = {
      ...newUser,
      matKhau: hashedPassword,
      password: hashedPassword,
    };

    const result = await collection.insertOne(userToInsert);
    console.log('User created successfully:', result.insertedId);
    console.log('Email:', newUser.email);
    console.log('Password: Vieture');
    console.log('Role: admin');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

createUser();
