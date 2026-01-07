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
            [
                'name' => 'Hydraulic Pump System',
                'description' => 'Heavy-duty hydraulic pumps designed for construction and mining equipment. High pressure tolerance.',
                'category' => 'Machinery',
                'price' => 2100.00,
                'image' => 'https://images.unsplash.com/photo-1581094288338-2314dddb7ece?w=400',
            ],
            [
                'name' => 'Precision Servo Motors',
                'description' => 'High-torque servo motors for robotics and automation systems. Precise control and feedback.',
                'category' => 'Automation',
                'price' => 550.00,
                'image' => 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=400',
            ],
            [
                'name' => 'Automated Conveyor Belt',
                'description' => 'Modular conveyor systems for warehouse logistics and assembly lines. Adjustable speed and load capacity.',
                'category' => 'Logistics',
                'price' => 3500.00,
                'image' => 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400',
            ],
            [
                'name' => 'Industrial Robotic Arm',
                'description' => '6-axis robotic arm for welding, painting, and assembly tasks. Programmable and safe for human collaboration.',
                'category' => 'Robotics',
                'price' => 12500.00,
                'image' => 'https://images.unsplash.com/photo-1565514020176-87d29bcbd5f1?w=400',
            ],
            [
                'name' => 'Fiber Laser Cutter',
                'description' => 'High-power fiber laser cutting machine for metal sheets. Precision cutting with minimal waste.',
                'category' => 'Machinery',
                'price' => 18000.00,
                'image' => 'https://images.unsplash.com/photo-1531297461136-82lw9z0u8093?w=400',
            ],
            [
                'name' => 'High-Voltage Transformer',
                'description' => 'Step-up and step-down power transformers for industrial power distribution grids.',
                'category' => 'Energy',
                'price' => 4200.00,
                'image' => 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400',
            ],
            [
                'name' => 'Pneumatic Control Valve',
                'description' => 'Durable pneumatic valves for process control in oil, gas, and chemical industries.',
                'category' => 'Components',
                'price' => 180.00,
                'image' => 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?w=400',
            ],
            [
                'name' => 'Solar Panel Array',
                'description' => 'High-efficiency monocrystalline solar panels for industrial renewable energy projects.',
                'category' => 'Energy',
                'price' => 8500.00,
                'image' => 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400',
            ],
            [
                'name' => 'Heavy Duty Bearings',
                'description' => 'Roller and ball bearings for heavy machinery and automotive applications. Heat resistant.',
                'category' => 'Components',
                'price' => 75.00,
                'image' => 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?w=400',
            ],
            [
                'name' => 'Industrial Cooling Tower',
                'description' => 'Large-scale water cooling towers for HVAC and industrial process cooling. Energy efficient design.',
                'category' => 'Infrastructure',
                'price' => 9500.00,
                'image' => 'https://images.unsplash.com/photo-1581094543454-93c6f6c919d3?w=400',
            ],
            [
                'name' => '3D Printer (Industrial)',
                'description' => 'Large format FDM/SLA 3D printers for rapid prototyping and manufacturing parts.',
                'category' => 'Prototyping',
                'price' => 6500.00,
                'image' => 'https://images.unsplash.com/photo-1631541909061-71e349d1f203?w=400',
            ],
            [
                'name' => 'Lithium Battery Pack',
                'description' => 'High-capacity lithium-ion battery modules for electric vehicles and energy storage systems.',
                'category' => 'Energy',
                'price' => 2800.00,
                'image' => 'https://images.unsplash.com/photo-1619641901614-722dc6f37021?w=400',
            ],
            [
                'name' => 'Stainless Steel Fasteners',
                'description' => 'Corrosion-resistant bolts, nuts, and screws for marine and construction use.',
                'category' => 'Components',
                'price' => 45.00,
                'image' => 'https://images.unsplash.com/photo-1581093570624-9dfc1c73792c?w=400',
            ],
            [
                'name' => 'Digital Multimeter Pro',
                'description' => 'Professional grade digital multimeter for electrical diagnostics and testing.',
                'category' => 'Tools',
                'price' => 120.00,
                'image' => 'https://images.unsplash.com/photo-1581093583449-8255a4d44547?w=400',
            ],
            [
                'name' => 'Centrifugal Compressor',
                'description' => 'High-flow air compressors for large manufacturing plants and refineries.',
                'category' => 'Machinery',
                'price' => 5600.00,
                'image' => 'https://images.unsplash.com/photo-1581093450002-e25c7e108620?w=400',
            ],
            [
                'name' => 'Welding Robot Unit',
                'description' => 'Automated spot welding robot cell for automotive assembly lines.',
                'category' => 'Robotics',
                'price' => 15000.00,
                'image' => 'https://images.unsplash.com/photo-1531297461136-82lw9z0u8093?w=400',
            ],
        ];

        foreach ($products as $product) {
            Product::create($product);
        }
    }
}
