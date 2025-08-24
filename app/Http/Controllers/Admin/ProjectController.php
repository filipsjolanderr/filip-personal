<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('sort_order')->orderBy('created_at', 'desc')->paginate(10);
        
        // Transform the pagination data structure to match frontend expectations
        $transformedProjects = [
            'items' => $projects->items(),
            'currentPage' => $projects->currentPage(),
            'lastPage' => $projects->lastPage(),
            'perPage' => $projects->perPage(),
            'total' => $projects->total(),
        ];
        
        return Inertia::render('admin/projects/index', [
            'projects' => $transformedProjects
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/projects/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'technologies' => 'array',
            'technologies.*' => 'string|max:100',
            'image' => 'nullable|url|max:500',
            'live_url' => 'nullable|url|max:500',
            'github_url' => 'nullable|url|max:500',
            'is_featured' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        // Filter out empty technologies
        $validated['technologies'] = array_filter($validated['technologies'], function($tech) {
            return !empty(trim($tech));
        });

        Project::create($validated);

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project created successfully!');
    }

    public function show(Project $project)
    {
        return Inertia::render('admin/projects/show', [
            'project' => $project
        ]);
    }

    public function edit(Project $project)
    {
        return Inertia::render('admin/projects/edit', [
            'project' => $project
        ]);
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'technologies' => 'array',
            'technologies.*' => 'string|max:100',
            'image' => 'nullable|url|max:500',
            'live_url' => 'nullable|url|max:500',
            'github_url' => 'nullable|url|max:500',
            'is_featured' => 'boolean',
            'sort_order' => 'integer|min:0',
        ]);

        // Filter out empty technologies
        $validated['technologies'] = array_filter($validated['technologies'], function($tech) {
            return !empty(trim($tech));
        });

        $project->update($validated);

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project updated successfully!');
    }

    public function destroy(Project $project)
    {
        $project->delete();

        return redirect()->route('admin.projects.index')
            ->with('success', 'Project deleted successfully!');
    }
}
