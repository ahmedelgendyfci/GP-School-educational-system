$(function () {
    var flag = false
    $('.arrow2').addClass('d-none')
    $('.card .btn').click(function() {

        flag = !flag

        var id = $(this).attr('id');
        var sellectorLeft = "#"+ id + " .arrow1"
        var sellectorDown = "#"+ id + " .arrow2"

        if(flag){
            $(sellectorLeft).addClass('d-none')
            $(sellectorDown).removeClass('d-none')
        }
        else{
            $(sellectorDown).addClass('d-none')
            $(sellectorLeft).removeClass('d-none')
        }

    });
    // laod pages using javascript ajax
    function loadDoc(content,page) {
        // console.log(content, page)
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200){
                // console.log(this.responseText)
                document.getElementById(content).innerHTML = this.responseText;
            }
        };
        xhttp.open("GET", "http://localhost:3000/"+page, true);
        xhttp.send();
    }
    // laod pages to admin dashboard
    $("#dashboarNewStudent").click(function(e){
        e.preventDefault();
        loadDoc('right-side','adminNewStudent')
        // $("#right-side").load("/adminNewStudent")
    });
    $("#dashboardAllStudents").click(function(e){
        e.preventDefault();
        // $("#right-side").load("/adminAllStudents");
        loadDoc('right-side','allStudents')
    });
    $("#dashboardNewTeacher").click(function(e){
        e.preventDefault();
        // $("#right-side").load("/adminNewTeacher");
        loadDoc('right-side','adminNewTeacher')
    });
    $("#dashboardAllTeachers").click(function(e){
        e.preventDefault();
        // $("#right-side").load("/adminAllTeachers");
        loadDoc('right-side','allTeachers')
    });
    $("#dashboardNewLibrarian").click(function(e){
        e.preventDefault();
        // $("#right-side").load("/adminNewLibrarian");
        loadDoc('right-side','adminNewLibrarian')
    });
    $("#dashboardAllLibrarians").click(function(e){
        e.preventDefault();
        // $("#right-side").load("/adminAllLibrarians");
        loadDoc('right-side','allLibrarians')
    });
    $("#dashboardNewParent").click(function(){
        // $("#right-side").load("/adminNewParent");
        loadDoc('right-side','adminNewParent')
    });
    $("#dashboardAllParents").click(function(){
        // $("#right-side").load("/adminAllParents");
        loadDoc('right-side','allParents')
    });
    $("#dashboardStudentTimetable").click(function(){

        $.when(loadDoc('right-side','studentTimetable')).then(getTimetableByLevel("/timeTable",'1'));

    });
    $("#dashboardAllTimetables").click(function(){
        // $("#right-side").load("/adminAllTimetable");
        loadDoc('right-side','adminAllTimetable')
    });
    $("#dashboardNewEvent").click(function(){
        // $("#right-side").load("/adminNewEvent");
        loadDoc('right-side','adminNewEvent')
    });
    $("#dashboardAllEvents").click(function(){
        // $("#right-side").load("/adminAllEvents");
        loadDoc('right-side','allEvents')
    });
    $("#dashboardViewBook").click(function(){
        // $("#right-side").load("/viewBook");
        loadDoc('right-side',viewBook)
    });


// post new student data to the DB
    window.newUser = function(){
        var fname = document.getElementById("firstName").value
        var lname = document.getElementById("lastName").value

        var fullName = fname +" " + lname

        var email = document.getElementById("email").value
        var password = document.getElementById("password").value
        var address = document.getElementById("address").value
        var phoneNumber = document.getElementById("phoneNumber").value
        var level = document.getElementById("level").value

        var gender;
        if (document.getElementById('g1').checked) {
            gender = document.getElementById('g1').value;
        }
        if (document.getElementById('g2').checked) {
            gender = document.getElementById('g2').value;
        }

        var fee;
        if (document.getElementById('f1').checked) {
            fee = document.getElementById('f1').value;
        }
        if (document.getElementById('f2').checked) {
            fee = document.getElementById('f2').value;
        }
        // alert(fullName+" \n"+email+" \n"+password+" \n"+address+" \n"+level+
        // " \n"+phoneNumber+" \n"+gender+" \n"+fee)

        var data = {
            name: fullName,
            email: email,
            password: password,
            address: address,
            phoneNumber: phoneNumber,
            level: level,
            gender: gender,
            fee: fee
        }



        return data

    }
    window.sendNewStuData = function () {
        $.ajax({
            type: "POST",
            url: "/newStudent",
            data: newUser(),
            success: function(error){
                document.getElementById("firstName").value = ""
                document.getElementById("lastName").value = ""
                document.getElementById("email").value = ""
                document.getElementById("password").value = ""
                document.getElementById("address").value = ""
                document.getElementById("phoneNumber").value = ""
                document.getElementById("level").value = ""
                alert("done")
            },
            error:function (jqXHR) {
                alert(jqXHR.status );
                console.clear()
            }
        });
    }

