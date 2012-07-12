(function() {

    var buildingQueryId = window.localStorage.getItem("buildingQueryId") + '';
    var flags = 0, now = new Date(), dateQuery, preDate, nextDate, currentDate;
    var innerHTML = "", liHeader = [], imgs = [];

    /*
     * create a date template
     * y --> year; m --> month; d --> day;
     * */
    function OwnDate(y, m, d) {
        this.year = y;
        this.month = m;
        this.day = d;
    }

    var year = now.getFullYear(), month = now.getMonth() + 1, day = now.getDate();
    
    if(currentDate == undefined){
        currentDate = new OwnDate(year, month, day);
    }
    
    console.log("Y-->" + currentDate.year + "; M-->" + currentDate.month + "; D-->" + currentDate.day);
    getMyDate(0);

    function getMyDate(dFlag) {
        console.log("Arrive at getMyDate!!!")
        var y = currentDate.year, m = currentDate.month, d = currentDate.day;
        var yearFlag, dayFlag, preDay, nextDay, preYear, nextYear, preMonth, nextMonth, innerPreDate = new OwnDate(y, m, d),innerNextDate = new OwnDate(y,m,d);
        //judge what is needed? preDate or nextDate;
        if(dFlag == -1) {
            nextDate = currentDate;
            currentDate = preDate;
            preDate = getPreDay();
        }
        else if(dFlag == 1) {
            preDate = currentDate;
            currentDate = nextDate;
            nextDate = getNextDay();
        }
        else {
            currentDate = currentDate;
            preDate = getPreDay();
            nextDate = getNextDay();
            console.log("End of getMyDate！");
            getTheClassroom();
        }

        function getYearFlag(y) {
            console.log("Arrive at getYearFlag!");
            var yearFlag = 0;
            if(y % 4 == 0) {
                if(y % 100 == 0) {
                    if(y % 400 == 0) {
                        yearFlag = 1;
                    }
                    else {
                        yearFlag = 0;
                    }
                }
                else
                    yearFlag = 1;
            }
            else
                yearFlag = 0;

            return yearFlag;
        }

        yearFlag = getYearFlag(y);
        dayFlag = getDayFlag(m, yearFlag);

        function getPreDay() {
            preDay = d - 1;
            console.log("Preday-->" + preDay);
            if(preDay == 0) {
                preMonth = m - 1;
                if(preMonth == 0) {
                    preYear = y - 1;
                    preMonth = 12;
                }
                else {
                    preYear = y;
                }
                var ddd = getDayFlag(preMonth, y);
                preDay = ddd;
            }
            else {
                preMonth = m;
                preYear = y;
            }
            
            if(innerPreDate == undefined){
                innerPreDate = new OwnDate(y,m,d);
            }
            innerPreDate.year = preYear;
            innerPreDate.month = preMonth;
            innerPreDate.day = preDay;

            return innerPreDate;
        }

        function getNextDay() {
            nextDay = d + 1;
            console.log("Next day-->" + nextDay);
            if(nextDay > dayFlag) {
                nextMonth = m + 1;
                nextDay = 1;
                nextYear = y;
                if(nextMonth > 12) {
                    nextYear = y + 1;
                    nextMonth = 1;
                }
                else {
                    // nextMonth += 1;  error!!!!!!!!!
                    nextDay = 1;
                }
            }
            else {
                nextMonth = m;
                nextYear = y;
            }
            innerNextDate.year = nextYear;
            innerNextDate.month = nextMonth;
            innerNextDate.day = nextDay;

            return innerNextDate;
        }

        /**
         * mon-->month, yearF-->yearFlag;
         *  */
        function getDayFlag(mon, yearF) {
            console.log("Arrive at getDayFlag!");
            var dayF = 0;
            if(mon == 2) {
                if(yearF == 1)
                    dayF = 28;
                else
                    dayF = 29;
            }
            else if(mon == 1 || mon == 3 || mon == 5 || mon == 7 || mon == 8 || mon == 10 || mon == 12) {
                dayF = 31;
            }
            else
                dayF = 30;
            return dayF;
        }

    }

    function getTheClassroom() {
        console.log("First execute!");
        iBistuDB.transaction(function(tx) {
            console.log("Start to query database!");
            tx.executeSql("select * from classroom where buildingId = " + "'" + buildingQueryId + "'", [], function(tx, results) {
                var r = results.rows, len = r.length, counter = 0;
                //create the queryDate from currentDate;
                var queryY = currentDate.year, queryM = currentDate.month, queryD = currentDate.day;
                if(queryM < 10) {
                    queryM = '0' + queryM;
                }
                if(queryD < 10) {
                    queryD = '0' + queryD;
                }
                dateQuery = queryY + "-" + queryM + "-" + queryD;
                console.log("QueryDate-->" + dateQuery);

                imgs.length = len;

                $("#currentDate_classroom").text(dateQuery);

                for(var i = 0; i < len; i++) {
                    liHeader[i] = '<li><a href="#" id="' + r.item(i).id + '">' + r.item(i).roomName + '<div data-enhance="false">';
                    tx.executeSql('select * from classtime where classroomId = "' + r.item(i).id + '" and date = "' + dateQuery + '" ORDER BY classroomId ASC', [], function(t, result) {

                        var row = result.rows, images = "", l = row.length;

                        function getImage(o) {
                            if(o == 'null' || o == null) {
                                return '<img src="images/cre.png"></img>&nbsp;';
                            }
                            else if(o == undefined) {
                                return '<img src="images/cre.png"></img>&nbsp;';
                            }
                            else if(o != undefined) {
                                return '<img src="images/cro.png"></img>&nbsp;';
                            }
                        }

                        if(l == 0) {
                            for(var n = 0; n < 11; n++) {
                                images += '<img src="images/cre.png"></img>&nbsp;';
                            }
                        }

                        for(var j = 0, l = row.length; j < l; j++) {

                            images += getImage(row.item(j).courseId1);
                            images += getImage(row.item(j).courseId2);
                            images += getImage(row.item(j).courseId3);
                            images += getImage(row.item(j).courseId4);
                            images += getImage(row.item(j).courseId5);
                            images += getImage(row.item(j).courseId6);
                            images += getImage(row.item(j).courseId7);
                            images += getImage(row.item(j).courseId8);
                            images += getImage(row.item(j).courseId9);
                            images += getImage(row.item(j).courseId10);
                            images += getImage(row.item(j).courseId11);

                        }

                        imgs[counter] = images;
                        liHeader[counter] += imgs[counter];
                        counter++;

                    }, function() {
                        console.log("Get from classtime error!");
                    });

                }

                console.log("inner flags-->" + flags)
                flags++;

            }, function() {
                console.log("get from classroom error!")
            });

        }, errorCB, function() {
            //successCallback...
            console.log("flags-->" + flags);
            flags++;

            console.log("liHeader -->" + liHeader.length);
            for(var n = 0, len = liHeader.length; n < len; n++) {
                innerHTML += liHeader[n] + '</div></a></li>';
            }

            $("#classroomList").html(innerHTML);
            $("#classroomGetPre").removeClass('ui-btn-active');
            $("#classroomGetNext").removeClass('ui-btn-active');
            $("#getCurrentDate").addClass('ui-btn-active');
            $("#classroomList").listview('refresh');
        
            bindClickAction();

        });
    }

    function bindClickAction() {
        
        console.log("bind the click");
        
        $("#classroomGetPre").click(function() {
            console.log("GetPre clicked");
            getMyDate(-1);
            getTheClassroom();
        });

        $("#classroomGetNext").click(function() {
            getMyDate(1);
            getTheClassroom();
        });

    }
    
    console.log("At the bottom of getClassroomList");

})();

