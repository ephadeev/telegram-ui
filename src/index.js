'use strict';

fetch('https://uifaces.co/api?limit=7', {
    method: 'GET',
    headers: {
        'X-API-KEY': '932251B7-11D64DAB-9169108B-901ABC59',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
    }
})
    .then(response => response.json())
    .then(users => {
        const channelName = document.getElementsByClassName('channel__name');
        const channelAvatar = document.getElementsByClassName('channel__avatar');

        // set avatar's src for outgoing messages
        const messageAvatarOutgoing = document.getElementsByClassName('message__avatar--outgoing');

        for (let i = 0; i < messageAvatarOutgoing.length; i++) {
            messageAvatarOutgoing[i].src = users[0].photo;
        }

        // set avatar's src for incoming messages
        const messageAvatarIncoming = document.getElementsByClassName('message__avatar--incoming');
        for (let i = 0; i < messageAvatarIncoming.length; i++) {
            messageAvatarIncoming[i].src = users[users.length - 1 - 1].photo;
        }

        users.forEach((user, index) => {
            if (index === 0) {
                // it will be current user
            } else {
                channelName[index - 1].innerText = user.name;
                channelAvatar[index - 1].src = user.photo;

                if (index === users.length - 1 - 1) {
                    const activeChannelName = document.getElementsByClassName('active-channel__name')[0];
                    activeChannelName.innerText = user.name;
                }
            }
        })
    })
    .catch(err => console.log(err));



const burgerButton = document.getElementsByClassName('burger-button')[0];
const channels = document.getElementsByClassName('channels')[0];
const search = document.getElementsByClassName('search')[0];
const activeChannel = document.getElementsByClassName('active-channel')[0];
const headerContainer = document.getElementsByClassName('header__container')[0];
const toggleMenu = () => {
    if (burgerButton.classList.contains('cross')) {
        burgerButton.classList.remove('cross');
        channels.classList.remove('visible');
        search.classList.remove('visible');
        headerContainer.classList.remove('visible');
        activeChannel.classList.add('visible');
    } else {
        burgerButton.classList.add('cross');
        channels.classList.add('visible');
        search.classList.add('visible');
        headerContainer.classList.add('visible');
        activeChannel.classList.remove('visible');
    }
};

burgerButton.addEventListener('click', toggleMenu);