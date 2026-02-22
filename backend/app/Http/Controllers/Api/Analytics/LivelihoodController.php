<?php

namespace App\Http\Controllers\Api\Analytics;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class LivelihoodController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $income = DB::table('employment_data as e')
            ->join('residents as r', 'e.resident_id', '=', 'r.id')
            ->whereNull('r.deleted_at')->whereNotNull('e.monthly_income')
            ->where('e.monthly_income', '!=', 'N/A')
            ->selectRaw("e.monthly_income as bracket, COUNT(*) as count")
            ->groupBy('e.monthly_income')->orderByRaw("COUNT(*) DESC")->get();

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
            ->whereNull('r.deleted_at')->where('ed.school_level', '!=', 'N/A')
            ->selectRaw("ed.school_level as level, COUNT(*) as count")
            ->groupBy('ed.school_level')->orderByRaw("COUNT(*) DESC")->get();

        $eduStatus = DB::table('education_data as ed')
            ->join('residents as r', 'ed.resident_id', '=', 'r.id')
            ->whereNull('r.deleted_at')->where('ed.educational_status', '!=', 'N/A')
            ->selectRaw("ed.educational_status as status, COUNT(*) as count")
            ->groupBy('ed.educational_status')->orderByRaw("COUNT(*) DESC")->get();

        $schoolType = DB::table('education_data as ed')
            ->join('residents as r', 'ed.resident_id', '=', 'r.id')
            ->whereNull('r.deleted_at')->where('ed.school_type', '!=', 'N/A')
            ->selectRaw("ed.school_type as type, COUNT(*) as count")
            ->groupBy('ed.school_type')->get();

        $topOcc = DB::table('employment_data as e')
            ->join('residents as r', 'e.resident_id', '=', 'r.id')
            ->whereNull('r.deleted_at')->whereNotNull('e.occupation')
            ->whereNotIn('e.occupation', ['N/A', 'None', ''])
            ->selectRaw("e.occupation as occupation, COUNT(*) as count")
            ->groupBy('e.occupation')->orderByRaw("COUNT(*) DESC")->limit(10)->get();

        return response()->json([
            'income_distribution' => $income,
            'employment_status'   => $employment,
            'income_source'       => $source,
            'education_level'     => $education,
            'education_status'    => $eduStatus,
            'school_type'         => $schoolType,
            'top_occupations'     => $topOcc,
        ]);
    }
}