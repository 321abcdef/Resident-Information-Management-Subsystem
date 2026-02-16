<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize() { return true; }

    public function rules()
    {
        return [
            // Personal Info - Strict based on SQL ENUMs
            'firstName'         => ['required', 'string', 'max:100', 'regex:/^[a-zA-Z\s\-ñÑ]+$/'],
            'middleName'        => ['nullable', 'string', 'max:100', 'regex:/^[a-zA-Z\s\-ñÑ]+$/'],
            'lastName'          => ['required', 'string', 'max:100', 'regex:/^[a-zA-Z\s\-ñÑ]+$/'],
            'suffix'            => 'nullable|string|max:10',
            'birthdate'         => 'required|date|before:today',
            'birthRegistration' => 'nullable|in:Registered,Not Registered', // Matches ENUM
            'gender'            => 'required|in:Male,Female', // Matches ENUM
            'contact'           => 'required|string|digits:11',
            'email'             => 'nullable|email|max:100',
            
            'purok'             => 'required|exists:puroks,id',
            'street'            => 'required|exists:streets,id',
            'houseNumber'       => 'required|string|max:50',
            
            // Additional - ENUM based values
            'householdPosition' => 'required|in:Head of Family,Spouse,Son,Daughter,Relative,Househelp,Others',
            'maritalStatus'     => 'nullable|exists:marital_statuses,id',
            'sector'            => 'required|exists:sectors,id',
            'residencyStatus'   => 'nullable|in:Old Resident,New Resident',
            'residencyStartDate'=> 'nullable|date',
            'nationality'       => 'nullable|string|max:100',
            'isVoter'           => 'nullable',
            
            // Employment (Optional but sanitized)
            'employmentStatus'  => 'nullable|string|max:50',
            'occupation'        => 'nullable|string|max:100',
            'incomeSource'      => 'nullable|in:Employment,Business,Remittance,Investments,Others,N/A',
            'monthlyIncome'     => 'nullable|string|max:50',
            
            // Education
            'educationalStatus' => 'nullable|in:Currently Studying,Graduated,Not Studying,N/A',
            'schoolType'        => 'nullable|in:Public,Private,N/A',
            'schoolLevel'       => 'nullable|in:Pre-School,Elementary,Junior High School,Senior High School,College,Vocational,Masteral,N/A',
            
            // Verification Files
            'idType'            => 'required|string|max:50',
            'idFront'           => 'required|file|mimes:jpeg,png,jpg|max:5120', 
            'idBack'            => 'required|file|mimes:jpeg,png,jpg|max:5120',
        ];
    }

    public function messages()
    {
        return [
            'householdPosition.in' => 'Invalid position selected. Please choose from the list.',
            'purok.exists'         => 'The selected Purok is invalid.',
            'street.exists'        => 'The selected Street is invalid.',
            'idFront.mimes'        => 'Only JPG, JPEG, and PNG files are allowed.',
            'idBack.mimes'    => 'Only JPEG, PNG, JPG, and WEBP files are allowed.',
        ];
    }
}