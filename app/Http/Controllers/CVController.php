<?php

namespace App\Http\Controllers;

use App\Models\CV;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CVController extends Controller
{
    public function index()
    {
        $cvs = CV::active()->get();

        return Inertia::render('cv/index', [
            'cvs' => $cvs,
        ]);
    }
}
