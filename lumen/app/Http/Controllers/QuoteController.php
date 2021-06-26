<?php

namespace App\Http\Controllers;

use App\Models\Quote;
use Illuminate\Http\Request;

class QuoteController extends Controller {

    public function add(Request $request){
        $newQuote = new Quote();

        if($request->filled('sentence') && $request->filled('characterId')){

            $newQuote->sentence = $request->sentence;
            $newQuote->character_id = $request->characterId;

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
    public function hello(){
        echo "hello";
    }
}

