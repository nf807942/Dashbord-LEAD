<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use App\Models\Room;

class Building extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'address',
        'pc',
        'city'
    ];

    public function rooms() {
        return $this->hasMany(Room::class);
    }
}
