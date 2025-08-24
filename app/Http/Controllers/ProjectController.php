<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::ordered()->paginate(12);

        // Transform the pagination data structure to match frontend expectations
        $transformedProjects = [
            'items' => $projects->items(),
            'currentPage' => $projects->currentPage(),
            'lastPage' => $projects->lastPage(),
            'perPage' => $projects->perPage(),
            'total' => $projects->total(),
        ];

        return Inertia::render('projects/index', [
            'projects' => $transformedProjects,
        ]);
    }

    public function show($id)
    {
        $project = Project::findOrFail($id);

        return Inertia::render('projects/show', [
            'project' => $project,
        ]);
    }
}
