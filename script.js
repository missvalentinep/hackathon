let icons;
let sideMenu = document.getElementById('leaveRequest');
let dateTime = document.getElementById('dateTimeLink');
let addUserMarker;
let userMarker;
let containers = [];
let factories = [];
let polygons = [];
let sortingCenters = [];
let storages = [];
let showOnMap;
let previousMarker;
let socket;
let map;

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


    map = DG.map('map', {
        center: [58.530355, 31.240477],
        zoom: 13
    });

    console.log(map);

    let carIconReversed = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/trashCarReversed.png',
        iconSize: [40, 40],

    });

    let factoryIcon = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/factory.png',
        iconSize: [30, 30]
    });


    let binGlassIcon = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/binGlass.png',
        iconSize: [30, 30]
    });

    let binPlasticIcon = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/binPlastic.png',
        iconSize: [30, 30]
    });

    let binMetalIcon = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/binMetal.png',
        iconSize: [30, 30]
    });

    let binPaperIcon = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/binPaper.png',
        iconSize: [30, 30]
    });

    let binEmptyIcon = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/binEmpty.png',
        iconSize: [30, 30]
    });

    let polygonSmall = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/polygonSmall.png',
        iconSize: [30, 30]
    });

    let polygonMedium = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/polygonMedium.png',
        iconSize: [30, 30]
    });

    let polygonFull = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/polygonFull.png',
        iconSize: [30, 30]
    });


    let sortingCenterIcon = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/sortingCenter.png',
        iconSize: [30, 30]
    });

    let storageIcon = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/storage.png',
        iconSize: [30, 30]
    });

    let requestIcon = DG.icon({
        iconUrl: '/Users/valentina/Documents/hahaton/img/request.png',
        iconSize: [20, 30]
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
    // DG.marker([58.598, 31.2966], {
    //     icon: factoryIcon
    // }).addTo(map).bindLabel('Полигон твердых бытовых и подобных им промышленных отходов ПАО «Акрон»');
    //
    // DG.marker([58.41, 31.74], {
    //     icon: factoryIcon
    // }).addTo(map).bindLabel('Захоронение ООО "Управляющая компания "Вече"');
    //
    // DG.marker([58.63, 30.26], {
    //     icon: factoryIcon
    // }).addTo(map).bindLabel('Полигон складирования хозяйственно-бытовых отходов п. Батецкий Новгородской области');
    //
    // DG.marker([58.586991, 31.225377], {
    //     icon: factoryIcon
    // }).addTo(map).bindLabel('Тестовый полигон');
    //

    //-----------------------------

    //----------Контейнеры------------

    // let bins = [
    //
    //     // DG.marker([58.525801, 31.270883], {
    //     //     icon: recycleBinFullIcon
    //     // }).addTo(map).bindLabel('ПЭТ 1 Новолучанская'),
    //
    //     // DG.marker([58.541796, 31.264569], {
    //     //     icon: recycleBinFullIcon
    //     // }).addTo(map).bindLabel('ПЭТ 1 ПТК'),
    //
    //     DG.marker([58.530355, 31.240477], {
    //         icon: recycleBinFullIcon
    //     }).addTo(map).bindLabel('ПЭТ 1 ПТК'),
    //
    //     DG.marker([58.508401, 31.231347], {
    //         icon: recycleBinFullIcon
    //     }).addTo(map).bindLabel('ПЭТ 1 Псковская'),
    //
    //     DG.marker([58.55987, 31.250796], {
    //         icon: recycleBinFullIcon
    //     }).addTo(map).bindLabel('"ВторРесурсы" центр приёма макулатуры'),
    //
    //     DG.marker([58.555908, 31.271511], {
    //         icon: recycleBinFullIcon
    //     }).addTo(map).bindLabel('"Тестовый" центр приёма макулатуры'),
    //
    //     DG.marker([58.543089, 31.244903], {
    //         icon: recycleBinFullIcon
    //     }).addTo(map).bindLabel('"Тестовый" центр приёма стекла'),
    //
    //
    // ];

    //---------------------------------------

    //----------Добавление маркера при оформлении заявки------------

    addUserMarker = () => {
        if (userMarker !== undefined) userMarker.removeFrom(map);
        userMarker = DG.marker(map.getCenter(), {
            draggable: true
        }).addTo(map);
    };


    //---------------------------------------

    //----------Communication with server------------


    socket = new WebSocket("ws://10.1.40.210:6060");
    socket.onopen = () => {
        console.log("Соединение установлено.");
    };

    socket.onclose = event => {
        if (event.wasClean) {
            console.log('Соединение закрыто чисто');
        } else {
            console.log('Обрыв соединения'); // например, "убит" процесс сервера
        }
    };

    socket.onmessage = event => {
        // console.log("Получены данные " + event.data);
        let data = JSON.parse(event.data);
        console.log(data);
        switch (data.type) {
            case "cars":
                move(car1, data.content);
                break;
            case "facility":
                initEnvironment(data.content);
                break;
            case "update":
                updateRequests(data.content);
                break;
        }

    };

    socket.onerror = error => {
        console.log("Ошибка " + error.message);
    };


    const move = (car, data) => {
        car.setLatLng([data.x, data.y]);

        if (data.action === "load") {
            console.log('load');
            containers.forEach(bin => {
                if (bin.getLatLng().lat === data.x && bin.getLatLng().lng === data.y) {
                    bin.setIcon(binEmptyIcon);
                }
            });
        }
    };



    const initEnvironment = (data) => {

        data['containers'].map(container => {

            let iconSrc;
            let label;

            switch (container.type) {
                case "glass":
                    iconSrc = binGlassIcon;
                    label = "Контейнер для стекла";
                    break;
                case "plastic":
                    iconSrc = binPlasticIcon;
                    label = "Контейнер для пластика";
                    break;
                case "metal":
                    iconSrc = binMetalIcon;
                    label = "Контейнер для металла";
                    break;
                case "paper":
                    iconSrc = binPaperIcon;
                    label = "Контейнер для бумаги";
                    break;
                default:

                    iconSrc = binEmptyIcon;
            }

            if (container.state === "empty") {
                iconSrc = binEmptyIcon;
            }

            let containerMarker = DG.marker([container.x, container.y], {
                icon: iconSrc
            }).addTo(map).bindLabel(label);
            containers.push(containerMarker);
        });

        data['polygons'].map(polygon => {
            let iconSrc;
            let fullness = polygon.fullness;
            if (fullness < 20) {
                iconSrc = polygonSmall
            } else if (fullness < 60) {
                iconSrc = polygonMedium;
            } else {
                iconSrc = polygonFull;
            }

            let polygonMarker = DG.marker([polygon.x, polygon.y], {
                icon: iconSrc
            }).addTo(map).bindLabel(polygon.name);
            polygons.push(polygonMarker);
        });

        data['sort_centers'].map(sortCenter => {
            let sortCenterMarker = DG.marker([sortCenter.x, sortCenter.y], {
                icon: sortingCenterIcon
            }).addTo(map).bindLabel(sortCenter.name);
            sortingCenters.push(sortCenterMarker);
        });

        data['storages'].map(storage => {
            let storageMarker = DG.marker([storage.x, storage.y], {
                icon: storageIcon
            }).addTo(map).bindLabel(storage.name);
            storages.push(storageMarker);
        });

        data['factories'].map(factory => {
            let factoryMarker = DG.marker([factory.x, factory.y], {
                icon: factoryIcon
            }).addTo(map).bindLabel(factory.name);
            factories.push(factoryMarker);
        });

        let requestsHtml = "";
        data['requests'].map(request => {
            console.log(request);
            let requestType = request.type === 'sell' ? "Покупка" : "Продажа";
            requestsHtml += "<div class='request'>" +
                "<h2>" + requestType + "</h2>" +
                "<p>" + request.trash + " за " + request.price + " р/кг</p>" +
                "<p>" + request.shipping + "</p>" +
                "<a href='#' onclick='showOnMap([" + request.x + "," + request.y + "])'>Посмотреть на карте</a>" +
                "</div>";
        });

        document.getElementById('requests').innerHTML = requestsHtml;
    };

    const updateRequests = (data) => {
        let requestsHtml = "";
        data['requests'].map(request => {
            console.log(request);
            let requestType = request.type === 'sell' ? "Покупка" : "Продажа";
            requestsHtml += "<div class='request'>" +
                "<h2>" + requestType + "</h2>" +
                "<p>" + request.trash + " за " + request.price + " р/кг</p>" +
                "<p>" + request.shipping + "</p>" +
                "<a href='#' onclick='showOnMap([" + request.x + "," + request.y + "])'>Посмотреть на карте</a>" +
                "</div>";
        });

        document.getElementById('requests').innerHTML = requestsHtml;
    };

    showOnMap = cordsArr => {
        if (previousMarker !== undefined) previousMarker.removeFrom(map);
        previousMarker = DG.marker([cordsArr[0], cordsArr[1]], {
            icon: requestIcon
        }).addTo(map);
        map.setView([cordsArr[0], cordsArr[1]]);
    }
});


let showSideMenu = () => {
    sideMenu.classList.remove("closed");
    sideMenu.classList.add("open");
};

let hideSideMenu = () => {
    if (sideMenu.classList.contains("open")) {
        sideMenu.classList.remove("open");
        sideMenu.classList.add("closed");

    }
};

let submitRequest = () => {

    let types = document.getElementsByName('whatYouWant');
    let type;
    if (types[0].checked) {
        type = types[0].value;
    }
    else {
        type = types[1].value;
    }
    let trash = document.getElementById('chooseMaterial').value;
    let price = document.getElementById('choosePrice').value;
    let shippingTypes = document.getElementsByName('delivery');
    let shipping;
    if (shippingTypes[0].checked) {
        shipping = shippingTypes[0].value;
    }
    else {
        shipping = shippingTypes[1].value;
    }
    let x = userMarker.getLatLng().lat;
    let y = userMarker.getLatLng().lng;
    // userMarker.removeFrom(map);

    let obj = {type, trash, price, shipping, x, y};

    socket.send(JSON.stringify(obj));
    sideMenu.innerHTML = "<h1>Завявка успешно отправлена!</h1> <p>Мы с вами свяжемся</p>";
    setTimeout(hideSideMenu, 1000);
};