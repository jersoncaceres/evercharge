



// PARKING SPOT TYPE AUTOSUBMIT (EV and HOA form)

var parkingOptions = document.getElementById('parking_listener');
parkingOptions.addEventListener('click', parkingCheck, false);
parkingOptions.addEventListener('click', parkingSubmit, false);


function parkingCheck() {
    if (document.getElementById('assignedparking').checked) {
        document.getElementById('parking_spot_div').style.display = 'block';
    }
    else document.getElementById('parking_spot_div').style.display = 'none';


};

function parkingSubmit() {
    var parkingRadios = document.getElementsByName("parking_type");

    for (var i=0, len = parkingRadios.length; i < len; i++) {
        if (parkingRadios[i].checked) {
            document.getElementById("parking_spot_form").submit();
            console.log("SUBMITTED PARKING SPOT !!!");
        }
    }
};


function parkingSpotNumberSubmit() {
    document.getElementById("spot_number_form").submit();
    var spotNumber = document.getElementById("parking_spot_number_input");
    console.log(spotNumber.value);

};



// BUILDING EXISTING CUSTOMER AUTOSUBMIT

var customerListener = document.getElementById('customer_listener');
customerListener.addEventListener('click', customerSubmit, false);

function customerSubmit() {
    var customerRadios = document.getElementsByName("building_customer");

    for (var i=0, len = customerRadios.length; i < len; i++) {
        if (customerRadios[i].checked) {
            document.getElementById("existing_customer_form").submit();
            console.log("submitted building customer info!")

        }
    }
};

// NUMBER OF SPOTS AUTOSUBMIT

var numberSpotsListener = document.getElementById('number_spots_listener');
numberSpotsListener.addEventListener('click', numberSpotsSubmit, false);

function numberSpotsSubmit() {
    var spotsRadios = document.getElementsByName("number_of_spots");


    for (var i=0, len = spotsRadios.length; i < len; i++) {
        if (spotsRadios[i].checked) {
            document.getElementById("number_spots_form").submit();
            console.log("submitted number of parking spots!!")

        }
    }
};


// REFERENCE AUTOSUBMIT

var teslaOptions = document.getElementById('tesla_listener');
teslaOptions.addEventListener('click', teslaCheck, false);
teslaOptions.addEventListener('click', referenceSubmit, false);


function teslaCheck() {
    if (document.getElementById('teslaradio_control').checked) {
        document.getElementById('tesla_div').style.display = 'block';
    }
    else document.getElementById('tesla_div').style.display = 'none';


};

function referenceSubmit() {
    var referenceRadios = document.getElementsByName("reference");

    for (var i=0, len = referenceRadios.length; i < len; i++) {
        if (referenceRadios[i].checked) {
            document.getElementById("reference_form").submit();
            console.log("submitted reference FORM!")

        }
    }
};


function teslaContactSubmit() {
    document.getElementById("tesla_contact_form").submit();
    var teslaContact = document.getElementById("tesla_contact");
    console.log(teslaContact.value);

};

// DO YOU HAVE AN EV?

var ownerListener = document.getElementById('delivery_listener');
ownerListener.addEventListener('click', numberSpotsSubmit, false);

function evOwnerSubmit() {
    var ownerRadios = document.getElementsByName("ev_status");


    for (var i=0, len = ownerRadios.length; i < len; i++) {
        if (ownerRadios[i].checked) {
            document.getElementById("ev_owner_form").submit();
            console.log("submitted ev owner status !!!!")

        }
    }
};




// DELIVERY DATE

var deliveryOptions = document.getElementById('delivery_listener');
deliveryOptions.addEventListener('click', deliveryCheck);


function deliveryCheck() {
    if (document.getElementById('knowdelivery').checked) {
        document.getElementById('delivery_date_div').style.display = 'block';
    }
    else document.getElementById('delivery_date_div').style.display = 'none';



};


function deliveryDateSubmit() {
    document.getElementById("delivery_date_form").submit();

};



