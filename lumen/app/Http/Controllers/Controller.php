<?php

namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;

class Controller extends BaseController
{
        // permet de retourner une réponse au format JSON en précisant
    // un code retour HTTP
    protected function sendJsonResponse($data, $responseCode = 200){
        return response()->json($data, $responseCode);
    }

    //permet de retourner une réponse vide avec un code retour HTTP
    protected function sendEmptyResponse($responseCode){
        return response('', $responseCode);
    }
}
