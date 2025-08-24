<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CV;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CVController extends Controller
{
    public function index()
    {
        $cvs = CV::latest()->paginate(10);
        
        // Transform the pagination data structure to match frontend expectations
        $transformedCVs = [
            'items' => $cvs->items(),
            'currentPage' => $cvs->currentPage(),
            'lastPage' => $cvs->lastPage(),
            'perPage' => $cvs->perPage(),
            'total' => $cvs->total(),
        ];
        
        return Inertia::render('admin/cvs/index', [
            'cvs' => $transformedCVs
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/cvs/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'file_path' => 'nullable|string|max:500',
            'is_active' => 'boolean',
        ]);

        // If this CV is being made active, deactivate all others
        if ($validated['is_active']) {
            CV::where('is_active', true)->update(['is_active' => false]);
        }

        CV::create($validated);

        return redirect()->route('admin.cvs.index')
            ->with('success', 'CV created successfully!');
    }

    public function show(CV $cv)
    {
        return Inertia::render('admin/cvs/show', [
            'cv' => $cv
        ]);
    }

    public function edit(CV $cv)
    {
        return Inertia::render('admin/cvs/edit', [
            'cv' => $cv
        ]);
    }

    public function update(Request $request, CV $cv)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
            'file_path' => 'nullable|string|max:500',
            'is_active' => 'boolean',
        ]);

        // If this CV is being made active, deactivate all others
        if ($validated['is_active']) {
            CV::where('is_active', true)->where('id', '!=', $cv->id)->update(['is_active' => false]);
        }

        $cv->update($validated);

        return redirect()->route('admin.cvs.index')
            ->with('success', 'CV updated successfully!');
    }

    public function destroy(CV $cv)
    {
        $cv->delete();

        return redirect()->route('admin.cvs.index')
            ->with('success', 'CV deleted successfully!');
    }
}
