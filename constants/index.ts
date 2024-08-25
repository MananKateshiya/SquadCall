export const sidebarLinks = [

    {
        type: 'link',
        label: 'Home',
        route: '/',
        imgUrl: '/icons/home.svg',
    },
    {
        type: 'link',
        label: 'Upcoming',
        route: '/upcoming',
        imgUrl: '/icons/upcoming.svg',
    },
    {
        type: 'link',
        label: 'Previous',
        route: '/previous',
        imgUrl: '/icons/previous.svg',
    },
    {
        type: 'link',
        label: 'Recordings',
        route: '/recordings',
        imgUrl: '/icons/Video.svg',
    },
    {
        type: 'link',
        label: 'Personal Room',
        route: '/personal-room',
        imgUrl: '/icons/add-personal.svg',
    },
    {
        type: 'dropdown',
        label: 'Settings',
        route: '/#',
        imgUrl: '/icons/cog.svg',
        items: [
            {
                label: 'Blue',
                colorClass: 'bg-blue-1',
            },
            {
                label: 'Orange',
                colorClass: 'bg-orange-1',
            },
            {
                label: 'Lime',
                colorClass: 'bg-lime-1'
            },
            {
                label: 'Purple',
                colorClass: 'bg-purple-1',
            },
            {
                label: 'Cyan',
                colorClass: 'bg-cyan-1',
            },
            {
                label: 'Pink',
                colorClass: 'bg-pink-1'
            },
            {
                label: "Navy",
                colorClass: 'bg-navy-1'
            }
        ]
    }

]

export const avatarImages = [
    '/images/avatar-1.jpeg',
    '/images/avatar-2.jpeg',
    '/images/avatar-3.png',
    '/images/avatar-4.png',
    '/images/avatar-5.png',

]