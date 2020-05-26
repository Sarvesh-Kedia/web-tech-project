const axios = require('axios')

const scripts = {}


scripts.addToWishList = (event) => {

    var responsedata = {"x": ["5", "3", "10"], "y": ["1", "2", "3"]};

    return responsedata
    
    title = event.target.value
    console.log(title)

    let data = JSON.stringify({
        coursename: title
    })

    

    axios.post('http://localhost:5000/home/addtowishlist', data, {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    )

    axios.get('http://localhost:5000/home/getwishlist')
    .then(res => {
        console.log(res)
    })


    axios.get('http://localhost:5000/home/getrecs', {params: {data}})
    .then(res => {
        // console.log('recommended courses', res)
        var reclist = res.data.recs
        console.log(reclist)

        document.getElementById("wishlistrec").innerHTML = ''

        for(var i = 0; i < reclist.length; i++){
            var source = "https://www." + reclist[i].website + ".com"
            var title = reclist[i].name
            var topic = reclist[i].topic
            var price = reclist[i].price
            var website = reclist[i].website
            var id = reclist[i].id
                
            document.getElementById("wishlistrec").innerHTML +=
                "<div class=\"card\" style=\"width: 20rem;\">"
                + "<div class=\"card-body\">"
                + "<img class=\"card-img-top\" src=\"https://source.unsplash.com/1600x900/?tech,courses,study\"></img>"
                + "<h5 class=\"card-title break-word\">"+ title +"</h5>"
                + "<p class=\"card-text break-word\">Topic: " + topic + "<br>Price:" + price + "<br>Website: " + website + "<br></p>"
                + "<a href=" + source + ">View On Source Website</a><br>"
                + "<button value="+ encodeURIComponent(title) +" id=\"addButton\" type=\"button\" class=\"btn btn-primary\">Add to Wishlist</button>"
                + "</div>"
                + "</div>"


            const element = document.querySelectorAll("#addButton")
            element.forEach(function(el){
                el.addEventListener('click', addToWishList);
            });

        }
        
        displayWishlist()

        analytics()

    })

}


scripts.displayWishlist = ()  => {

    return {"wishlist": [{"id": 5,
    "name": "Open CV",
    "price": 10000,
    "topic": "ai",
    "website": "udemy",
    "_id": "5e83799637bb4353b04c64a5"}, 
    {"id": 2,
    "name": "Intro to ML",
    "price": 15000,
    "topic": "ml",
    "website": "udemy",
    "_id": "5e83789637bb4353b04c64a5"}
]}

    document.getElementById("wishlist").innerHTML = ''

    axios.get('http://localhost:5000/home/getwishlist')
    .then(res => {
        var allcourses = res.data.courses
        console.log('all courses', allcourses)

            for(var i = 0; i < allcourses.length; i++){
                var source = "#"
                var title = allcourses[i].name
                var topic = allcourses[i].topic
                var price = allcourses[i].price
                var website = allcourses[i].website
                var id = allcourses[i].id
                    
                document.getElementById("wishlist").innerHTML +=
                    "<div class=\"card\" style=\"width: 20rem;\">"
                    + "<div class=\"card-body\">"
                    + "<img class=\"card-img-top\" src=\"https://source.unsplash.com/1600x900/?tech,courses,study\"></img>"
                    + "<h5 class=\"card-title break-word\">"+ title +"</h5>"
                    + "<p class=\"card-text break-word\">Topic: " + topic + "<br>Price:" + price + "<br>Website: " + website + "<br></p>"
                    + "<a href=\"#\">redirect to website</a><br>"
                    + "</div>"
                    + "</div>"


                // const element = document.querySelectorAll("#addButton")
                // element.forEach(function(el){
                //     el.addEventListener('click', addToWishList);
                // });

            }

    })
    .catch(err => console.log(err))


}


scripts.analytics = () => {
    var responsedata = {"x": ["5", "3", "10"], "y": ["1", "2", "3"]};

    return responsedata

    axios.get('http://localhost:5000/home/analytics')
    .then((res) => {
        console.log('lkajsdhflaskjdh')
         responsedata = res.data.analdata
    })

    axios.get('http://localhost:5000/home/analytics')
    .then(res => {
        var analdata = res.data.analdata
        console.log('analdata', analdata)


        for(var i=0; i<analdata.len; ++i){
            datapoints.push({"y": analdata[i]})
        }

        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            
            title:{
                text:"Most Popular Courses on People's Wishlists"
            },
            axisX:{
                interval: 1
            },
            axisY2:{
                interlacaedColor: "rgba(1,77,101,.2)",
                gridColor: "rgba(1,77,101,.1)",
                title: "Occurance"
            },
            data: [{
                type: "bar",
                name: "Course Names",
                axisYType: "secondary",
                color: "#014D65",
                dataPoints: analdata
            }]
        });
        chart.render();
        

    })
    .catch(err => console.log(err))

    return responsedata

}


scripts.bro = () => { return 10}


module.exports = scripts