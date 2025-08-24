<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\CVController;


// Public routes
Route::get('/', function () {
    return redirect()->route('blog.index');
})->name('home');

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');

Route::get('/projects', [ProjectController::class, 'index'])->name('projects.index');
Route::get('/projects/{id}', [ProjectController::class, 'show'])->name('projects.show');

Route::get('/cv', [CVController::class, 'index'])->name('cv.index');



// Dashboard route (without admin prefix)
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Admin\DashboardController::class, 'index'])->name('dashboard');
});

// Admin routes (protected by auth)
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    // Blog posts management
    Route::resource('blog-posts', \App\Http\Controllers\Admin\BlogPostController::class);
    
    // Projects management
    Route::resource('projects', \App\Http\Controllers\Admin\ProjectController::class);
    
    // CV management
    Route::resource('cvs', \App\Http\Controllers\Admin\CVController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
