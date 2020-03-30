window.onload = () => {

    const getUsers = () => {
        var xhr = new XMLHttpRequest();
        fetch('https://randomuser.me/api/?results=20')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                console.log(myJson.results);
                let target = document.querySelector('.content');
                myJson.results.map((user) => {
                    let cardContainer = document.createElement('div'),
                        cardImg = document.createElement('img'),
                        info = document.createElement('div'),
                        username = document.createElement('h3'),
                        email = document.createElement('h4'),
                        gender = document.createElement('p'),
                        location = document.createElement('div'),
                        city = document.createElement('p'),
                        country = document.createElement('p'),
                        postCode = document.createElement('p');

                    cardContainer.classList.add('card');

                    cardImg.classList.add('img', 'circle');
                    cardImg.src = user.picture.thumbnail;

                    gender.classList.add('gender');
                    gender.innerHTML = '<strong>Gender: </strong>' + user.gender;

                    username.innerHTML = user.name.title + ' ' + user.name.first + ' ' + user.name.last
                    info.classList.add('info', 'small');

                    email.innerHTML = user.email;

                    cardContainer.appendChild(cardImg);
                    cardContainer.appendChild(info);

                    info.appendChild(username);
                    info.appendChild(gender);

                    location.classList.add('location', 'd-flex')
                    city.innerHTML = '<strong>City: </strong>' + user.location.city
                    country.innerHTML = '<strong>Country:</strong>' + user.location.country;
                    postCode.innerHTML = '<strong>Post Code: </strong>' + user.location.postcode;

                    location.appendChild(city);
                    location.appendChild(country);
                    location.appendChild(postCode);

                    info.appendChild(location);
                    target.appendChild(cardContainer);
                })
                return myJson.results.length;

            }).then((totalItems) => {
                let styleTag = document.createElement('style');
                for (let i = 1; i <= totalItems; i++) {
                    styleTag.innerHTML += '.enableCSS .card:nth-child(' + i + '){animation-delay: ' + (i * 0.5) + 's;}';
                }
                document.getElementsByTagName('head')[0].appendChild(styleTag);
            });;
    }

    const enableCss = (toggle) => {
        let target = toggle.target,
            documentBody = document.querySelector('body');
        if (target.checked) {
            documentBody.classList.add('enableCSS');
        } else {
            documentBody.classList.remove('enableCSS');
        }
    }

    const toggleView = (trigger) => {
        let target = trigger.target,
            documentBody = document.getElementById('content');
        console.log(target);
        if (target.checked && target.id === 'grid') {
            documentBody.classList.add('grid');
        } else {
            documentBody.classList.remove('grid');
        }
    }


    getUsers();
    let enableCheckbox = document.querySelector('.enableCSS'),
        toggleViewBtn = document.querySelectorAll('.toggle-view');

    enableCheckbox.addEventListener('change', enableCss);
    toggleViewBtn.forEach((btn) => {
        btn.addEventListener('click', toggleView, false)
    })
}