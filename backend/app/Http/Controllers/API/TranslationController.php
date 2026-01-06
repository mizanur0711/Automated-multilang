<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\TranslationService;

class TranslationController extends Controller
{
    protected $translationService;

    public function __construct(TranslationService $translationService)
    {
        $this->translationService = $translationService;
    }

    public function languages()
    {
        $languages = $this->translationService->getAvailableLanguages();
        
        return response()->json([
            'success' => true,
            'data' => $languages
        ]);
    }

    public function translate(Request $request)
    {
        $validated = $request->validate([
            'text' => 'required|string',
            'target_language' => 'required|string|size:2',
        ]);

        $translated = $this->translationService->translate(
            $validated['text'],
            $validated['target_language']
        );

        return response()->json([
            'success' => true,
            'translated_text' => $translated
        ]);
    }
}
