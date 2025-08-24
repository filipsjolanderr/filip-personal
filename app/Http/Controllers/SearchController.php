<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Models\Project;
use App\Models\CV;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class SearchController extends Controller
{
    public function search(Request $request): JsonResponse
    {
        $query = $request->get('q', '');
        $type = $request->get('type', 'all');

        if (empty($query)) {
            return response()->json([
                'results' => [],
                'totalResults' => 0,
            ]);
        }

        $results = [];

        // Search blog posts
        if ($type === 'all' || $type === 'blog') {
            $blogResults = BlogPost::published()
                ->where(function($q) use ($query) {
                    $q->where('title', 'like', "%{$query}%")
                      ->orWhere('content', 'like', "%{$query}%")
                      ->orWhere('excerpt', 'like', "%{$query}%");
                })
                ->orderBy('published_at', 'desc')
                ->get()
                ->map(function($post) {
                    return [
                        'id' => $post->id,
                        'type' => 'blog',
                        'title' => $post->title,
                        'excerpt' => $post->excerpt ?: substr(strip_tags($post->content), 0, 150) . '...',
                        'url' => route('blog.show', $post->slug),
                        'published_at' => $post->published_at,
                        'score' => 0, // Will be calculated based on relevance
                    ];
                });

            $results = array_merge($results, $blogResults->toArray());
        }

        // Search projects
        if ($type === 'all' || $type === 'project') {
            $projectResults = Project::where(function($q) use ($query) {
                    $q->where('title', 'like', "%{$query}%")
                      ->orWhere('description', 'like', "%{$query}%")
                      ->orWhereJsonContains('technologies', $query);
                })
                ->orderBy('sort_order', 'asc')
                ->get()
                ->map(function($project) {
                    return [
                        'id' => $project->id,
                        'type' => 'project',
                        'title' => $project->title,
                        'excerpt' => substr($project->description, 0, 150) . '...',
                        'url' => route('projects.show', $project->id),
                        'technologies' => $project->technologies,
                        'score' => 0, // Will be calculated based on relevance
                    ];
                });

            $results = array_merge($results, $projectResults->toArray());
        }

        // Search CV content
        if ($type === 'all' || $type === 'cv') {
            $cvResults = CV::active()
                ->where(function($q) use ($query) {
                    $q->where('title', 'like', "%{$query}%")
                      ->orWhere('content', 'like', "%{$query}%");
                })
                ->get()
                ->map(function($cv) {
                    return [
                        'id' => $cv->id,
                        'type' => 'cv',
                        'title' => $cv->title,
                        'excerpt' => $cv->content ? substr(strip_tags($cv->content), 0, 150) . '...' : 'CV content',
                        'url' => route('cv.index'),
                        'score' => 0, // Will be calculated based on relevance
                    ];
                });

            $results = array_merge($results, $cvResults->toArray());
        }

        // Calculate relevance scores and sort results
        $results = collect($results)->map(function($result) use ($query) {
            $score = 0;
            $queryLower = strtolower($query);

            // Title matches get highest score
            if (stripos($result['title'], $query) !== false) {
                $score += 10;
            }

            // Exact title match gets bonus
            if (strtolower($result['title']) === $queryLower) {
                $score += 5;
            }

            // Content/excerpt matches
            if (stripos($result['excerpt'], $query) !== false) {
                $score += 3;
            }

            // Technology matches for projects
            if (isset($result['technologies']) && is_array($result['technologies'])) {
                foreach ($result['technologies'] as $tech) {
                    if (stripos($tech, $query) !== false) {
                        $score += 2;
                    }
                }
            }

            $result['score'] = $score;
            return $result;
        })->sortByDesc('score')->values();

        return response()->json([
            'results' => $results,
            'totalResults' => $results->count(),
        ]);
    }
}
