<?php

namespace App\Http\Controllers\Api\Analytics;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class InsightsController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $total    = DB::table('residents')->whereNull('deleted_at')->count();
        $verified = DB::table('residents')->whereNull('deleted_at')->where('status', 'Verified')->count();
        $pending  = DB::table('residents')->whereNull('deleted_at')->where('status', 'Pending')->count();
        $rejected = DB::table('residents')->whereNull('deleted_at')->where('status', 'Rejected')->count();
        $submitted = $verified + $pending + $rejected;

        $unregByPurok = DB::table('residents as r')
            ->join('puroks as p', 'r.temp_purok_id', '=', 'p.id')
            ->whereNull('r.deleted_at')->whereNull('r.barangay_id')
            ->selectRaw("p.name as purok, COUNT(*) as count")
            ->groupBy('p.name')->orderByRaw("COUNT(*) DESC")->get();
        $mostUnreg = $unregByPurok->first();

        $seniorByPurok = DB::table('residents as r')
            ->join('puroks as p', 'r.temp_purok_id', '=', 'p.id')
            ->whereNull('r.deleted_at')->where('r.sector_id', 3)
            ->selectRaw("p.name as purok, COUNT(*) as count")
            ->groupBy('p.name')->orderByRaw("COUNT(*) DESC")->get();
        $mostSeniors  = $seniorByPurok->first();
        $totalSeniors = $seniorByPurok->sum('count');

        $totalPwd   = DB::table('residents')->whereNull('deleted_at')->where('sector_id', 2)->count();
        $lowIncome  = DB::table('employment_data as e')
            ->join('residents as r', 'e.resident_id', '=', 'r.id')
            ->whereNull('r.deleted_at')
            ->whereIn('e.monthly_income', ['No Income', 'Below 5,000', '0'])
            ->count();

        $naEdu = DB::table('education_data as ed')
            ->join('residents as r', 'ed.resident_id', '=', 'r.id')
            ->whereNull('r.deleted_at')->where('ed.school_level', 'N/A')->count();

        $newResidents = DB::table('residents')
            ->whereNull('deleted_at')->where('residency_status', 'New Resident')->count();

        // Purok verification rates — submitted only (not total)
        $purokVerifRates = DB::table('residents as r')
            ->join('puroks as p', 'r.temp_purok_id', '=', 'p.id')
            ->whereNull('r.deleted_at')
            ->selectRaw("p.name as purok,
                SUM(CASE WHEN r.status = 'Verified' THEN 1 ELSE 0 END) as verified,
                SUM(CASE WHEN r.status IN ('Verified','Pending','Rejected') THEN 1 ELSE 0 END) as submitted")
            ->groupBy('p.name')
            ->having('submitted', '>=', 3)->get()
            ->map(fn($r) => (object)[
                'purok'    => $r->purok,
                'submitted'=> (int)$r->submitted,
                'verified' => (int)$r->verified,
                'rate'     => $r->submitted > 0 ? round(($r->verified / $r->submitted) * 100) : 0,
            ])->sortBy('rate');
        $lowestVerifPurok = $purokVerifRates->first();

        $indigentHH = DB::table('households')->whereNull('deleted_at')->where('is_active', 1)->where('is_indigent', 1)->count();
        $totalHH    = DB::table('households')->whereNull('deleted_at')->where('is_active', 1)->count();

        $insights = [];

        // ── HIGH PRIORITY ──────────────────────────────────────────────────────
        if ($mostUnreg && $mostUnreg->count >= 3) {
            $insights[] = [
                'type' => 'alert', 'priority' => 'HIGH', 'icon' => '📋',
                'title' => "{$mostUnreg->purok} — Registration Drive Needed",
                'description' => "{$mostUnreg->purok} has {$mostUnreg->count} residents without a Barangay ID. These residents cannot access ID-verified barangay services.",
                'action' => "Set up a registration kiosk or conduct door-to-door enrollment in {$mostUnreg->purok}. Prioritize elderly and PWD residents.",
                'metric' => (int)$mostUnreg->count, 'metric_label' => 'Unregistered',
            ];
        }

        if ($mostSeniors && $mostSeniors->count >= 1) {
            $insights[] = [
                'type' => 'alert', 'priority' => 'HIGH', 'icon' => '👴',
                'title' => "{$mostSeniors->purok} — Priority Senior Services",
                'description' => "{$mostSeniors->purok} has the highest senior citizen concentration ({$mostSeniors->count}). Prioritize for ayuda, health programs, and OSCA services.",
                'action' => "Coordinate with OSCA. Assign health workers for regular visits in {$mostSeniors->purok}. Ensure all {$totalSeniors} seniors are on the priority list.",
                'metric' => (int)$mostSeniors->count, 'metric_label' => 'Seniors',
            ];
        }

        $pendingPct = $submitted > 0 ? round(($pending / $submitted) * 100) : 0;
        if ($pending >= 10) {
            $insights[] = [
                'type' => 'alert', 'priority' => 'HIGH', 'icon' => '⏳',
                'title' => "{$pending} Pending Verifications — Action Needed",
                'description' => "{$pendingPct}% of submitted applications ({$pending} of {$submitted}) are still pending. This delays ID issuance for waiting residents.",
                'action' => "Assign staff for dedicated verification sessions. Target clearing all pending submissions within 5 business days.",
                'metric' => (int)$pending, 'metric_label' => 'Pending',
            ];
        }

        // ── MEDIUM PRIORITY ────────────────────────────────────────────────────
        $lowIncomePct = $total > 0 ? round(($lowIncome / $total) * 100) : 0;
        if ($lowIncomePct >= 10) {
            $insights[] = [
                'type' => 'warning', 'priority' => 'MEDIUM', 'icon' => '💰',
                'title' => "{$lowIncomePct}% Below ₱5,000/month or No Income",
                'description' => "{$lowIncome} residents are in the lowest income brackets and may qualify for 4Ps, DSWD, and livelihood programs.",
                'action' => "Cross-reference with DSWD/4Ps lists. Endorse qualifying non-beneficiaries. Coordinate TESDA livelihood referrals.",
                'metric' => (int)$lowIncome, 'metric_label' => 'Low Income',
            ];
        }

        if ($lowestVerifPurok && $lowestVerifPurok->rate < 60) {
            $insights[] = [
                'type' => 'warning', 'priority' => 'MEDIUM', 'icon' => '🏘️',
                'title' => "{$lowestVerifPurok->purok} — Lowest Verification Rate ({$lowestVerifPurok->rate}%)",
                'description' => "Only {$lowestVerifPurok->verified} of {$lowestVerifPurok->submitted} submitted applications in {$lowestVerifPurok->purok} are verified.",
                'action' => "Deploy an enrollment officer specifically for {$lowestVerifPurok->purok}. Conduct barangay assembly to explain the digital ID system.",
                'metric' => $lowestVerifPurok->rate, 'metric_label' => '% Verified',
            ];
        }

        if ($totalSeniors >= 5) {
            $insights[] = [
                'type' => 'info', 'priority' => 'MEDIUM', 'icon' => '🏥',
                'title' => "{$totalSeniors} Senior Citizens — OSCA Coordination",
                'description' => "{$totalSeniors} seniors are registered. They must be prioritized for distribution events, health screenings, and social welfare.",
                'action' => "Generate a quarterly sectoral report for OSCA. Coordinate health center for senior programs. Ensure senior IDs are updated.",
                'metric' => (int)$totalSeniors, 'metric_label' => 'Total Seniors',
            ];
        }

        if ($totalPwd >= 3) {
            $insights[] = [
                'type' => 'warning', 'priority' => 'MEDIUM', 'icon' => '♿',
                'title' => "{$totalPwd} PWD Residents — Accessibility Review",
                'description' => "{$totalPwd} PWD residents require RA 7277-compliant facilities and may be eligible for special assistance.",
                'action' => "Conduct annual PWD accessibility audit. Include PWDs in livelihood programs. Verify all have municipal PWD IDs.",
                'metric' => (int)$totalPwd, 'metric_label' => 'PWD',
            ];
        }

        $indigentPct = $totalHH > 0 ? round(($indigentHH / $totalHH) * 100) : 0;
        if ($indigentPct >= 20) {
            $insights[] = [
                'type' => 'warning', 'priority' => 'MEDIUM', 'icon' => '🏠',
                'title' => "{$indigentPct}% of Households are Indigent ({$indigentHH})",
                'description' => "{$indigentHH} of {$totalHH} households are classified indigent and need prioritization for housing and welfare programs.",
                'action' => "Endorse indigent households to DSWD and NHA. Coordinate with BHERT for targeted aid. Update housing data at next census.",
                'metric' => (int)$indigentHH, 'metric_label' => 'Indigent HH',
            ];
        }

        $naEduPct = $total > 0 ? round(($naEdu / $total) * 100) : 0;
        if ($naEduPct >= 20) {
            $insights[] = [
                'type' => 'info', 'priority' => 'MEDIUM', 'icon' => '📚',
                'title' => "{$naEduPct}% Have Incomplete Education Data",
                'description' => "{$naEdu} residents have N/A educational attainment, limiting scholarship and education assistance accuracy.",
                'action' => "Prompt residents to update education records during clearance renewals. Include as required field in next census.",
                'metric' => (int)$naEdu, 'metric_label' => 'Incomplete',
            ];
        }

        // ── LOW PRIORITY ───────────────────────────────────────────────────────
        if ($rejected >= 5) {
            $rejectedPct = $submitted > 0 ? round(($rejected / $submitted) * 100) : 0;
            $insights[] = [
                'type' => 'info', 'priority' => 'LOW', 'icon' => '❌',
                'title' => "{$rejected} Rejected Applications ({$rejectedPct}%) — Follow-Up",
                'description' => "{$rejected} residents have rejected applications and need to resubmit valid documents.",
                'action' => "Send SMS or written follow-up. Offer document assistance at the barangay office. Schedule a resubmission clinic day.",
                'metric' => (int)$rejected, 'metric_label' => 'Rejected',
            ];
        }

        $newPct = $total > 0 ? round(($newResidents / $total) * 100) : 0;
        if ($newPct >= 40) {
            $insights[] = [
                'type' => 'info', 'priority' => 'LOW', 'icon' => '🏙️',
                'title' => "{$newPct}% are New Residents — Population Growth",
                'description' => "{$newResidents} of {$total} residents are 'New Residents', indicating ongoing growth with implications for infrastructure and resource allocation.",
                'action' => "Flag for LGU-level reporting. Update the barangay master plan. Integrate new residents into all service programs.",
                'metric' => (int)$newResidents, 'metric_label' => 'New Residents',
            ];
        }

        $verifiedPct = $submitted > 0 ? round(($verified / $submitted) * 100) : 0;
        $insights[] = [
            'type' => 'success', 'priority' => 'LOW', 'icon' => '✅',
            'title' => "{$verified} Residents Verified ({$verifiedPct}% of submitted)",
            'description' => "{$verified} of {$submitted} submitted applications are verified. The pipeline is operational.",
            'action' => "Recognize top-performing staff. Replicate efficient workflows. Aim for 90%+ verification rate.",
            'metric' => (int)$verified, 'metric_label' => 'Verified',
        ];

        return response()->json([
            'insights' => $insights,
            'summary'  => [
                'high_priority'   => count(array_filter($insights, fn($i) => $i['priority'] === 'HIGH')),
                'medium_priority' => count(array_filter($insights, fn($i) => $i['priority'] === 'MEDIUM')),
                'low_priority'    => count(array_filter($insights, fn($i) => $i['priority'] === 'LOW')),
                'total_insights'  => count($insights),
                'computed_at'     => now()->toIso8601String(),
            ],
        ]);
    }
}