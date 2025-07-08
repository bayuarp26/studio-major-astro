#!/usr/bin/env node

/**
 * Create Admin User Script
 * Run: node scripts/create-admin.js
 */

import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import readline from 'readline';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'portfolioDB';

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in environment variables');
  process.exit(1);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function createAdminUser() {
  console.log('👤 Create New Admin User\n');
  
  try {
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    const db = client.db(DB_NAME);
    
    // Check existing users
    const existingUsers = await db.collection('profil_settings').find({}).toArray();
    
    if (existingUsers.length > 0) {
      console.log('📋 Existing admin users:');
      existingUsers.forEach((user, index) => {
        console.log(`   ${index + 1}. ${user.username}`);
      });
      console.log('');
    }
    
    // Get user input
    const username = await askQuestion('Enter new admin username: ');
    const password = await askQuestion('Enter admin password: ');
    
    if (!username || !password) {
      console.log('❌ Username and password are required');
      process.exit(1);
    }
    
    // Check if username already exists
    const existingUser = await db.collection('profil_settings').findOne({ username });
    if (existingUser) {
      console.log(`❌ Username "${username}" already exists`);
      process.exit(1);
    }
    
    // Hash password
    console.log('🔒 Hashing password...');
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create user
    const newUser = {
      username,
      password: hashedPassword,
      createdAt: new Date(),
      role: 'admin'
    };
    
    const result = await db.collection('profil_settings').insertOne(newUser);
    
    console.log(`✅ Admin user created successfully!`);
    console.log(`   ID: ${result.insertedId}`);
    console.log(`   Username: ${username}`);
    console.log(`   Password: ${password} (save this securely)`);
    
    await client.close();
    rl.close();
    
  } catch (error) {
    console.error('❌ Failed to create admin user:', error.message);
    rl.close();
    process.exit(1);
  }
}

createAdminUser();
