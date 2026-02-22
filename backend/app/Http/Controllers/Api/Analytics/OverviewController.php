<?php

namespace App\Http\Controllers\Api\Analytics;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class OverviewController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $total    = DB::table('residents')->whereNull('deleted_at')->count();
        $statuses = DB::table('residents')->whereNull('deleted_at')
            ->selectRaw("status, COUNT(*) as count")->groupBy('status')
            ->pluck('count', 'status');

        $verified = (int)($statuses['Verified'] ?? 0);
        $pending  = (int)($statuses['Pending']  ?? 0);
        $rejected = (int)($statuses['Rejected'] ?? 0);
        $noId     = (int)DB::table('residents')->whereNull('deleted_at')->whereNull('barangay_id')->count();

        $households = DB::table('households')->whereNull('deleted_at')->where('is_active', 1)->count();
        $puroks     = DB::table('puroks')->count();
        $voters     = DB::table('residents')->whereNull('deleted_at')->where('is_voter', 1)->count();
        $indigent   = DB::table('households')->whereNull('deleted_at')->where('is_active', 1)->where('is_indigent', 1)->count();

        $gender    = DB::table('residents')->whereNull('deleted_at')
            ->selectRaw("gender, COUNT(*) as count")->groupBy('gender')->get();
        $residency = DB::table('residents')->whereNull('deleted_at')->whereNotNull('residency_status')
            ->selectRaw("residency_status, COUNT(*) as count")->groupBy('residency_status')->get();

        $wallMaterial = DB::table('households')->whereNull('deleted_at')->where('is_active', 1)->whereNotNull('wall_material')
            ->selectRaw("wall_material, COUNT(*) as count")->groupBy('wall_material')->orderByRaw("COUNT(*) DESC")->get();
        $roofMaterial = DB::table('households')->whereNull('deleted_at')->where('is_active', 1)->whereNotNull('roof_material')
            ->selectRaw("roof_material, COUNT(*) as count")->groupBy('roof_material')->orderByRaw("COUNT(*) DESC")->get();
        $tenureStatus = DB::table('households')->whereNull('deleted_at')->where('is_active', 1)->whereNotNull('tenure_status')
            ->selectRaw("tenure_status, COUNT(*) as count")->groupBy('tenure_status')->orderByRaw("COUNT(*) DESC")->get();

        return response()->json([
            'total_residents'     => $total,
            'verified'            => $verified,
            'pending'             => $pending,
            'rejected'            => $rejected,
            'no_id'               => $noId,
            'total_households'    => $households,
            'total_puroks'        => $puroks,
            'voters'              => $voters,
            'indigent_households' => $indigent,
            'gender_breakdown'    => $gender,
            'residency_breakdown' => $residency,
            'wall_material'       => $wallMaterial,
            'roof_material'       => $roofMaterial,
            'tenure_status'       => $tenureStatus,
            'status_breakdown'    => [
                ['name' => 'Verified',       'value' => $verified, 'color' => '#27ae60'],
                ['name' => 'Pending',        'value' => $pending,  'color' => '#f39c12'],
                ['name' => 'Rejected',       'value' => $rejected, 'color' => '#e74c3c'],
                ['name' => 'No Barangay ID', 'value' => $noId,     'color' => '#7f8c8d'],
            ],
        ]);
    }
}