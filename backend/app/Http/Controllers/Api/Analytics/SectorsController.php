<?php

namespace App\Http\Controllers\Api\Analytics;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class SectorsController extends Controller
{
    public function __invoke(): JsonResponse
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

        // Age-based seniors (60+) — more accurate than sector tag
        $seniorsByAge = DB::table('residents as r')
            ->join('puroks as p', 'r.temp_purok_id', '=', 'p.id')
            ->whereNull('r.deleted_at')
            ->whereRaw("YEAR(r.birthdate) BETWEEN 1900 AND YEAR(CURDATE())")
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
}