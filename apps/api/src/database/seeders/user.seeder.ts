import 'reflect-metadata';
import * as bcrypt from 'bcrypt';
import dataSource from '../data-source';
import { UserEntity } from '../../entities/user.entity';

const users = [
  { name: 'Alice', email: 'alice@example.com', phone: '9000000001', password: 'password123' },
  { name: 'Bob', email: 'bob@example.com', phone: '9000000002', password: 'password123' },
  { name: 'Charlie', email: 'charlie@example.com', phone: '9000000003', password: 'password123' },
  { name: 'David', email: 'david@example.com', phone: '9000000004', password: 'password123' },
];

async function seed() {
  await dataSource.initialize();
  const userRepository = dataSource.getRepository(UserEntity);

  for (const user of users) {
    const exists = await userRepository.findOneBy({ phone: user.phone });
    if (exists) {
      console.log(`User ${user.name} already exists, skipping.`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = userRepository.create({
      ...user,
      password: hashedPassword,
    });
    await userRepository.save(newUser);
    console.log(`User ${user.name} created.`);
  }

  await dataSource.destroy();
  console.log('Seeding complete.');
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
