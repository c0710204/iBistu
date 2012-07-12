
/**
 * Map info from Baidu
 * 
 *  */

function moveMap(location){
    
    function Geolocation(){};
    
    var loc = new Geolocation();
    
    if(location == "xy"){
        // 116.353362,40.044236
        loc.x = 116.353362;
        loc.y = 40.044236;
    }
    else if (location == "jxq"){
        //116.389438,39.995024
        loc.x = 116.389438;
        loc.y = 39.995024;
    }
    else if(location == "qh"){
        //116.349014,40.049718
        loc.x = 116.349014;
        loc.y = 40.049718;
    }
    
    var map = new BMap.Map("mapContainer");
    var point = new BMap.Point(loc.x, loc.y);
    map.setCurrentCity("北京");  
    map.centerAndZoom(point,17);
    map.enableScrollWheelZoom(true);
    
}

moveMap('xy');

// var map = new BMap.Map("mapContainer");            // 创建Map实例
// var point = new BMap.Point(116.389438,39.995024);    // 创建点坐标
// map.centerAndZoom(point,17);












