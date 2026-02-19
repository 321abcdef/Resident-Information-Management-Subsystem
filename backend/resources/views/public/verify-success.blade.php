<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barangay Gulod - Digital ID Verification</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
        body { font-family: 'Inter', sans-serif; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        
        @media print {
            @page {
                margin: 0; 
                size: auto; /* avoid extra page */
            }
            body { 
                background-color: white !important; 
                padding: 0 !important; 
                margin: 0 !important;
            }
            .no-print { display: none !important; }
            .main-container { 
                display: flex !important; 
                flex-direction: row !important; 
                justify-content: center !important;
                gap: 20px !important;
                padding-top: 20px !important;
                width: 100% !important;
            }
            .id-card { 
                box-shadow: none !important; 
                border: 1px solid #000 !important;
                break-inside: avoid;
                page-break-inside: avoid;
            }
        }
    </style>
</head>
<body class="bg-slate-200 min-h-screen flex flex-col items-center py-6 px-4 uppercase">

    <div class="no-print mb-4">
        <button onclick="window.print()" class="bg-blue-700 text-white font-bold py-2 px-8 rounded shadow-lg uppercase text-sm">
            PRINT BARANGAY ID
        </button>
    </div>

    <div class="main-container flex flex-col md:flex-row items-center justify-center gap-4 w-full">
        
        <div class="w-[320px] h-[480px] id-card relative overflow-hidden rounded-lg bg-white shadow-xl flex-shrink-0">
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <img src="{{ asset('assets/atl.png') }}" class="w-60 h-60 object-contain opacity-[0.15]">
            </div>

            <div class="h-full p-5 flex flex-col relative z-10 text-black">
                <div class="text-center leading-tight">
                    <p class="text-[12px] font-bold text-green-800">BARANGAY GULOD</p>
                    <p class="text-[10px] font-bold">DISTRICT V, QUEZON CITY</p>
                    <h1 class="text-lg font-black mt-1 tracking-widest">BARANGAY ID</h1>
                </div>

                <div class="flex mt-4 justify-between items-start">
                    <img src="{{ asset('assets/bgylogo.png') }}" class="w-14">
                    <div class="w-[100px] h-[100px] border-2 border-black bg-white overflow-hidden">
                        <img src="{{ $resident->photo_url ?? asset('assets/default-avatar.png') }}" class="w-full h-full object-cover">
                    </div>
                </div>

                <div class="mt-4 flex items-end justify-between gap-2">
                    <div class="flex flex-col flex-1">
                        <p class="text-[11px] font-black border-b-2 border-black text-center pb-1">
                            {{ $resident->verified_at ? $resident->verified_at->format('M d, Y') : now()->format('M d, Y') }}
                        </p>
                        <p class="text-[8px] font-bold italic normal-case text-center mt-1">Date of Issue</p>
                    </div>
                    <div class="flex flex-col flex-1">
                        <p class="text-[16px] font-black text-red-600 text-center leading-none mb-[2px]">
                            {{ $resident->barangay_id }}
                        </p>
                        <p class="text-[8px] font-bold italic normal-case border-t-2 border-black text-center pt-1">Brgy. ID No.</p>
                    </div>
                </div>

                <div class="mt-6 flex flex-col items-center">
                    <p class="text-[16px] font-black tracking-tight text-center border-b-2 border-black w-full pb-1">
                        {{ $resident->name }}
                    </p>
                    <p class="text-[9px] font-bold italic normal-case mt-1">Full Name</p>
                </div>

                <div class="mt-1 flex flex-col items-center">
                    <p class="text-[12px] font-bold text-center border-b-2 border-black w-full pb-1 min-h-[45px] flex items-center justify-center leading-tight">
                        {{ $resident->temp_house_number }} {{ optional($resident->tempStreet)->name }} BARANGAY GULOD NOVALICHES, QUEZON CITY
                    </p>
                    <p class="text-[9px] font-bold italic normal-case mt-1 text-black">Residential Address</p>
                </div>

                <div class="text-center mt-auto pb-2">
                    <div class="w-full border-t-2 border-black">
                        <p class="font-bold text-[13px] pt-1">REY ALDRIN S. TOLENTINO</p>
                    </div>
                    <p class="text-[9px] font-bold normal-case">Barangay Captain</p>
                </div>
            </div>
        </div>

        <div class="w-[320px] h-[480px] id-card relative overflow-hidden rounded-lg bg-white shadow-xl flex-shrink-0">
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <img src="{{ asset('assets/atl.png') }}" class="w-60 h-60 object-contain opacity-[0.15]">
            </div>

            <div class="h-full p-5 flex flex-col relative z-10 text-black">
                <p class="text-[11px] font-black border-b-2 border-black inline-block w-fit">
                    VALID UNTIL DEC. 31, {{ now()->addYears(1)->format('Y') }}
                </p>
                
                <div class="mt-4 space-y-4">
                    <p class="text-[10px] font-black italic text-red-700">NOTIFY IN CASE OF EMERGENCY</p>
                    <div>
                        <p class="text-[9px] font-bold normal-case italic">Contact Name:</p>
                        <div class="border-b-2 border-black w-full h-6"></div>
                    </div>
                    <div>
                        <p class="text-[9px] font-bold normal-case italic">Contact Number / Address:</p>
                        <div class="border-b-2 border-black w-full h-8"></div>
                    </div>
                </div>

                <div class="mt-auto mb-4 flex flex-col items-center">
                    <div class="w-full mb-6">
                        <div class="border-b-2 border-black h-10 w-full"></div>
                        <p class="text-[9px] font-bold text-center mt-1">Holder Signature</p>
                    </div>
                    
                    <div class="flex flex-col items-center">
                        <p class="text-[9px] font-black mb-1 tracking-widest">RT. THUMBMARK</p>
                        <div class="w-20 h-24 border-2 border-black bg-white"></div>
                    </div>
                </div>

                <div class="mt-auto text-center">
                    <p class="italic font-bold text-green-900 text-xl tracking-[0.2em]">"Asenso Tayo"</p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>