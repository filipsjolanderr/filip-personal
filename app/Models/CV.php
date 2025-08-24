<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use League\CommonMark\GithubFlavoredMarkdownConverter;

class CV extends Model
{
    protected $fillable = [
        'title',
        'content',
        'markdown_content',
        'file_path',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
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
}
