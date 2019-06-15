let socket = new WebSocket("ws://10.1.40.210:6060");
socket.onopen = function () {
    console.log("Соединение установлено.");
    socket.send("test");
};

socket.onclose = function (event) {
    if (event.wasClean) {
        console.log('Соединение закрыто чисто');
    } else {
        console.log('Обрыв соединения'); // например, "убит" процесс сервера
    }
    console.log('Код: ' + event.code + ' причина: ' + event.reason);
};

socket.onmessage = function (event) {
    console.log("Получены данные " + event.data);
};

socket.onerror = function (error) {
    console.log("Ошибка " + error.message);
};


DG.then(function () {
    let map = DG.map('map', {
        center: [58.52, 31.23],
        zoom: 10
    });

    let carIcon = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/trashCar.png',
        iconSize: [48, 48]
    });
    let factoryIcon = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/factory.png',
        iconSize: [30, 30]
    });

    let recycleBinIcon = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/recycleBin.png',
        iconSize: [30, 30]
    });

    //----------Машины------------

    let car1 = DG.marker([58.53, 31.235], {
        icon: carIcon
    });

    let car2 = DG.marker([58.54, 31.23], {
        icon: carIcon
    });

    let cars = DG.featureGroup([car1, car2]);
    cars.addTo(map);
    cars.on('click', function (e) {
        map.setView([e.latlng.lat, e.latlng.lng]);
    });


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

    cars.on('click', function (e) {
        map.setView([e.latlng.lat, e.latlng.lng]);
    });

    //-----------------------------

    //----------Контейнеры------------

    DG.marker([58.525801, 31.270883], {
        icon: recycleBinIcon
    }).addTo(map).bindLabel('ПЭТ 1 Новолучанская');

    DG.marker([58.541796, 31.264569], {
        icon: recycleBinIcon
    }).addTo(map).bindLabel('ПЭТ 1 ПТК');

    DG.marker([58.508401, 31.231347], {
        icon: recycleBinIcon
    }).addTo(map).bindLabel('ПЭТ 1 Псковская');

    DG.marker([58.55987, 31.250796], {
        icon: recycleBinIcon
    }).addTo(map).bindLabel('"ВторРесурсы" центр приёма макулатуры');

    //-----------------------------


});

