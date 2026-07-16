let stone = 0;
let coal = 0;
let gold = 0;
let crystal = 0;

let coins = 0;

let depth = 0;

let miningProgress = 0;
let depthRequirement = 100;


// PICKAXE
let pickaxeLevel = 1;
let pickaxePower = 1;
let pickaxeCost = 50;


// MINERS
let miners = 0;
let minerPower = 0;
let minerCost = 100;



const mineButton = document.getElementById("mineButton");
const sellButton = document.getElementById("sellButton");

const upgradeButton = document.getElementById("upgradeButton");
const minerButton = document.getElementById("minerButton");





function findOre(){


    let ore = Math.random();


    if(ore < 0.65){

        stone++;

    }

    else if(ore < 0.85){

        coal++;

    }

    else if(ore < 0.97){

        gold++;

    }

    else{

        crystal++;

    }

}







function update(){


    document.getElementById("stone").innerHTML = stone;

    document.getElementById("coal").innerHTML = coal;

    document.getElementById("gold").innerHTML = gold;

    document.getElementById("crystal").innerHTML = crystal;


    document.getElementById("coins").innerHTML = coins;


    document.getElementById("depth").innerHTML =
    "Depth: " + depth + "m";


    document.getElementById("pickaxe").innerHTML =
    pickaxeLevel;


    document.getElementById("miners").innerHTML =
    miners;


    document.getElementById("autoPower").innerHTML =
    minerPower;



    document.getElementById("upgradeButton").innerHTML =
    "Upgrade Pickaxe<br>Cost: "
    + pickaxeCost
    + " Coins";



    document.getElementById("minerButton").innerHTML =
    "Hire Miner<br>Cost: "
    + minerCost
    + " Coins";



    document.getElementById("depthRequirement").innerHTML =
    miningProgress
    +
    " / "
    +
    depthRequirement
    +
    " Mining Power";



    document.getElementById("depthProgress").style.width =
    (miningProgress / depthRequirement * 100)
    +
    "%";


}









function checkDepth(){


    if(miningProgress >= depthRequirement){


        depth++;

        miningProgress = 0;


        depthRequirement =
        Math.floor(depthRequirement * 1.3);



        status.innerHTML =
        "⬇️ New depth reached!";


    }


}









function mine(){


    miningProgress += pickaxePower;


    findOre();


    status.innerHTML =
    "⛏️ Mining...";


    checkDepth();


    update();


}







mineButton.onclick = mine;









sellButton.onclick = function(){



    coins +=

    stone * 2 +

    coal * 5 +

    gold * 15 +

    crystal * 50;



    stone = 0;

    coal = 0;

    gold = 0;

    crystal = 0;



    status.innerHTML =
    "💰 Ores sold!";


    update();


};









upgradeButton.onclick = function(){



    if(coins >= pickaxeCost){


        coins -= pickaxeCost;


        pickaxeLevel++;


        pickaxePower += 2;



        pickaxeCost =
        Math.floor(pickaxeCost * 1.8);



        status.innerHTML =
        "⛏️ Pickaxe upgraded!";


    }

    else{


        status.innerHTML =
        "Need more coins!";


    }



    update();


};









minerButton.onclick = function(){



    if(coins >= minerCost){


        coins -= minerCost;


        miners++;


        minerPower++;



        minerCost =
        Math.floor(minerCost * 1.6);



        status.innerHTML =
        "👷 Miner hired!";


    }

    else{


        status.innerHTML =
        "Need more coins!";


    }



    update();


};









// MINERS WORK EVERY SECOND

setInterval(function(){



    if(miners > 0){



        // miners add mining progress

        miningProgress += minerPower;



        // miners find ores

        for(let i = 0; i < miners; i++){


            findOre();


        }





        checkDepth();



        status.innerHTML =
        "👷 Miners are working...";



        update();


    }



},1000);







update();