import Role from '#models/role'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Roles
    const adminRole = await Role.create({
      name: 'admin',
      description: 'Administrator',
    })
    const userRole = await Role.create({
      name: 'user',
      description: 'Regular User',
    })

    await User.create({
      fullName: 'Admin',
      email: 'admin@example.com',
      password: 'password123',
      roleId: adminRole.id,
      isVerified: true,
    })
    await User.create({
      fullName: 'User',
      email: 'user@example.com',
      password: 'password123',
      roleId: userRole.id,
      isVerified: true,
    })
  }
}
