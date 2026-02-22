<?php

namespace App\Http\Controllers\Api\Analytics;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class DemographicsController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $ageGroups = DB::table('residents')->whereNull('deleted_at')
            ->whereNotNull('birthdate')
            ->whereRaw("YEAR(birthdate) BETWEEN 1900 AND YEAR(CURDATE())")
            ->selectRaw("
                CASE
                    WHEN TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) < 18  THEN '0-17'
                    WHEN TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) < 26  THEN '18-25'
                    WHEN TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) < 36  THEN '26-35'
                    WHEN TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) < 51  THEN '36-50'
                    WHEN TIMESTAMPDIFF(YEAR, birthdate, CURDATE()) < 60  THEN '51-59'
                    ELSE '60+'
                END as age_group, COUNT(*) as count
            ")->groupByRaw("age_group")->get();

        $positions = DB::table('residents')->whereNull('deleted_at')
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

        $voterData = DB::table('residents')->whereNull('deleted_at')
            ->selectRaw("is_voter, COUNT(*) as count")->groupBy('is_voter')->get();

        $birthReg = DB::table('residents')->whereNull('deleted_at')
            ->whereNotNull('birth_registration')
            ->selectRaw("birth_registration, COUNT(*) as count")
            ->groupBy('birth_registration')->get();

        return response()->json([
            'age_groups'          => $ageGroups,
            'household_positions' => $positions,
            'marital_status'      => $marital,
            'nationalities'       => $nationality,
            'voter_data'          => $voterData,
            'birth_registration'  => $birthReg,
        ]);
    }
}