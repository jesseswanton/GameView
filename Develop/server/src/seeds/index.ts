// import { seedVolunteers } from './seeds.js';
// import { sequelize } from '../models/index.js';

// const seedAll = async (): Promise<void> => {
//   try {
//     await sequelize.sync({ force: true });
//     console.log('\n----- DATABASE SYNCED -----\n');
    
//     await seedVolunteers();
//     console.log('\n----- VOLUNTEERS SEEDED -----\n');
    
//     await seedWork();
//     console.log('\n----- WORK SEEDED -----\n');
    
//     process.exit(0);
//   } catch (error) {
//     console.error('Error seeding database:', error);
//     process.exit(1);
//   }
// };

// seedAll();
