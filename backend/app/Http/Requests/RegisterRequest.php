<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize() { return true; }

    public function rules()
    {
        return [
            // Personal Info
            'firstName'         => 'required|string|max:100',
            'middleName'        => 'nullable|string|max:100',
            'lastName'          => 'required|string|max:100',
            'suffix'            => 'nullable|string|max:20',
            'birthdate'         => 'required|date',
            'birthRegistration' => 'nullable|string|max:50',
            'gender'            => 'required|in:Male,Female',
            'contact'           => 'required|string|size:11',
            'email'             => 'nullable|email',
            
            // Address
            'purok'             => 'required|string',
            'street'            => 'required|string',
            'houseNumber'       => 'required|string',
            
            // Additional
            'householdPosition' => 'required|string',
            'maritalStatus'     => 'nullable|string',
            'sector'            => 'required|string',
            'residencyStatus'   => 'required|string',
            'residencyStartDate'=> 'nullable|date',
            'nationality'       => 'nullable|string',
            'isVoter'           => 'nullable',
            
            // Employment
            'employmentStatus'  => 'nullable|string|max:50',
            'occupation'        => 'nullable|string',
            'incomeSource'      => 'nullable|string',
            'monthlyIncome'     => 'nullable|string',
            
            // Education
            'educationalStatus' => 'nullable|string',
            'schoolType'        => 'nullable|string',
            'schoolLevel'       => 'nullable|string',
            'highestGrade'      => 'nullable|string',
            
          
            'idType'            => 'required|string',
            'idFront'           => 'required|file|max:5120', // 5MB Limit
            'idBack'            => 'required|file|max:5120',  // 5MB Limit
        ];
    }

    public function messages()
{
    return [
        'idFront.max' => 'The front ID image should not exceed 5MB.',
        'idBack.max'  => 'The back ID image should not exceed 5MB.',
        'idFront.image' => 'You should upload a valid image file.',
        'contact.size' => 'The contact number must be exactly 11 digits.',
    ];
}

}