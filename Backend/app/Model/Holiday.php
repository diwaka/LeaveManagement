<?php

namespace App\Model;
use Illuminate\Database\Eloquent\Model;

class Holiday extends Model
{
    protected $table = "holiday";
    public $timestamps = false;

    public function event()
    {
        return $this->belongsTo('App\Model\Event','eventId');
    }
}
