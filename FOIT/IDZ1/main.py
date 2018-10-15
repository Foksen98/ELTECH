import json
from application import Application

FILENAME = 'input_data.json'

if __name__ == "__main__":
    # открытие файла
    try:
        input_file = open(FILENAME)
    except Exception as e:
        print("При открытии файла с данными произошла ошибка!")
        print(e)
        exit(1)
    # чтение данных
    try:
        input_data = json.load(input_file)
    except TypeError:
        print("Некорректный формат файла!")

    app = Application(input_data)
    app.start()
