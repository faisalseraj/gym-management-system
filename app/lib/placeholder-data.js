const { v4: uuidv4 } = require('uuid');

const generateUUID = () => uuidv4();

// Generate placeholder data for users
const users = [
  {
    id: generateUUID(),
    name: 'Super Admin',
    email: 'superadmin@example.com',
    password: '123456',
    role: 'superadmin',
    phone_number: '1234567890'
  },
  {
    id: generateUUID(),
    name: 'Admin',
    email: 'admin@example.com',
    password: '123456',
    role: 'admin',
    phone_number: '1234567890'
  },
  {
    id: generateUUID(),
    name: 'Gym Owner 1',
    email: 'gymowner1@example.com',
    password: '123456',
    role: 'gym-owner',
    phone_number: '1234567890'
  },
  {
    id: generateUUID(),
    name: 'Gym Owner 2',
    email: 'gymowner2@example.com',
    password: '123456',
    role: 'gym-owner',
    phone_number: '1234567890'
  },
  // Add more gym owners as needed
];

// Generate placeholder data for trainers
const trainers = [];
for (let i = 0; i < 10; i++) {
  trainers.push({
    id: generateUUID(),
    name: `Trainer ${i + 1}`,
    email: `trainer${i + 1}@example.com`,
    phone_number: '1234567890',
    user_id: users[2].id // Assigning all trainers to Gym Owner 1 for example
  });
}

// Generate placeholder data for members
const members = [];
for (let i = 0; i < 10; i++) {
  members.push({
    id: generateUUID(),
    name: `Member ${i + 1}`,
    email: `member${i + 1}@example.com`,
    phone_number: '1234567890',
    address: `Address ${i + 1}`,
    user_id: users[2].id // Assigning all members to Gym Owner 1 for example
  });
}

// Generate placeholder data for memberships
const memberships = [];
for (let i = 0; i < 10; i++) {
  memberships.push({
    member_id: members[i].id,
    start_date: '2024-01-01',
    end_date: '2024-12-31',
    plan: 'Annual',
    amount: 1200
  });
}

// Generate placeholder data for payments
const payments = [];
for (let i = 0; i < 10; i++) {
  payments.push({
    member_id: members[i].id,
    amount: 1200,
    date: '2024-01-01',
    method: 'Credit Card'
  });
}

module.exports = {
  users,
  trainers,
  members,
  memberships,
  payments
};
