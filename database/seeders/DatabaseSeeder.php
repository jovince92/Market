<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Billboard;
use App\Models\Category;
use App\Models\Image;
use App\Models\Store;
use Faker\Factory;
use Illuminate\Database\Seeder;

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

        // for($i=0;$i<36;$i++){
        //     Billboard::create([
        //         'store_id'=>Store::all()->random()->id,
        //         'label'=>$faker->company(),
        //         'image_id'=>Image::all()->random()->id,
        //     ]);
        // }


        for($i=0;$i<120;$i++){
            Category::create([
                'store_id'=>Store::all()->random()->id,
                'billboard_id'=>Billboard::all()->random()->id,
                'name'=>$faker->sentence(2),
            ]);
        }
    }
}
