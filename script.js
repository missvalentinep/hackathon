let bins = [];
let icons;
let sideMenu = document.getElementById('sideMenu');
let dateTime = document.getElementById('dateTimeLink');



const updateDate = () => {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let year = today.getFullYear();

    let hours = today.getHours();
    let minutes = today.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;

    dateTime.innerText = `${day}.${month}.${year} ${hours}:${minutes}`;
};
updateDate();
setInterval(updateDate, 1000);

DG.then(() => {


    let map = DG.map('map', {
        center: [58.52, 31.23],
        zoom: 10
    });

    let carIcon = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/trashCar.png',
        iconSize: [40, 40]
    });

    let carIconReversed = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/trashCarReversed.png',
        iconSize: [40, 40],

    });

    let factoryIcon = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/factory.png',
        iconSize: [30, 30]
    });


    let recycleBinFullIcon = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/recycleBinFull.png',
        iconSize: [30, 30]
    });

    let recycleBinEmptyIcon = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/recycleBin.png',
        iconSize: [30, 30]
    });

    let carIconGreen = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/trashCarGreen.png',
        iconSize: [40, 40]
    });
    // icons = {map, carIcon, carIcon, }


    //----------Машины------------

    let car1 = DG.marker([58.53, 31.235], {
        icon: carIconReversed
    }).addTo(map);

    car1.on('click', e => {
        map.setView([e.latlng.lat, e.latlng.lng]);
    });
    //
    // car1 = DG.marker([58.53, 31.235], {
    //     icon: carIconReversed
    // });


    // let car2 = DG.marker([58.54, 31.23], {
    //     icon: carIcon
    // });


    //-----------------------------

    //----------Полигоны------------

    //http://clevereco.ru/groro/novgorodskaja-oblast?sort=type
    DG.marker([58.598, 31.2966], {
        icon: factoryIcon
    }).addTo(map).bindLabel('Полигон твердых бытовых и подобных им промышленных отходов ПАО «Акрон»');

    DG.marker([58.41, 31.74], {
        icon: factoryIcon
    }).addTo(map).bindLabel('Захоронение ООО "Управляющая компания "Вече"');

    DG.marker([58.63, 30.26], {
        icon: factoryIcon
    }).addTo(map).bindLabel('Полигон складирования хозяйственно-бытовых отходов п. Батецкий Новгородской области');

    DG.marker([58.586991, 31.225377], {
        icon: factoryIcon
    }).addTo(map).bindLabel('Тестовый полигон');


    //-----------------------------

    //----------Контейнеры------------

    bins = [

        // DG.marker([58.525801, 31.270883], {
        //     icon: recycleBinFullIcon
        // }).addTo(map).bindLabel('ПЭТ 1 Новолучанская'),

        // DG.marker([58.541796, 31.264569], {
        //     icon: recycleBinFullIcon
        // }).addTo(map).bindLabel('ПЭТ 1 ПТК'),

        DG.marker([58.530355, 31.240477], {
            icon: recycleBinFullIcon
        }).addTo(map).bindLabel('ПЭТ 1 ПТК'),

        DG.marker([58.508401, 31.231347], {
            icon: recycleBinFullIcon
        }).addTo(map).bindLabel('ПЭТ 1 Псковская'),

        DG.marker([58.55987, 31.250796], {
            icon: recycleBinFullIcon
        }).addTo(map).bindLabel('"ВторРесурсы" центр приёма макулатуры'),

        DG.marker([58.555908, 31.271511], {
            icon: recycleBinFullIcon
        }).addTo(map).bindLabel('"Тестовый" центр приёма макулатуры'),

        DG.marker([58.543089, 31.244903], {
            icon: recycleBinFullIcon
        }).addTo(map).bindLabel('"Тестовый" центр приёма стекла'),


    ];

    //-----------------------------


    let socket = new WebSocket("ws://10.1.40.210:6060");
    socket.onopen = () => {
        console.log("Соединение установлено.");
        socket.send("test");
    };

    socket.onclose = event => {
        if (event.wasClean) {
            console.log('Соединение закрыто чисто');
        } else {
            console.log('Обрыв соединения'); // например, "убит" процесс сервера
        }
    };

    socket.onmessage = event => {
        console.log("Получены данные " + event.data);
        console.log( JSON.parse(event.data));
        // move(car1, JSON.parse(event.data));
    };

    socket.onerror = error => {
        console.log("Ошибка " + error.message);
    };


    let move = (car, data) => {
        car.setLatLng([data[0].x, data[0].y]);

        if (data[0].action === "load") {
            bins.forEach(bin => {
                if (bin.getLatLng().lat === data[0].x && bin.getLatLng().lng === data[0].y) {
                    console.log ('lol');
                    bin.setIcon(recycleBinEmptyIcon);
                }
            });
        }
    };
});


let showSideMenu = () => {
    sideMenu.classList.add("open")
};

let hideSideMenu = () => {
    sideMenu.classList.add("closed");
    sideMenu.classList.remove("open");

};