# dolgistop_mail_sender
Проект для отправки почты dolgistop

## Инструкция по внесению изменений в проект

* Создать ветку, отнаследовав её от ветки **dev**
* Делать коммиты в эту ветку
* После завершения работы над фичей открыть **merge request** в ветку dev

Путь кода от фичи до продакшн-версии:    
**feature -> dev -> master**

Таким образом, в **master** всегда содержится только стабильная
версия, и пуши происходят только по окончанию спринта. В **dev** в течение
спринта собирается staging-версия.


## Инструкция по локальному запуску

* Активировать виртуальное окружение (в проекте используется интерпретатор Python 3.7)
```
virtualenv venv -p python3 && source venv/bin/activate
```
* Установить зависимости
```
pip install -r requirements.txt
```
* Добавить переменные окружения
    ```
    export APP_SETTINGS="config.DevConfig"
    export MAIL_SERVER=""
    export MAIL_PORT="587"
    export MAIL_USE_TLS="True"
    export MAIL_USE_SSL="True"
    export MAIL_USERNAME=""
    export MAIL_PASSWORD=""
    export MAIL_RECIPIENT=""
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
