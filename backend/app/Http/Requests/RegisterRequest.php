<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    public function authorize() { return true; }

    public function rules()
    {
        return [
            'firstName' => 'required|string|max:100',
            'lastName'  => 'required|string|max:100',
            'birthdate' => 'required|date',
            'gender'    => 'required|in:Male,Female',
            'contact'   => 'required|string|size:11',
            'purok'     => 'required|string',
            'street'    => 'required|string',
            'houseNumber' => 'required|string',
            'householdPosition' => 'required|string',
            'sector'    => 'required|string',
            'residencyStatus' => 'required|string',
            'idFront'   => 'required|image|max:5120',
            'idBack'    => 'required|image|max:5120',
        ];
    }
}