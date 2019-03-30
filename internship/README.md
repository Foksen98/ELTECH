# internship

## Инструкция по локальному запуску

* Активировать виртуальное окружение (в проекте используется интерпретатор Python 3.7)
```
virtualenv venv -p python3 && source venv/bin/activate
```
* Установить зависимости
```
pip install -r requirements.txt
```
* Запустить сервер
```
python manage.py runserver
```
* Перейти по адресу http://127.0.0.1:5000


## Инструкция по запуску в docker контейнере

* Скачать образ и зависимости, собрать docker контейнер
```
docker build .
```
* Запустить docker контейнер
```
docker run -p 5000:5000 id
```
* Перейти по адресу http://127.0.0.1:5000
