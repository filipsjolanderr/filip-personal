<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use League\CommonMark\GithubFlavoredMarkdownConverter;

class BlogPost extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'content',
        'markdown_content',
        'excerpt',
        'featured_image',
        'is_published',
        'published_at',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'published_at' => 'datetime',
    ];

    public function scopePublished(Builder $query): void
    {
        $query->where('is_published', true)
              ->where('published_at', '<=', now());
    }

    public function scopeFeatured(Builder $query): void
    {
        $query->where('is_published', true)
              ->where('published_at', '<=', now())
              ->orderBy('published_at', 'desc');
    }

    public function getParsedContentAttribute()
    {
        if ($this->markdown_content) {
            $converter = new GithubFlavoredMarkdownConverter([
                'html_input' => 'strip',
                'allow_unsafe_links' => false,
            ]);
            return $converter->convert($this->markdown_content);
        }
        
        return $this->content;
    }

    public function getParsedExcerptAttribute()
    {
        if ($this->excerpt) {
            $converter = new GithubFlavoredMarkdownConverter([
                'html_input' => 'strip',
                'allow_unsafe_links' => false,
            ]);
            return $converter->convert($this->excerpt);
        }
        
        return $this->excerpt;
    }
}
