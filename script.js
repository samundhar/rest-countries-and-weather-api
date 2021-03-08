async function getCards(){

    return new Promise(async function(resolve,reject){
        try{
            var data = await fetch('https://restcountries.eu/rest/v2/all')
            var json = await data.json();
            resolve(json);
        }
        catch(err){
            reject('Data not');
        }
    })
}



getCards().then(function(data){
    countries = Object.keys(data);
    console.log(data[0].latlng);
    var main = document.createElement('div');
    main.setAttribute('class','container');
    var len = countries.length - (countries.length%3)

    for(c=0;c<=len;c=c+3){
        var a = c;
        var b = (c+1);
        var c = (c+2);
        var a_ = create_row_cards(a,data[a].name,data[a].flag,data[a].capital,data[a].region,data[a].alpha3Code);
        var b_ = create_row_cards(b,data[b].name,data[b].flag,data[b].capital,data[b].region,data[b].alpha3Code);
        var c_ = create_row_cards(a,data[c].name,data[c].flag,data[c].capital,data[c].region,data[c].alpha3Code);
        var rrr = create_row();
        rrr.appendChild(a_);
        rrr.appendChild(b_);
        rrr.appendChild(c_);
        main.appendChild(rrr);
        document.body.appendChild(main);
    }
})


function create_row(){
    var row = document.createElement('div');
    row.setAttribute('class','row');
    return row
}

function create_row_cards(id, name, flag, capital, region, ccode){


    var main_div = document.createElement('div');
    main_div.classList.add("col-lg-4", "col-xs-12");
    main_div.style.textAlign = 'center';

    var cards = document.createElement('div');
    cards.classList.add("card-flex", "border", "mt-3", "mb-3");
    cards.style.borderRadius = "6px";
    
    var title_div = document.createElement('div');
    title_div.setAttribute('class','card-header');
    title_div.style.backgroundColor = 'black';
    title_div.style.color = 'white';
    title_div.innerHTML = name;

    var body_div = document.createElement('div');
    body_div.setAttribute('class','card-body');
    body_div.style.backgroundColor = 'lightgreen';
    body_div.style.fontSize = '1.1rem';

    body_div_flag = document.createElement('img');
    body_div_flag.setAttribute('class','img');
    body_div_flag.setAttribute('src', flag);
    body_div_flag.style.height = "150px"
    body_div_flag.style.maxWidth = "100%"


    body_div_capital = document.createElement('div');
    body_div_capital.setAttribute('class','card-body');
    body_div_capital.innerHTML = '<b>Capital:</b> ' + capital;
    body_div_capital.style.padding = '5px';


    body_div_region = document.createElement('div');
    body_div_region.setAttribute('class','card-body');
    body_div_region.style.padding = '5px';
    body_div_region.innerHTML = 'Region: ' + region;

    


    body_div_cc = document.createElement('div');
    body_div_cc.setAttribute('class','card-body');
    body_div_cc.style.padding = '5px';
    body_div_cc.innerHTML = 'Country code: ' + ccode;



    var button = document.createElement('button');
    button.classList.add("btn", "btn-primary");
    button.innerHTML = 'Click for weather';


    body_div.appendChild(body_div_flag);
    body_div.appendChild(body_div_capital);
    body_div.appendChild(body_div_region);
    
    body_div.appendChild(body_div_cc);
    body_div.appendChild(button);
    
    cards.appendChild(title_div);
    
    cards.appendChild(body_div);
    main_div.appendChild(cards);

    var city = capital;
    button.onclick = async function(){
        var api_key = '96c6b15d810ec23252a870e02377c49b';
        
        try{
            var url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}&units=metric`;
            var weather_data = await fetch(url);
            var json_n = await weather_data.json();

            var weather_json_data = json_n;
            


            var body_div1 = document.createElement('div');
            body_div1.classList.add("alert", "alert-success", "mt-3")
            body_div1.setAttribute("role", "alert")
            body_div1.style.width = '80%';
            body_div1.style.display = 'inline-block'
            body_div1.style.fontSize = '1.3rem'

            body_div11 = document.createElement('h3');
            body_div11.innerHTML = `Weather Report for ${capital}`;


            body_div12 = document.createElement('div');
            body_div12.innerHTML = `Status: ${weather_json_data.weather[0].description}`;

            body_div13 = document.createElement('div');
            body_div13.innerHTML = `Temperature: ${weather_json_data.main.temp}&deg;C`;

            body_div14 = document.createElement('div');
            body_div14.innerHTML = `Pressure: ${weather_json_data.main.pressure}`;
            
            body_div15 = document.createElement('div');
            body_div15.innerHTML = `Humidity: ${weather_json_data.main.humidity}`;


            body_div16 = document.createElement('div');
            body_div16.innerHTML = `Wind Speed: ${weather_json_data.wind.speed}`;
            
            
            var bb = document.createElement('button');
            bb.classList.add("btn", "btn-primary");
            bb.innerHTML = 'Go Back';
            bb.onclick = function(){
                cards.removeChild(body_div1);
                cards.appendChild(body_div);

            }
            

            body_div1.appendChild(body_div11);
            body_div1.appendChild(document.createElement('hr'));
            body_div1.appendChild(document.createElement('br'));
            body_div1.appendChild(body_div12);
            body_div1.appendChild(body_div13);
            body_div1.appendChild(body_div14);
            body_div1.appendChild(body_div15);
            body_div1.appendChild(body_div16);
            body_div1.appendChild(document.createElement('br'));
            body_div1.appendChild(bb);

            
            
            cards.removeChild(body_div);
            cards.appendChild(body_div1);
        }catch(error){
            console.error(error);
        } 
    }
    return main_div
}