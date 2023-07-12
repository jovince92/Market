<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Billboard;
use App\Models\Category;
use App\Models\Image;
use App\Models\Store;
use App\Models\User;
use Faker\Factory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);
        $faker = Factory::create('en_US');

        User::factory()->create([
            'name' => 'Admin',
            'email' => 'admin',
            //password = admin
            'password'=>Hash::make('admin'),
            'level'=>1
        ]);
        
    }
}
