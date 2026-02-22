<?php

namespace App\Http\Controllers\Api\Analytics;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class HeatmapController extends Controller
{
    public function __invoke(): JsonResponse
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
                SUM(CASE WHEN YEAR(r.birthdate) BETWEEN 1900 AND YEAR(CURDATE())
                          AND TIMESTAMPDIFF(YEAR, r.birthdate, CURDATE()) < 18
                         THEN 1 ELSE 0 END) as minors,
                SUM(CASE WHEN YEAR(r.birthdate) BETWEEN 1900 AND YEAR(CURDATE())
                          AND TIMESTAMPDIFF(YEAR, r.birthdate, CURDATE()) BETWEEN 18 AND 25
                         THEN 1 ELSE 0 END) as youth,

                -- verif_rate: verified / (verified + pending + rejected)
                -- Unregistered excluded — they never submitted an application
                ROUND(
                    SUM(CASE WHEN r.status = 'Verified' THEN 1 ELSE 0 END)
                    / NULLIF(
                        SUM(CASE WHEN r.status IN ('Verified','Pending','Rejected') THEN 1 ELSE 0 END),
                        0
                    ) * 100
                , 0) as verif_rate
            ")
            ->groupBy('p.id', 'p.name', 'p.number')
            ->orderBy('p.number')->get();

        $hhPerPurok = DB::table('households as h')
            ->join('puroks as p', 'h.purok_id', '=', 'p.id')
            ->whereNull('h.deleted_at')->where('h.is_active', 1)
            ->selectRaw("p.name as purok, COUNT(*) as households, SUM(h.is_indigent) as indigent")
            ->groupBy('p.name')->get()->keyBy('purok');

        $purokData = $purokData->map(function ($row) use ($hhPerPurok) {
            $hh = $hhPerPurok[$row->purok] ?? null;
            $row->households = $hh ? (int)$hh->households : 0;
            $row->indigent   = $hh ? (int)$hh->indigent   : 0;

            $cols = ['total','verified','pending','rejected','unregistered','seniors',
                     'pwd','solo_parent','ofw','kasambahay','lgbtqia','male','female',
                     'voters','new_residents','old_residents','minors','youth'];
            foreach ($cols as $c) { $row->$c = (int)($row->$c ?? 0); }

            $row->verif_rate = (int)($row->verif_rate ?? 0);
            return $row;
        });

        return response()->json(['puroks' => $purokData]);
    }
}