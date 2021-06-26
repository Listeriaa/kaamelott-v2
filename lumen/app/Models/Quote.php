<?php

namespace App\Models;

// on va s'appuyer sur cette classe pour définir nos modèles
use Illuminate\Database\Eloquent\Model;

// On nomme nos modèles en respectant la convention :
// nom de la table au singulier en PascalCase
class Quote extends Model
{
    public function character(){

        return $this->belongsTo(Quote::class);
    }
}
