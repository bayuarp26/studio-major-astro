#!/usr/bin/env node

/**
 * Database Health Check Script
 * Run: npm run check-db or node scripts/check-db.js
 */

import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = 'portfolioDB';

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in environment variables');
  console.log('💡 Make sure .env file exists with proper MongoDB URI');
  process.exit(1);
}

async function checkDatabase() {
  console.log('🔍 Starting database health check...\n');
  
  try {
    // Test connection
    console.log('📡 Connecting to MongoDB...');
    const client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log('✅ Successfully connected to MongoDB\n');
    
    const db = client.db(DB_NAME);
    
    // List all collections
    console.log('📋 Available collections:');
    const collections = await db.listCollections().toArray();
    collections.forEach((col, index) => {
      console.log(`   ${index + 1}. ${col.name}`);
    });
    
    console.log('\n📊 Collection statistics:');
    
    // Check each collection
    const collectionNames = [
      'profil_settings',
      'content', 
      'projects',
      'education',
      'certificates',
      'soft_skills',
      'hard_skills',
      'software_skills'
    ];
    
    for (const collectionName of collectionNames) {
      try {
        const count = await db.collection(collectionName).countDocuments();
        const status = count > 0 ? '✅' : '⚠️';
        console.log(`   ${status} ${collectionName}: ${count} documents`);
      } catch (error) {
        console.log(`   ❌ ${collectionName}: Error - ${error.message}`);
      }
    }
    
    // Check admin users
    console.log('\n👤 Admin users in profil_settings:');
    try {
      const users = await db.collection('profil_settings').find({}).toArray();
      if (users.length === 0) {
        console.log('   ⚠️ No admin users found');
        console.log('   💡 Create admin user with: node scripts/create-admin.js');
      } else {
        users.forEach((user, index) => {
          console.log(`   ${index + 1}. Username: ${user.username} ${user.password ? '🔒' : '❌ No password'}`);
        });
      }
    } catch (error) {
      console.log(`   ❌ Error checking admin users: ${error.message}`);
    }
    
    // Test sample data query
    console.log('\n🧪 Testing data queries:');
    try {
      const sampleProject = await db.collection('projects').findOne({});
      console.log(`   ✅ Projects query: ${sampleProject ? 'Working' : 'No data'}`);
      
      const sampleContent = await db.collection('content').findOne({});
      console.log(`   ✅ Content query: ${sampleContent ? 'Working' : 'No data'}`);
    } catch (error) {
      console.log(`   ❌ Query test failed: ${error.message}`);
    }
    
    await client.close();
    console.log('\n✅ Database health check completed successfully!');
    
  } catch (error) {
    console.error('❌ Database health check failed:');
    console.error('Error:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('\n💡 Authentication troubleshooting:');
      console.log('   - Check username and password in MongoDB URI');
      console.log('   - Verify database user permissions');
    }
    
    if (error.message.includes('network')) {
      console.log('\n💡 Network troubleshooting:');
      console.log('   - Check internet connection');
      console.log('   - Verify MongoDB Atlas IP whitelist');
      console.log('   - Try connecting from MongoDB Compass');
    }
    
    process.exit(1);
  }
}

// Environment info
console.log('🌍 Environment Information:');
console.log(`   Node.js: ${process.version}`);
console.log(`   MongoDB URI: ${MONGODB_URI ? '✅ Set' : '❌ Missing'}`);
console.log(`   Database: ${DB_NAME}`);
console.log('');

checkDatabase().catch(console.error);