// post new teacher data to the DB

    window.newTeacherAndLibrarian= function(){
        var fname = document.getElementById("fname").value
        var lname = document.getElementById("lname").value

        var fullName = fname +" " + lname

        var email = document.getElementById("email").value
        var password = document.getElementById("password").value
        var address = document.getElementById("address").value
        var phoneNumber = document.getElementById("phoneNumber").value


        var gender;
        if (document.getElementById('g1').checked) {
            gender = document.getElementById('g1').value;
        }
        if (document.getElementById('g2').checked) {
            gender = document.getElementById('g2').value;
        }

        // alert(fullName+" \n"+email+" \n"+password+" \n"+address+" \n"+level+
        // " \n"+phoneNumber+" \n"+gender+" \n"+fee)

        var data = {
            name: fullName,
            email: email,
            password: password,
            address: address,
            phoneNumber: phoneNumber,
            gender: gender
        }
        return data

    }
    window.sendTeacherData = function () {
        $.ajax({
            type: "POST",
            url: "/newTeacher",
            data: newTeacherAndLibrarian(),
            success: function(error){
                document.getElementById("fname").value = ""
                document.getElementById("lname").value = ""
                document.getElementById("email").value = ""
                document.getElementById("password").value = ""
                document.getElementById("address").value = ""
                document.getElementById("phoneNumber").value = ""
                alert("done")
            },
            error:function (jqXHR) {
                alert(jqXHR.status );
                console.clear()
            }
        });
    }
    window.sendLibrarianData = function () {
        $.ajax({
            type: "POST",
            url: "/newLibrarian",
            data: newTeacherAndLibrarian(),
            success: function(error){
                document.getElementById("fname").value = ""
                document.getElementById("lname").value = ""
                document.getElementById("email").value = ""
                document.getElementById("password").value = ""
                document.getElementById("address").value = ""
                document.getElementById("phoneNumber").value = ""
                alert("done")
            },
            error:function (jqXHR) {
                alert(jqXHR.status );
                console.clear()
            }
        });
    }


    newParent = function(){
        var fname = document.getElementById("fname").value
        var lname = document.getElementById("lname").value

        var fullName = fname +" " + lname

        var email = document.getElementById("parentEmail").value
        var studentEmail = document.getElementById("studentEmail").value
        var password = document.getElementById("password").value


        var gender;
        if (document.getElementById('g1').checked) {
            gender = document.getElementById('g1').value;
        }
        if (document.getElementById('g2').checked) {
            gender = document.getElementById('g2').value;
        }

        var data = {
            name: fullName,
            email: email,
            password: password,
            studentEmail: studentEmail,
            gender: gender
        }
        return data

    }
    window.sendParentData = function () {
        $.ajax({
            type: "POST",
            url: "/newParent",
            data: newParent(),
            success: function(){
                document.getElementById("fname").value = ""
                document.getElementById("lname").value = ""
                document.getElementById("parentEmail").value = ""
                document.getElementById("password").value = ""
                document.getElementById("studentEmail").value = ""
                alert("done")
            },
            error:function (jqXHR) {
                alert(jqXHR.status );
                console.clear()
            }
        });
    }


    newLecture = function(){
        var level = document.getElementById("level").value
        var day = document.getElementById("day").value
        var slot = document.getElementById("slot").value
        var subject = document.getElementById("subject").value

        var data = {
            level: level,
            day: day,
            slot: slot,
            subject: subject
        }
        return data

    }
    window.sendLectureData = function () {
        $.ajax({
            type: "POST",
            url: "/newLecture",
            data: newLecture(),
            success: function(){
                alert("done")
            },
            error:function (jqXHR) {
                alert(jqXHR.status );
                console.clear()
            }
        });
    }


    window.getTimetableByLevel = function (url,level) {
        if(!level){
            var level = document.getElementById('tableLevel').value
        }
        // console.log(level)
        $.ajax({
            type: "GET",
            url: url + '/' + level,
            success: function(data){
                // console.log(data)
                const days = ['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'];
                for (var day= 0; day<days.length; day++){
                    for (var slot = 1; slot<6; slot++){
                            var id = days[day] + slot
                            document.getElementById(id).value = ""
                    }
                }
                for (var day= 0; day<days.length; day++){
                    for (var slot = 1; slot<6; slot++){
                        for (var i = 0; i<data.lectures.length; i++) {
                            var id = days[day] + slot
                            if (days[day] == data.lectures[i].day && slot == data.lectures[i].slot_num){
                                document.getElementById(id).value = data.lectures[i].subject
                            }
                        }
                    }
                }
            },
            error:function (jqXHR) {
                alert(jqXHR.status );
                console.clear()
            }
        });
    }

    window.sendEventData = function(){
        var title = document.getElementById('eventTitle').value
        var desc = document.getElementById('eventDescription').value
        var date = document.getElementById('eventDate').value

        var data = {
            eventTitle: title,
            description : desc,
            eventDate : date
        }

        $.ajax({
            type: "POST",
            url: "/newEvent",
            data: data,
            success: function(){
                alert("done")
            },
            error:function (jqXHR) {
                alert(jqXHR.status );
                console.clear()
            }
        });
    }



    // function to delete any item
    window.deleteItem = function(url,page){
        var confirm = window.confirm("Do you want to confirm the deletion process?")
        if(confirm){
            $.ajax({
                type: "DELETE",
                url: url,
                success: function(){
                    loadDoc('right-side',page)
                },
                error:function (jqXHR) {
                    alert(jqXHR.status );
                    console.clear()
                }
            });
        }

    }


    // to edit items


    window.editItem = function(url){
        loadDoc('right-side',url)
    }

    // to convert serialized data to json
    function getUrlVars(url) {
        var hash;
        var myJson = {};
        var hashes = url.slice(url.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            myJson[hash[0]] = hash[1];
            // If you want to get in native datatypes
            // myJson[hash[0]] = JSON.parse(hash[1]);
        }
        // console.log(myJson)
        return myJson;
    }

    // send edited data
    sendEditedData = function(url,data){
        // console.log(data)
        $.ajax({
            type: "PATCH",
            url: url,
            data: data,
            success: function(){
                alert("done")
            },
            error:function (jqXHR) {
                alert(jqXHR.status );
                console.clear()
            }
        });

    }

    window.editEventData = async function(url){
        const data = await getUrlVars($("form").serialize())
        if(data.eventDate) {
            data.eventDate = document.getElementById('eventDate').value
        }
        sendEditedData(url,data)
    }

    window.editParentData = async function(url){

        var data = await getUrlVars($("form").serialize())
        // var name = data.fname + data.lname

        var newdata = {
            name: document.getElementById('fname').value+ " " + document.getElementById('lname').value,
            email: document.getElementById('parentEmail').value,
            studentEmail: document.getElementById('studentEmail').value,
            gender: data.gender,
            password: document.getElementById('password').value
        }

        // console.log(newdata)

        sendEditedData(url,newdata)
    }

    window.editLibrarianData = async function(url){
        // console.log(url)
        var data = await getUrlVars($("form").serialize())
        // var name = data.fname + data.lname

        var newdata = {
            name: document.getElementById('fname').value+ " " + document.getElementById('lname').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            password: document.getElementById('password').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            gender: data.gender
        }

        // console.log(newdata)

        sendEditedData(url,newdata)
    }

    window.editStudentData = async function(url){
        // console.log(url)
        var data = await getUrlVars($("form").serialize())
        // var name = data.fname + data.lname

        var newdata = {
            name: document.getElementById('firstName').value+ " " + document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            password: document.getElementById('password').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            gender: data.gender,
            fee: data.fee,
            level: data.level
        }

        // console.log(newdata)
        //
        sendEditedData(url,newdata)
    }
    window.editTeacherData = async function(url){
        console.log(url)
        var data = await getUrlVars($("form").serialize())
        // var name = data.fname + data.lname

        var newdata = {
            name: document.getElementById('fname').value+ " " + document.getElementById('lname').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            password: document.getElementById('password').value,
            phoneNumber: document.getElementById('phoneNumber').value,
            gender: data.gender,
        }

        // console.log(newdata)
        //
        sendEditedData(url,newdata)
    }

})