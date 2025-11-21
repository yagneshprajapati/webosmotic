


let form = document.querySelector('#myform');

form.addEventListener('submit', function (e) {
    e.preventDefault();

    let nameVar = document.querySelector('#name').value;
    let genderVar = document.querySelector('#male').checked ? 'male' : 'female';
    let dobVar = document.querySelector('#dob').value;
    let emailVar = document.querySelector('#email').value;
    let phoneVar = document.querySelector('#phone').value;
    let hobbiesVar = [];
    let cricketVar = document.querySelector('#cricket').checked;
    let chessVar = document.querySelector('#chess').checked;
    let musicVar = document.querySelector('#music').checked;
    cricketVar ? hobbiesVar.push('cricket') : '';
    chessVar ? hobbiesVar.push('chess') : '' ;
    musicVar ? hobbiesVar.push('music') : '' ;


    // convert to obj
    let myObj = {
        name: nameVar,
        gender: genderVar,
        dob: dobVar,
        email: emailVar,
        phone: phoneVar,
        hobbies: hobbiesVar,
    }


    // validations
    let isValid = true;
   
    //name
    const nameRagex = /^[a-zA-Z0-9]{4,20}$/;

    if(nameVar.trim() === ''){
        document.querySelector('#nameError').innerHTML = "Please fill name!";
        isValid = false;
    }
    else if (!nameRagex.test(nameVar)) {
        document.querySelector('#nameError').innerHTML = "Please enter valid Name, Name should be between 4 to 20 characters, including only alphanumeric characters.";
        isValid = false;
    } else {
        document.querySelector('#nameError').innerHTML = "";
    }

    // gender 

    if(document.querySelector('#male').checked || document.querySelector('#female').checked){
        document.querySelector('#genderError').innerHTML = "";
    } else {
        document.querySelector('#genderError').innerHTML = "Please check male or female";
        isValid = false;
    }

    // dob
    
    if(!dobVar){
        document.querySelector('#dobError').innerHTML = "Please select any date";
        isValid = false;
    }
    else if(new Date(dobVar) > new Date()){
        document.querySelector('#dobError').innerHTML = "pls select date before today no future dates allowed.";
        isValid = false;
    } else {
        document.querySelector('#dobError').innerHTML = "";
    }

    // email 
    const emailRagex = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$/;

    if(emailVar.trim() === ''){
        document.querySelector('#emailError').innerHTML = "Please fill email!";
        isValid = false;
    }
    else if (!emailRagex.test(emailVar)) {
        document.querySelector('#emailError').innerHTML = "Please enter valid email";
        isValid = false;
    } else {
        document.querySelector('#emailError').innerHTML = "";
    }

    // phone 
    const phoneRagex = /^[0-9]{10}$/;

    if(phoneVar.trim() === ''){
        document.querySelector('#phoneError').innerHTML = "Please fill phone";
        isValid = false;
    }
    else if (!phoneRagex.test(phoneVar)) {
        document.querySelector('#phoneError').innerHTML = "Please enter correct phone num. 10 digits";
        isValid = false;
    } else {
        document.querySelector('#phoneError').innerHTML = "";

    }
    
    // code to save local storage only if all validations pass
    if(isValid){
       
        let existingData = localStorage.getItem('users');
        let usersArray = existingData ? JSON.parse(existingData) : [];
        
       
        usersArray.push(myObj);
        
       
        localStorage.setItem('users', JSON.stringify(usersArray));
        
        
        form.reset();
        document.querySelector('#male').checked = true;
    }
    

    // code to retrieve and display all records
    let data = localStorage.getItem('users');
    if(data){
        let usersArray = JSON.parse(data);
        let tableBody = document.querySelector('#data');
        
 
        tableBody.innerHTML = '';
        
       
        usersArray.forEach(userData => {
            let hobbiesStr = userData.hobbies.map(h => h.charAt(0).toUpperCase() + h.slice(1)).join(', ');
            tableBody.innerHTML += `
                <tr>
                    <td>${userData.name}</td>
                    <td>${userData.gender.charAt(0).toUpperCase() + userData.gender.slice(1)}</td>
                    <td>${userData.dob}</td>
                    <td>${userData.email}</td>
                    <td>${userData.phone}</td>
                    <td>${hobbiesStr}</td>
                </tr>
            `;
        });
    }

    console.log(data);

})

