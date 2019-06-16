#include "mainwindow.h"
#include "ui_mainwindow.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    _timer.setInterval(1000);
    _timer.setTimerType(Qt::PreciseTimer);
    connect(&_timer, &QTimer::timeout, this, &MainWindow::timerCallback);
    _timer.start();

    QFile file("/Users/retina/test/database.db");
    file.open(QIODevice::ReadOnly);
    _dataBase = QJsonDocument::fromJson(file.readAll()).object();
    _cars = _dataBase
            .value("cars")
            .toArray()
            .at(0)
            .toArray();
    _carIter = _cars.begin();
    startServer();
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::timerCallback() {
    QJsonDocument docToSend({
             {"type", "cars"},
             {"content", _carIter->toObject()}
    });
    _carIter++;
    if(_carIter == _cars.end()) {
        _carIter = _cars.begin();
    }
    for(QWebSocket* client : _clients) {
        client->sendTextMessage(docToSend.toJson());
    }
}

void MainWindow::clientCallback(QString message) {
    QJsonDocument clientMsg = QJsonDocument::fromJson(message.toUtf8());
    QJsonArray requests = _dataBase.value("requests").toArray();
    requests.append(clientMsg.object());
    _dataBase["requests"] = requests;
    for(QWebSocket* client : _clients) {
        QJsonObject content = {
            {"requests", requests}
        };
        QJsonDocument docToSend({
               {"type", "update"},
               {"content", content}
        });
        client->sendTextMessage(docToSend.toJson());
    }
}

void MainWindow::startServer() {
    connect(&_server, &QWebSocketServer::newConnection, [this]{
        qDebug() << "new connection";
        QWebSocket *socket = _server.nextPendingConnection();
        _clients.append(socket);
        this->sendFacilityData(socket);
        connect(socket, &QWebSocket::textMessageReceived, this, &MainWindow::clientCallback);
    });
    _server.listen(QHostAddress::Any, 6060);
}

void MainWindow::sendFacilityData(QWebSocket *socket) {
    QJsonArray containers = _dataBase.value("containers").toArray();
    QJsonArray factories = _dataBase.value("factories").toArray();
    QJsonArray sortCenters = _dataBase.value("sort_centers").toArray();
    QJsonArray polygons = _dataBase.value("polygons").toArray();
    QJsonArray storages = _dataBase.value("storages").toArray();
    QJsonArray requests = _dataBase.value("requests").toArray();
    QJsonObject content = {
        {"containers", containers},
        {"factories", factories},
        {"sort_centers", sortCenters},
        {"polygons", polygons},
        {"storages", storages},
        {"requests", requests}
    };
    QJsonDocument docToSend({
           {"type", "facility"},
           {"content", content}
    });
    socket->sendTextMessage(docToSend.toJson());
}

void MainWindow::closeEvent(QCloseEvent *event) {
    QFile file("/Users/retina/test/database.db");
    file.open(QIODevice::WriteOnly | QIODevice::Truncate);
    file.write(QJsonDocument(_dataBase).toJson());
    QMainWindow::closeEvent(event);
}

