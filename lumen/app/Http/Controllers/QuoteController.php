<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuoteController extends Controller {


    /**
     * Méthode pour ajouter une citation en BDD
     * A faire une seule fois depuis l'api public (https://github.com/sin0light/api-kaamelott)
     * @param Request $request
     * @return void
     */
    public function add(Request $request){
        $newQuote = new Quote();

        if($request->filled('sentence') && $request->filled('characterId') && $request->filled('wrongOneId') && $request->filled('wrongTwoId')){

            $newQuote->sentence = $request->sentence;
            $newQuote->character_id = $request->characterId;
            $newQuote->wrongone_id = $request->wrongOneId;
            $newQuote->wrongtwo_id = $request->wrongTwoId;
            
            try{
                $newQuote->save();

                return $this->sendJsonResponse($newQuote, 201);

            }catch(\Exception $e){
                dump($e);
                return $this->sendEmptyResponse(500);
            }
        } else {
        return $this->sendEmptyResponse(400);

        }

    }

    /**
     * Méthode pour récupérer une citation en fonction de son id
     *
     * @param [type] $id
     * @return void
     */
    public function load($id){

        $quote = Quote::find($id);

        // Si on a un résultat
        if (!empty($quote)) {
        //je load les data issus de la table character correspondant à ces relations

            $quote->load(['character', 'wrongone', 'wrongtwo']);

            // Return JSON of this list
            return $this->sendJsonResponse($quote, 200);
        }
        // Sinon
        else {
            // HTTP status code 404 Not Found
            return $this->sendEmptyResponse(404);
        }

    }

    /**
     * méthode pour récupérer 10 citations aléatoires
     * GET /quote/random
     * @return void
     */
    public function getTenRandomQuotes(){

        //Je récupère 10 lignes aléatoires de la table Quote;
        $quote = Quote::select('*')->inRandomOrder()->limit(10)->get();

                    if (!empty($quote)) {

                        //je load les data issus de la table character correspondant à ces relations
                        $quote->load(['character', 'wrongone', 'wrongtwo']);
                        return $this->sendJsonResponse($quote, 200);
                        }

    }
}

