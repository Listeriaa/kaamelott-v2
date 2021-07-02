<?php

namespace App\Http\Middleware;

use Closure;
use Symfony\Component\HttpFoundation\Response;

class Cors
{

    private $allowOrigin;

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

        $this->allowOrigin = [
            'http://localhost',
            'http://127.0.0.1',
            'http://localhost:8080',
            'http://127.0.0.1:8080',
            'https://kaamelott.laetitia-dev.com'
        ];
        $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';

        if (!in_array($origin, $this->allowOrigin) || empty($origin)) {
            return new Response('Forbidden', 403);
        }
        $response
            ->header('Access-Control-Allow-Origin', $origin)
            ->header('Access-Control-Allow-Methods', 'GET')
            ->header('Access-Control-Allow-Credentials', 'true')
            ->header('Access-Control-Allow-Headers', 'Content-Type');



        return $response;
    }
}


