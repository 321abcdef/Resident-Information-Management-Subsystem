<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use App\Models\Resident;  
use App\Models\Household; 
use Carbon\Carbon;

/**
 * BarangayAnalyticsController
 * E-Barangay IMS — Barangay Gulod, Novaliches, Quezon City
 *
 * ─── ADD TO routes/api.php ────────────────────────────────────────────────
 *
 *  use App\Http\Controllers\Api\BarangayAnalyticsController;
 *
 *  Route::middleware('auth:sanctum')->prefix('analytics')
 *       ->group(function () {
 *           Route::get('/overview',     [BarangayAnalyticsController::class, 'overview']);
 *           Route::get('/demographics', [BarangayAnalyticsController::class, 'demographics']);
 *           Route::get('/sectors',      [BarangayAnalyticsController::class, 'sectors']);
 *           Route::get('/registration', [BarangayAnalyticsController::class, 'registration']);
 *           Route::get('/livelihood',   [BarangayAnalyticsController::class, 'livelihood']);
 *           Route::get('/heatmap',      [BarangayAnalyticsController::class, 'heatmap']);
 *           Route::get('/insights',     [BarangayAnalyticsController::class, 'insights']);
 *           Route::get('/all',          [BarangayAnalyticsController::class, 'all']);
 *       });
 *
 * ─── CORS (config/cors.php) ───────────────────────────────────────────────
 *  'paths'                => ['api/*'],
 *  'allowed_origins'      => ['http://localhost:5173'],
 *  'allowed_methods'      => ['*'],
 *  'allowed_headers'      => ['*'],
 *  'supports_credentials' => true,
 *
 * ─── FRONTEND .env ─────────────────────────────────────────────────────────
 *  VITE_API_URL=http://localhost:8000/api
 */
class BarangayAnalyticsController extends Controller
{
    // ──────────────────────────────────────────────────────────────────────
    // OVERVIEW
    // ──────────────────────────────────────────────────────────────────────
    public function overview(): JsonResponse
    {
        $total = DB::table('residents')->whereNull('deleted_at')->count();

        $statuses = DB::table('residents')
            ->whereNull('deleted_at')
            ->selectRaw("status, COUNT(*) as count")
            ->groupBy('status')
            ->pluck('count', 'status');

        $verified = (int)($statuses['Verified'] ?? 0);
        $pending  = (int)($statuses['Pending']  ?? 0);
        $rejected = (int)($statuses['Rejected'] ?? 0);
        $noId     = (int)DB::table('residents')
            ->whereNull('deleted_at')->whereNull('barangay_id')->count();

        $households = DB::table('households')
            ->whereNull('deleted_at')->where('is_active', 1)->count();

        $puroks = DB::table('puroks')->count();
        $voters = DB::table('residents')->whereNull('deleted_at')->where('is_voter', 1)->count();

        $gender = DB::table('residents')
            ->whereNull('deleted_at')
            ->selectRaw("gender, COUNT(*) as count")
            ->groupBy('gender')->get();

        $residency = DB::table('residents')
            ->whereNull('deleted_at')->whereNotNull('residency_status')
            ->selectRaw("residency_status, COUNT(*) as count")
            ->groupBy('residency_status')->get();

        return response()->json([
            'total_residents'     => $total,
            'verified'            => $verified,
            'pending'             => $pending,
            'rejected'            => $rejected,
            'no_id'               => $noId,
            'total_households'    => $households,
            'total_puroks'        => $puroks,
            'voters'              => $voters,
            'gender_breakdown'    => $gender,
            'residency_breakdown' => $residency,
            'status_breakdown'    => [
                ['name' => 'Verified',       'value' => $verified, 'color' => '#27ae60'],
                ['name' => 'Pending',        'value' => $pending,  'color' => '#f39c12'],
                ['name' => 'Rejected',       'value' => $rejected, 'color' => '#e74c3c'],
                ['name' => 'No Barangay ID', 'value' => $noId,     'color' => '#7f8c8d'],
            ],
        ]);
    }

