<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $posts = BlogPost::published()
            ->orderBy('published_at', 'desc')
            ->paginate(10);

        // Transform the pagination data structure to match frontend expectations
        $transformedPosts = [
            'items' => $posts->items(),
            'currentPage' => $posts->currentPage(),
            'lastPage' => $posts->lastPage(),
            'perPage' => $posts->perPage(),
            'total' => $posts->total(),
        ];

        return Inertia::render('blog/index', [
            'posts' => $transformedPosts,
        ]);
    }

    public function show($slug)
    {
        $post = BlogPost::where('slug', $slug)
            ->where('is_published', true)
            ->where('published_at', '<=', now())
            ->firstOrFail();

        return Inertia::render('blog/show', [
            'post' => $post,
        ]);
    }
}
