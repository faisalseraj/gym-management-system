const { db } = require('@vercel/postgres');
const bcrypt = require('bcrypt');

// Sample data
const {
  users,
  trainers,
  members,
  memberships,
  payments,
} = require('../app/lib/placeholder-data.js');
async function deleteTables(client) {
  try {
    await client.query(`DROP TABLE users`)
    // await client.query(`DROP TABLE customers`)
    // await client.query(`DROP TABLE invoices`)
    // await client.query(`DROP TABLE revenue`)
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }

}
async function seedUsers(client) {
  try {
    await client.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    // Create the "users" table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        phone_number VARCHAR(20)
      );
    `);

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.query(`
          INSERT INTO users (id, name, email, password, role, phone_number)
          VALUES ($1, $2, $3, $4, $5, $6)
          ON CONFLICT (email) DO NOTHING;
        `, [user.id, user.name, user.email, hashedPassword, user.role, user.phone_number]);
      })
    );

    console.log(`Seeded ${insertedUsers.length} users`);
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedTrainers(client) {
  try {
    // Create the "trainers" table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS trainers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone_number VARCHAR(20),
        user_id UUID REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log(`Created "trainers" table`);

    // Insert data into the "trainers" table
    const insertedTrainers = await Promise.all(
      trainers.map(async (trainer) => {
        return client.query(`
          INSERT INTO trainers (id, name, email, phone_number, user_id)
          VALUES ($1, $2, $3, $4, $5);
        `, [trainer.id, trainer.name, trainer.email, trainer.phone_number, trainer.user_id]);
      })
    );

    console.log(`Seeded ${insertedTrainers.length} trainers`);
  } catch (error) {
    console.error('Error seeding trainers:', error);
    throw error;
  }
}

async function seedMembers(client) {
  try {
    // Create the "members" table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS members (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        phone_number VARCHAR(20),
        address TEXT,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    console.log(`Created "members" table`);

    // Insert data into the "members" table
    const insertedMembers = await Promise.all(
      members.map(async (member) => {
        return client.query(`
          INSERT INTO members (id, name, email, phone_number, address, user_id)
          VALUES ($1, $2, $3, $4, $5, $6);
        `, [member.id, member.name, member.email, member.phone_number, member.address, member.user_id]);
      })
    );

    console.log(`Seeded ${insertedMembers.length} members`);
  } catch (error) {
    console.error('Error seeding members:', error);
    throw error;
  }
}

async function seedMemberships(client) {
  try {
    // Create the "memberships" table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS memberships (
        id SERIAL PRIMARY KEY,
        member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        plan VARCHAR(255) NOT NULL,
        amount INT NOT NULL
      );
    `);

    console.log(`Created "memberships" table`);

    // Insert data into the "memberships" table
    const insertedMemberships = await Promise.all(
      memberships.map(async (membership) => {
        return client.query(`
          INSERT INTO memberships (member_id, start_date, end_date, plan, amount)
          VALUES ($1, $2, $3, $4, $5);
        `, [membership.member_id, membership.start_date, membership.end_date, membership.plan, membership.amount]);
      })
    );

    console.log(`Seeded ${insertedMemberships.length} memberships`);
  } catch (error) {
    console.error('Error seeding memberships:', error);
    throw error;
  }
}

async function seedPayments(client) {
  try {
    // Create the "payments" table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        member_id UUID NOT NULL REFERENCES members(id) ON DELETE CASCADE,
        amount INT NOT NULL,
        date DATE NOT NULL,
        method VARCHAR(50) NOT NULL
      );
    `);

    console.log(`Created "payments" table`);

    // Insert data into the "payments" table
    const insertedPayments = await Promise.all(
      payments.map(async (payment) => {
        return client.query(`
          INSERT INTO payments (member_id, amount, date, method)
          VALUES ($1, $2, $3, $4);
        `, [payment.member_id, payment.amount, payment.date, payment.method]);
      })
    );

    console.log(`Seeded ${insertedPayments.length} payments`);
  } catch (error) {
    console.error('Error seeding payments:', error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  try {
    await deleteTables();
    // await seedUsers(client);
    // await seedTrainers(client);
    // await seedMembers(client);
    // await seedMemberships(client);
    // await seedPayments(client);
  } catch (error) {
    console.error('An error occurred while seeding the database:', error);
  } finally {
    await client.end();
  }
}

main();