    // ──────────────────────────────────────────────────────────────────────
    // DEMOGRAPHICS
    // ──────────────────────────────────────────────────────────────────────
    public function demographics(): JsonResponse
    {
        $ageGroups = DB::table('residents')
            ->whereNull('deleted_at')
            ->whereNotNull('birthdate')
            ->whereRaw("YEAR(birthdate) > 1900")
            ->selectRaw("
                CASE
                    WHEN TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) < 18 THEN '0-17'
                    WHEN TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) < 26 THEN '18-25'
                    WHEN TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) < 36 THEN '26-35'
                    WHEN TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) < 51 THEN '36-50'
                    WHEN TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) < 60 THEN '51-59'
                    ELSE '60+'
                END as age_group, COUNT(*) as count
            ")
            ->groupByRaw("age_group")->get();

        $positions = DB::table('residents')
            ->whereNull('deleted_at')
            ->selectRaw("household_position, COUNT(*) as count")
            ->groupBy('household_position')->orderByRaw("COUNT(*) DESC")->get();

        $marital = DB::table('residents as r')
            ->leftJoin('marital_statuses as m', 'r.marital_status_id', '=', 'm.id')
            ->whereNull('r.deleted_at')
            ->selectRaw("COALESCE(m.name, 'Not Specified') as status, COUNT(*) as count")
            ->groupBy('m.name')->orderByRaw("COUNT(*) DESC")->get();

        $nationality = DB::table('residents as r')
            ->leftJoin('nationalities as n', 'r.nationality_id', '=', 'n.id')
            ->whereNull('r.deleted_at')
            ->selectRaw("COALESCE(n.name, 'Unknown') as nationality, COUNT(*) as count")
            ->groupBy('n.name')->orderByRaw("COUNT(*) DESC")->get();

        $voterData = DB::table('residents')
            ->whereNull('deleted_at')
            ->selectRaw("is_voter, COUNT(*) as count")
            ->groupBy('is_voter')->get();

        return response()->json([
            'age_groups'          => $ageGroups,
            'household_positions' => $positions,
            'marital_status'      => $marital,
            'nationalities'       => $nationality,
            'voter_data'          => $voterData,
        ]);
    }

    // ──────────────────────────────────────────────────────────────────────
    // SECTORS
    // sector_id: 1=Solo Parent, 2=PWD, 3=Senior Citizen,
    //            4=LGBTQIA+, 5=Kasambahay, 6=OFW, 7=General Population
    // ──────────────────────────────────────────────────────────────────────
    public function sectors(): JsonResponse
    {
        $sectorCounts = DB::table('residents as r')
            ->leftJoin('sectors as s', 'r.sector_id', '=', 's.id')
            ->whereNull('r.deleted_at')
            ->selectRaw("COALESCE(s.name, 'Unclassified') as sector_name, COUNT(*) as count")
            ->groupBy('s.name')->orderByRaw("COUNT(*) DESC")->get();

        $seniorsByPurok = DB::table('residents as r')
            ->join('puroks as p', 'r.temp_purok_id', '=', 'p.id')
            ->whereNull('r.deleted_at')->where('r.sector_id', 3)
            ->selectRaw("p.name as purok, p.number as purok_number, COUNT(*) as count")
            ->groupBy('p.name', 'p.number')->orderBy('p.number')->get();

        $seniorsByAge = DB::table('residents as r')
            ->join('puroks as p', 'r.temp_purok_id', '=', 'p.id')
            ->whereNull('r.deleted_at')
            ->whereRaw("YEAR(r.birthdate) > 1900")
            ->whereRaw("TIMESTAMPDIFF(YEAR, r.birthdate, CURDATE()) >= 60")
            ->selectRaw("p.name as purok, p.number as purok_number, COUNT(*) as count")
            ->groupBy('p.name', 'p.number')->orderBy('p.number')->get();

        $pwdByPurok = DB::table('residents as r')
            ->join('puroks as p', 'r.temp_purok_id', '=', 'p.id')
            ->whereNull('r.deleted_at')->where('r.sector_id', 2)
            ->selectRaw("p.name as purok, p.number as purok_number, COUNT(*) as count")
            ->groupBy('p.name', 'p.number')->orderBy('p.number')->get();

        $soloParentByPurok = DB::table('residents as r')
            ->join('puroks as p', 'r.temp_purok_id', '=', 'p.id')
            ->whereNull('r.deleted_at')->where('r.sector_id', 1)
            ->selectRaw("p.name as purok, COUNT(*) as count")
            ->groupBy('p.name', 'p.number')->orderBy('p.number')->get();

        return response()->json([
            'sector_counts'        => $sectorCounts,
            'seniors_by_purok'     => $seniorsByPurok,
            'seniors_by_age'       => $seniorsByAge,
            'pwd_by_purok'         => $pwdByPurok,
            'solo_parent_by_purok' => $soloParentByPurok,
        ]);
    }

    // ──────────────────────────────────────────────────────────────────────
    // REGISTRATION
    // ──────────────────────────────────────────────────────────────────────
    public function registration(): JsonResponse
    {
        $trend = DB::table('residents')
            ->whereNull('deleted_at')
            ->selectRaw("DATE(created_at) as date, COUNT(*) as count")
            ->groupByRaw("DATE(created_at)")->orderBy('date')->get()
            ->map(fn($r) => [
                'date'  => Carbon::parse($r->date)->format('M d'),
                'count' => (int)$r->count,
            ]);

        $purokVerif = DB::table('residents as r')
            ->join('puroks as p', 'r.temp_purok_id', '=', 'p.id')
            ->whereNull('r.deleted_at')
            ->selectRaw("
                p.name as purok, p.number as purok_number,
                COUNT(*) as total,
                SUM(CASE WHEN r.status = 'Verified' THEN 1 ELSE 0 END) as verified,
                SUM(CASE WHEN r.status = 'Pending'  THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN r.status = 'Rejected' THEN 1 ELSE 0 END) as rejected,
                SUM(CASE WHEN r.barangay_id IS NULL  THEN 1 ELSE 0 END) as unregistered
            ")
            ->groupBy('p.name', 'p.number')->orderBy('p.number')->get();

        $birthReg = DB::table('residents')
            ->whereNull('deleted_at')->whereNotNull('birth_registration')
            ->selectRaw("birth_registration, COUNT(*) as count")
            ->groupBy('birth_registration')->get();

        $avgVerif = DB::table('residents')
            ->whereNull('deleted_at')->where('status','Verified')->whereNotNull('verified_at')
            ->selectRaw("
                ROUND(AVG(TIMESTAMPDIFF(HOUR, created_at, verified_at)), 1) as avg_hours,
                MIN(TIMESTAMPDIFF(HOUR, created_at, verified_at)) as min_hours,
                MAX(TIMESTAMPDIFF(HOUR, created_at, verified_at)) as max_hours
            ")->first();

        return response()->json([
            'registration_trend'    => $trend,
            'purok_verification'    => $purokVerif,
            'birth_registration'    => $birthReg,
            'avg_verification_time' => $avgVerif,
        ]);
    }

    // ──────────────────────────────────────────────────────────────────────
    // LIVELIHOOD
    // ──────────────────────────────────────────────────────────────────────
    public function livelihood(): JsonResponse
    {
        $income = DB::table('employment_data as e')
            ->join('residents as r', 'e.resident_id', '=', 'r.id')
            ->whereNull('r.deleted_at')->whereNotNull('e.monthly_income')
            ->selectRaw("e.monthly_income as bracket, COUNT(*) as count")
            ->groupBy('e.monthly_income')->orderByRaw("COUNT(*) DESC")->get();

        $incomeBracket = DB::table('employment_data as e')
            ->join('residents as r', 'e.resident_id', '=', 'r.id')
            ->whereNull('r.deleted_at')->where('e.income_bracket', '!=', 'N/A')
            ->selectRaw("e.income_bracket as bracket, COUNT(*) as count")
            ->groupBy('e.income_bracket')->orderByRaw("COUNT(*) DESC")->get();

        $employment = DB::table('employment_data as e')
            ->join('residents as r', 'e.resident_id', '=', 'r.id')
            ->whereNull('r.deleted_at')->whereNotNull('e.employment_status')
            ->where('e.employment_status', '!=', 'N/A')
            ->selectRaw("e.employment_status as status, COUNT(*) as count")
            ->groupBy('e.employment_status')->orderByRaw("COUNT(*) DESC")->get();

        $source = DB::table('employment_data as e')
            ->join('residents as r', 'e.resident_id', '=', 'r.id')
            ->whereNull('r.deleted_at')->whereNotNull('e.income_source')
            ->where('e.income_source', '!=', 'N/A')
            ->selectRaw("e.income_source as source, COUNT(*) as count")
            ->groupBy('e.income_source')->orderByRaw("COUNT(*) DESC")->get();

        $education = DB::table('education_data as ed')
            ->join('residents as r', 'ed.resident_id', '=', 'r.id')
            ->whereNull('r.deleted_at')
            ->selectRaw("ed.school_level as level, COUNT(*) as count")
            ->groupBy('ed.school_level')->orderByRaw("COUNT(*) DESC")->get();

        $eduStatus = DB::table('education_data as ed')
            ->join('residents as r', 'ed.resident_id', '=', 'r.id')
            ->whereNull('r.deleted_at')
            ->selectRaw("ed.educational_status as status, COUNT(*) as count")
            ->groupBy('ed.educational_status')->orderByRaw("COUNT(*) DESC")->get();

        $schoolType = DB::table('education_data as ed')
            ->join('residents as r', 'ed.resident_id', '=', 'r.id')
            ->whereNull('r.deleted_at')->where('ed.school_type', '!=', 'N/A')
            ->selectRaw("ed.school_type as type, COUNT(*) as count")
            ->groupBy('ed.school_type')->get();

        $occupations = DB::table('employment_data as e')
            ->join('residents as r', 'e.resident_id', '=', 'r.id')
            ->whereNull('r.deleted_at')->whereNotNull('e.occupation')
            ->whereNotIn('e.occupation', ['N/A','None',''])
            ->selectRaw("e.occupation as occupation, COUNT(*) as count")
            ->groupBy('e.occupation')->orderByRaw("COUNT(*) DESC")->limit(10)->get();

        return response()->json([
            'income_distribution' => $income,
            'income_bracket'      => $incomeBracket,
            'employment_status'   => $employment,
            'income_source'       => $source,
            'education_level'     => $education,
            'education_status'    => $eduStatus,
            'school_type'         => $schoolType,
            'top_occupations'     => $occupations,
        ]);
    }

    // ──────────────────────────────────────────────────────────────────────
    // HEATMAP
    // ──────────────────────────────────────────────────────────────────────
    public function heatmap(): JsonResponse
    {
        $purokData = DB::table('residents as r')
            ->join('puroks as p', 'r.temp_purok_id', '=', 'p.id')
            ->leftJoin('sectors as s', 'r.sector_id', '=', 's.id')
            ->whereNull('r.deleted_at')
            ->selectRaw("
                p.id as purok_id, p.name as purok, p.number as purok_number,
                COUNT(*) as total,
                SUM(CASE WHEN r.status = 'Verified'             THEN 1 ELSE 0 END) as verified,
                SUM(CASE WHEN r.status = 'Pending'              THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN r.status = 'Rejected'             THEN 1 ELSE 0 END) as rejected,
                SUM(CASE WHEN r.barangay_id IS NULL              THEN 1 ELSE 0 END) as unregistered,
                SUM(CASE WHEN s.name = 'Senior Citizen'         THEN 1 ELSE 0 END) as seniors,
                SUM(CASE WHEN s.name = 'PWD'                    THEN 1 ELSE 0 END) as pwd,
                SUM(CASE WHEN s.name = 'Solo Parent'            THEN 1 ELSE 0 END) as solo_parent,
                SUM(CASE WHEN s.name = 'OFW'                    THEN 1 ELSE 0 END) as ofw,
                SUM(CASE WHEN s.name = 'Kasambahay'             THEN 1 ELSE 0 END) as kasambahay,
                SUM(CASE WHEN s.name = 'LGBTQIA+'               THEN 1 ELSE 0 END) as lgbtqia,
                SUM(CASE WHEN r.gender = 'Male'                 THEN 1 ELSE 0 END) as male,
                SUM(CASE WHEN r.gender = 'Female'               THEN 1 ELSE 0 END) as female,
                SUM(CASE WHEN r.is_voter = 1                    THEN 1 ELSE 0 END) as voters,
                SUM(CASE WHEN r.residency_status = 'New Resident' THEN 1 ELSE 0 END) as new_residents,
                SUM(CASE WHEN r.residency_status = 'Old Resident' THEN 1 ELSE 0 END) as old_residents,
                SUM(CASE WHEN YEAR(r.birthdate) > 1900
                          AND TIMESTAMPDIFF(YEAR, r.birthdate, CURDATE()) < 18
                         THEN 1 ELSE 0 END) as minors,
                SUM(CASE WHEN YEAR(r.birthdate) > 1900
                          AND TIMESTAMPDIFF(YEAR, r.birthdate, CURDATE()) BETWEEN 18 AND 25
                         THEN 1 ELSE 0 END) as youth
            ")
            ->groupBy('p.id', 'p.name', 'p.number')
            ->orderBy('p.number')->get();

        $hhPerPurok = DB::table('households as h')
            ->join('puroks as p', 'h.purok_id', '=', 'p.id')
            ->whereNull('h.deleted_at')->where('h.is_active', 1)
            ->selectRaw("p.name as purok, COUNT(*) as households")
            ->groupBy('p.name')->pluck('households', 'purok');

        $purokData = $purokData->map(function ($row) use ($hhPerPurok) {
            $row->households = $hhPerPurok[$row->purok] ?? 0;
            $cols = ['total','verified','pending','rejected','unregistered','seniors',
                     'pwd','solo_parent','ofw','kasambahay','lgbtqia','male','female',
                     'voters','new_residents','old_residents','minors','youth','households'];
            foreach ($cols as $c) { $row->$c = (int)($row->$c ?? 0); }
            return $row;
        });

        return response()->json(['puroks' => $purokData]);
    }

    // ──────────────────────────────────────────────────────────────────────
    // INSIGHTS — dynamic recommendations from real data
    // ──────────────────────────────────────────────────────────────────────
    public function insights(): JsonResponse
    {
        $total    = DB::table('residents')->whereNull('deleted_at')->count();
        $verified = DB::table('residents')->whereNull('deleted_at')->where('status','Verified')->count();
        $pending  = DB::table('residents')->whereNull('deleted_at')->where('status','Pending')->count();
        $rejected = DB::table('residents')->whereNull('deleted_at')->where('status','Rejected')->count();

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

        $totalPwd = DB::table('residents')->whereNull('deleted_at')->where('sector_id', 2)->count();

        $lowIncome = DB::table('employment_data as e')
            ->join('residents as r', 'e.resident_id', '=', 'r.id')
            ->whereNull('r.deleted_at')
            ->whereIn('e.monthly_income', ['No Income','Below 5,000','0'])
            ->count();

        $naEdu = DB::table('education_data as ed')
            ->join('residents as r', 'ed.resident_id', '=', 'r.id')
            ->whereNull('r.deleted_at')->where('ed.school_level','N/A')->count();

        $newResidents = DB::table('residents')
            ->whereNull('deleted_at')->where('residency_status','New Resident')->count();

        $purokVerifRates = DB::table('residents as r')
            ->join('puroks as p', 'r.temp_purok_id', '=', 'p.id')
            ->whereNull('r.deleted_at')
            ->selectRaw("p.name as purok, COUNT(*) as total,
                SUM(CASE WHEN r.status='Verified' THEN 1 ELSE 0 END) as verified")
            ->groupBy('p.name')->having('total','>=',5)->get()
            ->map(fn($r) => (object)[
                'purok'    => $r->purok,
                'total'    => (int)$r->total,
                'verified' => (int)$r->verified,
                'rate'     => $r->total > 0 ? round(($r->verified / $r->total) * 100) : 0,
            ])->sortBy('rate');
        $lowestVerifPurok = $purokVerifRates->first();

        $insights = [];

        // HIGH
        if ($mostUnreg && $mostUnreg->count >= 3) {
            $insights[] = [
                'type' => 'alert', 'priority' => 'HIGH',
                'title' => "{$mostUnreg->purok} — Online Registration Drive Needed",
                'description' => "{$mostUnreg->purok} has the most residents without a Barangay ID ({$mostUnreg->count} residents). These residents are not yet in the digital system.",
                'action' => "Set up a registration kiosk or conduct door-to-door assistance in {$mostUnreg->purok}. Prioritize elderly and PWD residents.",
                'metric' => (int)$mostUnreg->count,
            ];
        }
        if ($mostSeniors && $mostSeniors->count >= 1) {
            $insights[] = [
                'type' => 'alert', 'priority' => 'HIGH',
                'title' => "{$mostSeniors->purok} — Priority Senior Citizen Services",
                'description' => "{$mostSeniors->purok} has the highest concentration of senior citizens ({$mostSeniors->count} seniors). This purok should be the primary focus for ayuda, health programs, and social welfare services.",
                'action' => "Coordinate with OSCA. Assign barangay health workers for regular visits in {$mostSeniors->purok}. Ensure all {$totalSeniors} seniors across all puroks are in the priority list.",
                'metric' => (int)$mostSeniors->count,
            ];
        }
        $pendingPct = $total > 0 ? round(($pending/$total)*100) : 0;
        if ($pending >= 10) {
            $insights[] = [
                'type' => 'warning', 'priority' => 'HIGH',
                'title' => "{$pending} Pending Verifications — Staff Action Needed",
                'description' => "{$pendingPct}% of total submissions ({$pending} of {$total}) are still pending verification. This backlog delays Barangay ID issuance.",
                'action' => "Assign dedicated staff for document review. Target clearing all pending submissions within 5 business days.",
                'metric' => (int)$pending,
            ];
        }

        // MEDIUM
        $lowIncomePct = $total > 0 ? round(($lowIncome/$total)*100) : 0;
        if ($lowIncomePct >= 15) {
            $insights[] = [
                'type' => 'warning', 'priority' => 'MEDIUM',
                'title' => "{$lowIncomePct}% of Residents Below ₱5k/month or No Income",
                'description' => "{$lowIncome} residents ({$lowIncomePct}%) are in the lowest income brackets. This group may qualify for 4Ps, DSWD assistance, and livelihood programs.",
                'action' => "Cross-reference with DSWD beneficiaries. Endorse non-beneficiaries. Coordinate a livelihood skills training referral.",
                'metric' => (int)$lowIncome,
            ];
        }
        if ($lowestVerifPurok && $lowestVerifPurok->rate < 50) {
            $insights[] = [
                'type' => 'warning', 'priority' => 'MEDIUM',
                'title' => "{$lowestVerifPurok->purok} — Lowest Verification Rate ({$lowestVerifPurok->rate}%)",
                'description' => "Only {$lowestVerifPurok->verified} of {$lowestVerifPurok->total} residents in {$lowestVerifPurok->purok} are verified ({$lowestVerifPurok->rate}%). This is the biggest digital onboarding gap.",
                'action' => "Deploy a barangay health worker as enrollment officer for {$lowestVerifPurok->purok}.",
                'metric' => $lowestVerifPurok->rate,
            ];
        }
        if ($totalSeniors >= 5) {
            $insights[] = [
                'type' => 'info', 'priority' => 'MEDIUM',
                'title' => "{$totalSeniors} Senior Citizens — OSCA Coordination",
                'description' => "{$totalSeniors} senior citizens are registered across all puroks. They must be prioritized in barangay distribution events and health screenings.",
                'action' => "Generate quarterly sectoral report for OSCA. Coordinate with health center for senior programs.",
                'metric' => (int)$totalSeniors,
            ];
        }
        if ($totalPwd >= 3) {
            $insights[] = [
                'type' => 'warning', 'priority' => 'MEDIUM',
                'title' => "{$totalPwd} PWD Residents — Accessibility Review",
                'description' => "{$totalPwd} PWD residents are registered. Facilities and programs should comply with RA 7277 (Magna Carta for Disabled Persons).",
                'action' => "Conduct annual PWD accessibility audit. Include PWDs in livelihood and social assistance programs.",
                'metric' => (int)$totalPwd,
            ];
        }
        $naEduPct = $total > 0 ? round(($naEdu/$total)*100) : 0;
        if ($naEduPct >= 20) {
            $insights[] = [
                'type' => 'info', 'priority' => 'MEDIUM',
                'title' => "{$naEduPct}% Incomplete Education Data",
                'description' => "{$naEdu} residents ({$naEduPct}%) have N/A educational attainment. This limits scholarship and education assistance planning.",
                'action' => "Prompt residents to update education records during document request visits or barangay clearance.",
                'metric' => (int)$naEdu,
            ];
        }

        // LOW / MONITORING
        if ($rejected >= 5) {
            $rejectedPct = $total > 0 ? round(($rejected/$total)*100) : 0;
            $insights[] = [
                'type' => 'info', 'priority' => 'LOW',
                'title' => "{$rejected} Rejected Applications ({$rejectedPct}%) — Follow-Up",
                'description' => "{$rejected} residents have rejected applications and need to resubmit valid documents.",
                'action' => "Send follow-up notifications. Offer document assistance at the barangay office.",
                'metric' => (int)$rejected,
            ];
        }
        $newPct = $total > 0 ? round(($newResidents/$total)*100) : 0;
        if ($newPct >= 40) {
            $insights[] = [
                'type' => 'info', 'priority' => 'LOW',
                'title' => "{$newPct}% are New Residents — Population Growth",
                'description' => "{$newResidents} of {$total} residents are 'New Residents', indicating ongoing population growth with implications for infrastructure and services.",
                'action' => "Flag for LGU-level reporting. Update the barangay master plan.",
                'metric' => (int)$newResidents,
            ];
        }
        $verifiedPct = $total > 0 ? round(($verified/$total)*100) : 0;
        $insights[] = [
            'type' => 'success', 'priority' => 'LOW',
            'title' => "{$verified} Residents Successfully Verified ({$verifiedPct}%)",
            'description' => "The verification pipeline is operational. {$verified} residents have been verified and issued Barangay IDs.",
            'action' => "Recognize top-performing staff. Replicate efficient verification workflows.",
            'metric' => (int)$verified,
        ];

        $summary = [
            'high_priority'   => count(array_filter($insights, fn($i) => $i['priority'] === 'HIGH')),
            'medium_priority' => count(array_filter($insights, fn($i) => $i['priority'] === 'MEDIUM')),
            'low_priority'    => count(array_filter($insights, fn($i) => $i['priority'] === 'LOW')),
            'total_insights'  => count($insights),
            'computed_at'     => now()->toIso8601String(),
        ];

        return response()->json(['insights' => $insights, 'summary' => $summary]);
    }

    // ──────────────────────────────────────────────────────────────────────
    // ALL — single request for frontend init
    // ──────────────────────────────────────────────────────────────────────
    public function all(): JsonResponse
    {
        return response()->json([
            'overview'     => json_decode($this->overview()->getContent()),
            'demographics' => json_decode($this->demographics()->getContent()),
            'sectors'      => json_decode($this->sectors()->getContent()),
            'registration' => json_decode($this->registration()->getContent()),
            'livelihood'   => json_decode($this->livelihood()->getContent()),
            'heatmap'      => json_decode($this->heatmap()->getContent()),
            'insights'     => json_decode($this->insights()->getContent()),
            'generated_at' => now()->toIso8601String(),
        ]);
    }
}