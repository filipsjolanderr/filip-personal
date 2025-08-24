<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    public function index()
    {
        $blogPosts = BlogPost::latest()->paginate(10);
        
        // Transform the pagination data structure to match frontend expectations
        $transformedBlogPosts = [
            'items' => $blogPosts->items(),
            'currentPage' => $blogPosts->currentPage(),
            'lastPage' => $blogPosts->lastPage(),
            'perPage' => $blogPosts->perPage(),
            'total' => $blogPosts->total(),
        ];
        
        return Inertia::render('admin/blog-posts/index', [
            'blogPosts' => $transformedBlogPosts
        ]);
    }

    public function create()
    {
        return Inertia::render('admin/blog-posts/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:blog_posts',
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'featured_image' => 'nullable|url|max:500',
            'is_published' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        if ($validated['is_published'] && !isset($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        BlogPost::create($validated);

        return redirect()->route('admin.blog-posts.index')
            ->with('success', 'Blog post created successfully!');
    }

    public function show(BlogPost $blogPost)
    {
        return Inertia::render('admin/blog-posts/show', [
            'blogPost' => $blogPost
        ]);
    }

    public function edit(BlogPost $blogPost)
    {
        return Inertia::render('admin/blog-posts/edit', [
            'blogPost' => $blogPost
        ]);
    }

    public function update(Request $request, BlogPost $blogPost)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'slug' => 'required|string|max:255|unique:blog_posts,slug,' . $blogPost->id,
            'content' => 'required|string',
            'excerpt' => 'nullable|string|max:500',
            'featured_image' => 'nullable|url|max:500',
            'is_published' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        if ($validated['is_published'] && !isset($validated['published_at'])) {
            $validated['published_at'] = now();
        }

        $blogPost->update($validated);

        return redirect()->route('admin.blog-posts.index')
            ->with('success', 'Blog post updated successfully!');
    }

    public function destroy(BlogPost $blogPost)
    {
        $blogPost->delete();

        return redirect()->route('admin.blog-posts.index')
            ->with('success', 'Blog post deleted successfully!');
    }
}
