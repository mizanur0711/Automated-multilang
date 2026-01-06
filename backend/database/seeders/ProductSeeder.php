<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = [
            [
                'name' => 'Industrial PCB Assembly',
                'description' => 'High-quality printed circuit board assembly for industrial applications. Certified to ISO 9001 standards.',
                'category' => 'Electronics',
                'price' => 1250.00,
                'image' => 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
            ],
            [
                'name' => 'CNC Machined Parts',
                'description' => 'Precision CNC machined components made from aluminum, steel, and titanium. Custom specifications available.',
                'category' => 'Manufacturing',
                'price' => 850.00,
                'image' => 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
            ],
            [
                'name' => 'LED Display Modules',
                'description' => 'Commercial-grade LED display modules for outdoor and indoor use. Waterproof and energy-efficient.',
                'category' => 'Electronics',
                'price' => 320.00,
                'image' => 'https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?w=400',
            ],
            [
                'name' => 'Injection Molded Components',
                'description' => 'Custom plastic injection molding services for automotive and consumer products. Fast turnaround time.',
                'category' => 'Manufacturing',
                'price' => 450.00,
                'image' => 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
