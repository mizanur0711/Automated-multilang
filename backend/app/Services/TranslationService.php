<?php

namespace App\Services;

use App\Models\Translation;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class TranslationService
{
    private $libreTranslateUrl;

    public function __construct()
    {
        $this->libreTranslateUrl = env('LIBRE_TRANSLATE_URL', 'http://localhost:5000');
    }

    public function translate(string $text, string $targetLang, string $context = null): string
    {
        // Check cache first
        $cached = Translation::where('source_text', $text)
            ->where('target_language', $targetLang)
            ->first();

        if ($cached) {
            Log::info("Translation cache HIT for: {$targetLang}");
            return $cached->translated_text;
        }

        Log::info("Translation cache MISS for: {$targetLang} - Calling LibreTranslate");

        // Call LibreTranslate
        try {
            $response = Http::timeout(10)->post("{$this->libreTranslateUrl}/translate", [
                'q' => $text,
                'source' => 'en',
                'target' => $targetLang,
                'format' => 'text'
            ]);

            if ($response->successful()) {
                $translatedText = $response->json()['translatedText'];

                // Save to cache
                Translation::create([
                    'source_text' => $text,
                    'source_language' => 'en',
                    'target_language' => $targetLang,
                    'translated_text' => $translatedText,
                    'context' => $context,
                    'is_approved' => $targetLang !== 'zh' // Chinese needs approval
                ]);

                return $translatedText;
            }
        } catch (\Exception $e) {
            Log::error("Translation failed: " . $e->getMessage());
        }

        // Fallback to original text
        return $text;
    }

    public function getAvailableLanguages(): array
    {
        try {
            $response = Http::get("{$this->libreTranslateUrl}/languages");
            return $response->json();
        } catch (\Exception $e) {
            return [];
        }
    }
}