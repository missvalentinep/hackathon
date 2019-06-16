#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QWebSocketServer>
#include <QWebSocket>
#include <QJsonObject>
#include <QDebug>
#include <QJsonDocument>
#include <QJsonArray>
#include <QTimer>
#include <QLinkedList>
#include <QVector>
#include <QPair>
#include <QTime>
#include <QFile>
#include <QCloseEvent>
namespace Ui {
class MainWindow;
}

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void timerCallback();
    void clientCallback(QString message);

private:
    void startServer();
    void sendFacilityData(QWebSocket *socket);
    QJsonObject _dataBase;
    QJsonArray _cars;
    QJsonArray::iterator _carIter;
    Ui::MainWindow *ui;
    QWebSocketServer _server {"qeq.com", QWebSocketServer::NonSecureMode};
    QLinkedList <QWebSocket*> _clients;
    QTimer _timer;

protected:
    void closeEvent(QCloseEvent *event) override;
};

#endif // MAINWINDOW_H
