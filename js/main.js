const dataCont = document.getElementById('data');
const textSearch = document.getElementById('search');
const btnSearch = document.getElementById('btnSearch');
const loadImg = document.getElementById('loadImg');
// Fire The Event
btnSearch.addEventListener('click' , fetchData);
// Fetching Data From Api
    function fetchData(){
        let val =textSearch.value;
        loadImg.classList.remove('d-none');
        const http = new XMLHttpRequest();
        http.open('GET',`https://api.edamam.com/search?q=${val}&app_id=6ec3ba4d&app_key=26bf43f161049361e4fa4412387f0d05`);
        http.send();
        http.addEventListener('readystatechange',function(){
            if(http.readyState == 4 && http.status == 200){
            let data = JSON.parse(http.response).hits;
            console.log(data)
            loadImg.classList.add('d-none');
            show(data);
            textSearch.value='';
            }   
        });
    }
    // Showing Data To User
    function show(data){
        output=``;
        for(let i = 0 ; i < data.length ; i++){
            output += `
                     <div class="col-sm-4 my-3">
                        <div class="card">
                            <img src="${data[i].recipe.image}" alt="" class="card-img-top img-fluid">
                            <div class="card-body">
                                <h3 class="card-title">${data[i].recipe.label}</h3>
                                <p>
                                   <span class="text-primary"> Ingredients : </span>${data[i].recipe.ingredientLines}
                                </p>
                                <p class="card-text"> <span class="text-primary"> Calories : </span> : ${data[i].recipe.calories}</p>
                            </div>
                        </div>
                    </div>
            `
            dataCont.innerHTML=output;
        }
    }
