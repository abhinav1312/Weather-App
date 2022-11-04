jQuery(function () {

    $(".loader").hide();

    //GET WEATHER DATA FROM SERVER ON REFRESH/LOAD
   getReq();

    //DATES
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const d = new Date();
    let month = months[d.getMonth()];
    let date = d.getDate();
    
    function epochConverter(time) {
        let utcSeconds = Number(time)
        let dt = new Date(0); // The 0 there is the key, which sets the date to the epoch
        dt.setUTCSeconds(utcSeconds);
        return dt.getHours() + " : " + dt.getMinutes();
    }

    
    //GET AND POST REQUESTS FUNCTION FOR AJAX CALLS 
    function postReq() {
        $(".loader").show();
        var data = $('#cityChoice');

        $.ajax({
            type: 'post',
            url: '/weather',
            data: data,
            dataType: 'text'
        })
            .done(function () {
                getReq();
                data.val('');
            })

    }

    function getReq() {
        $.ajax({
            type: 'get',
            url: '/weather',
            success: function(data) {
                push(data);
                $(".loader").hide();
            }
        });
    }


    //POST REQUEST HANDLING ON SUBMITTING
    $("form.form").on('submit', function (e) {
        e.preventDefault();
        postReq();
    });


    //DISPLAYING THE FECTHED WEATHER DATA ON THE SITE
    function push(data) {
        if (data[0].message == 0) {
            alert("City not found!!! Try again")
        }
        else {
            $('.card-group').html(' ');
            data.forEach((item, index) => {
                let sunrise = epochConverter(item.sunrise) + ' hours';
                let sunset = epochConverter(item.sunset) + ' hours';
                if (index === 0) {  //first card has a class infocus which keeps it focussed
                    $('.card-group').append(
                        `<div class="card infocus">
                            <div class="card-outer ">
                            <div class="upper-half">
                            
                                <div class="bg-img" style="background-image: url(${item.imgUrl});"  ></div>
                            
                            <ul class="top">     
                                <li id="date">${date + ' ' + month} </li>
                                <li class="cutout"></li>
                                <li class="icon"><img src="http://openweathermap.org/img/w/${item.icon}.png" alt="Icon" srcset=""></li>
                            </ul>
        
                            <div class="weather-desc">
                                ${item.weather}
                            </div>
        
                            <div class="temperature">
                                ${item.temp} <span>&#8451</span>
                            </div>
        
                            <div class="ocean">
                                <div class="wave"></div>
                                <div class="wave"></div>
                                <div class="wave"></div>
                            </div>
        
                        </div>

                        <div class="lower-half">
                            <h3 id="city"> ${item.city} </h3>
                        
                            <div class="heading">
                                <div class="info active" onclick="infoClick(this)">Today</div>
                                <div><strong> | </strong></div>
                                <div class="more-info inactive" onclick="moreInfoClick(this)">More info</div>
                            </div>
                        
                            <div class="weather-detail">
                                <ul>
                                    <li>
                                        <div class="first">Min Temp</div>
                                        <div class="second"> ${item.minTemp} <span>&#8451</span> </div>
                                        <div class="third">Sunrise</div>
                                        <div class="fourth"> ${sunrise} </div>
                                    </li>
                                    <li>
                                        <div class="first"> Max temp </div>
                                        <div class="second"> ${item.maxTemp} <span>km/h</span> </div>
                                        <div class="third"> Sunset </div>
                                        <div class="fourth"> ${sunset} </div>
                                    </li>
                                    <li>
                                        <div class="first">Windspeed</div>
                                        <div class="second"> ${item.windspeed} <span> m/s </span> </div>
                                        <div class="third"> Pressure </div>
                                        <div class="fourth"> ${item.pressure} <span>Pa</span> </div>
                                    </li>
                                    <li>
                                        <div class="first"> Humidity </div>
                                        <div class="second"> ${item.humidity} <span> m cubed </span> </div>
                                        <div class="third">visibility</div>
                                        <div class="fourth"> ${item.visibility} <span>km/h</span> </div>
                                    </li>
                                </ul>
                            </div>             
                        </div>
                    </div>`
                    )
                }
                else {
                    $('.card-group').append(

                        `<div class="card">
                    <div class="card-outer ">
                        <div class="upper-half">

                            <div class="bg-img" style="background-image : url(${item.imgUrl})" ></div>

                            <ul class="top">          
                                <li id="date">${date + ' ' + month} </li>
                                <li class="cutout"></li>
                                <li class="icon"><img src="http://openweathermap.org/img/w/${item.icon}.png" alt="Icon" srcset=""></li>
                            </ul>
        
                            <div class="weather-desc">
                                ${item.weather}
                            </div>
        
                            <div class="temperature">
                                ${item.temp} <span>&#8451</span>
                            </div>
        
                            <div class="ocean">
                                <div class="wave"></div>
                                <div class="wave"></div>
                                <div class="wave"></div>
                            </div>
        
                        </div>

                        <div class="lower-half">
                            <h3 id="city"> ${item.city} </h3>
                            
                            <div class="heading">
                                <div class="info active" onclick="infoClick(this)">Today</div>
                                <div><strong> | </strong></div>
                                <div class="more-info inactive" onclick="moreInfoClick(this)">More info</div>
                            </div>
                            
                            <div class="weather-detail">
                                <ul>
                                    <li>
                                        <div class="first">Min Temp</div>
                                        <div class="second"> ${item.minTemp} <span>&#8451</span> </div>
                                        <div class="third"> Sunrise </div>
                                        <div class="fourth"> ${sunrise} </div>
                                    </li>
                                    <li>
                                        <div class="first"> Max temp </div>
                                        <div class="second">${item.maxTemp} <span>km/h</span> </div>
                                        <div class="third"> Sunset </div>
                                        <div class="fourth"> ${sunset} </div>
                                    </li>
                                    <li>
                                        <div class="first">Windspeed</div>
                                        <div class="second"> ${item.windspeed} <span> m/s </span> </div>
                                        <div class="third"> Pressure </div>
                                        <div class="fourth"> ${item.pressure} <span>Pa</span> </div>
                                    </li>
                                    <li>
                                        <div class="first"> Humidity </div>
                                        <div class="second"> ${item.humidity} <span> m cubed </span> </div>
                                        <div class="third">visibility</div>
                                        <div class="fourth"> ${item.visibility} <span>km/h</span> </div>
                                    </li>
                                </ul>
                            </div>        
                        </div>
                    </div>`
                    )
                }
            });
        }
        $(".loader").hide();
    }

});
