<?php

namespace App\Http\Controllers\Api\Analytics;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

/**
 * AnalyticsController — Wrapper that aggregates all analytics endpoints.
 *
 * Each feature has its own invokable controller in this namespace:
 *   OverviewController     → /api/analytics/overview
 *   DemographicsController → /api/analytics/demographics
 *   SectorsController      → /api/analytics/sectors
 *   RegistrationController → /api/analytics/registration
 *   LivelihoodController   → /api/analytics/livelihood
 *   HeatmapController      → /api/analytics/heatmap
 *   InsightsController     → /api/analytics/insights
 *   AnalyticsController    → /api/analytics/all   (this file)
 *
 * ─── routes/api.php ────────────────────────────────────────────────────────
 *
 *  use App\Http\Controllers\Api\Analytics\{
 *      AnalyticsController, OverviewController, DemographicsController,
 *      SectorsController, RegistrationController, LivelihoodController,
 *      HeatmapController, InsightsController
 *  };
 *
 *  Route::prefix('analytics')->group(function () {
 *      Route::get('/overview',     OverviewController::class);
 *      Route::get('/demographics', DemographicsController::class);
 *      Route::get('/sectors',      SectorsController::class);
 *      Route::get('/registration', RegistrationController::class);
 *      Route::get('/livelihood',   LivelihoodController::class);
 *      Route::get('/heatmap',      HeatmapController::class);
 *      Route::get('/insights',     InsightsController::class);
 *      Route::get('/all',          AnalyticsController::class);
 *  });
 *
 * ─── Folder structure ──────────────────────────────────────────────────────
 *  app/Http/Controllers/Api/Analytics/
 *    AnalyticsController.php       ← this file (all endpoint)
 *    OverviewController.php
 *    DemographicsController.php
 *    SectorsController.php
 *    RegistrationController.php
 *    LivelihoodController.php
 *    HeatmapController.php
 *    InsightsController.php
 */
class AnalyticsController extends Controller
{
    public function __construct(
        private OverviewController     $overview,
        private DemographicsController $demographics,
        private SectorsController      $sectors,
        private AnalyticsReg $registration,
        private LivelihoodController   $livelihood,
        private HeatmapController      $heatmap,
        private InsightsController     $insights,
    ) {}

    public function __invoke(): JsonResponse
    {
        return response()->json([
            'overview'     => json_decode($this->overview->__invoke()->getContent()),
            'demographics' => json_decode($this->demographics->__invoke()->getContent()),
            'sectors'      => json_decode($this->sectors->__invoke()->getContent()),
            'registration' => json_decode($this->registration->__invoke()->getContent()),
            'livelihood'   => json_decode($this->livelihood->__invoke()->getContent()),
            'heatmap'      => json_decode($this->heatmap->__invoke()->getContent()),
            'insights'     => json_decode($this->insights->__invoke()->getContent()),
            'generated_at' => now()->toIso8601String(),
        ]);
    }
}