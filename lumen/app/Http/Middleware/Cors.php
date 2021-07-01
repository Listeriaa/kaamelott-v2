<?php

namespace App\Http\Middleware;

use Closure;

class Cors
{
    /**
     * Send CORS headers in response
     */
    public function handle($request, Closure $next)
    {
        // J'exécute le traitement de la requête et je récupère la réponse générée
        $response = $next($request);

        // Si la méthode de la requête est OPTIONS, je surchage la réponse (405 Method Not Allowed) de Lumen
        if ($request->getMethod() === 'OPTIONS') {
            $response = response('', 200);
        }

        //si on veut limiter qu'a certains domaines
        $whiteListDomain = [
            'https://kaamelott.laetitia-dev.com',

        ];

        // J'ajoute les en-têtes de réponse de CORS
        $response
            ->header('Access-Control-Allow-Origin', 'https://kaamelott.laetitia-dev.com') //sinon on met '*' si on veut rien autoriser
            ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Access-Control-Allow-Headers', 'Content-Type');


        $http_origin = $_SERVER['HTTP_ORIGIN'];

        if (in_array( $http_origin, $whiteListDomain)){
            $response->header('Access-Control-Allow-Origin', $http_origin);
        }
        
        return $response;
    }
}
