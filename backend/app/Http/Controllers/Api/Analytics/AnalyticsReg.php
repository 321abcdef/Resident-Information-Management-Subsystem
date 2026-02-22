<?php

namespace App\Http\Controllers\Api\Analytics;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class AnalyticsReg extends Controller
{
    public function __invoke(): JsonResponse
    {
        $trend = DB::table('residents')->whereNull('deleted_at')
            ->selectRaw("DATE(created_at) as date, COUNT(*) as count")
            ->groupByRaw("DATE(created_at)")->orderBy('date')->get()
            ->map(fn($r) => [
                'date'  => Carbon::parse($r->date)->format('M d'),
                'count' => (int) $r->count,
            ]);

        // Verification rate: only counts submitted residents (verified + pending + rejected).
        // Unregistered (no barangay_id, never submitted) are excluded from the denominator
        // so the rate reflects actual processing efficiency, not total population coverage.
        $purokVerif = DB::table('residents as r')
            ->join('puroks as p', 'r.temp_purok_id', '=', 'p.id')
            ->whereNull('r.deleted_at')
            ->selectRaw("
                p.name as purok, p.number as purok_number,
                COUNT(*) as total,
                SUM(CASE WHEN r.status = 'Verified'          THEN 1 ELSE 0 END) as verified,
                SUM(CASE WHEN r.status = 'Pending'           THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN r.status = 'Rejected'          THEN 1 ELSE 0 END) as rejected,
                SUM(CASE WHEN r.barangay_id IS NULL           THEN 1 ELSE 0 END) as unregistered,

                -- submitted = residents who have an application (not unregistered)
                SUM(CASE WHEN r.barangay_id IS NOT NULL OR r.status IN ('Verified','Pending','Rejected')
                         THEN 1 ELSE 0 END) as submitted,

                -- verif_rate uses submitted as denominator, not total
                ROUND(
                    SUM(CASE WHEN r.status = 'Verified' THEN 1 ELSE 0 END)
                    / NULLIF(
                        SUM(CASE WHEN r.status IN ('Verified','Pending','Rejected') THEN 1 ELSE 0 END),
                        0
                    ) * 100
                , 0) as verif_rate
            ")
            ->groupBy('p.name', 'p.number')->orderBy('p.number')->get();

        $avgVerif = DB::table('residents')->whereNull('deleted_at')
            ->where('status', 'Verified')->whereNotNull('verified_at')
            ->selectRaw("
                ROUND(AVG(TIMESTAMPDIFF(HOUR, created_at, verified_at)), 1) as avg_hours,
                MIN(TIMESTAMPDIFF(HOUR, created_at, verified_at)) as min_hours,
                MAX(TIMESTAMPDIFF(HOUR, created_at, verified_at)) as max_hours
            ")->first();

        $weeklyTrend = DB::table('residents')->whereNull('deleted_at')
            ->whereRaw("created_at >= DATE_SUB(CURDATE(), INTERVAL 8 WEEK)")
            ->selectRaw("WEEK(created_at) as week_num, COUNT(*) as count")
            ->groupByRaw("WEEK(created_at)")->orderBy('week_num')->get();

        return response()->json([
            'registration_trend'    => $trend,
            'purok_verification'    => $purokVerif,
            'avg_verification_time' => $avgVerif,
            'weekly_trend'          => $weeklyTrend,
        ]);
    }
}