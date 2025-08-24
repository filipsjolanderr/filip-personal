<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use League\CommonMark\GithubFlavoredMarkdownConverter;

class Project extends Model
{
    protected $fillable = [
        'title',
        'description',
        'markdown_content',
        'technologies',
        'image',
        'live_url',
        'github_url',
        'is_featured',
        'sort_order',
    ];

    protected $casts = [
        'technologies' => 'array',
        'is_featured' => 'boolean',
    ];

    public function scopeFeatured(Builder $query): void
    {
        $query->where('is_featured', true);
    }

    public function scopeOrdered(Builder $query): void
    {
        $query->orderBy('sort_order', 'asc');
    }

    public function getParsedDescriptionAttribute()
    {
        if ($this->markdown_content) {
            $converter = new GithubFlavoredMarkdownConverter([
                'html_input' => 'strip',
                'allow_unsafe_links' => false,
            ]);
            return $converter->convert($this->markdown_content);
        }
        
        return $this->description;
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
        
        return $this->description;
    }
}
