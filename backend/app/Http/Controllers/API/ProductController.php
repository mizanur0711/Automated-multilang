<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Services\TranslationService;

class ProductController extends Controller
{
    protected $translationService;

    public function __construct(TranslationService $translationService)
    {
        $this->translationService = $translationService;
    }

    public function index(Request $request)
    {
        $lang = $request->query('lang', 'en');
        $products = Product::all();

        if ($lang !== 'en') {
            $products = $products->map(function ($product) use ($lang) {
                return [
                    'id' => $product->id,
                    'name' => $this->translationService->translate($product->name, $lang, 'product_name'),
                    'description' => $this->translationService->translate($product->description, $lang, 'product_description'),
                    'category' => $this->translationService->translate($product->category, $lang, 'category'),
                    'price' => $product->price,
                    'image' => $product->image,
                    'specifications' => $product->specifications,
                ];
            });
        }

        return response()->json([
            'success' => true,
            'language' => $lang,
            'data' => $products
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'category' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'nullable|string',
        ]);

        $product = Product::create($validated);

        return response()->json([
            'success' => true,
            'data' => $product
        ], 201);
    }
}
